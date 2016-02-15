BasicGame.Main = function(game){

};

BasicGame.Main.prototype = {

	create: function() {
		var me = this;

		// score variable
		me.score = 0;
		me.mode = 0; // 0 for flappy, 1 for dash
		me.lastChaPos = {};
		me.lastChaPos.x = me.game.width * 0.2;
		me.lastChaPos.y = me.game.height * 0.5;
		me.chaOnGround = false;

		// sound setup
		me.flapSound = me.game.add.audio('flap');
		me.hitSound = me.game.add.audio('hit');

		// enable physics
		me.game.physics.startSystem(Phaser.Physics.ARCADE);

		// timers - score
   	 	me.scoreCounter = me.game.time.events.loop(Phaser.Timer.SECOND * 1.0, me.getScore, me);

		// start with flappy mode
		me.runFlappyMode();

		// set up player key input binds
   	 	me.setupPlayerControl();
	},

	test:function(){console.log('dfasdf')},

	update: function() {
		var me = this;

		me.game.physics.arcade.collide(me.ground, me.cha);

		// cha angle default
		if(me.cha.angle < me.defaultAngle) {
		    me.cha.angle += 2.5;
		}

		me.lastChaPos.x = me.cha.x;
		me.lastChaPos.y = me.cha.y;

		// see if cha is on ground or not
		var groundHeight = me.game.height - me.game.height * 0.1 - me.cha.height * 0.5 - 1;
		if (me.mode !== 0 && me.cha.y >= groundHeight){
			me.chaOnGround = true;
		}
		else {
			me.chaOnGround = false;
		}

		// loop through pipes 
		for (var i = 0; i < me.pipes.children.length; i++){
			
			var pipe = me.pipes.children[i];

			me.game.physics.arcade.collide(me.cha, pipe, me.deathHandler, null, me);	
		}
	},

	runFlappyMode: function(){
		console.log('/////// RUN FLAPPY MODE ///////');
		var me = this;

		me.destroyDashMode();

		me.mode = 0;
		me.defaultAngle = 90;

		me.recreateStage();

		me.pipeGenerator = me.game.time.events.loop(Phaser.Timer.SECOND * 2.0, me.generatePipes, me);

		me.game.time.events.add(10000, me.runDashMode, this);
	},

	destroyFlappyMode: function(){
		var me = this;

		me.game.time.events.remove(me.pipeGenerator);
		me.destroyPipe();
	},

	runDashMode: function(){
		console.log('/////// RUN DASH MODE ///////');
		var me = this;

		me.destroyFlappyMode();

		me.mode = 1;
		me.defaultAngle = 0;

		me.recreateStage();

		me.pipeGenerator = me.game.time.events.loop(Phaser.Timer.SECOND * 2.75, me.generatePipes, me);

		me.game.time.events.add(10000, me.runFlappyMode, this);
	},

	destroyDashMode: function(){
		var me = this;

		me.game.time.events.remove(me.pipeGenerator);
		me.destroyPipe();
	},

	recreateStage: function(){
		var me = this;

		me.createBG();

		me.createPlayer();

		me.createScoreHUD();

		me.createPipe();

		me.createGround();
	},

	createBG: function(){
		var me = this;

		if (me.bg)
			me.bg.destroy();

		var bg_img_key;
		if (me.mode == 0)
			bg_img_key = 'bg_sky_flappy';
		else
			bg_img_key = 'bg_sky_dash';

		me.bg = me.game.add.sprite(0, 0, bg_img_key);
		
		var scale = me.game.width / me.bg.width * 1.1;
		
		me.bg.scale.setTo(scale, scale);
	},

	createGround: function(){
		var me = this;

		if (me.ground)
			me.ground.destroy();

		var ground_img_key;
		if (me.mode == 0)
			ground_img_key = 'bg_ground_flappy';
		else
			ground_img_key = 'bg_ground_dash';

		var groundWidth = me.game.width;
		var groundHeight = me.game.height * 0.1;

	    me.ground = me.game.add.tileSprite(
	    	0, // x
	    	me.game.height - groundHeight, // y
	    	groundWidth, // width
	    	groundHeight, //height
	    	ground_img_key// key
	    	);

	    me.ground.autoScroll(-200, 0);
	    
    	//Enable physics for the building
		me.game.physics.arcade.enable(me.ground);
		me.ground.physicsType = Phaser.SPRITE;
		me.ground.body.immovable = true;
	},

	createPlayer: function(){
		var me = this;

		if (me.cha)
			me.cha.destroy();

		var cha_img_key;
		if (me.mode === 0)
			cha_img_key = 'cha_flappy';
		else
			cha_img_key = 'cha_dash';

		me.cha = me.game.add.sprite(me.lastChaPos.x, me.lastChaPos.y, cha_img_key);

		// add and play animations
		me.cha.animations.add('flap');
		me.cha.animations.play('flap', 12, true);

		me.game.physics.arcade.enable(me.cha);

		// set the sprite's anchor to the center
		me.cha.anchor.setTo(0.5, 0.5);

		me.cha.scale.setTo(1.4, 1.4);

		//Make the player fall by applying gravity 
		me.cha.body.gravity.y = 800;

        //Make the player collide with the game boundaries
		me.cha.body.collideWorldBounds = false; 

		//Make the player bounce a little 
		me.cha.body.bounce.y = 0.2;
		me.cha.body.bounce.x = 0.2;
	},

	createScoreHUD: function(){
		var me = this;

		if (me.scoreText)
			me.scoreText.destroy();

		// setup score bar
   	 	me.scoreText = me.game.add.bitmapText(me.game.width * 0.5, me.game.height * 0.125, 'flappyfont',me.score.toString() + 'm', 32 * window.devicePixelRatio);
    	me.scoreText.anchor.setTo(0.5, 0.5);
    	me.scoreText.visible = true;
	},

	setupPlayerControl: function(){
		var me = this;

		me.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

		var jumpKey = me.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		jumpKey.onDown.add(me.jump, me);

		me.input.onDown.add(me.jump, me);
	},

	deathHandler: function(){
		var me = this;

		if (BasicGame.sound)
			me.hitSound.play();

		//Wait a couple of seconds and then trigger the game over screen
		me.game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){ 
			//Send score to game over screen 
			me.game.state.start('GameOver', true, false, me.score.toString());
		}, me);

	},

	jump: function(){
		var me = this;

		// if its not flappy mode and not on ground, no jump available!
		if (me.mode !== 0 && !me.chaOnGround)
			return;

		if (me.mode === 0)
			me.cha.body.velocity.y = -360;
		else
			me.cha.body.velocity.y = -700;

		me.game.add.tween(me.cha).to({angle: -40}, 100).start();

		if (BasicGame.sound)
			me.flapSound.play();
	},

	getScore: function(){
		var me = this;

		me.score += 1;
		me.scoreText.setText(me.score.toString() + 'm');
	},

	createPipe: function(){
		this.pipes = game.add.group(); // Create a group  
	},

	destroyPipe: function(){
		if (this.pipes && this.pipes.length > 0)
			this.pipes.destroy();
	},

	generateSinglePipe: function(x, y, frame, speed){
		var me = this;

		// Get the first dead pipe of our group
	    var pipe = me.pipes.getFirstDead();

	    if (!pipe){
	    	console.log('allocating new pipe, total allocated:', this.pipes.length); // debug memory
	    	pipe = me.game.add.sprite(x, y, 'pipe', frame);
	    }

	    // Set the new position of the pipe
	    pipe.reset(x, y);

	    me.game.physics.arcade.enable(pipe);

	    // Add velocity to the pipe to make it move left
	    pipe.body.velocity.x = speed; 

	    // Kill the pipe when it's no longer visible 
	    pipe.checkWorldBounds = true;
	    pipe.outOfBoundsKill = true;

	    pipe.body.immovable = true;

	    return pipe;
	},

	generatePipes: function(){
		var me = this;

		var startPos = me.game.width;

		if (me.mode === 0){ // flappy
			var y_offset = me.game.rnd.integerInRange(- me.game.height * 0.1, - me.game.height * 0.45);

			var topPipe = me.generateSinglePipe(startPos, y_offset, 0, -300);
			me.pipes.add(topPipe);

			var gap = topPipe.width + me.cha.width * 9;

			var bottomPipe = me.generateSinglePipe(startPos, gap + y_offset, 1, -300);
			me.pipes.add(bottomPipe);
		}
		else { // dash
			var y_offset = me.game.height - me.game.height * 0.2;

			var topPipe = me.generateSinglePipe(startPos, y_offset, 0, -300);
			me.pipes.add(topPipe);
		}
	},

	shutdown:function(){
		var me = this;

		me.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
  		me.cha.destroy();
  		me.pipes.destroy();
  		me.ground.destroy();
  		me.bg.destroy();
	},

	gameOver: function(){
		var me = this;

		me.game.state.start('GameOver');
	},

};
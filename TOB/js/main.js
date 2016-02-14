var Main = function(game){

};

Main.prototype = {

	create: function() {
		var me = this;

		this.flapSound = this.game.add.audio('flap');
		this.hitSound = this.game.add.audio('hit');

		me.score = 0;

		// enable physics
		me.game.physics.startSystem(Phaser.Physics.ARCADE);

		me.createBG();
		
		me.createPlayer();

		me.pipes = this.game.add.group();;

		me.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

		var jumpKey = me.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		jumpKey.onDown.add(me.jump, me);

		me.input.onDown.add(me.jump, me);

		me.pipeGenerator = me.game.time.events.loop(Phaser.Timer.SECOND * 1.75, me.generatePipes, this);
		me.pipeGenerator = me.game.time.events.loop(Phaser.Timer.SECOND * 1.0, me.getScore, this);
   	 	me.pipeGenerator.timer.start();

   	 	me.createGround();

   	 	me.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont',me.score.toString() + 'm', 24);
    	me.scoreText.visible = true;


	},

	getScore: function(){
		var me = this;

		me.score += 1;
		me.scoreText.setText(me.score.toString() + 'm');
	},

	createBG: function(){

		var sprite = this.game.add.sprite(0, 0, 'background');
		
		var scale = this.game.width / sprite.width * 1.1;
		
		sprite.scale.setTo(scale, scale);

	},

	createGround: function(){

		var me = this;

		// add the ground sprite as a tile
	    // and start scrolling in the negative x direction
	    me.ground = this.game.add.tileSprite(0, this.game.world.height - 120, 335, 112, 'ground');

	    //me.ground.anchor.setTo(0.5, 0);

	    me.game.physics.arcade.enable(me.ground);

	    me.ground.scale.setTo(1.3, 1.3);
	    me.ground.autoScroll(-200, 0);
	    
    	//Enable physics for the building
		me.game.physics.arcade.enable(me.ground);
		me.ground.physicsType = Phaser.SPRITE;
		me.ground.body.immovable = true;

	},

	createPlayer: function(){

		var me = this;

		me.bird = this.game.add.sprite(60, this.game.height * 0.5, 'bird');

		// add and play animations
		me.bird.animations.add('flap');
		me.bird.animations.play('flap', 12, true);

		me.game.physics.arcade.enable(me.bird);

		// set the sprite's anchor to the center
		me.bird.anchor.setTo(0.5, 0.5);

		//Make the player fall by applying gravity 
		me.bird.body.gravity.y = 800;

        //Make the player collide with the game boundaries
		me.bird.body.collideWorldBounds = true; 

		//Make the player bounce a little 
		me.bird.body.bounce.y = 0.3;
		me.bird.body.bounce.x = 0.3;
	},

	gameOver: function(){
		var me = this;

		me.game.state.start('GameOver');
	},

	update: function() {

		var me = this;

		me.game.physics.arcade.collide(me.ground, me.bird);

		  if(this.bird.angle < 90) {
		    this.bird.angle += 2.5;
		  }

		for (var i = 0; i < me.pipes.children.length; i++){
			
			var pipeGroup = me.pipes.children[i];

			pipeGroup.setAll('body.velocity.x', -270);

			if (pipeGroup.x < pipeGroup.children[0].width - 200){
				pipeGroup.exists = false;
			}
			else {
				me.game.physics.arcade.collide(me.bird, pipeGroup.children[0], me.deathHandler, null, me);	
				me.game.physics.arcade.collide(me.bird, pipeGroup.children[1], me.deathHandler, null, me);	
			}
		}
	},

	deathHandler: function(){
		var me = this;

		me.hitSound.play();

		//Wait a couple of seconds and then trigger the game over screen
		me.game.time.events.add(Phaser.Timer.SECOND * 0.3, function(){ 
			//Send score to game over screen 
			me.game.state.start('GameOver', true, false, me.score.toString());
		}, me);
	},

	shutdown:function(){
		this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
  		this.bird.destroy();
  		this.pipes.destroy();
  		this.ground.destroy();
	},

	jump: function(){
		var me = this;

		me.bird.body.velocity.y = -300;

		me.game.add.tween(me.bird).to({angle: -40}, 100).start();

		me.flapSound.play();
	},


	generatePipe: function(x, y, frame){

		var me = this;

		var pipe = this.game.add.sprite(x, y, 'pipe', frame);
		this.game.physics.arcade.enableBody(pipe);

		pipe.body.collideWorldBounds = false;
		pipe.body.immovable = true;

		return pipe;
	},

	generatePipeGroup: function(y){
		var me = this;

		var group = me.game.add.group();
		//this.game.physics.arcade.enableBody(group);

		var topPipe = me.generatePipe(0, 0, 0);
		group.add(topPipe);

		var bottomPipe = me.generatePipe(0, 440, 1);
		group.add(bottomPipe);

		var pipeY = y;

		group.y = pipeY;
		group.x = me.game.width;

		group.hasScored = false;

		me.pipes.add(group);

		return group;
	},

	generatePipes: function(){
		var me = this;

		var y = me.game.rnd.integerInRange(-100, 100);

		var pipeGroup = this.pipes.getFirstExists(false);

		if (!pipeGroup){
			console.log('generating..', this.pipes.children.length);
			pipeGroup = me.generatePipeGroup(y);
		}

		me.resetPipeGroup(pipeGroup, y);
		
	},

	resetPipeGroup: function(pipeGroup, y){
		pipeGroup.x = this.game.width + pipeGroup.width;
		pipeGroup.y =  y;
		pipeGroup.hasScored = false;
		pipeGroup.exists = true;
	},

};
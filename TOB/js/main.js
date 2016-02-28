BasicGame.Main = function(game){

};

BasicGame.Main.prototype = {

	create: function() {
		var me = this;

		// score variable
		me.score = 0;
		me.mode = 0; // 0 for flappy, 1 for dash

		/* character position between map modes */
		me.lastChaPos = {};
		me.lastChaPos.x = me.game.width * 0.2;
		me.lastChaPos.y = me.game.height * 0.5;

		/* is player on ground */
		me.chaOnGround = false;

		me.mapSpeed = 2;
		me.mapVelX = -1 * me.mapSpeed * BasicGame.blockSize;

		me.currentColumnId = 0;
		me.prevColumnId = 0;

		// sound setup
		me.flapSound = me.game.add.audio('flap');
		me.hitSound = me.game.add.audio('hit');

		// enable physics
		me.game.physics.startSystem(Phaser.Physics.ARCADE);

		/* track the map x position */
		me.currentMapXPos = 0;
		me.xTester = me.game.add.sprite(0, 0, 'open_none');
		me.game.physics.arcade.enable(me.xTester);
	    me.xTester.body.velocity.x = -me.mapVelX; 
	    me.xTester.outOfBoundsKill = false;
	    me.xTester.body.immovable = true;

		// timers - score
   	 	me.scoreCounter = me.game.time.events.loop(Phaser.Timer.SECOND * 1.0, me.getScore, me);

		// start with vamp mode
		me.runVampMode();

		// set up player key input binds
   	 	me.setupPlayerControl();

   	 	// debug
		me.createDebugHUD();
	},

	update: function() {
		var me = this;

		// update current map x pos
		me.currentMapXPos = me.xTester.position.x;

		// draw map - blocks, traps, bloods and so on..
		if (me.isColumnNeedUpdate()){
			me.generateMapColumn();
		}

		// cha angle default
		if(me.cha.angle < me.defaultAngle) {
		    me.cha.angle += 2.5;
		}

		me.lastChaPos.x = me.cha.x;
		me.lastChaPos.y = me.cha.y;

		me.chaOnGround = false;

		// loop through blocks
		for (var i = 0; i < me.blocks.children.length; i++){
			
			var block = me.blocks.children[i];

			me.game.physics.arcade.collide(me.cha, block, me.blockCollisionHandler, null, me);	
		}

		if (!me.chaOnGround)
			me.cha.body.velocity.x = 0;

		// debug text
		me.debugText.setText(me.currentColumnId);
	},

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
blocks
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	createBlocks: function(){
		this.blocks = game.add.group();
	},

	destroyBlocks: function(){
		if (this.blocks && this.blocks.length > 0)
			this.blocks.destroy();
	},

	blockCollisionHandler: function(){
		var me = this;

		me.chaOnGround = true;
		me.cha.body.velocity.x = -me.mapVelX;
	},

	isColumnNeedUpdate: function(){
		var me = this;

		var testBlockColumnId = Math.floor(me.currentMapXPos / BasicGame.blockSize);
		//console.log(me.currentMapXPos, BasicGame.blockSize, testBlockColumnId, me.currentColumnId);

		if (me.prevColumnId != testBlockColumnId){
			me.currentColumnId = testBlockColumnId;
			me.prevColumnId = testBlockColumnId;
			return true;
		}

		return false;
	},

	generateSingleBlock: function(x, y, imgStr){
		var me = this;

		// Get the first dead pipe of our group
	    var block = me.blocks.getFirstDead();

	    if (!block){
	    	console.log('allocating new block, total allocated:', me.blocks.length); // debug memory

	    	/*
	    	var blockKey;
	    	if (me.mode === 0)
	    		blockKey = 'pipe';
	    	else
	    		blockKey = 'crate';
	    	*/

	    	block = me.game.add.sprite(x, y, imgStr);
	    }
	    else {
	    	// Set the new position of the pipe
	    	block.reset(x, y);	
	    }

	    me.game.physics.arcade.enable(block);

	    // Add velocity to the pipe to make it move left
	    block.body.velocity.x = me.mapVelX;

	    block.friction = 0;

	    // Kill the pipe when it's no longer visible 
	    block.checkWorldBounds = true;
	    block.outOfBoundsKill = true;

	    block.body.immovable = true;

	    me.blocks.add(block);

	    return block;
	},


	generateMapColumn: function(){
		var me = this;

		var currentColumn = BasicGame.mapData[me.currentColumnId];
		if (currentColumn == undefined)
			return;

		for (var i = 0; i < 8; i++){

			x = me.game.width;
			y = i * BasicGame.blockSize;

			var imgId = currentColumn[i];
			var imgStr;

			if (imgId == 0){ // if its 0, just leave space
				// leave space
				continue;
			} else if (imgId == 1){
				imgStr = me.getBlockImage(me.currentColumnId, i);
			}
			else if (imgId == 2){
				imgStr = 'trap';
			}
			else if (imgId == 3){
				imgStr = 'blood';
			}

			me.generateSingleBlock(x, y, imgStr);
		}
	},

	getBlockImage: function(column_id, row_id){

		var up ;
		if (BasicGame.mapData[column_id][row_id-1] == undefined)
			up = 0;
		else
			up = (BasicGame.mapData[column_id][row_id-1] > 0);

		var down;
		if (BasicGame.mapData[column_id][row_id+1] == undefined)
			down = 0;
		else
			down = (BasicGame.mapData[column_id][row_id+1] > 0);

		var left;
		if (BasicGame.mapData[column_id-1] == undefined)
			left = 0;
		else
			left = (BasicGame.mapData[column_id-1][row_id] > 0);

		var right;
		if (BasicGame.mapData[column_id+1] == undefined)
			right = 0;
		else
			right = (BasicGame.mapData[column_id+1][row_id] > 0);

		// all open
		if (up && down && left && right)
			return 'open_all';

		// 3 open
		else if (up && !down && left && right)
			return 'open_up_left_right';
		else if (up && down && !left && right)
			return 'open_up_down_right';
		else if (up && down && left && !right)
			return 'open_up_down_left';
		else if (!up && down && left && right)
			return 'open_down_left_right'; /*없음*/

		// 2 open
		else if (!up && !down && left && right)
			return 'open_left_right'; /*없음*/
		else if (up && down && !left && !right)
			return 'open_up_down'; /*없음*/
		else if (!up && down && left && !right)
			return 'open_down_left';
		else if (up && !down && !left && right)
			return 'open_up_right';

		// 1 open
		else if (up && !down && !left && !right)
			return 'open_up';
		else if (!up && down && !left && !right)
			return 'open_down';
		else if (!up && !down && left && !right)
			return 'open_left';
		else if (!up && !down && !left && right)
			return 'open_down_right';

		// all closed
		else if (!up && !down && !left && !right)
			return 'open_none'
	},		

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Mode
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	runBatMode: function(){
		console.log('/////// RUN Bar MODE ///////');
		var me = this;

		me.destroyVampMode();

		me.mode = 0;
		me.defaultAngle = 90;

		me.recreateStage();

		//me.pipeGenerator = me.game.time.events.loop(Phaser.Timer.SECOND * 2.0, me.generatePipes, me);

		//me.game.time.events.add(10000, me.runVampMode, this);
	},

	destroyBatMode: function(){
		var me = this;

		//me.game.time.events.remove(me.pipeGenerator);
		me.destroyBlocks();
	},

	runVampMode: function(){
		console.log('/////// RUN Vamp MODE ///////');
		var me = this;

		me.destroyBatMode();

		me.mode = 1;
		me.defaultAngle = 0;

		me.recreateStage();

		//me.pipeGenerator = me.game.time.events.loop(Phaser.Timer.SECOND * 2.75, me.generatePipes, me);

		//me.game.time.events.add(10000, me.runBatMode, this);
	},

	destroyVampMode: function(){
		var me = this;

		//me.game.time.events.remove(me.pipeGenerator); // random generator
		me.destroyBlocks();
	},

	recreateStage: function(){
		var me = this;

		me.createBG();

		me.createPlayer();

		me.createScoreHUD();

		me.createBlocks();
	},
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BG
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	createBG: function(){
		var me = this;

		if (me.bg)
			me.bg.destroy();

		var bg_img_key;
		if (me.mode == 0){
			//bg_img_key = 'bg_sky_bat';
		}
		else {
			bg_img_key = 'bg_sky_vamp';
		}

		me.bg = me.game.add.sprite(0, 0, bg_img_key);
		
		var scale = me.game.width / me.bg.width * 1.1;
		
		me.bg.scale.setTo(scale, scale);
	},

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Player
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	createPlayer: function(){
		var me = this;

		if (me.cha)
			me.cha.destroy();

		var cha_img_key;
		if (me.mode === 0){
			//cha_img_key = 'cha_bat';
		}
		else {
			cha_img_key = 'cha_vamp';
		}

		me.cha = me.game.add.sprite(me.lastChaPos.x, me.lastChaPos.y, cha_img_key);

		// add and play animations
		me.cha.animations.add('flap');
		me.cha.animations.play('flap', 8, true);

		me.game.physics.arcade.enable(me.cha);

		// set the sprite's anchor to the center
		me.cha.anchor.setTo(0.5, 0.5);

		me.cha.scale.setTo(1.4, 1.4);

		//Make the player fall by applying gravity 
		me.cha.body.gravity.y = 1200;

        //Make the player collide with the game boundaries
		me.cha.body.collideWorldBounds = false; 
		me.cha.checkWorldBounds = true;
        me.cha.events.onOutOfBounds.add(me.deathHandler, this);

		//Make the player bounce a little 
		me.cha.body.bounce.y = 0.15;
		me.cha.body.bounce.x = 0.15;

		if (me.jump)
			me.jump();
	},

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
HUD - score
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	createScoreHUD: function(){
		var me = this;

		if (me.scoreText)
			me.scoreText.destroy();

		// setup score bar
   	 	me.scoreText = me.game.add.bitmapText(me.game.width * 0.5, me.game.height * 0.125, 'flappyfont', me.score.toString() + 'm', 32 * window.devicePixelRatio);
    	me.scoreText.anchor.setTo(0.5, 0.5);
    	me.scoreText.visible = true;
	},

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
HUD - debug
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	createDebugHUD: function(){
		var me = this;

		// setup score bar
   	 	me.debugText = me.game.add.bitmapText(me.game.width * 0.9, me.game.height * 0.05, 'flappyfont', me.currentMapXPos.toString() + 'px', 24 * window.devicePixelRatio);
    	me.debugText.anchor.setTo(0.5, 0.5);
    	me.debugText.visible = true;
	},


/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Control - player
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	setupPlayerControl: function(){
		var me = this;

		me.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

		var jumpKey = me.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		jumpKey.onDown.add(me.jump, me);

		me.input.onDown.add(me.jump, me);
	},

	jump: function(){
		var me = this;

		// if its not flappy mode and not on ground, no jump available!
		//if (me.mode !== 0 && !me.chaOnGround)
		//	return;

		if (me.mode === 0)
			me.cha.body.velocity.y = -360;
		else
			me.cha.body.velocity.y = -620;

		me.game.add.tween(me.cha).to({angle: -40}, 100).start();

		if (BasicGame.sound)
			me.flapSound.play();
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

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
score
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	getScore: function(){
		var me = this;

		me.score += 1;
		me.scoreText.setText(me.score.toString() + 'm');
	},

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
GAME STATE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

	shutdown:function(){
		var me = this;

		me.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
		if (me.cha)
  			me.cha.destroy();
  		if (me.ground)
  			me.ground.destroy();
  		if (me.bg)
  			me.bg.destroy();
  		if (me.blocks)
  			me.blocks.destroy();
	},

	gameOver: function(){
		var me = this;

		me.game.state.start('GameOver');
	},

};
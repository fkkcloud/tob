BasicGame.Main = function(game){

};

BasicGame.Main.prototype = {

	create: function() {

		var me = this;

		// score variable
		me.BATMODE = 0;
		me.VAMPMODE = 1;
		me.score = 0;

		me.bloodCount = 0;

		me.initBorn = true;

		/* is player on ground */
		me.chaOnGround = false;

		me.chaDead = false;

		me.mapSpeed = 280 * window.devicePixelRatio;
		me.mapVelX = -1 * me.mapSpeed;

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
   	 	//me.scoreCounter = me.game.time.events.loop(Phaser.Timer.SECOND * 1.0, me.getScore, me);

		// start with vamp mode
		me.createStage();
		me.runVampMode();

		/* character position between map modes */
		me.initX = me.game.width * 0.2;
		me.initY = me.game.height * 0.3;

		me.lastChaPos = {};
		me.lastChaPos.x = me.game.width * 0.2;
		me.lastChaPos.y = me.game.height * 0.5;

		me.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){ 
			me.createPlayer();
	 		me.setupPlayerControl(); // set up player key input binds
		}, me);
		

   	 	// debug
		//me.createDebugHUD();

		me.createMapTitle();

		// pre stage
		me.createPreStage();

		// create UI
		me.createUI();

	},

	update: function() {
		var me = this;

		// update current map x pos
		me.currentMapXPos = me.xTester.position.x;

		// draw map - blocks, bloods and so on..
		if (me.isColumnNeedUpdate()){
			me.generateMapColumn();
		}

		// cha angle default
		if(me.cha && me.cha.angle < me.defaultAngle) {
		    me.cha.angle += 2.5;
		}

		if (me.cha){
			me.lastChaPos.x = me.cha.x;
			me.lastChaPos.y = me.cha.y - me.cha.y * 0.125;
		}

		// loop through blocks
		me.collisionDetected = false;
		for (var i = 0; i < me.blocks.children.length; i++){
			
			var block = me.blocks.children[i];
			me.game.physics.arcade.collide(me.cha, block, null, null, me);

			if (block.body.touching.up){
				me.collisionDetected = true;
			}
			if (block.body.touching.left && !me.chaDead){ // this is the death trigger
				me.deathHandler();
			}
		}
		me.chaOnGround = me.collisionDetected;

		if (!me.chaOnGround){
			// deactivate run FX
			if (me.groundFX){
				me.game.time.events.remove(me.groundFX);
				me.groundFX = undefined;
			}
		}
		else {
			// activate run FX
			if (!me.groundFX){
				me.playFXPlayerRun();
				me.groundFX = me.game.time.events.loop(Phaser.Timer.SECOND * 0.4, me.playFXPlayerRun, me);
			}
		}

		// loop through bloods
		for (var i = 0; i < me.bloods.children.length; i++){
			var block = me.bloods.children[i];
			me.game.physics.arcade.overlap(me.cha, block, function(cha, blood){

				me.playFXEatBlood(blood.x, blood.y);
				blood.destroy();
				me.bloodCount += 1;

				/*
				if (me.bloodCount === 1)
					this.bloodfill1.animations.play('fill1', 16, false, false);
				else if (me.bloodCount === 2)
					this.bloodfill2.animations.play('fill2', 16, false, false);
				else if (me.bloodCount === 3)
					this.bloodfill3.animations.play('fill3', 16, false, false);
				else if (me.bloodCount === 4)
					this.bloodfill4.animations.play('fill4', 16, false, false);
				else if (me.bloodCount === 5)
					this.bloodfill5.animations.play('fill5', 16, false, false);
				*/

				if (me.mode !== me.BATMODE && me.bloodCount > 4){

					// give it a little delay before transformation
					me.game.time.events.add(Phaser.Timer.SECOND * 0.125, function(){ 
						me.runBatMode();
						me.createPlayer();
						me.playFXTransform();
					}, me);
					

				}
			}, null, me);	
			
		}

		me.updateBG();

		// debug text
		//me.debugText.setText(me.bloodCount)// (me.currentColumnId);
	},

	createMapTitle: function(){
		var me = this;

		var fontSize = 32 * window.devicePixelRatio;

		var headingFont = fontSize + "px Arial";
		
		me.mapTitle = me.game.add.text(me.game.world.centerX,
			me.game.world.height * 0.3, 
			window.localStorage.mapName, 
			{	font: headingFont, 
				fill: "#fff", 
				align: 'right',
			});
		me.mapTitle.anchor.setTo(0.5, 0.5);

		me.game.time.events.add(Phaser.Timer.SECOND * 2, function(){ 
			//Send score to game over screen 
			me.mapTitle.destroy();
		}, me);



	},

	createPreStage: function(){
		var me = this;

		var preUnitCount = BasicGame.preStageUnits;
		for (var i = 0; i < preUnitCount; i++){
			me.generateSingleBlock(me.game.width + 4 * window.devicePixelRatio - i * BasicGame.blockSize, me.game.height - BasicGame.blockSize, 'open_up', 1)
		}
	},
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
blocks - memory
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	createBlocks: function(){
		this.blocks = game.add.group();
		this.bloods = game.add.group();
	},

	destroyBlocks: function(){
		if (this.blocks && this.blocks.length > 0)
			this.blocks.destroy();
		if (this.bloods && this.bloods.length > 0)
			this.bloods.destroy();
	},

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
blocks - event handlers
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

	deathHandler: function(){
		var me = this;

		me.chaDead = true;

		// make it stuck to the sticks
		me.cha.body.gravity.y = 0;
		me.cha.body.velocity.y = 0;

		if (BasicGame.sound)
			me.hitSound.play();

		me.playFXPlayerDeath();

		me.cha.animations.stop('flap');

		me.game.time.events.add(Phaser.Timer.SECOND * 0.25, function(){ 
			//Send score to game over screen 
			me.cha.destroy();
		}, me);

		//me.cha.body.velocity.x = -100 * window.devicePixelRatio;
		//me.cha.body.velocity.y = -200 * window.devicePixelRatio;
		me.game.add.tween(me.cha).to({angle: -10}, 60).start();

		//Wait a couple of seconds and then trigger the game over screen
		me.game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){ 
			//Send score to game over screen 
			me.game.state.start('GameOver', true, false, me.score.toString());
		}, me);

	},

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
blocks - generations
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
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

	generateSingleBlock: function(x, y, imgStr, imgId){
		var me = this;

		var block;

		// Get the first dead pipe of our group
		if (imgId === 1)
	    	block = me.blocks.getFirstDead();
	    else if (imgId === 3)
	    	block = me.bloods.getFirstDead();
	    

	    if (!block){
	    	//console.log('allocating new block, total allocated:', me.blocks.length); // debug memory

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
	    	block.loadTexture(imgStr);
	    	block.reset(x, y);	
	    }

	    me.game.physics.arcade.enable(block);

	    // Add velocity to the pipe to make it move left
	    block.body.velocity.x = me.mapVelX;

	    block.body.friction.x = 0;


	    // Kill the pipe when it's no longer visible 
	    block.checkWorldBounds = true;
	    block.outOfBoundsKill = true;
	    

	    block.body.immovable = true;

	    block.scale.setTo(BasicGame.blockSpriteScale, BasicGame.blockSpriteScale);

	    if (imgId === 1){
	    	block.body.checkCollision.down = false;
			block.body.checkCollision.right = false;
	    	me.blocks.add(block);
	    }
	    else if (imgId === 3){
	    	me.bloods.add(block);
	    }

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
			} else if (imgId === 1){
				imgStr = me.getBlockImage(me.currentColumnId, i);
			}
			else if (imgId === 3){
				imgStr = 'blood';
			}

			me.generateSingleBlock(x, y, imgStr, imgId);
		}
	},

	getBlockImage: function(column_id, row_id){

		var up ;
		if (BasicGame.mapData[column_id][row_id-1] == undefined){
			up = 1;
		}
		else{
			up = (BasicGame.mapData[column_id][row_id-1] === 1);
		}

		var down;
		if (BasicGame.mapData[column_id][row_id+1] == undefined){
			down = 1;
		}
		else{
			down = (BasicGame.mapData[column_id][row_id+1] === 1);
		}

		var left;
		if (BasicGame.mapData[column_id-1] == undefined){
			left = 1;
		}
		else{
			left = (BasicGame.mapData[column_id-1][row_id] === 1);
		}

		var right;
		if (BasicGame.mapData[column_id+1] == undefined){
			right = 0;
		}
		else{
			right = (BasicGame.mapData[column_id+1][row_id] === 1);
		}

		//console.log(up, down, left, right);
		//return 'open_none';

		// all open
		if (up && down && left && right){
			return 'open_none';
		}

		// 3 open
		else if (up && !down && left && right){
			return 'open_down';
		}
		else if (up && down && !left && right){
			return 'open_left';
		}
		else if (up && down && left && !right){
			return 'open_right';
		}
		else if (!up && down && left && right){
			return 'open_up'; /*없음*/
		}

		// 2 open
		else if (!up && !down && left && right){
			return 'open_up_down'; /*없음*/
		}
		else if (up && down && !left && !right){
			return 'open_left_right'; /*없음*/
		}
		else if (!up && down && left && !right){
			return 'open_up_right';
		}
		else if (up && !down && !left && right){
			return 'open_down_left';
		}
		else if (!up && down && !left && right){
			return 'open_up_left';
		}

		// 1 open
		else if (up && !down && !left && !right){
			return 'open_down_left_right';
		}
		else if (!up && down && !left && !right){
			return 'open_up_left_right';
		}
		else if (!up && !down && left && !right){
			return 'open_up_down_right';
		}
		else if (!up && !down && !left && right){
			return 'open_up_down_left';
		}

		// all closed
		else if (!up && !down && !left && !right){
			return 'open_all'
		}
	},		

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Mode
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	runBatMode: function(){
		console.log('/////// RUN Bat MODE ///////');
		var me = this;

		me.mode = me.BATMODE;
		me.defaultAngle = 25;
	},

	runVampMode: function(){
		console.log('/////// RUN Vamp MODE ///////');
		var me = this;

		me.mode = me.VAMPMODE;
		me.defaultAngle = 0;
	},

	createStage: function(){
		var me = this;

		me.createBG();

		//me.createPlayer();

		//me.createScoreHUD();

		me.createBlocks();
	},
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BG
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	createBG: function(){
		var me = this;

		if (me.bg_sky)
			me.bg_sky.destroy();

		if (me.bg_castle)
			me.bg_castle.destroy();

		me.bg_sky = game.add.tileSprite(0, 0, me.game.width, me.game.height, "bg_sky");

		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var castle_height = this.game.height - bg_castle_img_cache.height;
		me.bg_castle = game.add.tileSprite(0, castle_height, me.game.width, me.game.height, "bg_castle");
	},

	updateBG: function(){
		this.bg_sky.tilePosition.x -= 0.3;

		this.bg_castle.tilePosition.x -= 0.5;
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
		if (me.mode === me.VAMPMODE)
			cha_img_key = 'cha_vamp';
		else if (me.mode === me.BATMODE)
			cha_img_key = 'cha_bat';

		if (me.initBorn)
			me.cha = me.game.add.sprite(me.initX, me.initY, cha_img_key);
		else
			me.cha = me.game.add.sprite(me.lastChaPos.x, me.lastChaPos.y, cha_img_key);

		// add and play animations
		me.cha.animations.add('flap');
		me.cha.animations.play('flap', 8, true);

		me.game.physics.arcade.enable(me.cha);

		if (me.mode === me.VAMPMODE){
			me.cha.body.width = me.cha.body.sourceWidth * 0.6;
			me.cha.body.height = me.cha.body.sourceHeight * 0.95;
		}
		else if (me.mode === me.BATMODE){
			me.cha.body.width = me.cha.body.sourceWidth * 0.6;
			me.cha.body.height = me.cha.body.sourceHeight * 0.6;
		}

		// set the sprite's anchor to the center
		me.cha.anchor.setTo(0.5, 0.5);

		//me.cha.scale.setTo(1.0, 1.0);

		//Make the player fall by applying gravity 
		me.cha.body.gravity.y = 1200 * window.devicePixelRatio;

        //Make the player collide with the game boundaries
		me.cha.body.collideWorldBounds = false; 
		me.cha.checkWorldBounds = true;
        me.cha.events.onOutOfBounds.add(me.deathHandler, this);

		if (me.initBorn){

			console.log("image");
			
			var vamp_img_cache = game.cache.getImage("cha_vamp");
			me.createFXPlayerSpawn(me.initX - vamp_img_cache.width * 0.65, BasicGame.blockSize * -1);
			me.playFXPlayerSpawn();

			me.cha.body.velocity.y = + 1500 * window.devicePixelRatio;

			me.cha.body.bounce.y = 0.2;

			me.game.time.events.add(Phaser.Timer.SECOND, function(){ 
				me.cha.body.bounce.y = 0.0;
			}, me);
		}

		me.initBorn = false;

		// when it becomes bat, do a little fly
		if (me.mode === me.BATMODE){
			me.cha.body.velocity.y = -140 * window.devicePixelRatio;
			me.game.add.tween(me.cha).to({angle: -40}, 100).start();
		}
	},

	playFXPlayerDeath(){
		var me = this;
		var anim = me.game.add.sprite(me.cha.x - me.cha.width * 0.78, me.cha.y - me.cha.height * 0.5, 'fx_death');
		anim.scale.setTo(1.32, 1.32);
		anim.animations.add('death');
		anim.animations.play('death', 16, false, true);
		me.game.physics.arcade.enable(anim);
		anim.body.velocity.x = me.mapVelX;
	},

	createFXPlayerSpawn(x, y){
		var me = this;
		me.spawnFX = me.game.add.sprite(x, y, 'fx_spawn');
		var scale = me.game.height / me.spawnFX.height;
		me.spawnFX .scale.setTo(scale, scale);
		me.spawnFX .animations.add('spawn');
	},

	playFXPlayerSpawn(){
		this.spawnFX .animations.play('spawn', 18, false, true);
	},

	playFXEatBlood(x, y){
		var me = this;
		var anim = me.game.add.sprite(x, y, 'blood_eat');
		anim.animations.add('eatBlood');
		anim.animations.play('eatBlood', 12, false, true);
		anim.scale.setTo(1.3, 1.3);
		me.game.physics.arcade.enable(anim);
		anim.body.velocity.x = me.mapVelX;
	},

	playFXTransform(){
		var me = this;
		var anim = me.game.add.sprite(me.cha.x - me.cha.width * 0.6, me.cha.y - me.cha.height * 0.65, 'transform');
		anim.animations.add('transformation');
		anim.animations.play('transformation', 12, false, true);
		me.game.physics.arcade.enable(anim);
		anim.body.velocity.x = me.mapVelX * 0.186;
	},

	playFXPlayerRun(){
		var me = this;
		var anim = me.game.add.sprite(me.cha.x - me.cha.width, me.cha.y, 'fx_run');
		anim.scale.setTo(1.5, 1.5);
		anim.animations.add('runSmoke');
		anim.animations.play('runSmoke', 10, false, true);
		me.game.physics.arcade.enable(anim);
		anim.body.velocity.x = me.mapVelX * 0.386;
	},

	playFXPlayerFly(){
		var me = this;
		var anim = me.game.add.sprite(me.cha.x - me.cha.width * 0.5, me.cha.y - me.cha.height * 0.2, 'fx_run');
		anim.scale.setTo(1.25, 1.25);
		anim.animations.add('runSmoke');
		anim.animations.play('runSmoke', 10, false, true);
		anim.angle = -45;
		me.game.physics.arcade.enable(anim);
		anim.body.velocity.x = me.mapVelX * 0.286;
	},

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
HUD - score
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	createUI: function(){
		

		var bloodFillHeight = this.game.height * 0.064;
		var bloodFillWidthDelta = 0.059;

		this.bloodfill1 = this.game.add.sprite(this.game.width * 0.62, bloodFillHeight, 'blood_fill');
		this.bloodfill1.animations.add('fill1');

		this.bloodfill2 = this.game.add.sprite(this.game.width * (0.62 + bloodFillWidthDelta), bloodFillHeight, 'blood_fill');
		this.bloodfill2.animations.add('fill2');

		this.bloodfill3 = this.game.add.sprite(this.game.width * (0.62 + bloodFillWidthDelta * 2), bloodFillHeight, 'blood_fill');
		this.bloodfill3.animations.add('fill3');

		this.bloodfill4 = this.game.add.sprite(this.game.width * (0.62 + bloodFillWidthDelta * 3), bloodFillHeight, 'blood_fill');
		this.bloodfill4.animations.add('fill4');

		this.bloodfill5 = this.game.add.sprite(this.game.width * (0.62 + bloodFillWidthDelta * 4), bloodFillHeight, 'blood_fill');
		this.bloodfill5.animations.add('fill5');

		var anim = this.game.add.sprite(this.game.width * 0.54, this.game.height * 0.025, 'ui_bloodbar');
	},

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

		if (me.mode === me.VAMPMODE && !me.chaOnGround)
			return;

		me.cha.body.velocity.y = -400 * window.devicePixelRatio;

		me.game.add.tween(me.cha).to({angle: -30}, 100).start();

		if (me.mode === me.BATMODE)
			me.playFXPlayerFly();

		if (BasicGame.sound)
			me.flapSound.play();
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

  		me.lastChaPos = {};
	},

	gameOver: function(){
		var me = this;

		me.shutdown();
		me.game.state.start('GameOver');
	},

};
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

		me.chaJumped = false;

		me.jumpPressed = false;

		me.chaJumpReady = false;

		me.globalGravity = 1400 * window.devicePixelRatio;

		me.mapSpeed = 240 * window.devicePixelRatio;
		me.mapVelX = -1 * me.mapSpeed * BasicGame.mapSpeed.value;

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

		// loading blood bar
		me.loadingBar = me.game.add.sprite(me.game.width * 0.5, me.game.height * 0.2, 'loadingBar');
		var loadingBar_imgCache = game.cache.getImage("loadingBar");
		me.loadingBar.x -= loadingBar_imgCache.width * 0.5;
		me.loadingBar.anchor.setTo(0.0, 0.5);
		me.loadingBar.scale.x = 0.0;
	},

	update: function() {
		var me = this;

		if (me.chaDead)
			return;

		// update current map x pos
		me.currentMapXPos = me.xTester.position.x;

		// draw map - blocks, bloods and so on..
		if (me.isColumnNeedUpdate()){
			me.generateMapColumn();
		}

		// cha angle default ------------------------------------------------------------------------------------------------------------------------------------------------
		if(me.cha && me.cha.angle < me.defaultAngle) {
		    me.cha.angle += 2.5;
		}

		if (me.cha){
			me.lastChaPos.x = me.cha.x;
			me.lastChaPos.y = me.cha.y - me.cha.y * 0.125;
		}

		me.updateBlocksEvent();

		me.updateEndPointsEvent();		

		me.updateTrapsEvent();		

		me.updateBloodsEvent();

		// ------------------------------------------------------------------------------------------------------------------------------------------------
		me.updateBG();

		// long jump!!! ------------------------------------------------------------------------------------------------------------------------------------------------
		if (me.chaJumped && me.jumpPressed){
			if (me.cha && me.cha.body){
				me.cha.body.gravity.y = me.globalGravity - (500 * window.devicePixelRatio);
			}
		}
		else {
			if (me.cha && me.cha.body){
				me.cha.body.gravity.y = me.globalGravity;
			}
			me.chaJumped = false;
		}

		// bat check!! ----------------
		if (me.mode == me.BATMODE && this.game.time.totalElapsedSeconds() * 1000 > me.batTimeDue){
			me.bloodCount = 0; // reset blood collection for bat transformation (e.g. when it come back from bat to vamp)
			me.runVampMode();
			me.createPlayer();
			me.playFXTransform();
		}
		
		// debug text
		//me.debugText.setText(me.bloodCount)// (me.currentColumnId);
	},

	updateBlocksEvent: function(){
		var me = this;
		me.collisionDetected = false;
		for (var i = 0; i < me.blocks.children.length; i++){
			
			var block = me.blocks.children[i];

			// overlap event - me.chaJumpReady
			block.scale.setTo(1.45, 1.45);
			block.anchor.setTo(0.0, 0.0);
			me.game.physics.arcade.overlap(me.cha, block, function(){
				me.chaJumpReady = true;
			}, null, me);
			// end of overlap event for me.charJumpReady
			block.scale.setTo(1.25, 1.25); // to its original size
			block.anchor.setTo(0.0, 0.0);

			// regular collision
			me.game.physics.arcade.collide(me.cha, block, null, null, me);

			// touching up collision detected
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
	},

	updateTrapsEvent: function(){
		var me = this;
		for (var i = 0; i < me.traps.children.length; i++){
			
			var trap = me.traps.children[i];
			me.game.physics.arcade.collide(me.cha, trap, function(){
				if (!me.chaDead)
					me.deathHandler();
			}, null, me);
		}
	},

	updateBloodsEvent: function(){
		var me = this;
		for (var i = 0; i < me.bloods.children.length; i++){

			var block = me.bloods.children[i];
			me.game.physics.arcade.overlap(me.cha, block, function(cha, blood){

				me.playFXEatBlood(blood.x, blood.y);
				blood.destroy();
				me.bloodCount += 1;

				
				if (me.mode == me.VAMPMODE){
					if (me.bloodCount === 1){
						me.game.add.tween(me.loadingBar.scale).to({x: 0.2}, 200).start();
					}
					else if (me.bloodCount === 2){
						me.game.add.tween(me.loadingBar.scale).to({x: 0.4}, 200).start();
					}
					else if (me.bloodCount === 3){
						me.game.add.tween(me.loadingBar.scale).to({x: 0.6}, 200).start();
					}
					else if (me.bloodCount === 4){
						me.game.add.tween(me.loadingBar.scale).to({x: 0.8}, 200).start();
					}
					else if (me.bloodCount === 5){
						me.game.add.tween(me.loadingBar.scale).to({x: 1.0}, 120).start();
					}
				}
				
				if (me.mode == me.BATMODE){
					console.log('bar life incresase!');

					// increase actual bat time due
					me.batTimeDue += 1000;

					// get new scale for x of blood bar
					var newScale = me.loadingBar.scale.x + 0.25;

					// get new time for decrease of blood bar
					var newBatTimeDue = (me.batTimeDue - this.game.time.totalElapsedSeconds() * 1000);

					me.game.add.tween(me.loadingBar.scale).to({x: newScale}, 80).start();

					me.game.time.events.add(80, function(){ 
						me.game.add.tween(me.loadingBar.scale).to({x: 0.0},  newBatTimeDue).start();
					}, me);
					
				}

				if (me.mode !== me.BATMODE && me.bloodCount > 4){

					// give it a little delay before transformation
					var barFinishTime = Phaser.Timer.SECOND * 0.125;

					me.game.time.events.add(barFinishTime, function(){ 
						me.runBatMode();
						me.createPlayer();
						me.playFXTransform();
					}, me);
				}
			}, null, me);	
			
		}
	},

	updateEndPointsEvent: function(){
		var me = this;
		for (var i = 0; i < me.endPoints.children.length; i++){

			var endPoint = me.endPoints.children[i];
			me.game.physics.arcade.overlap(me.cha, endPoint, function(){
				me.game.time.events.add(Phaser.Timer.SECOND * 0.1, function(){ 
					//Send score to game over screen 
					me.game.state.start('GameOver', true, false, me.score.toString());
				}, me);
			})
		}
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
		this.traps = game.add.group();
		this.endPoints = game.add.group();
	},

	destroyBlocks: function(){
		if (this.blocks && this.blocks.length > 0)
			this.blocks.destroy();
		if (this.bloods && this.bloods.length > 0)
			this.bloods.destroy();
		if (this.traps && this.traps.length > 0)
			this.traps.destroy();
		if (this.endPoints && this.endPoints.length > 0)
			this.endPoints.destroy();
	},

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
blocks - event handlers
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

	deathHandler: function(){
		var me = this;

		me.chaDead = true;

		me.game.time.events.remove(me.groundFX);

		// make it stuck to the sticks
		me.cha.body.velocity.x = 30 * window.devicePixelRatio;
		me.cha.body.velocity.y = 0;
		me.cha.body.gravity.y = 0;

		if (BasicGame.sound)
			me.hitSound.play();

		me.playFXPlayerDeath();

		me.cha.animations.stop('flap');

		//me.cha.body.velocity.x = -100 * window.devicePixelRatio;
		//me.cha.body.velocity.y = -200 * window.devicePixelRatio;
		me.game.add.tween(me.cha).to({angle: -10}, 40).start();

		me.game.time.events.add(100, function(){ 
			me.cha.destroy();
		}, me);
		

		// stop the map
		me.mapSpeed = 0;
		me.mapVelX = 0;
		for (var i = 0; i < me.blocks.children.length; i++)
			me.blocks.children[i].body.velocity.x = 0;
		for (var i = 0; i < me.traps.children.length; i++)
			me.traps.children[i].body.velocity.x = 0;
		for (var i = 0; i < me.bloods.children.length; i++)
			me.bloods.children[i].body.velocity.x = 0;
		for (var i = 0; i < me.endPoints.children.length; i++)
			me.endPoints.children[i].body.velocity.x = 0;

		//Wait a couple of seconds and then trigger the game over screen
		me.game.time.events.add(Phaser.Timer.SECOND * 0.8, function(){ 
			//Send score to game over screen 
			me.gameoverScreen();
			//me.game.state.start('GameOver', true, false, me.score.toString());
		}, me);

	},

	gameoverScreen : function(){
		var me = this;

		// create a new bitmap data object
	    var bmd = game.add.bitmapData(me.game.width, me.game.height);

	    // draw to the canvas context like normal
	    bmd.ctx.beginPath();
	    bmd.ctx.rect(0,0,me.game.width,me.game.height);
	    bmd.ctx.fillStyle = '#000000';
	    bmd.ctx.fill();

	    // use the bitmap data as the texture for the sprite
	    var sprite = game.add.sprite(0, 0, bmd);
	    sprite.alpha = 0.8;

	    var gameoverTitle = me.game.add.sprite(me.game.world.width * 0.5, me.game.height * 0.36, "title_gameOver");
  		gameoverTitle.anchor.setTo(0.5, 0.5);

  		var restartButton = me.game.add.button(me.game.world.width * 0.4,
  			me.game.world.height * 0.68, "btn_replay", me.restartGame, me);
  		restartButton.anchor.setTo(0.5, 0.5);
  		restartButton.onInputDown.add(me.onDown, this);
		restartButton.onInputUp.add(me.onUp, this);

  		var menuButton = me.game.add.button(me.game.world.width * 0.6,
  			me.game.world.height * 0.68, "btn_menu", me.gotoMenu, me);
  		menuButton.anchor.setTo(0.5, 0.5);
  		menuButton.onInputDown.add(me.onDown, this);
		menuButton.onInputUp.add(me.onUp, this);

	},

	onDown: function(but){
		but.scale.setTo(1.1, 1.1);
	},

	onUp: function(but){
		but.scale.setTo(1.0, 1.0);
	},

	gotoMenu: function(){
		this.game.state.start("GameTitle")
	},

	restartGame: function(){
		this.game.state.start("Main");
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
	    else if (imgId === 2)
	    	block = me.traps.getFirstDead();
	    else if (imgId === 3)
	    	block = me.bloods.getFirstDead();
	    else if (imgId === 4)
	    	block = me.endPoints.getFirstDead();
	    

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

	    if (imgId === 1){ //  block
			block.body.checkCollision.right = false;
	    	me.blocks.add(block);
	    }
	    else if (imgId === 2){ // trap
	    	block.width *= 1.25;
	    	block.height *= 1.25;
	    	block.body.width = block.width * 0.4;
			block.body.height = block.height * 0.4;
			block.anchor.setTo(0.5, 0.5);
			me.game.add.tween(block).to({angle: 360}, 1000, null, true, 0, 0, false).loop(true).start();
	    	me.traps.add(block);
	    }
	    else if (imgId === 3){ // blood
	    	block.body.width = block.body.sourceWidth * 0.64;
			block.body.height = block.body.sourceHeight * 0.9;
	    	me.bloods.add(block);
	    }
	    else if (imgId === 4){ // end point
	    	me.endPoints.add(block);
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
			else if (imgId === 2){
				imgStr = 'trap';
			}
			else if (imgId === 3){
				imgStr = 'blood';
			}
			else if (imgId === 4){
				imgStr = 'endpoint';
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
		var me = this;

		me.mode = me.BATMODE;
		me.defaultAngle = 25;
		
		me.batTimeDue = this.game.time.totalElapsedSeconds() * 1000 + 4000;
		me.game.add.tween(me.loadingBar.scale).to({x: 0.0}, 4000).start();
	},

	runVampMode: function(){
		var me = this;

		me.mode = me.VAMPMODE;
		me.defaultAngle = 0;

		me.batTimeDue = 0;
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
		me.cha.body.gravity.y = me.globalGravity;

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
		var anim = me.game.add.sprite(me.cha.x - me.cha.width, me.cha.y - me.cha.height * 0.8, 'fx_death');
		anim.scale.setTo(1.32, 1.32);
		anim.animations.add('death');
		anim.animations.play('death', 16, false, true);
		//me.game.physics.arcade.enable(anim);
		//anim.body.velocity.x = me.mapVelX;
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
		var anim = me.game.add.sprite(me.cha.x - me.cha.width * 0.5, me.cha.y - me.cha.height * 0.7, 'transform');
		anim.animations.add('transformation');
		anim.animations.play('transformation', 12, false, true);
		anim.scale.setTo(1.6, 1.6);
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
		jumpKey.onUp.add(me.endJump, me);

		me.input.onDown.add(me.jump, me);
		me.input.onUp.add(me.endJump, me);

		console.log(me.input);
	},

	endJump: function(){
		var me = this;

		me.jumpPressed = false;
		// potential jump finish animation
	},

	jump: function(){
		var me = this;

		me.jumpPressed = true;
		// potential jump start animation

		if (me.mode === me.VAMPMODE && ( /*!me.chaOnGround &&*/!me.chaJumpReady) )
			return;

		if (!me.cha || !me.cha.body)
			return;

		me.cha.body.velocity.y = -400 * window.devicePixelRatio * BasicGame.jumpScale.value;

		me.game.add.tween(me.cha).to({angle: -30}, 100).start();


		if (me.mode === me.BATMODE)
			me.playFXPlayerFly();

		if (BasicGame.sound)
			me.flapSound.play();

		me.chaJumped = true;
		me.chaJumpReady = false;
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
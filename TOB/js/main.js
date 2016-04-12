BasicGame.Main = function(game){

};

BasicGame.Main.prototype = {

	render: function() {
		return;

		//debug
		var me = this;
		for (var i = 0; i < me.traps.children.length; i++){
			
			var trap = me.traps.children[i];
			game.debug.body(trap);
		}

		if (me.cha)
			game.debug.body(me.cha);
	},

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
		me.clickSound = me.game.add.audio('button');
		me.dieSound = me.game.add.audio('die');
		me.jumpSound = me.game.add.audio('vampjump');
		me.flySound = me.game.add.audio('fly');
		me.transformSound = me.game.add.audio('transform');
		me.stageclearSound = me.game.add.audio('stageclear');
		me.spawnSound = me.game.add.audio('spawn');
		me.bubbleSound = me.game.add.audio('bubble');

		me.gameplaySound = me.game.add.audio('gameplay');
		me.gameplaySound.loopFull();

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
		if (BasicGame.storymode == false)
   	 		me.scoreCounter = me.game.time.events.loop(Phaser.Timer.SECOND * 0.2, me.getScore, me);


		// start with vamp mode if not aimode
		me.createStage();
		if (BasicGame.aimode)
			me.runBatMode();
		else
			me.runVampMode();

		/* character position between map modes */
		me.initX = me.game.width * 0.2;
		me.initY = me.game.height * 0.3;

		me.lastChaPos = {};
		me.lastChaPos.x = me.game.width * 0.2;
		me.lastChaPos.y = me.game.height * 0.5;

		me.game.time.events.add(Phaser.Timer.SECOND * 0.7, function(){ 
			me.createPlayer();
	 		me.setupPlayerControl(); // set up player key input binds
		}, me);
		

   	 	// debug
		//me.createDebugHUD();

		me.createMapTitle();

		// pre stage
		me.createPreStage();


		if (BasicGame.aimode){
			var alphago = me.game.add.sprite(me.game.world.width * 0.9, me.game.world.height * 0.86, "alphago");
			alphago.scale.setTo(0.9, 0.9);
			alphago.anchor.setTo(0.5, 0.5);
			// add and play animations
			alphago.animations.add('think');
			alphago.animations.play('think', 4, true);

			game.time.events.loop(Phaser.Timer.SECOND * 0.6, me.appendMap, this);
		}
		else
		{
			// setup for blood bar
			me.bloodIndicator = game.add.group();
			me.bloodFlash = me.bloodIndicator.create(0, 0, 'blood_highlight');
			me.bloodFlash.alpha = 0;
			var leftMarginBloodGuage = 0;
			if(window.devicePixelRatio >= 3)
				leftMarginBloodGuage = 30;
			else if(window.devicePixelRatio >=2)
				leftMarginBloodGuage = 26.5;
			else
				leftMarginBloodGuage = 14;
			me.loadingBar = me.bloodIndicator.create(leftMarginBloodGuage, 0, 'blood_guage');
			me.bloodBar   = me.bloodIndicator.create(0, 0, 'blood_bar');		
			me.loadingBar.scale.x = 0.0;
			me.bloodIndicator.position.setTo(me.game.width * 0.5, me.game.height * 0.03);
			me.bloodIndicator.scale.setTo(1.4, 1.4);
			var loadingBar_imgCache = game.cache.getImage("blood_bar");
			me.bloodIndicator.x -= (loadingBar_imgCache.width * 0.5) * 1.4;
		}

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

		// bat check!! only if its not aimode - for now, aimode only do bat!----------------
		if (!BasicGame.aimode && me.mode == me.BATMODE && this.game.time.totalElapsedSeconds() * 1000 > me.batTimeDue){
			me.bloodCount = 0; // reset blood collection for bat transformation (e.g. when it come back from bat to vamp)
			me.bloodFlash.alpha = 0;
			me.runVampMode();
			me.createPlayer();
			me.playFXTransform();
		}
		// debug text
		//me.debugText.setText(me.bloodCount)// (me.currentColumnId);
	},

	// for ai ma creatation
	appendMap: function() {
		//console.log(BasicGame.mapData);
		var size = 4;
		var newMapPart = BasicGame.AI_createMap(size);
		BasicGame.mapData = BasicGame.mapData.concat(newMapPart);
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
			block.scale.setTo(1.1, 1.1); // to its original size
			block.anchor.setTo(0.0, 0.0);

			// regular collision
			me.game.physics.arcade.collide(me.cha, block, null, null, me);

			// touching up collision detected
			if (block.body.touching.up){
				me.collisionDetected = true;
			}
			else
			{
				//me.collisionDetected = false;
			}

			if (block.body.touching.left && !me.chaDead){ // this is the death trigger
				me.deathHandler();
			}
		}
		me.chaOnGround = me.collisionDetected;
		
		//if (!me.chaOnGround && !block.body.touching.up)
		//	me.chaJumpReady = false;

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

		for (var i = 0; i < me.movingTraps.children.length; i++){
			
			var trap = me.movingTraps.children[i];
			me.game.physics.arcade.collide(me.cha, trap, function(){
				if (!me.chaDead)
					me.deathHandler();
			}, null, me);
		}

		for (var i = 0; i < me.movingTraps2.children.length; i++){
			
			var trap = me.movingTraps2.children[i];
			me.game.physics.arcade.collide(me.cha, trap, function(){
				if (!me.chaDead)
					me.deathHandler();
			}, null, me);
		}
	},

	updateBloodsEvent: function(){
		var me = this;

		if (BasicGame.aimode)
			return;

		for (var i = 0; i < me.bloods.children.length; i++){

			var block = me.bloods.children[i];
			me.game.physics.arcade.overlap(me.cha, block, function(cha, blood){

				me.bubbleSound.play();

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
					me.gameendScreen();
					//me.game.state.start('GameOver', true, false, me.score.toString());
				}, me);
			})
		}
	},

	createMapTitle: function(){
		var me = this;

		var fontSize = 32 * window.devicePixelRatio;

		var headingFont = fontSize + "px Impact";
		var subHeadingFont = 18 * window.devicePixelRatio + "px Impact";
		
		me.mapTitle = me.game.add.text(me.game.world.centerX,
			me.game.world.height * 0.3, 
			window.localStorage.mapName, 
			{	font: headingFont, 
				fill: "#fff", 
				align: 'right',
			});
		me.mapTitle.anchor.setTo(0.5, 0.5);

		me.trialCount = me.game.add.text(me.game.world.centerX,
			me.game.world.height * 0.4, 
			'attempt - ' + BasicGame.trialCount, 
			{	font: subHeadingFont, 
				fill: "#d22", 
				align: 'right',
			});
		me.trialCount.anchor.setTo(0.5, 0.5);

		me.game.time.events.add(Phaser.Timer.SECOND * 2.5, function(){ 
			//Send score to game over screen 
			me.trialCount.destroy();
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
		this.movingTraps = game.add.group();
		this.movingTraps2 = game.add.group();
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
		if (this.movingTraps && this.movingTraps.length > 0)
			this.movingTraps.destroy();
		if (this.movingTraps2 && this.movingTraps2.length > 0)
			this.movingTraps2.destroy();
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

		if (BasicGame.storymode == false)
   	 		me.game.time.events.remove(me.scoreCounter);

		// make it stuck to the sticks
		me.cha.body.velocity.x = 30 * window.devicePixelRatio;
		me.cha.body.velocity.y = 0;
		me.cha.body.gravity.y = 0;

		if (BasicGame.sound)
			me.dieSound.play();

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
		for (var i = 0; i < me.movingTraps.children.length; i++)
			me.movingTraps.children[i].body.velocity.x = 0;
		for (var i = 0; i < me.movingTraps2.children.length; i++)
			me.movingTraps2.children[i].body.velocity.x = 0;

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

		if (BasicGame.storymode == false) {
			// show current score
			var scoreText = me.game.add.bitmapText(me.game.width * 0.5, me.game.height * 0.56, 'flappyfont', me.score.toString() + 'm', 24 * window.devicePixelRatio);
	    	scoreText.anchor.setTo(0.5, 0.5);
	    	scoreText.visible = true;

	    	// show highest score
	    	var highestAIScore;
    		if (!window.localStorage.highestAIScore || window.localStorage.highestAIScore == undefined ||
				window.localStorage.highestAIScore == "undefined" || window.localStorage.highestAIScore == null) 
			{
				window.localStorage.highestAIScore = me.score;
				highestAIScore = me.score;
			}
			else
			{
				if (me.score > window.localStorage.highestAIScore){
					highestAIScore = me.score;
					window.localStorage.highestAIScore = me.score;
				}
				else {
					highestAIScore = window.localStorage.highestAIScore;
				}
			}
    		
    		var highScoreText = me.game.add.bitmapText(me.game.width * 0.5, me.game.height * 0.5, 'flappyfont', 'Highest Score:' + highestAIScore.toString() + 'm', 24 * window.devicePixelRatio);
	    	highScoreText.anchor.setTo(0.5, 0.5);
	    	highScoreText.visible = true;
	    }
	},

	gameendScreen : function(){

		var me = this;

		if (me.chaDead)
			return;

		me.chaDead = true;

		me.stageclearSound.play();
		
		me.game.time.events.remove(me.groundFX);

		if (BasicGame.storymode == false)
   	 		me.game.time.events.remove(me.scoreCounter);

		for (var i = 0; i < me.endPoints.children.length; i++)
			me.endPoints.children[i].destroy();

		me.cha.destroy();
		
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
		for (var i = 0; i < me.movingTraps.children.length; i++)
			me.movingTraps.children[i].body.velocity.x = 0;
		for (var i = 0; i < me.movingTraps2.children.length; i++)
			me.movingTraps2.children[i].body.velocity.x = 0;

		if (me.mode == me.VAMPMODE)
			me.playFXTransform();
		me.playPlayerStageEnd();

		// medal managements
		var medalEarned = false;
    	if (BasicGame.storymode && BasicGame.currentStage == 7 && BasicGame.medals[0] == 0){
    		// get bronze medal
    		BasicGame.medals[0] = 1;
    		window.localStorage.medals = JSON.stringify(BasicGame.medals);
    		medalEarned = true;
    	}
    	else if (BasicGame.storymode && BasicGame.currentStage == 15 && BasicGame.medals[1] == 0){
    		// get silver medal
    		BasicGame.medals[1] = 1;
    		window.localStorage.medals = JSON.stringify(BasicGame.medals);
    		medalEarned = true;
    	}
    	else if (BasicGame.storymode && BasicGame.currentStage == 19 && BasicGame.medals[2] == 0){
    		// get gold medal
    		BasicGame.medals[2] = 1;
    		window.localStorage.medals = JSON.stringify(BasicGame.medals);
    		medalEarned = true;
    	}

		// if there is next stage - go!
		if (BasicGame.stageData.length - 1 > BasicGame.currentStage){
			BasicGame.currentStage += 1;
			BasicGame.stageProgress[BasicGame.currentStage] = 1; // progress alarm
			window.localStorage.stageProgress = JSON.stringify(BasicGame.stageProgress); //  save to localStorage
		}

		// create a new bitmap data object
	    var bmd = game.add.bitmapData(me.game.width, me.game.height);

	    // draw to the canvas context like normal
	    bmd.ctx.beginPath();
	    bmd.ctx.rect(0,0,me.game.width,me.game.height);
	    bmd.ctx.fillStyle = '#220000';
	    bmd.ctx.fill();

	    // use the bitmap data as the texture for the sprite
	    var sprite = game.add.sprite(0, 0, bmd);
	    sprite.alpha = 0.5;

	    var clearTitleImgId;
	    if (medalEarned)
	    	clearTitleImgId = "title_stageClear"; //"title_medalEarned";
	    else
	    	clearTitleImgId = "title_stageClear";
	    
	    var gameoverTitle = me.game.add.sprite(me.game.world.width * 0.5, me.game.height * 0.36, clearTitleImgId);
  		gameoverTitle.anchor.setTo(0.5, 0.5);

  		var restartBtnWidthRatio = 0.4; 
  		var menuBtnWidthRatio = 0.6; 

  		if (BasicGame.storymode){
  			var nextStageButton = me.game.add.button(me.game.world.width * 0.5,
  			me.game.world.height * 0.68, "btn_next", me.gotoNextStage, me);
	  		nextStageButton.anchor.setTo(0.5, 0.5);
			nextStageButton.scale.x *= -1; // flip horizontally
	  		nextStageButton.onInputDown.add(me.onDownNeg, this);
			nextStageButton.onInputUp.add(me.onUpNeg, this);

			restartBtnWidthRatio = 0.25;
			menuBtnWidthRatio = 0.75;
  		}

  		var restartButton = me.game.add.button(me.game.world.width * restartBtnWidthRatio,
  			me.game.world.height * 0.68, "btn_replay", me.restartGame, me);
  		restartButton.anchor.setTo(0.5, 0.5);
  		restartButton.onInputDown.add(me.onDown, this);
		restartButton.onInputUp.add(me.onUp, this);

  		var menuButton = me.game.add.button(me.game.world.width * menuBtnWidthRatio,
  			me.game.world.height * 0.68, "btn_menu", me.gotoMenu, me);
  		menuButton.anchor.setTo(0.5, 0.5);
  		menuButton.onInputDown.add(me.onDown, this);
		menuButton.onInputUp.add(me.onUp, this);

		if (BasicGame.storymode == false) {
			var scoreText = me.game.add.bitmapText(me.game.width * 0.5, me.game.height * 0.5, 'flappyfont', me.score.toString() + 'm', 32 * window.devicePixelRatio);
	    	scoreText.anchor.setTo(0.5, 0.5);
	    	scoreText.visible = true;
	    } else {
	    	var mapNameText = me.game.add.bitmapText(me.game.width * 0.5, me.game.height * 0.5, 'flappyfont', window.localStorage.mapName, 24 * window.devicePixelRatio);
	    	mapNameText.anchor.setTo(0.5, 0.5);
	    	mapNameText.visible = true;

			var attemptText = me.game.add.bitmapText(me.game.width * 0.5, me.game.height * 0.56, 'flappyfont', 'Clear on attempt ' + BasicGame.trialCount.toString(), 18 * window.devicePixelRatio);
	    	attemptText.anchor.setTo(0.5, 0.5);
	    	attemptText.visible = true;
	    }
    	BasicGame.trialCount = 1;

	},

	onDownNeg: function(but){
		but.scale.setTo(-1.1, 1.1);
		this.clickSound.play();

	},

	onUpNeg: function(but){
		but.scale.setTo(-1.0, 1.0);
	},

	onDown: function(but){
		this.clickSound.play();
		but.scale.setTo(1.1, 1.1);
	},

	onUp: function(but){
		but.scale.setTo(1.0, 1.0);
	},

	gotoMenu: function(){
		this.gameplaySound.stop();
		this.gameplaySound = null;

		BasicGame.aimode = false;
		BasicGame.trialCount = 1;

		this.game.state.start("MainMenu");
		
	},

	restartGame: function(){
		this.gameplaySound.stop();
		this.gameplaySound = null;

		BasicGame.trialCount += 1;

		this.game.state.start("Main");
	},

	gotoNextStage: function(){

		BasicGame.mapData   = BasicGame.stageData[BasicGame.currentStage].mapData;
		window.localStorage.mapName = BasicGame.stageData[BasicGame.currentStage].mapTitle;
		BasicGame.jumpScale = {'value':BasicGame.stageData[BasicGame.currentStage].jumpScale};
		BasicGame.mapSpeed  = {'value':BasicGame.stageData[BasicGame.currentStage].mapSpeed};
		BasicGame.trialCount = 1;

		this.gameplaySound.stop();
		this.gameplaySound = null;

		BasicGame.trialCount = 1;

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
	    else if (imgId === 5)
	    	block = me.movingTraps.getFirstDead();
	    else if (imgId === 6)
	    	block = me.movingTraps2.getFirstDead();
	    

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
			block.body.position.x -= -50;
	    	me.blocks.add(block);
	    }
	    else if (imgId === 2){ // trap
	    	block.body.width = block.width * 0.65;
			block.body.height = block.height * 0.65;
			
			block.anchor.setTo(0.5, 0.5);
			block.position.x += block.width * 0.5;
			block.position.y += block.height * 0.5;

			me.game.add.tween(block).to({angle: 360}, 1000, null, true, 0, 0, false).loop(true).start();

	    	me.traps.add(block);
	    }
	    else if (imgId === 5){ // moving trap
	    	block.body.width = block.width * 0.65;
			block.body.height = block.height * 0.65;
			
			block.anchor.setTo(0.5, 0.5);
			block.position.x += block.width * 0.5;
			block.position.y += block.height * 0.5;

			me.game.add.tween(block).to({angle: 360}, 1000, null, true, 0, 0, false).loop(true).start();

			var goalPost = block.position.y + BasicGame.blockSize;
			me.game.add.tween(block.position).to({y: goalPost}, 500, null, true, 0, 0, false).loop(true).start().yoyo(true);

	    	me.movingTraps.add(block);
	    }
	    else if (imgId === 6){ // moving trap
	    	block.body.width = block.width * 0.65;
			block.body.height = block.height * 0.65;
			
			block.anchor.setTo(0.5, 0.5);
			block.position.x += block.width * 0.5;
			block.position.y += block.height * 0.5;

			me.game.add.tween(block).to({angle: 360}, 1000, null, true, 0, 0, false).loop(true).start();

			var goalPost = block.position.y + BasicGame.blockSize * 2;
			me.game.add.tween(block.position).to({y: goalPost}, 500, null, true, 0, 0, false).loop(true).start().yoyo(true);

	    	me.movingTraps2.add(block);
	    }
	    else if (imgId === 3){ // blood
	    	block.body.width = block.body.sourceWidth * 0.64;
			block.body.height = block.body.sourceHeight * 0.9;
	    	me.bloods.add(block);
	    }
	    else if (imgId === 4){ // end point
	    	block.width *= 1.3;
	    	block.height *= 1.3;
	    	block.body.width = block.width * 0.5;
			block.body.height = block.height * 0.5;
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
			else if (imgId === 5){
				imgStr = 'trap';
			}
			else if (imgId === 6){
				imgStr = 'trap';
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
		else if (up && !down && left && !right){
			return 'open_down_right';
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
		
		if (!BasicGame.aimode){
			me.batTimeDue = this.game.time.totalElapsedSeconds() * 1000 + 4000;

			me.game.add.tween(me.loadingBar.scale).to({x: 0.0}, 4000).start();

			me.game.add.tween(me.bloodFlash).to({alpha: 1.0}, 140).start();
		}
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

		if (BasicGame.storymode == false)
			me.createScoreHUD();

		me.createBlocks();
	},
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BG
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
	createBG: function() { 
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		this.background_sky1 = this.game.add.sprite(0, 0, 'bg_sky');  
		this.background_sky1.scale.setTo(scaleRatio, scaleRatio);

		this.background_sky2 = this.game.add.sprite(bg_sky_img_cache.width * scaleRatio - window.devicePixelRatio * 4, 0, 'bg_sky');
		this.background_sky2.scale.setTo(scaleRatio, scaleRatio);

		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var castle_height;
		if (window.devicePixelRatio < 2){
			scaleRatio = 1;
			castle_height = this.game.height - bg_castle_img_cache.height;
		}
		else {
			scaleRatio = (this.game.height - bg_castle_img_cache.height) / bg_castle_img_cache.height;
			castle_height = this.game.height - (bg_castle_img_cache.height * scaleRatio);
		}

		this.background_castle1 = this.game.add.sprite(0, castle_height, 'bg_castle');  
		this.background_castle1.scale.setTo(scaleRatio, scaleRatio);

		this.background_castle2 = this.game.add.sprite(bg_castle_img_cache.width * scaleRatio - window.devicePixelRatio * 2, castle_height, 'bg_castle');
		this.background_castle2.scale.setTo(scaleRatio, scaleRatio);

		var bg_cloud_img_cache = game.cache.getImage("bg_cloud");
		scaleRatio = this.game.height / bg_cloud_img_cache.height;

		this.background_cloud1 = this.game.add.sprite(0, 0, 'bg_cloud');  
		this.background_cloud1.scale.setTo(scaleRatio, scaleRatio);

		this.background_cloud2 = this.game.add.sprite(bg_cloud_img_cache.width * scaleRatio, 0, 'bg_cloud');
		this.background_cloud2.scale.setTo(scaleRatio, scaleRatio);
	},

	updateBG: function() {

		this.moveBackgroundSky1();
		this.moveBackgroundSky2();

		this.moveBackgroundCloud1();
		this.moveBackgroundCloud2();

		this.moveBackgroundCastle1();
		this.moveBackgroundCastle2();

	},

	moveBackgroundCloud2 : function() {  
		var bg_cloud_img_cache = game.cache.getImage("bg_cloud");
		var scaleRatio = this.game.height / bg_cloud_img_cache.height;

		if (this.background_cloud2.position.x < -(bg_cloud_img_cache.width * scaleRatio)  )
		{        
			this.background_cloud2.position.x = bg_cloud_img_cache.width * scaleRatio; 
			this.background_cloud2.position.x -= 0.4;  
		}
		else {
			this.background_cloud2.position.x -= 0.4;  
		}        	  
	},

	moveBackgroundCloud1 : function() {  
		var bg_cloud_img_cache = game.cache.getImage("bg_cloud");
		var scaleRatio = this.game.height / bg_cloud_img_cache.height;

		if (this.background_cloud1.position.x < -(bg_cloud_img_cache.width * scaleRatio)  )
		{        
			this.background_cloud1.position.x = bg_cloud_img_cache.width * scaleRatio; 
			this.background_cloud1.position.x -= 0.4;  
		}
		else {
			this.background_cloud1.position.x -= 0.4;  
		}         	  
	},

	moveBackgroundCastle2 : function() {  
		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var scaleRatio;
		if (window.devicePixelRatio < 2){
			scaleRatio = 1;
		}
		else {
			scaleRatio = (this.game.height - bg_castle_img_cache.height) / bg_castle_img_cache.height;
		}

		if (this.background_castle2.position.x < -(bg_castle_img_cache.width * scaleRatio - window.devicePixelRatio * 2)  )
		{        
			this.background_castle2.position.x = bg_castle_img_cache.width * scaleRatio - window.devicePixelRatio * 2; 
			this.background_castle2.position.x -= 0.5;  
		}
		else {
			this.background_castle2.position.x -= 0.5;  
		}        	  
	},

	moveBackgroundCastle1 : function() {  
		var bg_castle_img_cache = game.cache.getImage("bg_castle");
				var scaleRatio;
		if (window.devicePixelRatio < 2){
			scaleRatio = 1;
		}
		else {
			scaleRatio = (this.game.height - bg_castle_img_cache.height) / bg_castle_img_cache.height;
		}

		if (this.background_castle1.position.x < -(bg_castle_img_cache.width * scaleRatio - window.devicePixelRatio * 2)  )
		{        
			this.background_castle1.position.x = bg_castle_img_cache.width * scaleRatio - window.devicePixelRatio * 2; 
			this.background_castle1.position.x -= 0.5;  
		}
		else {
			this.background_castle1.position.x -= 0.5;  
		}           	  
	},

	moveBackgroundSky2 : function() {  
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		if (this.background_sky2.position.x < -(bg_sky_img_cache.width * scaleRatio - window.devicePixelRatio * 4)  )
		{        
			this.background_sky2.position.x = bg_sky_img_cache.width * scaleRatio - window.devicePixelRatio * 4; 
			this.background_sky2.position.x -= 0.3;  
		}
		else {
			this.background_sky2.position.x -= 0.3;  
		}        	  
	},

	moveBackgroundSky1 : function() {  
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		if (this.background_sky1.position.x < -(bg_sky_img_cache.width * scaleRatio - window.devicePixelRatio * 4)  )
		{        
			this.background_sky1.position.x = bg_sky_img_cache.width * scaleRatio - window.devicePixelRatio * 4;
			this.background_sky1.position.x -= 0.3;  
		} 
		else {
			this.background_sky1.position.x -= 0.3;  
		}        	  
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
			me.cha.body.height = me.cha.body.sourceHeight * 0.925;
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
			
			var vamp_img_cache = game.cache.getImage("cha_vamp");
			me.createFXPlayerSpawn(me.initX - vamp_img_cache.width * 0.65, BasicGame.blockSize * -1);
			me.playFXPlayerSpawn();

			me.cha.body.velocity.y = + 1500 * window.devicePixelRatio;

			me.cha.body.bounce.y = 0.2;

			me.game.time.events.add(Phaser.Timer.SECOND, function(){ 
				me.cha.body.bounce.y = 0.0;
			}, me);

			me.spawnSound.play();
		}

		me.initBorn = false;

		// when it becomes bat, do a little fly
		if (me.mode === me.BATMODE){
			me.cha.body.velocity.y = -50 * window.devicePixelRatio;
			me.game.add.tween(me.cha).to({angle: -40}, 100).start();
		}
	},

	playFXPlayerDeath(){
		var me = this;
		var anim = me.game.add.sprite(me.cha.x - me.cha.width, me.cha.y - me.cha.height * 0.8, 'fx_death');

		var fx_death_img_cache = game.cache.getImage("fx_death");
		var scale_ratio = me.cha.height / fx_death_img_cache.height * 1.8;
		anim.scale.setTo(scale_ratio, scale_ratio);

		anim.animations.add('death');
		anim.animations.play('death', 16, false, true);
		//me.game.physics.arcade.enable(anim);
		//anim.body.velocity.x = me.mapVelX;
	},

	createFXPlayerSpawn(x, y){
		var me = this;
		me.spawnFX = me.game.add.sprite(x, y, 'fx_spawn');
		var scale = me.game.height / me.spawnFX.height;

		me.spawnFX.scale.setTo(scale, scale);
		me.spawnFX.animations.add('spawn');
	},

	playFXPlayerSpawn(){
		this.spawnFX .animations.play('spawn', 18, false, true);
	},

	playFXEatBlood(x, y){
		var me = this;
		var anim = me.game.add.sprite(x, y, 'blood_eat');

		var blood_eat_img_cache = game.cache.getImage("blood_eat");
		var scale_ratio = me.cha.height / blood_eat_img_cache.height * 0.78;
		anim.scale.setTo(scale_ratio, scale_ratio);

		anim.animations.add('eatBlood');
		anim.animations.play('eatBlood', 12, false, true);
		me.game.physics.arcade.enable(anim);
		anim.body.velocity.x = me.mapVelX;
	},

	playFXTransform(){
		var me = this;
		var anim = me.game.add.sprite(me.cha.x - me.cha.width * 0.5, me.cha.y - me.cha.height * 0.7, 'transform');

		var fx_transform_img_cache = game.cache.getImage("transform");
		var scale_ratio = me.cha.height / fx_transform_img_cache.height * 1.25;
		anim.scale.setTo(scale_ratio, scale_ratio);

		anim.animations.add('transformation');
		anim.animations.play('transformation', 12, false, true);
		me.game.physics.arcade.enable(anim);
		anim.body.velocity.x = me.mapVelX * 0.186;
		me.transformSound.play();
	},

	playFXPlayerRun(){
		var me = this;
		var anim = me.game.add.sprite(me.cha.x - me.cha.width, me.cha.y, 'fx_run');

		var fx_run_img_cache = game.cache.getImage("fx_run");
		var scale_ratio = me.cha.height / fx_run_img_cache.height * 0.5;
		anim.scale.setTo(scale_ratio, scale_ratio);

		anim.animations.add('runSmoke');
		anim.animations.play('runSmoke', 10, false, true);
		me.game.physics.arcade.enable(anim);
		anim.body.velocity.x = me.mapVelX * 0.386;
	},

	playFXPlayerFly(){
		var me = this;
		var anim = me.game.add.sprite(me.cha.x - me.cha.width * 0.5, me.cha.y - me.cha.height * 0.2, 'fx_run');

		var fx_run_img_cache = game.cache.getImage("fx_run");
		var scale_ratio = me.cha.height / fx_run_img_cache.height * 0.4;
		anim.scale.setTo(scale_ratio, scale_ratio);

		anim.animations.add('runSmoke');
		anim.animations.play('runSmoke', 10, false, true);
		anim.angle = -45;
		me.game.physics.arcade.enable(anim);
		anim.body.velocity.x = me.mapVelX * 0.286;
	},

	playPlayerStageEnd(){
		var me = this;
		me.cha = me.game.add.sprite(me.lastChaPos.x, me.lastChaPos.y, 'cha_bat');

		// add and play animations
		me.cha.animations.add('flap');
		me.cha.animations.play('flap', 8, true);

		// set the sprite's anchor to the center
		me.cha.anchor.setTo(0.5, 0.5);

		me.game.add.tween(me.cha.position).to({x: me.game.width + 70 * window.devicePixelRatio, y: me.game.height * 0.5 - 70 * window.devicePixelRatio}, 3000).start();
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
   	 	me.scoreText = me.game.add.bitmapText(me.game.width * 0.9, me.game.height * 0.125, 'flappyfont', me.score.toString() + 'm', 32 * window.devicePixelRatio);
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

		//console.log(me.input);
	},

	endJump: function(){
		var me = this;

		me.jumpPressed = false;

		if (!me.cha || !me.cha.body)
			return;

		me.cha.animations.paused = false;
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

		me.cha.animations.paused = true;

		me.cha.body.velocity.y = -400 * window.devicePixelRatio * BasicGame.jumpScale.value;

		me.game.add.tween(me.cha).to({angle: -30}, 100).start();


		if (me.mode === me.BATMODE)
			me.playFXPlayerFly();

		if (me.mode === me.BATMODE)
			me.flySound.play();
		else
			me.jumpSound.play();

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
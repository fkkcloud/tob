var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){
		var me = this;

		// enable physics
		me.game.physics.startSystem(Phaser.Physics.ARCADE);

		me.game.stage.backgroundColor = 'ffffff';

		me.createBuilding();

		me.createPlayer();

		me.createLogo();

		me.createInstructions();

		me.game.input.onDown.add(me.startGame, me);
	},

	update: function() {
		var me = this;

		me.game.physics.arcade.collide(me.player, me.buildingSprite);
	},

	createPlayer: function(){
		var me = this;

		me.player = me.game.add.sprite(me.game.world.centerX, me.game.world.height - me.buildingSprite.body.height, 'player');
		me.player.anchor.setTo(0.5, 1.0);
		me.game.physics.arcade.enable(me.player);
		me.player.body.gravity.y = 1000;
		me.player.body.collideWorldBounds = true;
		me.player.body.bounce.y = 0.1;
	},

	createBuilding: function(){
		var me = this;
		var buildingHeight = me.game.world.height / 10;
		var buildingWidth = 60 * window.devicePixelRatio;
		var building = me.game.add.bitmapData(buildingWidth, buildingHeight);

		building.ctx.rect(0, 0, buildingWidth, buildingHeight);
		building.ctx.fillStyle = '#232223';
		building.ctx.fill();

		me.buildingSprite = me.game.add.sprite(me.game.world.width / 2, 
			me.game.world.height - buildingHeight + 1, building);
		me.buildingSprite.anchor.setTo(0.5, 0);

		me.game.physics.arcade.enable(me.buildingSprite);
		me.buildingSprite.enableBody = true;
		me.buildingSprite.body.immovable = true;

	},

	startGame: function(){
		this.game.state.start("Main");
	},

	createLogo: function(){
		var me = this;

		logo = me.game.add.sprite(me.game.world.centerX, 170, 'logo');
		logo.anchor.setTo(0.5, 0.5);

		var logo_tween = this.add.tween(logo);
		logo_tween
			.to({y: 176}, 700, Phaser.Easing.Linear.InOut)
			.to({y: 170}, 700, Phaser.Easing.Linear.InOut)
			.loop();

		logo_tween.start();
	},

	createInstructions: function(){
		var me = this;

		var fontSize = 25 * window.devicePixelRatio;

		var headingFont = fontSize + "px Arial";
		var subHeadingFont = (fontSize/2) + "px Arial";

		instructionLabel = me.game.add.text(me.game.world.centerX,
			me.game.world.centerY, "TAP TO JUMP", {font: headingFont, fill: "#000"});
		instructionLabel.anchor.setTo(0.5, 1);
		instructionLabel.align = 'center';

		instructionLabel2 = me.game.add.text(me.game.world.centerX,
			me.game.world.centerY + 50 * window.devicePixelRatio, "AVOID NASTY SQUARE",
			{font:subHeadingFont, fill:'#c0392b'});
		instructionLabel2.anchor.setTo(0.5, 1);
		instructionLabel2.align = 'center';

		instructionLabel3 = me.game.add.text(me.game.world.centerX,
			me.game.world.centerY + 100 * window.devicePixelRatio, "(..and don't fall)",
			{font:subHeadingFont, fill:"#000"});
		instructionLabel3.anchor.setTo(0.5, 1);
		instructionLabel3.align = 'center';

		instructionLabel4 = me.game.add.text(me.game.world.centerX,
			me.game.world.centerY + 140 * window.devicePixelRatio, "device pixel:" + window.devicePixelRatio,
			{font:subHeadingFont, fill:"#000"});
		instructionLabel4.anchor.setTo(0.5, 1);
		instructionLabel4.align = 'center';
	}

}
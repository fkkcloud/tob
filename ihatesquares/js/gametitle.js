var GameTitle = function(game){};

GameTitle.prototype = {

	create: function() {
        var me = this;

        //Enable physics
        me.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set the stage colour to white
        me.game.stage.backgroundColor = "ffffff";

        //Create the building
        me.createBuilding();

        //Add the player
        me.createPlayer();

        //Create the logo
        me.createLogo();

        //Create the instructions
        me.createInstructions();

        //State the game when a tap is detected
		me.game.input.onDown.add(me.startGame, me);

	},

	update: function() {
		var me = this;

		//Make the player and building collide
		me.game.physics.arcade.collide(me.player, me.buildingSprite);

	},

	//Creates the player
	createPlayer: function(){

		var me = this;

		//Add the player to the game by creating a new sprite
		me.player = me.game.add.sprite(me.game.world.centerX, me.game.world.height - me.buildingSprite.body.height, 'player');
		me.player.anchor.setTo(0.5, 1.0);
		//Enable physics on the player
		me.game.physics.arcade.enable(me.player);
		//Make the player fall by applying gravity
		me.player.body.gravity.y = 1000;
		//Make the player collide with the game boundaries 
		me.player.body.collideWorldBounds = true;
		//Make the player bounce a little
		me.player.body.bounce.y = 0.1;

	},

	//Create the platform the player stands on
	createBuilding: function(){

		var me = this,
			buildingHeight = me.game.world.height / 10,
			buildingWidth = 60 * window.devicePixelRatio,
			building = me.game.add.bitmapData(buildingWidth, buildingHeight);

		building.ctx.rect(0, 0, buildingWidth, buildingHeight);
		building.ctx.fillStyle = '#232223';
		building.ctx.fill();

		me.buildingSprite = me.game.add.sprite(me.game.world.width / 2, me.game.world.height - buildingHeight + 1, building);
		me.buildingSprite.anchor.setTo(0.5, 0);

		//Enable physics for the building
		me.game.physics.arcade.enable(me.buildingSprite);
		me.buildingSprite.enableBody = true;
		me.buildingSprite.body.immovable = true;

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
		var headingFont = fontSize+"px Arial";
		var subHeadingFont = (fontSize/2)+"px Arial";

		instructionLabel = me.game.add.text(me.game.world.centerX, me.game.world.centerY, "TAP TO JUMP", {font: headingFont, fill: "#000"}); 
		instructionLabel.anchor.setTo(0.5, 1);
		instructionLabel.align = 'center';

		instructionLabel2 = me.game.add.text(me.game.world.centerX, me.game.world.centerY + 50 * window.devicePixelRatio, "AVOID NASTY SQUARES", {font: subHeadingFont, fill: "#c0392b"}); 
		instructionLabel2.anchor.setTo(0.5, 1);
		instructionLabel2.align = 'center';

		instructionLabel3 = me.game.add.text(me.game.world.centerX, me.game.world.centerY + 100 * window.devicePixelRatio, "(...and don't fall)", {font: subHeadingFont, fill: "#000"}); 
		instructionLabel3.anchor.setTo(0.5, 1);
		instructionLabel3.align = 'center';

	},

	startGame: function(){
		this.game.state.start("Main");
	}
	
}
var GameTitle = function(game){};

GameTitle.prototype = {

	create: function(){
		var me = this;

		// enable physics
		me.game.physics.startSystem(Phaser.Physics.ARCADE);

		me.createBG();

		me.createGround();

		me.createLogo();

		me.createInstructions();

		me.createButtons();

	},

	update: function() {
		var me = this;
	},

	createBG: function(){
		var sprite = this.game.add.sprite(0, 0, 'background');
		var scale = this.game.width / sprite.width * 1.1;
		sprite.scale.setTo(scale, scale);
	},

	createGround: function(){
		// add the ground sprite as a tile
	    // and start scrolling in the negative x direction
	    this.ground = this.game.add.tileSprite(0, this.game.world.height - 120 * window.devicePixelRatio, 335 * window.devicePixelRatio, 112 * window.devicePixelRatio, 'ground');
	    this.ground.scale.setTo(1.2, 1.2);
	    this.ground.autoScroll(-200, 0);
	},

	startGame: function(){
		this.game.state.start("Main");
	},

	createLogo: function(){
		this.titleGroup = this.game.add.group();

		this.title = this.game.add.sprite(0, 0, 'title');
		this.titleGroup.add(this.title);

		this.bird = this.game.add.sprite(170 * window.devicePixelRatio, 0, 'bird');
		this.titleGroup.add(this.bird);

		this.bird.animations.add('flap');
		this.bird.animations.play('flap', 12, true);

		this.titleGroup.x = this.game.width * 0.25;
		this.titleGroup.y = 100 * window.devicePixelRatio;

		this.game.add.tween(this.titleGroup).to({y:115 * window.devicePixelRatio}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
	},

	createInstructions: function(){
		var me = this;

		var fontSize = 25 * window.devicePixelRatio;

		var headingFont = fontSize + "px Arial";
		var subHeadingFont = (fontSize * 0.5) + "px Arial";
		/*
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
		instructionLabel3.align = 'center';*/

		instructionLabel3 = me.game.add.text(me.game.world.centerX,
			me.game.world.centerY - 150 * window.devicePixelRatio, window.devicePixelRatio,
			{font:subHeadingFont, fill:"#000"});

		instructionLabel3.anchor.setTo(0.5, 1);
		instructionLabel3.align = 'center';
	},

	createButtons: function(){
		this.startButton = this.game.add.button(this.game.width * 0.5, this.game.world.height - 220 * window.devicePixelRatio, 'startButton', this.startGame, this);
		this.startButton.anchor.setTo(0.5, 0.5);
	}

}
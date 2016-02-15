BasicGame.GameTitle = function(game){};

BasicGame.GameTitle.prototype = {

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
		var me = this;

		var sprite = me.game.add.sprite(0, 0, 'bg_sky_flappy');
		
		var scale = me.game.width / sprite.width * 1.1;
		
		sprite.scale.setTo(scale, scale);
	},

	createGround: function(){

		var me = this;

		var groundWidth = me.game.width;
		var groundHeight = me.game.height * 0.1;

	    me.ground = me.game.add.tileSprite(
	    	0, // x
	    	me.game.height - groundHeight, // y
	    	groundWidth, // width
	    	groundHeight, //height
	    	'bg_ground_flappy' // key
	    	);

	    this.ground.autoScroll(-200, 0);
	},

	startGame: function(){
		this.game.state.start("Main");
	},

	createLogo: function(){
		this.titleGroup = this.game.add.group();

		this.title = this.game.add.sprite(0, 0, 'title');
		this.titleGroup.add(this.title);

		this.bird = this.game.add.sprite(this.game.width * 0.42, 0, 'cha_flappy');
		this.titleGroup.add(this.bird);

		this.bird.animations.add('flap');
		this.bird.animations.play('flap', 12, true);

		this.titleGroup.x = this.game.width * 0.25;
		this.titleGroup.y = this.game.height * 0.23;

		this.game.add.tween(this.titleGroup).to({y:this.game.height * 0.26}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
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
	*/
		instructionLabel3 = me.game.add.text(me.game.world.centerX,
			me.game.world.centerY + 100 * window.devicePixelRatio, window.innerWidth,
			{font:subHeadingFont, fill:"#000"});

		instructionLabel3.anchor.setTo(0.5, 1);
		instructionLabel3.align = 'center';
	},

	createButtons: function(){
		this.startButton = this.game.add.button(this.game.width * 0.5, this.game.world.height * 0.7, 'startButton', this.startGame, this);
		this.startButton.anchor.setTo(0.5, 0.5);
	}

}
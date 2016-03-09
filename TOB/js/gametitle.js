BasicGame.GameTitle = function(game){};

BasicGame.GameTitle.prototype = {

	create: function(){
		var me = this;

		// enable physics
		me.game.physics.startSystem(Phaser.Physics.ARCADE);

		me.createBG();

		me.createLogo();

		me.createCopyrights();

		me.createInstructions();

		me.createButtons();
	},

	update: function() {
		var me = this;
	},

	createBG: function(){
		var me = this;

		var sprite = me.game.add.sprite(0, 0, 'bg_sky_vamp');
		
		var scale = me.game.width / sprite.width * 1.1;
		
		sprite.scale.setTo(scale, scale);
	},

	startGame: function(){
		this.game.state.start("Main");
	},

	gotoMaps: function(){
		window.location.href = "http://kingsl-tob.herokuapp.com/map";
	},

	createLogo: function(){
		this.titleGroup = this.game.add.group();

		this.title = this.game.add.sprite(0, 0, 'title');
		this.titleGroup.add(this.title);

		this.titleGroup.x = this.game.width * 0.63 - this.title.width * 0.63;
		this.titleGroup.y = this.game.height * 0.1;

		this.game.add.tween(this.titleGroup).to({y:this.game.height * 0.12}, 600, Phaser.Easing.Linear.NONE, true, 0, 5000, true);
	},

	createCopyrights: function(){
		this.titleGroup = this.game.add.group();

		this.title = this.game.add.sprite(0, 0, 'copyrights');
		this.titleGroup.add(this.title);

		this.titleGroup.x = this.game.width * 0.5 - this.title.width * 0.5;
		this.titleGroup.y = this.game.height * 0.9;
	},

	createInstructions: function(){
		var me = this;

		var fontSize = 18 * window.devicePixelRatio;

		var headingFont = fontSize + "px Arial";
		
		instructionLabel = me.game.add.text(me.game.world.width * 0.58,
			me.game.world.height * 0.65, 
			window.localStorage.mapName, 
			{	font: headingFont, 
				fill: "#fff", 
				align: 'right',
			});
		//instructionLabel.anchor.setTo(0.5, 1);

		/*
		instructionLabel2 = me.game.add.text(me.game.world.centerX,
			me.game.world.centerY + 50 * window.devicePixelRatio, "AVOID NASTY SQUARE",
			{font:subHeadingFont, fill:'#c0392b'});
		instructionLabel2.anchor.setTo(0.5, 1);
		instructionLabel2.align = 'center';
		

		instructionLabel3 = me.game.add.text(me.game.world.centerX,
			me.game.world.centerY + 100 * window.devicePixelRatio, window.innerWidth,
			{font:subHeadingFont, fill:"#000"});

		instructionLabel3.anchor.setTo(0.5, 1);
		instructionLabel3.align = 'center';
		*/
	},

	createButtons: function(){
		this.startButton = this.game.add.button(this.game.width * 0.65, this.game.world.height * 0.8, 'startButton', this.startGame, this);
		this.startButton.anchor.setTo(0.5, 0.5);

		this.startButton = this.game.add.button(this.game.width * 0.85, this.game.world.height * 0.8, 'startButton', this.gotoMaps, this);
		this.startButton.anchor.setTo(0.5, 0.5);
	}

}
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

		this.bg_sky.tilePosition.x -= 0.3;

		this.bg_castle.tilePosition.x -= 0.5;
	},

	createBG: function(){
		var me = this;

		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		this.bg_sky = game.add.tileSprite(0, 0, bg_sky_img_cache.width, bg_sky_img_cache.height, "bg_sky");

		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var castle_height = this.game.height - bg_castle_img_cache.height;
		this.bg_castle = game.add.tileSprite(0, castle_height, bg_castle_img_cache.width, bg_castle_img_cache.height, "bg_castle");
	},

	startGame: function(){
		this.game.state.start("Main");
	},

	gotoMaps: function(){
		window.location.href = "http://kingsl-tob.herokuapp.com/map";
	},

	gotoMapEditor: function(){
		window.location.href = "http://kingsl-tob.herokuapp.com/map/edit";
	},



	createLogo: function(){

		this.title = this.game.add.sprite(this.game.width * 0.375, this.game.height * 0.125, 'title');
		this.title.scale.setTo(1.3, 1.3);

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
		
		instructionLabel = me.game.add.text(me.game.world.width * 0.7,
			me.game.world.height * 0.8, 
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
		this.btn_story = this.game.add.button(0, this.game.world.height * 0.2, 'btn_story', this.startGame, this);

		this.btn_maplist = this.game.add.button(0, this.game.world.height * 0.4, 'btn_maplist', this.gotoMaps, this);

		this.btn_mapeditor = this.game.add.button(0, this.game.world.height * 0.55, 'btn_mapeditor', this.gotoMapEditor, this);

		this.btn_option = this.game.add.button(0, this.game.world.height * 0.7, 'btn_option', null, this);
	}

}
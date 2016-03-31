BasicGame.GameTitle = function(game){};

BasicGame.GameTitle.prototype = {

	create: function(){
		var me = this;

		me.createBG();

		me.createLogo();

		me.createCopyrights();

		me.createButtons();

		me.mainmenuSound = me.game.add.audio('mainmenu');
		me.mainmenuSound.loopFull();

		me.clickSound = me.game.add.audio('button');
	},

	update: function() {
		var me = this;

		this.bg_sky.tilePosition.x -= 0.3;

		this.bg_castle.tilePosition.x -= 0.5;

		this.bg_cloud.tilePosition.x -= 0.4;
	},

	createBG: function(){
		var me = this;

		me.bg_sky = game.add.tileSprite(0, 0, me.game.width, me.game.height, "bg_sky");
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = me.game.height / bg_sky_img_cache.height;
		me.bg_sky.scale.setTo(scaleRatio, scaleRatio);
		me.bg_sky.inputEnabled = true;
		me.bg_sky.events.onInputUp.add(this.gotoMainMenu, this);

		me.bg_cloud = game.add.tileSprite(0, 0, me.game.width, me.game.height, "bg_cloud");
		var bg_cloud_img_cache = game.cache.getImage("bg_cloud");
		scaleRatio = me.game.height / bg_cloud_img_cache.height;
		me.bg_cloud.scale.setTo(scaleRatio, scaleRatio);
		me.bg_cloud.inputEnabled = true;
		me.bg_cloud.events.onInputUp.add(this.gotoMainMenu, this);

		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var castle_height = this.game.height - bg_castle_img_cache.height;
		me.bg_castle = game.add.tileSprite(0, castle_height, me.game.width, me.game.height, "bg_castle");
		me.bg_castle.inputEnabled = true;
		me.bg_castle.events.onInputUp.add(this.gotoMainMenu, this);
	},

	gotoMainMenu: function(){
		if (this.mainmenuSound){
			this.mainmenuSound.stop();
			this.mainmenuSound = null;
		}
		this.game.state.start("MainMenu");
		//this.game.state.start("Main");
	},

	createLogo: function(){

		this.title = this.game.add.button(this.game.width * 0.5, this.game.height * 0.1, 'title', this.gotoMainMenu, this);
		this.title.scale.setTo(1.0, 1.0);
		this.title.anchor.setTo(0.545, 0);

	},

	createCopyrights: function(){
		this.titleGroup = this.game.add.group();

		this.title = this.game.add.sprite(0, 0, 'copyrights');
		this.titleGroup.add(this.title);

		this.titleGroup.x = this.game.width * 0.5 - this.title.width * 0.5;
		this.titleGroup.y = this.game.height * 0.925;
	},

	onDownStart: function(but){
		this.clickSound.play();
		but.scale.setTo(1.6, 1.6);
	},

	onUpStart: function(but){
		but.scale.setTo(1.5, 1.5);
	},

	createButtons: function(){
		var me = this;

		this.btn_start = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.78, 'btn_start', this.gotoMainMenu, this);
		this.btn_start.scale.setTo(1.5, 1.5);
		this.btn_start.anchor.setTo(0.5, 0.5);
		this.btn_start.onInputDown.add(me.onDownStart, this);
		this.btn_start.onInputUp.add(me.onUpStart, this);
		me.game.add.tween(this.btn_start).to({alpha: 0.8}, 700, null, true, 0, 0, true).loop(true).start();
		me.game.add.tween(this.btn_start.scale).to({x: 1.6, y: 1.62}, 440, null, true, 0, 0, true).loop(true).start();

	},

}
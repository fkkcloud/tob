BasicGame.GameTitle = function(game){};

BasicGame.GameTitle.prototype = {

	preload: function(){
		BasicGame.reloadStageScreenUI(); // re initialize stage screen UI 
	},

	create: function(){
		var me = this;

		// enable physics
		me.game.physics.startSystem(Phaser.Physics.ARCADE);

		me.createBG();

		me.createLogo();

		me.createCopyrights();

		me.createButtons();
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

		me.bg_cloud = game.add.tileSprite(0, 0, me.game.width, me.game.height, "bg_cloud");
		var bg_cloud_img_cache = game.cache.getImage("bg_cloud");
		scaleRatio = me.game.height / bg_cloud_img_cache.height;
		me.bg_cloud.scale.setTo(scaleRatio, scaleRatio);

		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var castle_height = this.game.height - bg_castle_img_cache.height;
		me.bg_castle = game.add.tileSprite(0, castle_height, me.game.width, me.game.height, "bg_castle");
	},

	startGame: function(){
		this.game.state.start("LevelList");
		//this.game.state.start("Main");
	},

	gotoMaps: function(){
		window.location.href = "http://kingsl-tob.herokuapp.com/map";
	},

	gotoMapEditor: function(){
		window.location.href = "http://kingsl-tob.herokuapp.com/map/edit";
	},

	gotoChallengeAI: function(){
		this.game.state.start("ChallengeAI");
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

	onDown: function(but){
		but.scale.setTo(1.1, 1.1);
	},

	onUp: function(but){
		but.scale.setTo(1.0, 1.0);
	},

	createButtons: function(){
		var me = this;

		this.btn_story = this.game.add.button(0, this.game.world.height * 0.2, 'btn_story', this.startGame, this);
		this.btn_story.onInputDown.add(me.onDown, this);
		this.btn_story.onInputUp.add(me.onUp, this);

		this.btn_maplist = this.game.add.button(0, this.game.world.height * 0.4, 'btn_maplist', this.gotoMaps, this);
		this.btn_maplist.onInputDown.add(me.onDown, this);
		this.btn_maplist.onInputUp.add(me.onUp, this);

		this.btn_mapeditor = this.game.add.button(0, this.game.world.height * 0.55, 'btn_mapeditor', this.gotoMapEditor, this);
		this.btn_mapeditor.onInputDown.add(me.onDown, this);
		this.btn_mapeditor.onInputUp.add(me.onUp, this);

		this.btn_option = this.game.add.button(0, this.game.world.height * 0.7, 'btn_option', this.gotoChallengeAI, this);
		this.btn_option.onInputDown.add(me.onDown, this);
		this.btn_option.onInputUp.add(me.onUp, this);
	},

}
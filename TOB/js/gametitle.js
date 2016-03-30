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

		this.title = this.game.add.button(this.game.width * 0.5, this.game.height * 0.089, 'title', this.startGame, this);
		this.title.scale.setTo(1.0, 1.0);
		this.title.anchor.setTo(0.545, 0);

	},

	createCopyrights: function(){
		this.titleGroup = this.game.add.group();

		this.title = this.game.add.sprite(0, 0, 'copyrights');
		this.titleGroup.add(this.title);

		this.titleGroup.x = this.game.width * 0.5 - this.title.width * 0.5;
		this.titleGroup.y = this.game.height * 0.95;
	},

	onDown: function(but){
		but.scale.setTo(1.1, 1.1);
	},

	onUp: function(but){
		but.scale.setTo(0.76, 0.76);
	},

	onDownStart: function(but){
		but.scale.setTo(1.3, 1.3);
	},

	onUpStart: function(but){
		but.scale.setTo(1.2, 1.2);
	},

	createButtons: function(){
		var me = this;

		this.btn_start = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.68, 'btn_start', this.startGame, this);
		this.btn_start.scale.setTo(1.2, 1.2);
		this.btn_start.anchor.setTo(0.5, 0);
		this.btn_start.onInputDown.add(me.onDownStart, this);
		this.btn_start.onInputUp.add(me.onUpStart, this);
		me.game.add.tween(this.btn_start).to({alpha: 0.4}, 800, null, true, 0, 0, true).loop(true).start();

		this.btn_maplist = this.game.add.button(this.game.world.width * 0.75, this.game.world.height * 0.78, 'btn_maplist', this.gotoMaps, this);
		this.btn_maplist.scale.setTo(0.76, 0.76);
		this.btn_maplist.anchor.setTo(0.5, 0);
		this.btn_maplist.onInputDown.add(me.onDown, this);
		this.btn_maplist.onInputUp.add(me.onUp, this);

		this.btn_mapeditor = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.78, 'btn_mapeditor', this.gotoMapEditor, this);
		this.btn_mapeditor.scale.setTo(0.76, 0.76);
		this.btn_mapeditor.anchor.setTo(0.5, 0);
		this.btn_mapeditor.onInputDown.add(me.onDown, this);
		this.btn_mapeditor.onInputUp.add(me.onUp, this);

		this.btn_infinity = this.game.add.button(this.game.world.width * 0.25, this.game.world.height * 0.78, 'btn_infinity', this.gotoChallengeAI, this);
		this.btn_infinity.scale.setTo(0.76, 0.76);
		this.btn_infinity.anchor.setTo(0.5, 0);
		this.btn_infinity.onInputDown.add(me.onDown, this);
		this.btn_infinity.onInputUp.add(me.onUp, this);
	},

}
BasicGame.MainMenu = function(game){};

BasicGame.MainMenu.prototype = {

	create: function(){
		var me = this;

		me.createBG();

		me.createButtons();

		me.mainmenuSound = me.game.add.audio('mainmenu');
		me.mainmenuSound.loopFull();

		me.clickSound = me.game.add.audio('button');
	},

	update: function() {
		var me = this;

		me.updateBG();

	},

	startGame: function(){
		if (this.mainmenuSound){
			this.mainmenuSound.stop();
			this.mainmenuSound = null;
		}
		this.game.state.start("LevelList1");
		//this.game.state.start("Main");
	},

	gotoMaps: function(){
		if (this.mainmenuSound){
			this.mainmenuSound.stop();
			this.mainmenuSound = null;
		}
		window.location.href = "http://touchofblood.com/map";
	},

	gotoMapEditor: function(){
		if (this.mainmenuSound){
			this.mainmenuSound.stop();
			this.mainmenuSound = null;
		}
		window.location.href = "http://touchofblood.com/map/edit";
	},

	gotoChallengeAI: function(){
		if (this.mainmenuSound){
			this.mainmenuSound.stop();
			this.mainmenuSound = null;
		}
		this.game.state.start("ChallengeAI");
	},


	onDown: function(but){
		this.clickSound.play();
		but.scale.setTo(1.0, 1.0);
	},

	onUp: function(but){
		but.scale.setTo(0.9, 0.9);
	},


	createButtons: function(){
		var me = this;

		this.btn_start = this.game.add.button(this.game.world.width * 0.3, this.game.world.height * 0.26, 'btn_story', this.startGame, this);
		this.btn_start.scale.setTo(0.9, 0.9);
		this.btn_start.anchor.setTo(0.5, 0.5);
		this.btn_start.onInputDown.add(me.onDown, this);
		this.btn_start.onInputUp.add(me.onUp, this);

		this.btn_maplist = this.game.add.button(this.game.world.width * 0.7, this.game.world.height * 0.26, 'btn_maplist', this.gotoMaps, this);
		this.btn_maplist.scale.setTo(0.9, 0.9);
		this.btn_maplist.anchor.setTo(0.5, 0.5);
		this.btn_maplist.onInputDown.add(me.onDown, this);
		this.btn_maplist.onInputUp.add(me.onUp, this);

		this.btn_mapeditor = this.game.add.button(this.game.world.width * 0.7, this.game.world.height * 0.7, 'btn_mapeditor', this.gotoMapEditor, this);
		this.btn_mapeditor.scale.setTo(0.9, 0.9);
		this.btn_mapeditor.anchor.setTo(0.5, 0.5);
		this.btn_mapeditor.onInputDown.add(me.onDown, this);
		this.btn_mapeditor.onInputUp.add(me.onUp, this);

		this.btn_infinity = this.game.add.button(this.game.world.width * 0.3, this.game.world.height * 0.7, 'btn_infinity', this.gotoChallengeAI, this);
		this.btn_infinity.scale.setTo(0.9, 0.9);
		this.btn_infinity.anchor.setTo(0.5, 0.5);
		this.btn_infinity.onInputDown.add(me.onDown, this);
		this.btn_infinity.onInputUp.add(me.onUp, this);
	},

	createBG: function() { 
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		this.background_sky1 = this.game.add.sprite(0, 0, 'bg_sky');  
		this.background_sky1.scale.setTo(scaleRatio, scaleRatio);

		this.background_sky2 = this.game.add.sprite(bg_sky_img_cache.width * scaleRatio, 0, 'bg_sky');
		this.background_sky2.scale.setTo(scaleRatio, scaleRatio);

		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		scaleRatio = (this.game.height - bg_castle_img_cache.height) / bg_castle_img_cache.height;
		var castle_height = this.game.height - (bg_castle_img_cache.height * scaleRatio);

		this.background_castle1 = this.game.add.sprite(0, castle_height, 'bg_castle');  
		this.background_castle1.scale.setTo(scaleRatio, scaleRatio);

		this.background_castle2 = this.game.add.sprite(bg_castle_img_cache.width * scaleRatio, castle_height, 'bg_castle');
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
		var scaleRatio = this.game.height / bg_castle_img_cache.height;

		if (this.background_castle2.position.x < -(bg_castle_img_cache.width * scaleRatio)  )
		{        
			this.background_castle2.position.x = bg_castle_img_cache.width * scaleRatio; 
			this.background_castle2.position.x -= 0.5;  
		}
		else {
			this.background_castle2.position.x -= 0.5;  
		}        	  
	},

	moveBackgroundCastle1 : function() {  
		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var scaleRatio = this.game.height / bg_castle_img_cache.height;

		if (this.background_castle1.position.x < -(bg_castle_img_cache.width * scaleRatio)  )
		{        
			this.background_castle1.position.x = bg_castle_img_cache.width * scaleRatio; 
			this.background_castle1.position.x -= 0.5;  
		}
		else {
			this.background_castle1.position.x -= 0.5;  
		}           	  
	},

	moveBackgroundSky2 : function() {  
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		if (this.background_sky2.position.x < -(bg_sky_img_cache.width * scaleRatio)  )
		{        
			this.background_sky2.position.x = bg_sky_img_cache.width * scaleRatio; 
			this.background_sky2.position.x -= 0.3;  
		}
		else {
			this.background_sky2.position.x -= 0.3;  
		}        	  
	},

	moveBackgroundSky1 : function() {  
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		if (this.background_sky1.position.x < -(bg_sky_img_cache.width * scaleRatio)  )
		{        
			this.background_sky1.position.x = bg_sky_img_cache.width * scaleRatio;
			this.background_sky1.position.x -= 0.3;  
		} 
		else {
			this.background_sky1.position.x -= 0.3;  
		}        	  
	},

}
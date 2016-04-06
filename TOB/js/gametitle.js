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

		me.updateBG();
	},


	gotoMainMenu: function(){
		if (this.mainmenuSound){
			this.mainmenuSound.stop();
			this.mainmenuSound = null;
		}
		this.game.state.start("MainMenu");
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
		but.scale.setTo(1.4, 1.4);
	},

	onUpStart: function(but){
		but.scale.setTo(1.2, 1.2);
	},

	createButtons: function(){
		var me = this;

		this.btn_start = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.78, 'btn_start', this.gotoMainMenu, this);
		this.btn_start.scale.setTo(1.2, 1.2);
		this.btn_start.anchor.setTo(0.5, 0.5);
		this.btn_start.onInputDown.add(me.onDownStart, this);
		this.btn_start.onInputUp.add(me.onUpStart, this);

		me.game.add.tween(this.btn_start).to({alpha: 0.8}, 700, null, true, 0, 0, true).loop(true).start();
		me.game.add.tween(this.btn_start.scale).to({x: 1.3, y: 1.3}, 440, null, true, 0, 0, true).loop(true).start();

	},

	createBG: function() { 
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		this.background_sky1 = this.game.add.sprite(0, 0, 'bg_sky');  
		this.background_sky1.scale.setTo(scaleRatio, scaleRatio);

		this.background_sky2 = this.game.add.sprite(bg_sky_img_cache.width * scaleRatio, 0, 'bg_sky');
		this.background_sky2.scale.setTo(scaleRatio, scaleRatio);

		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var castle_height;
		if (window.devicePixelRatio < 2){
			scaleRatio = 1;
			castle_height = this.game.height - bg_castle_img_cache.height;
		}
		else {
			scaleRatio = (this.game.height - bg_castle_img_cache.height) / bg_castle_img_cache.height;
			castle_height = this.game.height - (bg_castle_img_cache.height * scaleRatio);
		}

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
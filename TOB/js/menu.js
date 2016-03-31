BasicGame.MainMenu = function(game){};

BasicGame.MainMenu.prototype = {

	preload: function(){
		BasicGame.reloadStageScreenUI(); // re initialize stage screen UI 
	},

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

	},

	createBG: function(){
		var me = this;

	},

	startGame: function(){
		if (this.mainmenuSound){
			this.mainmenuSound.stop();
			this.mainmenuSound = null;
		}
		this.game.state.start("LevelList");
		//this.game.state.start("Main");
	},

	gotoMaps: function(){
		if (this.mainmenuSound){
			this.mainmenuSound.stop();
			this.mainmenuSound = null;
		}
		window.location.href = "http://kingsl-tob.herokuapp.com/map";
	},

	gotoMapEditor: function(){
		if (this.mainmenuSound){
			this.mainmenuSound.stop();
			this.mainmenuSound = null;
		}
		window.location.href = "http://kingsl-tob.herokuapp.com/map/edit";
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
		but.scale.setTo(0.8, 0.8);
	},

	onUp: function(but){
		but.scale.setTo(0.68, 0.68);
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

		this.btn_start = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.71, 'btn_story', this.startGame, this);
		this.btn_start.scale.setTo(1.5, 1.5);
		this.btn_start.anchor.setTo(0.5, 0.5);
		this.btn_start.onInputDown.add(me.onDownStart, this);
		this.btn_start.onInputUp.add(me.onUpStart, this);

		this.btn_maplist = this.game.add.button(this.game.world.width * 0.7, this.game.world.height * 0.88, 'btn_maplist', this.gotoMaps, this);
		this.btn_maplist.scale.setTo(0.68, 0.68);
		this.btn_maplist.anchor.setTo(0.5, 0.5);
		this.btn_maplist.onInputDown.add(me.onDown, this);
		this.btn_maplist.onInputUp.add(me.onUp, this);

		this.btn_mapeditor = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.88, 'btn_mapeditor', this.gotoMapEditor, this);
		this.btn_mapeditor.scale.setTo(0.68, 0.68);
		this.btn_mapeditor.anchor.setTo(0.5, 0.5);
		this.btn_mapeditor.onInputDown.add(me.onDown, this);
		this.btn_mapeditor.onInputUp.add(me.onUp, this);

		this.btn_infinity = this.game.add.button(this.game.world.width * 0.3, this.game.world.height * 0.88, 'btn_infinity', this.gotoChallengeAI, this);
		this.btn_infinity.scale.setTo(0.68, 0.68);
		this.btn_infinity.anchor.setTo(0.5, 0.5);
		this.btn_infinity.onInputDown.add(me.onDown, this);
		this.btn_infinity.onInputUp.add(me.onUp, this);
	},

}
BasicGame.Tuto1 = function(game){};

BasicGame.Tuto1.prototype = {

	create: function(){
		var me = this;

		var tutoImg = me.game.add.sprite(me.game.world.centerX, me.game.world.height * 0.425, "tuto1");
		tutoImg.anchor.setTo(0.5, 0.5);

		me.createButtons();

	},

	update: function() {
		var me = this;
	},


	onDown: function(but){
		but.scale.setTo(-1.1, 1.1);
	},

	onUp: function(but){
		but.scale.setTo(-1.0, 1.0);
	},

	toTuto2: function(){
		this.game.state.start("Tuto2");
	},

	createButtons: function(){
		var me = this;

		this.btn = this.game.add.button(this.game.world.width * 0.86, this.game.world.height * 0.86, 'btn_next', this.toTuto2, this);
		this.btn.scale.setTo(-1.0, 1.0);
		this.btn.anchor.setTo(0.5, 0.5);
		this.btn.onInputDown.add(me.onDown, this);
		this.btn.onInputUp.add(me.onUp, this);
	},

}
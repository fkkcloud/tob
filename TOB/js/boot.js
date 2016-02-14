var Boot = function(game){

};
  
Boot.prototype = {
	init: function(){

	},

	preload: function(){

	},
	
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//this.scale.setScreenSize(true);
		this.game.state.start("Preload");
	}
}
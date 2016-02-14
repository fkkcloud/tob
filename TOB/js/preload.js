var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
		if(window.devicePixelRatio >= 3){
		 this.game.load.image('player', 'assets/player@3x.png');
		 this.game.load.image('enemy', 'assets/enemy@3x.png');
		 this.game.load.image('superenemy', 'assets/superenemy@3x.png');
		 this.game.load.image('logo', 'assets/logo@3x.png');
		 this.game.load.image('restart', 'assets/restart@3x.png');
		}
		else if(window.devicePixelRatio >= 2){
		 this.game.load.image('player', 'assets/player@2x.png');
		 this.game.load.image('enemy', 'assets/enemy@2x.png');
		 this.game.load.image('superenemy', 'assets/superenemy@2x.png');
		 this.game.load.image('logo', 'assets/logo@2x.png');
		 this.game.load.image('restart', 'assets/restart@2x.png');
		}
		else {
		 this.game.load.image('player', 'assets/player.png');
		 this.game.load.image('enemy', 'assets/enemy.png');
		 this.game.load.image('superenemy', 'assets/superenemy.png');
		 this.game.load.image('logo', 'assets/logo.png');
		 this.game.load.image('restart', 'assets/restart.png');
		} 

		this.game.load.audio('hit', 'assets/hit.wav');
	},

	create: function(){
		this.game.state.start("GameTitle");
		//this.game.state.start("Main");
	}
}
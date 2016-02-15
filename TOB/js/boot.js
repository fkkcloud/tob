BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false,

};

BasicGame.Boot = function(game){

};
  
BasicGame.Boot.prototype = {
	init: function(){

		this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.setMinMax(375, 667, 750, 1334);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(375, 667, 750, 1334);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            //this.scale.setResizeCallback(this.gameResized, this);
            //this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }

        this.scale.setScreenSize(true);
	},

	preload: function(){

	},
	
  	create: function(){
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		this.game.state.start("Preload");
	}
}
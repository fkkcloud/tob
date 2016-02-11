
// init phaser, and create a 400 x 490 game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// create main state of game
var mainState = {

	preload: function(){
		// this function will be executed at the beginning
		// usually used to load all the assets

		// change bg color
		game.stage.backgroundColor = '#71c5cf';

		// load bird sprite
		game.load.image('bird', 'assets/bird.png');

		// load pipe sprite
		game.load.image('pipe', 'assets/pipe.png'); 

		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;this.scale.minWidth = 320;this.scale.minHeight = 480;this.scale.maxWidth = 768;this.scale.maxHeight = 1152; 
		//game.scale.refresh();
	},

	create: function(){
		// this func is called after the preload func
		// set up game, display sprites(bg) etc.

		this.score = 0;  
		this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" }); 

		// set the physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// display the bird on the screen
		this.bird = this.game.add.sprite(100, 245, 'bird');

		//add gravity to the bird to make it fall
		game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = 1000;

		// call the 'jump' function when the spacekey is hit
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		// add mouse/touch controls
    	this.input.onDown.add(this.jump, this);

		this.pipes = game.add.group(); // Create a group  
		this.pipes.enableBody = true;  // Add physics to the group  
		this.pipes.createMultiple(20, 'pipe'); // Create 20 pipes 

		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);  
	},
	update: function(){
		// this function is called 60 times per second
		// contains the game's logic
		if (this.bird.inWorld == false)
			this.restartGame();

		game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);  
	},

	jump: function(){
		// jump, make vertical vel to the bird
		this.bird.body.velocity.y = -350;
	},

	restartGame: function(){
		// start the 'main' state which restart the game
		game.state.start('main');
	},

	addOnePipe: function(x, y) {  
	    // Get the first dead pipe of our group
	    var pipe = this.pipes.getFirstDead();

	    // Set the new position of the pipe
	    pipe.reset(x, y);

	    // Add velocity to the pipe to make it move left
	    pipe.body.velocity.x = -200; 

	    // Kill the pipe when it's no longer visible 
	    pipe.checkWorldBounds = true;
	    pipe.outOfBoundsKill = true;
	},

	addRowOfPipes: function() {  
	    // Pick where the hole will be
	    var hole = Math.floor(Math.random() * 5) + 1;

	    // Add the 6 pipes 
	    for (var i = 0; i < 8; i++)
	        if (i != hole && i != hole + 1) 
	            this.addOnePipe(400, i * 60 + 10);

	  	this.score += 1;  
		this.labelScore.text = this.score;  
	},
};

// Add and state the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');
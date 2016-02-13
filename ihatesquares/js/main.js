var Main = function(game){

};

Main.prototype = {

	create: function() {
        var me = this;

		//Keep track of score
		me.score = 0;

		//Keep track of whether the player is still alive
		me.playerAlive = true;

        //Enable physics
        me.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set the stage colour to white
        me.game.stage.backgroundColor = "ffffff";

		//Add the score label
		me.createScore();

        //Create the building
        me.createBuilding();

        //Add the player
        me.createPlayer();

		//Trigger a jump when the player taps the screen
		me.game.input.onDown.add(me.jumpPlayer, me);

		//Create a random generator, we will use this to spawn enemies at random
		var seed = Date.now();
		me.random = new Phaser.RandomDataGenerator([seed]);

		//Create a group for the enemies, and add some enemies
		me.enemies = me.game.add.group();
		me.enemies.enableBody = true;
		me.enemies.createMultiple(40, 'enemy');

		//Create a group for the super enemies, and add some super enemies
		me.superEnemies = me.game.add.group();
		me.superEnemies.enableBody = true;
		me.superEnemies.createMultiple(2, 'superenemy');

		//Spawn normal enemies every 0.7 seconds, super enemies every 6 seconds
		me.leftSpawner = me.game.time.events.loop(700, me.spawnLeftEnemy, me);
		me.rightSpawner = me.game.time.events.loop(700, me.spawnRightEnemy, me);
		me.superSpawner = me.game.time.events.loop(6000, me.spawnSuperEnemy, me);

		//This enemy is specifically for keeping people away from the roof!
		me.roofSpawner = me.game.time.events.loop(1000, me.spawnRoofEnemy, me);

		//Increment score
		me.scoreTimer = me.game.time.events.loop(1000, me.incrementScore, me);

		//And hit sound
		me.hitSound = me.game.add.audio('hit');

		//Do initial jump from start screen
		me.jumpPlayer();

	},

	update: function() {
		var me = this;

		//Make the player and building collide
		me.game.physics.arcade.collide(me.player, me.buildingSprite);

		//When a player collides with an enemy, trigger the 'killPlayer' method
		me.game.physics.arcade.collide(me.player, me.enemies, me.killPlayer, null, me);
		me.game.physics.arcade.collide(me.player, me.superEnemies, me.killPlayer, null, me);

		//Make enemies colide with each other, and the building
		me.game.physics.arcade.collide(me.enemies, me.enemies);
		me.game.physics.arcade.collide(me.enemies, me.buildingSprite);

		//Make super enemies collide with each other, other enemies, and the building
		me.game.physics.arcade.collide(me.superEnemies, me.superEnemies);
		me.game.physics.arcade.collide(me.superEnemies, me.enemies);
		me.game.physics.arcade.collide(me.superEnemies, me.buildingSprite);

		//Is player touching bottom? If so kill the player and let the player fall out the world
		if(me.player.body.position.y >= me.game.world.height - me.player.body.height){
			me.player.body.collideWorldBounds = false;
			me.killPlayer();
		}
	},

	//Creates the player
	createPlayer: function(){

		var me = this;

		//Add the player to the game by creating a new sprite
		me.player = me.game.add.sprite(me.game.world.centerX, me.game.world.height - me.buildingSprite.body.height, 'player');
		me.player.anchor.setTo(0.5, 1.0);
		//Enable physics on the player
		me.game.physics.arcade.enable(me.player);
		//Make the player fall by applying gravity
		me.player.body.gravity.y = 1000;
		//Make the player collide with the game boundaries 
		me.player.body.collideWorldBounds = true;
		//Make the player bounce a little
		me.player.body.bounce.y = 0.1;

	},

	//Create the platform the player stands on
	createBuilding: function(){

		var me = this,
			buildingHeight = me.game.world.height / 10,
			buildingWidth = 60 * window.devicePixelRatio,
			building = me.game.add.bitmapData(buildingWidth, buildingHeight);

		building.ctx.rect(0, 0, buildingWidth, buildingHeight);
		building.ctx.fillStyle = '#232223';
		building.ctx.fill();

		me.buildingSprite = me.game.add.sprite(me.game.world.width / 2, me.game.world.height - buildingHeight + 1, building);
		me.buildingSprite.anchor.setTo(0.5, 0);

		//Enable physics for the building
		me.game.physics.arcade.enable(me.buildingSprite);
		me.buildingSprite.enableBody = true;
		me.buildingSprite.body.immovable = true;

	},

	//Makes the player jump
	jumpPlayer: function(){
		var me = this,
			x = me.game.input.x - me.player.body.x;

		//Alter the players velocity based on where the user tapped on the screen
		if(me.playerAlive){
			me.player.body.velocity.x += 2 * x;
			me.player.body.velocity.y -= 700;
		}

	},

	//Spawn an enemy on the left side of the screen
	spawnLeftEnemy: function(){

		var me = this;
		//Retrieve a sprite from the group that has never been spawned or has been spawned and killed
		var enemy = me.enemies.getFirstDead();

		if(enemy){
			//Resetting the sprite restores all of its properties and moves it to the coordinates we give
			enemy.reset(-enemy.body.width, me.random.integerInRange(50, me.game.world.height));
			//Set the sprite to automatically be killed after 10 seconds
			enemy.lifespan = 10000;
			enemy.body.velocity.x = me.random.integerInRange(150, 300); 
			enemy.body.velocity.y = me.random.integerInRange(-50, 50); 
		}

	},

	//Spawn an enemy on the right side of the screen
	spawnRightEnemy: function(){

		var me = this;
		var enemy = me.enemies.getFirstDead();

		if(enemy){
			enemy.reset(me.game.world.width + enemy.body.width, me.random.integerInRange(50, me.game.world.height));
			enemy.lifespan = 10000;
			enemy.body.velocity.x = - me.random.integerInRange(150, 300); 
			enemy.body.velocity.y = me.random.integerInRange(-50, 50); 
		}
	},

	//Spawn an enemy along the roof
	spawnRoofEnemy: function(){

		var me = this;
		var enemy = me.enemies.getFirstDead();

		if(enemy){
			enemy.reset(me.game.world.width + enemy.body.width, 15);
			enemy.lifespan = 10000;
			enemy.body.velocity.x = - me.random.integerInRange(150, 300); 
			enemy.body.velocity.y = 0; 

			enemy.outOfBoundsKill = true;
		}
	},

	//Spawn a larger, faster enemy
	spawnSuperEnemy: function(){

		var me = this;
		var superEnemy = me.superEnemies.getFirstDead();

		if(superEnemy){
			superEnemy.reset(me.game.world.width + superEnemy.body.width, me.random.integerInRange(50, me.game.world.height));
			superEnemy.lifespan = 8000;
			superEnemy.body.velocity.x = - me.random.integerInRange(500, 1000); 
			superEnemy.body.velocity.y = me.random.integerInRange(-50, 50); 
		}
	},

	//Kills the player
	killPlayer: function(){
		var me = this;
		
		if(me.playerAlive){

			//Prevent the player from moving anymore
			me.playerAlive = false;

			//Play the death sound
			me.hitSound.play();

			//Wait a couple of seconds and then trigger the game over screen
			me.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
				//Send score to game over screen
				me.game.state.start('GameOver', true, false, me.score.toString());
			}, me);
		}

	},

	createScore: function(){

		var me = this;

		var fontSize = 50 * window.devicePixelRatio;
		var scoreFont = fontSize+"px Arial";

		me.scoreLabel = me.game.add.text((me.game.world.centerX), 100 * window.devicePixelRatio, "0", {font: scoreFont, fill: "#000"}); 
		me.scoreLabel.anchor.setTo(0.5, 0.5);
		me.scoreLabel.align = 'center';

	},

	incrementScore: function(){
		var me = this;

		me.score += 1;   
		me.scoreLabel.text = me.score; 		
	},

	gameOver: function(){
		this.game.state.start('GameOver');
	}

};
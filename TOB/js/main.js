var Main = function(game){

};

Main.prototype = {

	create: function() {
		var me = this;

		me.score = 0;
		me.createScore();
		me.scoreTimer = me.game.time.events.loop(1000, me.incrementScore, me);

		// enable physics
		me.game.physics.startSystem(Phaser.Physics.ARCADE);

		// set the stage color to white
		me.game.stage.backgroundColor = "ffffff";

		// create buildings
		me.createBuilding();

		// Add the player
		me.createPlayer();

		me.game.input.onDown.add(me.jumpPlayer, me);

		me.playerAlice = true;

		//Create a random generator, we will use this to spawn enemies at random
 		var seed = Date.now();
 		me.random = new Phaser.RandomDataGenerator([seed]);

 		// create group of enemies, and add some enemies
 		me.enemies = me.game.add.group();
 		me.enemies.enableBody = true;
 		me.enemies.createMultiple(40, 'enemy');

 		// create a group for the super enemies, and add some super enemies
 		me.superEnemies = me.game.add.group();
 		me.superEnemies.enableBody = true;
 		me.superEnemies.createMultiple(2, 'superenemy');

 		me.leftSpawner = me.game.time.events.loop(700, me.spawnLeftEnemy, me);
 		me.rightSpawner = me.game.time.events.loop(700, me.spawnRightEnemy, me);
 		me.superSpawner = me.game.time.events.loop(6000, me.spawnSuperEnemy, me);

 		// this enemy is specifically for keeping people awawy from roof
 		me.roofSpawner = me.game.time.events.loop(1000, me.spawnRoofEnemy, me);

 		me.hitSound = me.game.add.audio('hit');

 		me.jumpPlayer();
	},

	update: function() {
		var me = this;

		// make the player and building collide
		me.game.physics.arcade.collide(me.player, me.buildingSprite);

		// if touch happens, kill the player and let the player fall out the world
		if (me.player.body.position.y >= me.game.world.height - me.player.body.height){
			me.player.body.collideWorldBounds = false;
			// trigger death
			me.killPlayer();
		}

		me.game.physics.arcade.collide(me.player, me.enemies, me.killPlayer, null, me);
		me.game.physics.arcade.collide(me.player, me.superEnemies, me.killPlayer, null, me);

		//Make enemies colide with each other, and the building
		 me.game.physics.arcade.collide(me.enemies, me.enemies);
		 me.game.physics.arcade.collide(me.enemies, me.buildingSprite);
		 //Make super enemies collide with each other, other enemies, and the building
		 me.game.physics.arcade.collide(me.superEnemies, me.superEnemies);
		 me.game.physics.arcade.collide(me.superEnemies, me.enemies);
		 me.game.physics.arcade.collide(me.superEnemies, me.buildingSprite);
	},

	gameOver: function(){
		this.game.state.start('GameOver');
	},

	createPlayer: function(){
		var me = this;

		// add the player to the game by creating a new sprite
		me.player = me.game.add.sprite(me.game.world.centerX, 
			me.game.world.height - me.buildingSprite.body.height, 'player');
		me.player.anchor.setTo(0.5, 1.0);

		// enable physics on the player
		me.game.physics.arcade.enable(me.player);

		// make the player fall by applying gravity
		me.player.body.gravity.y = 1000;

		// make the player collide with the game boundaries
		me.player.body.collideWorldBounds = true;

		// make the player bounce a little
		me.player.body.bounce.y = 0.12;

	},

	createBuilding: function(){
		var me = this;
		var buildingHeight = me.game.world.height / 10;
		var buildingWidth = 60 * window.devicePixelRatio;
		var building = me.game.add.bitmapData(buildingWidth, buildingHeight);

		building.ctx.rect(0, 0, buildingWidth, buildingHeight);
		building.ctx.fillStyle = '#232223';
		building.ctx.fill();

		me.buildingSprite = me.game.add.sprite(me.game.world.width / 2,
			me.game.world.height - buildingHeight + 1, building);
		me.buildingSprite.anchor.setTo(0.5, 0);

		//enable physics for the building
		me.game.physics.arcade.enable(me.buildingSprite);
		me.buildingSprite.enableBody = true;
		me.buildingSprite.body.immovable = true;

	},

	jumpPlayer: function(){
		var me = this;
		var x = me.game.input.x - me.player.body.x;

		// after the players velocity based on where the user tapped on the screen
		if (me.playerAlice){
			me.player.body.velocity.x += 2 * x;
			me.player.body.velocity.y -= 700;
		}
	},

	spawnLeftEnemy: function(){
		var me = this;

		// Retrieve a sprite from the group that has never been spawned or has been spawned and killed
		var enemy = me.enemies.getFirstDead();

		if (enemy){
			// resetting the sprite restores all of its properties and moves it to the coordinate we give
			enemy.reset(-enemy.body.width, me.random.integerInRange(50, me.game.world.height));

			// Set the sprite to automatically be killed after 10 seconds
			enemy.lifespan = 10000;
			enemy.body.velocity.x = me.random.integerInRange(150, 300);
			enemy.body.velocity.y = me.random.integerInRange(-50, 50);
		}
	},

	spawnRightEnemy: function(){
		var me = this;

		// Retrieve a sprite from the group that has never been spawned or has been spawned and killed
		var enemy = me.enemies.getFirstDead();

		if (enemy){
			// resetting the sprite restores all of its properties and moves it to the coordinate we give
			enemy.reset(me.game.world.width + enemy.body.width, me.random.integerInRange(50, me.game.world.height));

			// Set the sprite to automatically be killed after 10 seconds
			enemy.lifespan = 10000;
			enemy.body.velocity.x = - me.random.integerInRange(150, 300);
			enemy.body.velocity.y = me.random.integerInRange(-50, 50);
		}
	},

	spawnRoofEnemy: function(){
		var me = this;
		var enemy = me.enemies.getFirstDead();

		if (enemy){
			enemy.reset(me.game.world.width + enemy.body.width, 15);
			enemy.lifespan = 10000;
			enemy.body.velocity.x = - me.random.integerInRange(150, 300);
			enemy.body.velocity.y = 0;

			enemy.outOfBoundsKill = true;
		}
	},

	spawnSuperEnemy: function(){
		var me = this;
		var superEnemy = me.superEnemies.getFirstDead();

		if (superEnemy){
			superEnemy.reset(me.game.world.width + superEnemy.body.width,
				me.random.integerInRange(50, me.game.world.height));
			superEnemy.lifespan = 8000;
			superEnemy.body.velocity.x = - me.random.integerInRange(500, 1000);
			superEnemy.body.velocity.y = me.random.integerInRange(-50, 50);
		}
	},

	killPlayer: function(){
		var me = this;

		if (me.playerAlice) {
			me.playerAlice = false;

			me.hitSound.play();

			// wait a couple of seconds and then trigger then game over screen
			me.game.time.events.add(Phaser.Timer.SECOND * 2, function(){

				// send score to game over screen
				me.game.state.start('GameOver', true, false, me.score.toString());

				//me.game.state.start('Main');

			}, me);
		}
	},

	createScore: function(){
		var me = this;

		var fontSize = 50 * window.devicePixelRatio;
		var scoreFont = fontSize+"px Arial";

		me.scoreLabel = me.game.add.text((me.game.world.centerX), 
			100 * window.devicePixelRatio, "0", {font: scoreFont, fill: "#000"});

		me.scoreLabel.anchor.setTo(0.5, 0.5);
		me.scoreLabel.align = 'center';

	},

	incrementScore: function(){
		var me = this;

		me.score += 1;
		me.scoreLabel.text = me.score;
	}

};
var game = new Phaser.Game(700, 500, Phaser.AUTO, 'game_div');

var mainState = {
    preload: function() { 
        game.load.image('character', 'assets/character.png'); 
        game.load.image('pipe', 'assets/pipe.png');
        game.load.image('staff', 'assets/staff.png')
    },

    create: function() {      

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.character = game.add.sprite(100, 245,'character');

    // Movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.character);

    this.character.body.gravity.y = 1000;  

    // Jump function
    var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);  

    this.pipes = game.add.group(); 

    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", 
     { font: "30px Arial", fill: "#ffffff" }); 
    },

    update: function() {   
    game.physics.arcade.overlap(
    this.character, this.pipes, this.restartGame, null, this);

    // Call the 'restartGame' function
    if (this.character.y < 0 || this.character.y > 490)
     this.restartGame();
    },

    jump: function() {
        this.character.body.velocity.y = -350;
    },

    // Restart the game
    restartGame: function() {
        game.state.start('main');
    },

    addOnePipe: function(x, y) {
        // Create a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');
    
        // Add the pipe to our previously created group
        this.pipes.add(pipe);
    
        // Enable physics on the pipe 
        game.physics.arcade.enable(pipe);
    
        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200; 
    
        // Automatically kill the pipe when it's no longer visible 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        // Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 5) + 1;
    
        // Add the 6 pipes 
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1) 
                this.addOnePipe(400, i * 60 + 10);   
        this.score += 1;
        this.labelScore.text = this.score;  
    },
};

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');
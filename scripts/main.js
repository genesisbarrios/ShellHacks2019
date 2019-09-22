var game = new Phaser.Game(700, 500, Phaser.AUTO, 'game_div');
var mainState = {
<<<<<<< HEAD
    preload: function(){
        game.load.image('character', '../assets/character.png');
        game.load.image('pipe', '../assets/pipe.png');
=======
    preload: function() { 
        game.load.image('character', '../assets/character.png'); 
        game.load.image('pipe', '../assets/pipe.png');
        game.load.image('staff', '../assets/staff.png')
>>>>>>> 207b6da03db70765e8421499d035f5650b2f46d1
    },

    create: function(){ 
        game.stage.backgroundColor = '#EBC8B2';
        game.physics.startSystem(Phaser.Physics.ARCADE)

        this.character = game.add.sprite(100, 245, 'character');

        game.physics.arcade.enable(this.character);

        this.character.body.gravity.y = 1000;

        var spaceKey = game.input.keyboard.addKey(
            Phaser.keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.pipes = game.add.group();

        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 

        this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", 
     { font: "30px Arial", fill: "#ffffff" });  
    },

    addOnePipe: function(x, y) {
        var pipe = game.add.sprite(x, y, 'pipe');
    
        this.pipes.add(pipe);
    
        game.physics.arcade.enable(pipe);
    
        pipe.body.velocity.x = -200; 
    
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function(){
        var hole = Math.floor(Math.random() * 5) + 1;

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1) 
                this.addOnePipe(400, i * 60 + 10);   
        this.score += 1;
        this.labelScore.text = this.score;  
    },  

    update: function(){
        game.physics.arcade.overlap(
            this.bird, this.pipes, this.restartGame, null, this);

        if(this.character.y <  0 || this.character.y > 490)
            this.restartGame();
    },

    jump: function(){
        this.charcter.body.velocity.y = -350;
    },

    restartGame: function(){
        game.state.start('main');
    }
};

game.state.add('main', mainState);

game.state.start('main');
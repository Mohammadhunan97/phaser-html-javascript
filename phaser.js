var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var score = 0;
var scoreText;
var skysky;
var restart;
var zana;
var peaceful;
var chimes;


 var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48,9); //start to end
    game.load.image('button','assets/mybutton.png');
    game.load.audio('peaceful', 'assets/peaceful.mp3');
    game.load.audio('chimes', 'assets/chimes.mp3');
}

function create() {
    peaceful = game.add.audio('peaceful');
    peaceful.play();
    chimes = game.add.audio('chimes');
    game.physics.startSystem(Phaser.Physics.ARCADE);   
    skysky = game.add.sprite(0, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;
    

    player = game.add.sprite(32, game.world.height - 250, 'dude');


    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300; //drops it down
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true); //frame index 0,1,2,3 and running at 10fps
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();

    stars.enableBody = true;

    for (var i = 0; i < 12; i++)
    {

        var star = stars.create(i * 70, 0, 'star');

      
        star.body.gravity.y = 300;

        star.body.bounce.y = 0.4 + Math.random() * 0.2;
    }
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: 'red' });



}

function update() {
   var hitPlatform = game.physics.arcade.collide(player, platforms); // COLLISION DETECTION!!!

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }    
    game.physics.arcade.collide(stars, platforms);

    game.physics.arcade.overlap(player, stars, collectStar, null, this);
 //in update it is working as of 8:43pm, kills .add.something
    if(score==120){
      scoreText.kill();
      skysky.kill();
      platforms.destroy();   
        zana = game.add.text(game.world.centerX-100, game.world.centerY, 'You Won!!!', { fontSize: '32px', fill: 'red' });
        restart = game.add.sprite(game.world.centerX-20, game.world.centerY+100, 'button');
        restart.anchor.setTo(0.5,0.5); 
        restart.inputEnabled = true;
        restart.events.onInputDown.add(onrestart, this);
    
             
    }

}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();
    chimes.play();
    score += 10;
    scoreText.text = 'Score: ' + score;
    
}

function down() {
    console.log('button down');
}

function onrestart(){
console.log("restarted");

   location.reload();


}


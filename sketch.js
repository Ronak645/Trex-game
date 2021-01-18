var play = 1;
var end = 0;
var gameState =play;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameover
var gameoverimage
var restart
var restartimage
var jumpsound
var gameoversound
var levelupsound


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameoverimage = loadImage("gameOver.png")
  restartimage = loadImage("restart.png")

  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  jumpsound=loadSound("smb_jump-small.wav")
  gameoversound=loadSound("smb_gameover.wav")
  levelupsound=loadSound("smb_pause.wav")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  gameover = createSprite(300,80,20,20)
  gameover.addImage(gameoverimage)
  gameover.scale=3
  gameover.visible=false
  
  restart = createSprite(300,100,20,20)
  restart.addImage(restartimage)
  restart.scale=0.5
  restart.visible=false
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;
  trex.setCollider("circle",0,0,30)
  trex.debug=false
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
 ;
  
  if(gameState === play){
    //move the ground
    ground.velocityX = -(4+3*score/100);
     if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
    if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -8; 
      jumpsound.play()
  }
    if(score>0&&score%100===0){
     levelupsound.play()  
       
       
       
       }
     trex.velocityY = trex.velocityY + 0.8
     spawnClouds();
  
  
  //spawn obstacles on the ground
  spawnObstacles();
   score = score + Math.round(getFrameRate()/60)
    if(trex.isTouching(obstaclesGroup)){
      gameState=end
      gameoversound.play()
      
      
      
    }
    
    
    
  }
  else if(gameState ===end){
    //stop the ground
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
  obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    trex.changeAnimation("collided",trex_collided)
    trex.velocityY=0
    restart.visible=true
    gameover.visible=true
    
    
    
  }
  
  
  
 if(mousePressedOver(restart)){
    reset()
    
    
    
    } 
  
  
  
 
  
 
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
 
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(4+3*score/100);

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -(4+3*score/100);
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}
function reset(){
  gameState=play
  
  
obstaclesGroup.destroyEach() 
  cloudsGroup.destroyEach()
  gameover.visible=false
  restart.visible=false
   trex.changeAnimation("running", trex_running);
  score=0
  
}



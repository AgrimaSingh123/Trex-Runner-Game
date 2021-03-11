var trex,trex_running,ground,invisibleGround;
var cactus,cloud,cactusGroup,cloudsGroup;
var gameState="PLAY";
var score=0;
var gameOver,restart;

function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  trex_collided=loadAnimation("trex_collided.png");
  
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
}

function setup(){
  createCanvas(600,200);
  trex=createSprite(50,150,10,20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.5;
  
  ground=createSprite(300,180,600,10);
  ground.addImage(groundImage);
  
  invisibleGround=createSprite(300,190,600,10);
  invisibleGround.visible=false;
  
  gameOver=createSprite(width/2,height/2,10,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart=createSprite(width/2,gameOver.y+30,20,10);
  restart.addImage(restartImage);
  restart.scale=0.45;
  restart.visible=false;
  
  c1=loadImage("obstacle1.png");
  c2=loadImage("obstacle2.png");
  c3=loadImage("obstacle3.png");
  c4=loadImage("obstacle4.png");
  c5=loadImage("obstacle5.png");
  c6=loadImage("obstacle6.png");
  
    console.log("Welcome to Trex-runner game!");

  cactusGroup=createGroup();
  cloudsGroup=createGroup();
}

function draw(){
  background(240);
  
  if(gameState==="PLAY"){
  ground.velocityX=-(4+3*score/100 );
  
    if(ground.x<0){
    ground.x=ground.width/2;
  }
  

  if(keyDown("space")&&trex.y>=120){
    trex.velocityY=-12;
    jumpSound.play();
  }
  
  makeClouds();
  spawnCactus();
  
  if(trex.isTouching(cactusGroup)){
    gameState="END";
    dieSound.play();
  }
      score=score+Math.round(frameCount/100);
  
    if(score>0 && score%2000===0){
      checkpointSound.play();
    }
  }
  
  if(gameState==="END"){
    trex.changeAnimation("collided", trex_collided);
    ground.velocityX=0;
    cactusGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    restart.visible=true;
    gameOver.visible=true;

  }
  
  //neutral
  trex.velocityY=trex.velocityY+0.8;
  trex.collide(invisibleGround);
  trex.depth=cactusGroup.depth;
  text("Score: "+score,520,20);
  trex.setCollider("circle",0,0,40);
  
    if(mousePressedOver(restart)){
      reset();

    }  
  trex.depth=trex.depth+1;
  drawSprites();
}

function reset(){
  gameState="PLAY";
  cloudsGroup.destroyEach();
  cactusGroup.destroyEach(); 
  gameOver.visible=false;
  restart.visible=false;
  score=0;
  trex.changeAnimation("running",trex_running);
}

function spawnCactus(){
  if(World.frameCount%60===0){
    cactus=createSprite(600,170,20,20);
    cactus.velocityX=-(6+score/100);
    var r=Math.round(random(1,6));
    switch(r){
      case 1:cactus.addImage(c1);
        break;
      case 2:cactus.addImage(c2);
        break;
        case 3:cactus.addImage(c3);
        break;
        case 4:cactus.addImage(c4);
        break;
        case 5:cactus.addImage(c5);
        break;
        case 6:cactus.addImage(c6);
        break;
        default:break;
    }
    cactus.scale=0.5;
    cactusGroup.add(cactus);
  }
}

function makeClouds(){
  if(World.frameCount%50===0){
    cloud=createSprite(600,20,40,10);
    cloud.addImage(cloudImage);
    cloud.velocityX=-3;
    cloud.scale=0.5;
    cloud.y=Math.round(random(20,130));
    cloudsGroup.add(cloud);
    cloud.depth=trex.depth-1;
  }
}


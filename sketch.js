var monkey,ground,banana,stone,invg,stoneGroup,bananaGroup,score=0,health=2,play=0,end=1,gameState=0,h1,h2,gameOver,restart,uphill,bananaImage;
var monkeyA,bananaI,StoneI,groundI,hp,gameOverI,restartI,b1;
var groundI;

function preload(){
  monkeyA = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",
"Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaI = loadImage("banana.png");
  
  stoneI = loadImage("stone.png");
  
  groundI = loadImage("jungle.jpg");

  hp = loadImage("pixel hearts.png");
  
  gameOverI = loadImage("game over.png");
  
  restartI = loadImage("restart.png");
  
 bananaImage=loadImage("banana2.png");
}
function setup() {
  createCanvas(630, 280);
  
  invg=createSprite(200,280,400,5);
  

  ground=createSprite(20,10,200,400);
  ground.addImage("ground",groundI);
  ground.setVelocity(-5,0);
   ground.y=ground.width/5;
  
 staidBanana=createSprite(535,15,50,50)
  staidBanana.addImage(bananaImage);
  staidBanana.scale=0.04;
  
  
  monkey = createSprite(70,140,10,10);
  monkey.addAnimation("monkeyG",monkeyA);
   monkey.scale=0.13;
  monkey.setVelocity(0,10);
  
  stoneGroup = createGroup();
  bananaGroup = createGroup();
  upGroup = createGroup();
  
  h1=createSprite(570,50);
  h1.addAnimation("heart1",hp);
  h1.scale=0.30;
  
  h2 = createSprite(535,50);
  h2.addAnimation("heart2",hp);
  h2.scale=0.30;
  
  gameOver = createSprite(300,130,10,10); 
  gameOver.addImage("GameOverT",gameOverI);
  gameOver.scale=0.7;
  gameOver.visible=false;

  restart = createSprite(300,215,10,10);
  restart.addImage("restartButton",restartI);
  restart.scale=0.2;
  restart.visible=false;
  
  b1 = createSprite(0,200,5,400);
  
}

function draw() {
  background(220);
  edges = createEdgeSprites();
  monkey.collide(b1);
  if(gameState===play){
     monkey.collide(upGroup);
     ground.setVelocity(-5,0);
  
      if (ground.x < 100){
        ground.x = ground.width/2;
      }
   
    if(keyDown("space")){
  monkey.setVelocity(0,-8);
     }
    
  monkey.velocityY=monkey.velocityY+0.5;
    
    if(monkey.isTouching(bananaGroup)){
     bananaGroup.destroyEach();
     score=score+1;
     }
    
    spawnObstacles();
   spawnBanana();
    
    monkeyLife();
  
    if(health===0){
     gameState="end";
     }
     }
  
  
  else if(gameState==="end"){
     monkey.visible=false;
     gameOver.visible=true;
     restart.visible=true;
    stoneGroup.destroyEach();
    bananaGroup.destroyEach();
    ground.setVelocity(0,0);
    upGroup.destroyEach();
     }
  
    
  monkey.collide(invg);
  
  if(mousePressedOver(restart)){
   reset();
  
     }
 
 
  drawSprites();
  fill("white");
  textSize(15);
  text(" : "+score,550,20);
}
  
function spawnObstacles(){
  
  if (frameCount%200===0) {
    stone = createSprite(320,247,10,10);
    stone.x=610 ;
    stone.addAnimation( "Stone",stoneI);
    stone.velocityX=-5;
    stone.lifetime=122;
    stone.scale=0.18;
    //stone.debug=true;
    stone.setCollider("rectangle",0,0,350,350);
    stoneGroup.add(stone);
     
  }
}

function spawnBanana(){
  if (frameCount%120===0) {
    banana = createSprite(610, 347,10,10);
    banana.x=610;
    banana.y=random(100,150);
    banana.addAnimation( "Banana",bananaI);
    banana.velocityX=-5;
    banana.lifetime=122;
    banana.scale=0.35;
    bananaGroup.add(banana);
  }
}

function monkeyLife(){
  if(monkey.isTouching(stoneGroup)){
  health=health-1;
  stoneGroup.destroyEach();
  
}
  if(health===2){
    h1.visible=true;
    h2.visible=true;
     }
  if(health===1){
    monkey.scale=0.13;
     h2.visible=false;
     }
  
  if(health===0){
     h1.visible=false;
     
     }
  
  switch(score){
    case 10: monkey.scale=0.12;
       break;
    case 20: monkey.scale=0.14;
       break;
    case 30: monkey.scale=0.16;
       break;
    case 40:monkey.scale=0.18;
       break; 
    case 50:monkey.scale=0.20;
       break;
    case 60:monkey.scale=0.22;  
       break;
    case 70:monkey.scale=0.24;
       break;
    case 80:monkey.scale=0.26;
       break;
         }
}


function reset(){
  gameState=play;
  monkey.visible=true;
  monkey.scale=0.13;
  gameOver.visible=false;
  restart.visible=false;
  ground.setVelocity(-5,0);
  score=0;
  health=2;
  
}
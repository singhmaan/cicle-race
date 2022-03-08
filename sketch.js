var PLAY = 1;
var END = 0;
var gameState = PLAY;

var cicleman,cicleman_running,cicleman_collided;
var cash,cash2,cashImage,cash2Image;
var clouds,cloudsImage;
var sun,sunImage;
var ground,groundImage ,invisible_ground;
var backgroundImg;
var cashScore = 0;
var Score =0;
var cashScore;
var coinScore;
var ghost,stones,stonesGroup;
var house,housesGroup;


function preload() {
  backgroundImg = loadImage("backgroundImg.png");

  jumpSound= loadSound("jump.wav");
  gameSound= loadSound("game.mp3");
  bellSound= loadSound("bell.mp3");
  gameOverSound= loadSound("gameOver.mp3");

  cicleman_running = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  cicleman_collided = loadAnimation("mainPlayer3.png");

  groundImage = loadImage("ground.png");
  cloudImage = loadImage("cloud.png");
 
  cashImage = loadImage("cash.png");
  cash2Animation= loadImage("cash.png");

  coinImage = loadImage("coin.png");
  coin2Animation = loadImage("coin.png");
  
  stone2 =loadImage("stone2.png")
  stone3 =loadImage("stone3.png");
  stone4 =loadImage("stone4.png");

  house1 =loadImage("house1.png");
  house2 =loadImage("house2.png");
  
  sunAnimation = loadImage("sun.png");
  ghost_running = loadAnimation("ghost-jumping.png","ghost-standing.png");

   gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -6 ;

  invisible_ground=createSprite(width/2,height-50,width,5)
  invisible_ground.shapeColor= "#f4cbaa";

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,400);
  restart.addImage(restartImg);
  
  gameOver.scale = 2.2;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;

cash2 = createSprite(50,30,50,50);
cash2.addAnimation("cash",cashImage);
cash2.scale= 0.1;

coin2 = createSprite(150,28,50,50);
coin2.addAnimation("coin",coinImage)
coin2.scale=0.3;

sun = createSprite(width-200,100,10,10);
sun.addAnimation("sun", sunAnimation);
sun.scale = 0.4;

  

cicleman = createSprite(200,600,60,50);
cicleman.addAnimation("running",cicleman_running);
cicleman.addAnimation("collided",cicleman_collided);
cicleman.scale=0.1;
cicleman.setCollider('circle',0,0,550);
cicleman.debug = false;

cloudsGroup = new Group();
CashesGroup = new Group();
ghostsGroup = new Group();
coinsGroup = new Group();
stonesGroup = new Group();
housesGroup = new Group();


cashScore = 0;
coinScore = 0;
Score =0;
}
function draw() {
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("c    "+ cashScore,60,35); 

  textSize(20);
  fill("black")
  text("C     "+ coinScore,140,35);

  textSize(20);
  fill("black")
  text("Score:"+ Score,230,35);

  if (gameState === PLAY) {
    Score = Score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*Score/100);

    

    if (keyDown("A")) {
      bellSound.play();
    }

   if (cicleman.isTouching(CashesGroup)) {
      CashesGroup.destroyEach();
      gameSound.play();
     
      cashScore=cashScore+50
    } 
   
    if (cicleman.isTouching(coinsGroup)) {
      coinsGroup.destroyEach();
      gameSound.play();
     
      coinScore=coinScore+1
    } 

    if((touches.length > 0 || keyDown("SPACE")) && cicleman.y  >= height-120) {
      jumpSound.play ();
      cicleman.velocityY = -17;
       touches = [];
    }

    cicleman.velocityY = cicleman.velocityY + 0.8

    cicleman.collide(invisible_ground);

    if (ground.x < 120){
      ground.x = ground.width/2;
    }

    if (cicleman.isTouching(ghostsGroup)|| cicleman.isTouching(stonesGroup)) {
      gameOverSound.play();
      gameState = END;

    }
    spawnClouds();
    spawnCashes();
    spawnGhosts();
    spawnCoins();
    spawnStones();
    spawnHouses();
  
   
  }

  else if(gameState === END){
    ground.velocityX= 0;

   
    
    cloudsGroup.setVelocityXEach(0);
    CashesGroup.setVelocityXEach(0);
    ghostsGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    stonesGroup.setVelocityXEach(0);
    housesGroup.setVelocityXEach(0);
    
    housesGroup.destroyEach();
    ghostsGroup.destroyEach();
    stonesGroup.destroyEach();
        cloudsGroup.destroyEach();
        CashesGroup.destroyEach();
        coinsGroup.destroyEach();

    cicleman.changeAnimation("collided",cicleman_collided);
    
    cicleman.x = 200;
    cicleman.y = 600

    restart.visible=true;
    gameOver.visible=true;

    cicleman.collide(ground);

    if(mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }


  
  drawSprites()
}
function spawnClouds() {
 //write code here to spawn the clouds
 if (frameCount % 60 === 0) {
  var cloud = createSprite(width+20,height-300,40,10);
  cloud.y = Math.round(random(40,250));
  cloud.addImage(cloudImage);
  cloud.scale = 1.0;
  cloud.velocityX = -3;

  
  
   //assign lifetime to the variable
  cloud.lifetime = 600;
  
  //adjust the depth
  cloud.depth = cicleman.depth;
  cicleman.depth = cicleman.depth+1;
  
  //add each cloud to the group
  cloudsGroup.add(cloud);
}
  }
  function spawnCashes() {
    //write code here to spawn the Cashes
    if (frameCount % 378 === 0) {
     var cash = createSprite(width+20,height-300,40,10);
     cash.y = Math.round(random(300,530));
     cash.addImage(cashImage);
     cash.scale = 0.2;
     cash.velocityX = -3;

     cash.velocityX = -(6 + 3*Score/100);
     
      //assign lifetime to the variable
     cash.lifetime = 600;

     cash.setCollider('circle',0,0,150);
     cash.debug=false;
     
     //adjust the depth
     cash.depth = cicleman.depth;
     cicleman.depth = cicleman.depth+1;
     
     //add each cloud to the group
     CashesGroup.add(cash);
   }
     }
     function spawnGhosts() {
      //write code here to spawn the Ghosts
      if (frameCount % 367 === 0) {
       var ghost = createSprite(width+20,height-300,40,10);
       ghost.y = Math.round(random(550,550));
       ghost.addAnimation("running",ghost_running);
       ghost.scale = 0.5;
       ghost.velocityX = -3;
  
       ghost.velocityX = -(6 + 3*Score/100);
       
        //assign lifetime to the variable
       ghost.lifetime = 600;

       ghost.setCollider('circle',0,0,70);
       ghost.debug=false;
       
       //adjust the depth
       ghost.depth = cicleman.depth;
       cicleman.depth = cicleman.depth+1;
       
       //add each cloud to the group
       ghostsGroup.add(ghost);
     }
       }

       function spawnCoins() {
        //write code here to spawn the Coins
        if (frameCount % 226 === 0) {
         var coin = createSprite(width+20,height-300,40,10);
         coin.y = Math.round(random(300,520));
         coin.addImage(coinImage);
         coin.scale = 0.5;
         coin.velocityX = -3;
    
         coin.velocityX = -(6 + 3*Score/100);
         
          //assign lifetime to the variable
         coin.lifetime = 600;
  
         coin.setCollider('circle',0,0,40);
         coin.debug=false;
         
         //adjust the depth
         coin.depth = cicleman.depth;
         cicleman.depth = cicleman.depth+1;
         
         //add each cloud to the group
         coinsGroup.add(coin);
       }
         }

         function spawnStones() {
          if(frameCount % 536 === 0) {
            var stone = createSprite(width-10,height-95,20,30);
            stone.setCollider('circle',0,0,45)
            // stone.debug = true
          
            stone.velocityX = -(6 + 3*Score/100);
            
            //generate random stones
            var rand = Math.round(random(1,3));
            switch(rand) {
              case 1: stone.addImage(stone2);
                      break;
              case 2: stone.addImage(stone3);
                      break;
              case 3: stone.addImage(stone4);
                      break;
              default: break;
            }

            stone.setCollider('circle',0,0,20)
            stone.debug=false
            
            //assign scale and lifetime to the stone           
            stone.scale = 2.2;
            stone.lifetime = 650;
            stone.depth = cicleman.depth;
            cicleman.depth +=1;
            //add each obstacle to the group
            stonesGroup.add(stone);
          }
        }
        
        function spawnHouses() {
          if(frameCount % 1000 === 0) {
            var house = createSprite(width-10,height-200,20,30);
            house.setCollider('circle',0,0,45)
            // stone.debug = true
          
            house.velocityX = -(6 + 3*Score/100);
            
            //generate random stones
            var rand = Math.round(random(1,2));
            switch(rand) {
              case 1: house.addImage(house1);
                      break;
              case 2: house.addImage(house2);
                      break;
              default: break;
            }
            
            //assign scale and lifetime to the stone           
            house.scale = 2.8;
            house.lifetime = 650;
            house.depth = cicleman.depth;
            cicleman.depth +=1;
            //add each obstacle to the group
            housesGroup.add(house);
          }
        }
         
        
       function reset(){
        gameState = PLAY;
        gameOver.visible = false;
        restart.visible = false;
        
        ground.velocityX=0;
        ghostsGroup.destroyEach();
        cloudsGroup.destroyEach();
        CashesGroup.destroyEach();
        housesGroup.destroyEach();
        stonesGroup.destroyEach();
        


        
        cicleman.changeAnimation("running",cicleman_running);
        
        Score = 0;
        cashScore=0;
        coinScore=0
        
      }
var night;
var morning;
var rm=0;
var ground,g,g1,g2;
var runner,run;
var hauntedhouse, haunt;
var bat1,bat;
var batsGroup,goldGroup,ghostGroup,bulletGroup,runnerGroup;
var gun,gun1;
var bullet;
var ghost,ghost1;
var goldbar,gold;
var score=0;
var distance = 0;
var playerLife = 3;
gameState='START'
var restart1,restart;


function preload(){
  night = loadImage("night1.png");
  morning = loadImage("morning.png");
 //ground = loadImage("ground.png");
 g = loadImage("g2.png");
 run = loadImage("runner1.png");
 hauntedhouse = loadImage("hauntedh.png");
 bat1 = loadImage("killer bat.png");
 gun1 = loadImage("gun.png");
 ghost1 = loadImage("ghost.png");
 goldbar = loadImage("gbar.png");
 restart1 = loadImage("Restart.png");
 sbg = loadImage("start.jpg");
 output = loadImage("end.png")
 shootSound = loadSound('shoot.mp3');
 defeatSound = loadSound('game-lose.mp3');
 ScoreSound = loadSound('Score.mp3');
 hitsound = loadSound('Steam-hiss-sound-effect.mp3');
 scarySound = loadSound('scary.mp3');

}

function setup() {
  createCanvas(800,400);
  g1 =createSprite(200, 370, 50, 50);
   g2 = createSprite(700,370,50,50);
   runner = createSprite(300,270,50,50);
   haunt = createSprite(50,270,20,50);
   //gun = createSprite(310,250,50,50);
   batsGroup = new Group();
   goldGroup = new Group();
   bulletGroup =new Group();
   runnerGroup = new Group();
   ghostGroup = new Group();
   restart = createSprite(400,220,30,20);
  restart.addImage("Restart",restart1);
  restart.scale = 0.5;
   
   g1.addImage("ground",g);
   g2.addImage("g2",g);
   runner.addImage("runner1",run);
   haunt.addImage("hauntedh",hauntedhouse);
   //gun.addImage("gun",gun1)
   g1.scale = 1;
   g2.scale = 1;
   runner.scale = 0.2;
   haunt.scale = 0.4;
   //gun.scale = 0.2;
   g1.velocityX = -3;
   g2.velocityX = -3;
   //runner.velocityX = 1;
  // gun.velocityX = 1;
   //gun.x = runner.x;
   //gun.y = runner.y;
   runnerGroup.add(runner)
   
}

function draw() {
  if(gameState === 'START'){
    background(sbg)
    textSize(20);
    restart.visible = false
    textFont("Algerian")
    fill("yellow");
    textSize(30)
    text("THE ESCAPE OF HOUSE NO. 666",230,50)
    fill("yellow");
    textFont("bold")
    textSize(20);
    text("GOSH!! YOU ESCAPED THE HAUNTED HOUSE ",230,260);
    fill("yellow")
    text("PRESS 'ENTER' TO START RUNNING",260,300);
  if (keyDown("ENTER")){
      gameState = 'PLAY';
      scarySound.play();
  }
  }
  if(gameState==='PLAY'){
    restart.visible = false
    runner.visible = true
     g1.visible =true
     g2.visible = true
     haunt.visible = true
     
    if(frameCount%1000 === 0){
      rm = rm+1
      background(255)
    }
    if(rm%2===0){
      background(night);
     
  
    }if(rm%2!==0){
      background(morning);
  
    }
    if(g1.x<0){
     g1.x = 200;
     g2.x = 700;
    }
   
   if(keyDown("UP_ARROW")){
    runner.y = runner.y -5;
    //gun.y = gun.y -5;
  }
  
  if(keyDown("DOWN_ARROW")){
    runner.y = runner.y +5;
    //gun.y = gun.y +5;
  }
  //if(keyDown("RIGHT_ARROW")){
    //runner.x = runner.x +5;
    //g//un.x = gun.x +5;
  //}
  //if(keyDown("LEFT_ARROW")){
   // runner.x = runner.x -5;
    //gun.x = gun.x -5;
  //}
  
  if(keyDown("SPACE")){
    bullet = createBullet();
    bullet.shapeColor ="blue";
    bullet.x = runner.x;
    bullet.y = runner.y;
    bulletGroup.add(bullet);
  }
  
   
   
   
   if(batsGroup.isTouching(runnerGroup)){
      playerLife--
      hitsound.play();
      batsGroup.destroyEach();
      //score = score-1
   }
   if(goldGroup.isTouching(runnerGroup)){
    playerLife++
    ScoreSound.play();
    goldGroup.destroyEach();
    
  }
    if(bulletGroup.isTouching(batsGroup)){
     score = score+5;
     shootSound.play();
     batsGroup.destroyEach();
     bulletGroup.destroyEach();
   }
  
   if(bulletGroup.isTouching(ghostGroup)){
    score = score+5;
    shootSound.play();
    ghostGroup.destroyEach();
    bulletGroup.destroyEach();
  }
  
    if(ghostGroup.isTouching(runnerGroup)){
     playerLife = playerLife -1;
     hitsound.play();
     ghostGroup.destroyEach()
    }
   
    if(frameCount%150 ===0){
     batsGroup.velocityX = -(6 + 3*score/100);
     ghostGroup.velocityX = -(6 + 3*score/100);
    }
   
    if(frameCount%5===0){
      distance = distance+1
    }
   
   
   
   
   
   
  
    edges = createEdgeSprites();
      runner.collide(g1);
      runner.collide(g2);
      runner.collide(edges[2]);
      //gun.collide(g1);
      //gun.collide(g2);
      //gun.collide(edges[2])
    
   
    
      textSize(30);
      textFont("Algerian");
      fill("black");
      text(("SCORE: "+score),20,30);
      text("LIVES: " + playerLife , 200,30)
      textSize(30);
      textFont("Algerian");
      fill("black");
      text(("DISTANCE: "+distance),500,30);
   


    spawnBats();
    spawngoldBars();
    spawnGhosts();
    if(playerLife === 0){
      gameState='END'
      scarySound.stop();
      defeatSound.play();
    }
    //scarySound.play();
    drawSprites();
  }

  if(gameState==='END'){
    background(output)
    ghostGroup.destroyEach()
    batsGroup.destroyEach()
    goldGroup.destroyEach()
    runner.visible = false
    g1.visible = false
    g2.visible = false
    haunt.visible = false
    bulletGroup.destroyEach()
    //g1.destroy()
    //g2.destroy()
    //haunt.destroy()
    
    textSize(30)
    fill("red")
    text("AWH ! SNAP! THE GHOST CAUGHT YOU :(",100,150)
   
   restart.visible = true
  
  
    distance =0;
    if(mousePressedOver(restart)){
      gameState = 'PLAY'
      restart.visible = false;
      score = 0;
      distance = 0;
      playerLife =2;
      scarySound.play();
    }
    drawSprites();
  }

 

}
function spawnBats(){
 
  if(frameCount%150 === 0){
   bat = createSprite(800,random(50,300),20,30);
    bat.addImage("killer bat",bat1);
    bat.velocityX = -(4+distance/100);
    bat.Lifetime = 200;
    bat.scale = 0.1;
    batsGroup.add(bat);
  }
}
function createBullet(){
 var bullet1 = createSprite(310,250,30,10);
 bullet1.Lifetime = 200;
 bullet1.velocityX =6;
 return bullet1;
}
function spawngoldBars(){
  if (frameCount%500 ===0){
    gold = createSprite(800,random(299,310),40,30);
    gold.addImage("gbar",goldbar);
    gold.scale =0.2;
    gold.Lifetime = 200;
    gold.velocityX = -(4+distance/100);
    goldGroup.add(gold);

  }
}
function spawnGhosts(){
  if(frameCount%900 ===0){
    ghost = createSprite(800,random(50,300),30,40);
    ghost.addImage("ghost",ghost1);
    ghost.scale = 0.1;
    ghost.Lifetime = 200;
    ghost.velocityX = -(4+distance/100);
    ghostGroup.add(ghost)
  }
}


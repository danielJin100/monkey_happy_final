var pos = 200;
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage, jungle;
var FoodGroup, obstacleGroup
var score = 0;
var gamestate = "play";
var shift = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungle = loadImage("jungle.jpg");
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
}



function setup() {
  var camera = new Camera(200, 200, 100);
  createCanvas(400, 400);
  ground = createSprite(200, 395, 400, 40);
  monkey = createSprite(50, 340);
  monkey.velocityX = 3;
  monkey.addAnimation('running', monkey_running)
  monkey.scale = 0.1;
  
}


function draw() {
  stroke(255);
  background(255);
  drawSprites();
  pos += 3;
  ground.velocityX = 3;
  camera.position = {x: pos, y: 200};
  monkey.velocityY++;
  monkey.collide(ground);
  monkey.scale = floor(score/10+1)/20 + 0.05;
  if(gamestate === "play"){
    if(keyIsDown(32)){
      monkey.velocityY = -10;
    }
    if(frameCount % 300 === 0){
      createObstacles();
    }
    if(frameCount % 80 === 0){
      createFood();
    }
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.removeSprites();
      score += 2;
    }
    if(monkey.isTouching(obstacleGroup)){
      gamestate = "end";
    }
    
  } else {
    obstacleGroup.velocityX = 0;
    FoodGroup.velocityX = 0;
  }
  text("score: " + score, pos, 20);
}

function createObstacles(){
  var obstacle = createSprite(230 + pos, 360)
  obstacle.addImage('obstacle', obstacleImage)
  obstacle.scale = 0.2;
  obstacle.lifetime = 150;
  obstacleGroup.add(obstacle);
}

function createFood(){
  var food = createSprite(230 + pos, random(0, 300))
  food.addImage('food', bananaImage)
  food.scale = 0.2;
  food.lifetime = 150;
  FoodGroup.add(food);
}







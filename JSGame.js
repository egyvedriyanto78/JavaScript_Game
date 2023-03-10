var gridSize
var space

var player
var food
var poison
var boss
var dir
var dev
var lvl
var attack

var bag
var bags
var maps

var score = 0

document.addEventListener('keydown', function(k){
  dir = k.code
})



function setup(){
  createCanvas(400, 400)
  rectMode(CENTER)
  // frameRate(10)
  
  bag = loadImage('bag3.png');
  bagS = loadImage('bag3Super.png');
  gridSize = 20
  space = width/gridSize
  
  player = new Player()
  food = new Food()
  dev = new Develope()
  poison = new Poison()
  boss = new BigPoison()
  lvl = new Level()
  attack = new Attack()
  maps = new Map()

}

function draw(){
  background(40, 60, 80)
  
  if(!player.dead){
    maps.showMap()
    player.move()
    player.edges()
    player.eat()
    player.show()
    
    lvl.currentLevel()
    lvl.latestLevel()
    lvl.maxLevel()

    food.show()
    poison.show()
    boss.show()
    attack.show()
    
    textAlign(CENTER)
    fill('#d9c3f7');
    textFont('Courier')
    textSize(20); 
    text("Score: " + score, 200, 25);
  }else{
    background(0, 0, 0)
    fill('#00ffff')
    textFont('Algerian')
    textSize(35);
    text("--Game Over--", 200, 200)
    dev.show()
  }
  
  
  
  noFill()
  
  rect(width/2, height/2, width, height)
  
}

class Player{
  constructor(){
    this.pos = createVector(200, 200)
    
    this.dead = false
  }
  
  move(){
    if (dir === 'ArrowRight'){
      this.pos.x += space
    }else if(dir === 'ArrowLeft'){
      this.pos.x -= space
    }else if(dir === 'ArrowUp'){
      this.pos.y -= space
    }else if(dir === 'ArrowDown'){
      this.pos.y += space 
    }
  }
  
  edges(){
    if(this.pos.x === 0 || this.pos.x === width || this.pos.y === 0 || this.pos.y === height){
      this.dead = true
    }
  }
  
  eat(){
    if (this.pos.x === food.x && this.pos.y === food.y){
      score++
      food.newPos()
      poison.newPos()
      boss.newPos()
      attack.newPos()
    }else if(this.pos.x === poison.x && this.pos.y === poison.y){
      score-=3;
      food.newPos()
      poison.newPos()
      boss.newPos()
      attack.newPos()
    }else if(this.pos.x === attack.x && this.pos.y === attack.y){
      score += 5;
      food.newPos()
      poison.newPos()
      boss.newPos()
      attack.newPos()
      maps.showMaps()
    }else if(this.pos.x === boss.x && this.pos.y === boss.y){
      player.dead = true;
    }else if(this.pos.x === attack.x && this.pos.y === attack.y){
      score += 5;
      food.newPos()
      poison.newPos()
      boss.newPos()
      attack.newPos()
      maps.showMaps()
    }
  }
  show(){
    noStroke()
    fill(255, 255, 127)
    rect(this.pos.x, this.pos.y, space, space, 5) 
  }
}

class Food{
  constructor(){
    this.x = floor(random(1, gridSize)) * space
    this.y = floor(random(1, gridSize)) * space
  }
  
  newPos(){
    this.x = floor(random(1, gridSize)) * space
    this.y = floor(random(1, gridSize)) * space
  }
  
  show(){
    noStroke()
    fill(255, 50, 50)
    rect(this.x, this.y, space/2, space/2, 8)
  }
}

class Poison extends Food{
  show(){
    noStroke()
    fill(128, 0, 128)
    rect(this.x, this.y, space/2, space/2, 8)
  }
}

class BigPoison extends Food{
  const(){
    if(score%4==0){
      this.x = floor(random(1, gridSize)) * space
      this.y = floor(random(1, gridSize)) * space
    }else{
      this.x = 500;
      this.y = 500;
    }
  }
  
  newPos(){
    if(score%4==0){
      this.x = floor(random(1, gridSize)) * space
      this.y = floor(random(1, gridSize)) * space
    }else{
      this.x = 500;
      this.y = 500;
    }
  }
  
  show(){
    if(score%4==0 && score!=0){
      noStroke()
      fill(0, 0, 0)
      rect(this.x, this.y, space/2, space/2, 8)
    }
  }
}

class Attack extends Food{
  const(){
    if(score%10==0){
      this.x = floor(random(1, gridSize)) * space
      this.y = floor(random(1, gridSize)) * space
    }else{
      this.x = 500;
      this.y = 500;
    }
  }
  
  newPos(){
    if(score%10==0){
      this.x = floor(random(1, gridSize)) * space
      this.y = floor(random(1, gridSize)) * space
    }else{
      this.x = 500;
      this.y = 500;
    }
  }
  
  show(){
    if(score%10==0 && score!=0){
      noStroke()
      fill(255, 255, 0)
      rect(this.x, this.y, space/2, space/2, 8)
    }
  }
}

class Level{
  //frameRate = speed
  currentLevel(){
    if(score<8){
      textAlign(CENTER)
      fill('#d9c3f7');
      textFont('Courier')
      textSize(20); 
      text("EASY", 200, 390);
      frameRate(8)
    }
  }
  
  latestLevel(){
    textAlign(CENTER)
    textFont('Courier')
    textSize(20); 
    if(score>=8 && score<15){
      fill('#00FF00');
      text("MEDIUM", 200, 390);
      frameRate(12)
    }else if(score>=15 && score<21){
      fill('#00FFFF');
      text("HARD", 200, 390);
      frameRate(16)
    }else if(score>=21 && score<26){
      fill('#ff7f50');
      text("EXTREME", 200, 390);
      frameRate(20)
    }
  }
 
  maxLevel(){
    if(score>=26){
      textAlign(CENTER)
      fill('#ff0000');
      textFont('Courier')
      textSize(20); 
      text("NIGHTMARE", 200, 390);
      frameRate(24)
    }
  }
}

class Map{
  constructor(){
    bag = loadImage('mapB.png');
    bagS = loadImage('mapS.png');
  }
  
  showMap(){
    image(bag, -2200, -1000);
  }
  
  showMaps(){
    image(bagS, -2200, -1000);
  }
  
}

class Develope{
  constructor(){
      
  }
  
  show(){
    textAlign(CENTER)
    fill('#Ff0000')
    textFont('Courier')
    textSize(20);
    if(score == 0 || score == 1 || score == -1){
      text("Your score is " + score + " point", 200, 150);
    }else{
      text("Your score is " + score + " points", 200, 150);
    }
    
    if(score<8){
      text("Level : EASY", 200, 120)
    }else if(score>=8 && score<15){
      text("Level : MEDIUM", 200, 120)
    }else if(score>=15 && score<21){
      text("Level : HARD", 200, 120)
    }else if(score>=21 && score<26){
      text("Level : EXTREME", 200, 120)
    }else{
      text("Level : NIGHTMARE", 200, 120)
    }
    // textAlign(CENTER)
    fill('#ffffff')
    // textFont('Courier')
    textSize(12);
    text("Developed by: \nAuvar Mahsa Fahlevi \nEgy Vedriyanto \nMuhamad Hafiz Atsal", 200, 230);
  }
}

function score(){
  if(player.move === player.food){
    score++
  }
}

//Create variables here

var dogImg;
var dog
var happyDogImg;
var happyDog
var database;
var foodS;
var foodStock;
var feedTime, lastFed;
var foodObject;

function preload(){
dogImg=loadImage("images/dogImg.png");
happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database()
  createCanvas(1000, 400);
  object=new Food();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);  
  dog=createSprite(800,200,150,150)
  dog.addImage(dogImg)
  dog.scale=0.15
  
 

  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  
}


function draw() {  
  background(46,139,87)
  object.display()
  feedTime=database.ref('FeedTime')
  feedTime.on("value",function(data){
    lastFed=data.val()
  })
  fill("white")
  textSize(15)
  if(lastFed>=12){
    text("LastFed"+lastFed%12+"pm",350,30)
  }
  else if(lastFed===0){
    text("lastFed:12am",350,30)
  }
  else{
    text("LastFed"+lastFed+"am",350,30)
  }
  drawSprites();
  //add styles here
  
}
function readStock(data){
  foodS=data.val()
  object.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDogImg)
var foodStockValue=object.getFoodStock()
if(foodStockValue<=0){
  object.updateFoodStock(foodStockValue*0)
}
  else{
    object.updateFoodStock(foodStockValue-1)
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
foodS++
database.ref('/').update({
  Food:foodS
})
}
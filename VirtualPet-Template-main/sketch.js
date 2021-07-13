var dog,sadDog,happyDog;
var FoodStock;
var foodObj;
var foodS;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();
  FoodStock = database.ref('Food');
  FoodStock.on("value", readStock);

  foodObj = new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

}

function draw() {
  background(46,139,87);

  foodObj.display();
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  //foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.geFoodStock()*0);
  }

  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}


var chao1, teto, cubo, cuboImage, cubo2, flor;
var grupo, pointGroup;
var song, cam;

//Função Pre-load
function preLoad (){
  song = loadSound ("song18.mp3");
  //cuboImage = loadImage ("cubo.gif");
  //cubo2 = loadImage ("cuboExplode.gif");
  //flor = loadImage ("pts1.gif");
}



// Função Setup
function setup() {
  createCanvas (600,400, WEBGL);
  //câmera ligada
  cam = createCamera ();
 
  //criar sprites
  
  chao1 = createSprite (200, 500, 400, 200);
  chao1.shapeColor = "#aa686b";
  
  teto = createSprite (200, 200, 600, 300);
  teto.shapeColor = "#aa686b";
  
  cubo = createSprite(200,395,50,50);
  cubo.addAnimation("cuboImage","cubo.gif");
  cubo.addAnimation("cuboExplode","cuboExplode.gif");
  cubo.scale = 0.05;
  
  //criar grupos
  pointGroup = new Group();
  grupo = new Group();
  
  

  //subindo som
  //song.play();
}

//criar variáveis de pontuação
var pontuacao=0;
var pontoC=0;
//Variável de posição x do sprite para aumento
var spriteXval=5;

//Função DRAW
function draw() {
  //Limpar tela
  background("black");
  //move (cubo.x,cubo.y,0);
  //Fixar a câmera no cubo
  cam.setPosition(cubo.x, cubo.y,100);
  //Efeito de rolamento
  cubo.rotationSpeed =10;
  //Aumentar a posição x para o sprite, para fazer com que pareça que está rolando
  console.log(cubo);
  cubo.x = cubo.x + spriteXval;
  //Mudar piso e teto
  chao1.x = chao1.x + spriteXval;
  teto.x = teto.x + spriteXval;
  //Quando a tecla para CIMA for pressionada
  if (keyWentDown("up")) {
    cubo.velocityY=-5;
    setTimeout(function() {
      cubo.velocityY = cubo.velocityY +10;
    }, 500);
    //playSound("sound://category_jump/vibrant_game_jumping_up_1.mp3", false);
  }
  //Para evitar que o cubo caia abaixo do chão
  cubo.collide(chao1);
  //definir colisor do solo
  chao1.setCollider("rectangle", 0, -5, 395, 180);
  //Para evitar que o cubo vá para cima
  cubo.collide(teto);
  //Chamar função para colocar os obstáculos
  spawn();
  spawnPoints();
  //Quando sprite toca os obstáculos
  if(grupo.isTouching(cubo)){
    cubo.changeAnimation("cuboExplode");
    cubo.x=cubo.x-200;
    chao1.x=chao1.x-200;
    teto.x=teto.x-200;
    setTimeout(function() {
      cubo.changeAnimation("cuboImage");
    }, 200);
    //playSound("sound://category_hits/vibrant_game_dirty_desolve_1.mp3", false);
  }
  //Quando o sprite coleta pontos
  for (var i = 0;i<pontoC;i++){
  if (pointGroup.get(i) != undefined && pointGroup.get(i).isTouching(cubo))
    {
      pointGroup.get(i).destroy();
      //playSound("sound://category_collect/energy_bar_recharge_4.mp3", false);
      pontuacao=pontuacao+100;
    }
  }

  //Exibir pontuação
  fill("White");
  textSize(20);
  text("Pontuação: "+pontuacao, cubo.x+50,250);
  drawSprites();
  }
//******************Função para gerar obstáculos*************************************
function spawn(){
//Variáveis de dimensão
var distNum=Math.round(random(30,100));
var distNum2=Math.round(random(30,100));
var obsW=Math.round(random(10,40));
var obsH=Math.round(random(10,40));
if(distNum == distNum2){
var obs1 = createSprite(cubo.x+300, 395,obsW,obsH);
obs1.shapeColor=chao1.shapeColor;
obs1.lifetime=100;
grupo.add(obs1);
}
}
//********************Função para gerar pontos***********************************
function spawnPoints(){
var distNum = Math.round(random(30,100));
var distNum2 = Math.round(random(30,100));
if(distNum==distNum2){
var pts1 = createSprite(cubo.x+200, Math.round(random(100,300)),10,10);
pts1.addAnimation("flor","pts1.gif");
pts1.setCollider("rectangle", 0, 0,40, 40);
pts1.scale = 0.05;
pts1.lifetime=100;
pointGroup.add(pts1);
pontoC=pontoC+1;
}
}

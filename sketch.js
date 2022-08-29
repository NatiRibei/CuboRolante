
var chao1, teto, cubo, cuboImage, cubo2, flor;
var grupo, pointGroup;
var song, camera;

//Função Pre-load
function preLoad (){
  song = loadSound ("song18.mp3");
  cuboImage = loadImage ("cubo.gif");
  cubo2 = loadImage ("cuboExplode.gif");
  flor = loadImage ("pts1.gif");
}



// Função Setup
function Setup(){
  //criar sprites
  chao1 = rectangle (200, 600, 600, 200);
  chao1.shapeColor = "#aa686b";
  
  teto = rectangle (200, 150, 600, 300);
  teto.shapeColor = "#aa686b";
  
  cubo = createSprite(200,490);
  cubo.addAnimation(cuboImage);
  cubo.scale = 0.25;
  
  //criar grupos
  pointGroup = new Group();
  grupo = new Group();

  //câmera ligada
  camera = createCamera ();

  //subindo som
  
}

//criar variáveis de pontuação
var pontuacao=0;
var pontoC=0;
//Variável de posição x do sprite para aumento
var spriteXval=5;

//tocar som de jogo
//song.play();
//Função DRAW
function draw() {
  //Limpar tela
  background("black");
  //Fixar a câmera no cubo
  //camera.move (cubo.x, cubo.y,0,0,0,0,0,0,0);
  //Efeito de rolamento
  //cubo.rotationSpeed =10;
  //Aumentar a posição x para o sprite, para fazer com que pareça que está rolando
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
    playSound("sound://category_jump/vibrant_game_jumping_up_1.mp3", false);
  }
  //Para evitar que o cubo caia abaixo do chão
  cubo.collide(chao1);
  //definir colisor do solo
  chao1.setCollider("rectangle", 0, 3.5, 600, 180);
  //Para evitar que o cubo vá para cima
  cubo.collide(teto);
  //Chamar função para colocar os obstáculos
  spawn();
  spawnPoints();
  //Quando sprite toca os obstáculos
  if(grupo.isTouching(cubo)){
    cubo.addAnimation(cubo2);
    cubo.x=cubo.x-200;
    chao1.x=chao1.x-200;
    teto.x=teto.x-200;
    setTimeout(function() {
      cubo.addAnimation(cuboImage);
    }, 200);
    playSound("sound://category_hits/vibrant_game_dirty_desolve_1.mp3", false);
  }
  //Quando o sprite coleta pontos
  for (var i = 0;i<pontoC;i++){
  if (pointGroup.get(i) != undefined && pointGroup.get(i).isTouching(cubo))
    {
      pointGroup.get(i).destroy();
      playSound("sound://category_collect/energy_bar_recharge_4.mp3", false);
      pontuacao=pontuacao+100;
    }
  }

  //Exibir pontuação
  fill("White");
  textSize(20);
  text("Pontuação: "+pontuacao, cubo.x-200,380);
  drawSprites();
  }
//******************Função para gerar obstáculos*************************************
function spawn(){
//Variáveis de dimensão
var distNum=randomNumber(30,100);
var distNum2=randomNumber(30,100);
var obsW=randomNumber(10,40);
var obsH=randomNumber(10,40);
if(distNum == distNum2){
var obs1 = createSprite(sprite.x+300, 490,obsW,obsH);
obs1.shapeColor=chao1.shapeColor;
obs1.lifetime=100;
grupo.add(obs1);
}
}
//********************Função para gerar pontos***********************************
function spawnPoints(){
var distNum = randomNumber(30,100);
var distNum2 = randomNumber(30,100);
if(distNum==distNum2){
var pts1 = createSprite(sprite.x+300, randomNumber(400, 430),10,10);
pts1.addAnimation(flor);
pts1.setCollider("rectangle", 0, 0,40, 40);
pts1.scale = 0.2;
pts1.lifetime=100;
pointGroup.add(pts1);
pontoC=pontoC+1;
}
}

var ancho=screen.width
var alto=screen.height-209
var saltando=false
function preload() {
    fondo=loadImage("fondo final.png")
    correr=loadAnimation("m4.png","m3.png","m2.png","m3.png")
    nomover=loadAnimation("m1.png")
    saltar=loadAnimation("m5.png")
    gumbacamina=loadAnimation("g1.png","g2.png")
    gumbamuere=loadAnimation("g3.png")
    tubol=loadImage("tubol.png")
    tuboc=loadImage("tuboc.png")
}

function setup() {
    canvas = createCanvas(ancho, alto);
    fondo1=createSprite(ancho/2,alto/2,ancho,alto)
    fondo2=createSprite(ancho+ancho/2,alto/2,ancho,alto)
    fondo2.shapeColor="red"
    marco=createSprite(141,alto-100)
    suelo=createSprite(ancho/2,alto-70, ancho*3,10)
    marco.scale=3.2
    marco.addAnimation("correr",correr)
    marco.addAnimation("nomover",nomover)
    marco.addAnimation("saltar",saltar)
    fondo.resize(ancho,alto)
    fondo1.addImage(fondo)
    fondo2.addImage(fondo)
    frameRate(40)
    grupogumba=createGroup()
    grupotubo=createGroup()
    bordes=createEdgeSprites()
    suelo.visible=false
}

function draw() {
    image(fondo,0,0,ancho,alto)
    marco.collide(suelo)
    gumbaemerge()
    tuboemerge()
    drawSprites()
    if(fondo1.x<=-ancho/2){
        fondo1.x=ancho+ancho/2
    }
     if(fondo2.x<=-ancho/2){
        fondo2.x=ancho+ancho/2
    }
    if(keyDown(RIGHT_ARROW)){
        marco.mirrorX(+1)
        marco.changeAnimation("correr",correr)
        if(marco.x>610){
            fondo1.x-=10
            fondo2.x-=10
            grupogumba.forEach(element => {
                element.velocity.x=-12
            });
        }
        else{
            marco.x=marco.x+7
            grupogumba.forEach(element => {
                element.velocity.x=-4
            });   
        }
    }
    else if(keyDown(LEFT_ARROW)){
        marco.x=marco.x-7
        marco.mirrorX(-1)
        marco.changeAnimation("correr",correr)
    }
    else if(keyDown(UP_ARROW)&&marco.y>360 &&!saltando){
        saltando=true
    marco.velocity.y=-10
    marco.changeAnimation("saltar",saltar)
    }
    if(!keyDown(RIGHT_ARROW)){
        grupogumba.forEach(element => {
            element.velocity.x=-4
        });   
    }
    marco.velocity.y=marco.velocity.y+0.5
    if(marco.y>alto-100){
        saltando=false
    }
    if(!keyDown(LEFT_ARROW)&&!keyDown(RIGHT_ARROW)&&!keyDown(UP_ARROW)){
        marco.changeAnimation("nomover",nomover)
    }
    marco.overlap(grupogumba, gumbaestrellado)
    marco.collide(bordes)
}
function gumbaemerge(){
    var tiempo=Math.round(random(1,10))
    if(frameCount%160==0){
    var gumba=createSprite(ancho+507,alto-100)
    gumba.addAnimation("gumbacamina",gumbacamina)
    gumba.addAnimation("gumbamuere",gumbamuere)
    gumba.velocity.x=-4
    gumba.scale=3
    grupogumba.add(gumba)
    }
}
function gumbaestrellado(marco, gumba) {
if (marco.touching.bottom) {
    gumba.changeAnimation("gumbamuere")
    gumba.velocity.x=0
} else {
    
}
}
function tuboemerge(){
    var tipoTubo=Math.round(random(0,1))
    if(frameCount%160==0){
    var tubo=createSprite(ancho+507,alto-120)
    if (tipoTubo==1) {
        tubo.addImage(tubol)
        tubo.y=alto-147
    }
    else{tubo.addImage(tuboc)}
    tubo.velocity.x=-10
    tubo.scale=3
    grupotubo.add(tubo)
    }
}
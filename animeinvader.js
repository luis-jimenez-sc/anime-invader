
window.addEventListener("load", cargar);

function cargar() {
    var lienzo = document.getElementById("lienzo");
    var ctx = lienzo.getContext("2d");
    //W y H del lienzo
    let lW = lienzo.width;
    let lH = lienzo.height; /*let cW = ctx.canvas.width;*/
    //img enemy
    var naveImg = new Image();
    naveImg.src = "img/poke.ico";
    //img nave ppl
    var ifyy = new Image();
    ifyy.src = "img/one.ico";
    var lfy = new enemyTemplate({ id: "enemyP", x: lW/2, y: lH-40, w: 40, h: 40, img: ifyy});
    // enemigos
    var enemies = [
        new enemyTemplate({ id: "enemyX", x: 10, y: 10, w: 40, h: 40 })
    ];

    // obj nave
    function enemyTemplate(options) {
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.img || naveImg
        }
    }
    //dibuja enemigos
    function dibujo(enemyList) {
        for (let index = 0; index < enemyList.length; index++) {
            let enemy = enemyList[index];
           /* enemy.image.onload = function () {ctx.drawImage(enemy.image, enemy.x += .5, enemy.y ,enemy.w, enemy.h);};*/
            ctx.drawImage(enemy.image, enemy.x += 0.8, enemy.y ,enemy.w, enemy.h);
        }
    }

    /////nave PPL
    function drawMain(){
        ctx.drawImage(lfy.image, lfy.x, lfy.y ,lfy.w, lfy.h);
    }
    var  misiles = [];
    function Rendershoot(){
        for (let index = 0; index < misiles.length; index++) {
            const misil = misiles[index];
            ctx.fillStyle = "#ff0";// color
            ctx.fillRect( misil.x, misil.y -= 5, misil.w, misil.h) //bala
            //si alcanza enemigo
            hitDetected(misil,index);
            //tope se elimina
            if( misil.y == 0 ){
                misiles.splice(index,1);
            }
        }
    }

    function hitDetected(misil,indice){
        for (let index = 0; index < enemies.length; index++) {
            const enemy = enemies[index];
            if(misil.x <= enemy.x+enemy.w  && misil.y == enemy.y + enemy.h){ 
                enemies.splice(indice,1)
                console.log("pum");
            }
        }
    }

    // eventos teclado
    document.addEventListener("keypress",move);

    function move(direccion) {
          direccion=direccion.key;
        switch (direccion) {
            case "d":
                if(lfy.x < lW*.8){
                    lfy.x++; 
                }
                break;
    
            case "a":
                if(lfy.x > 0){ 
                    lfy.x--;
                }
               
                break;

            case "w":
               misiles.push({ x: lfy.x+lfy.w*.5 ,y: lfy.y, w:3 , h:10 }) //creo misil
                break;
    
            default:
                console.log("err"+direccion);
                break;
        }
    }

    //
    //main
    function animate() {
        ctx.clearRect(0, 0, lW, lH); // borra todo
        dibujo(enemies);
        drawMain();
        Rendershoot();
    }
    //intervalos main
    var intervalo = setInterval(animate,100);
    

}


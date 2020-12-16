import Phaser from 'phaser';

var juego = new Phaser.Game(800, 600, Phaser.CANVAS, 'bloque_juego');
var fondo;
var nave;
var cursores;

var balas;
var tiempoBala = 0;
var btnDisparo;

var enemigos;

var estadoPrincipal = {
    
    preload: function(){
        juego.load.image('fondo', './img/bg_cave.png');
        juego.load.image('player', './img/pistola.png');
        juego.load.image('laser', './img/hacha.png');
        juego.load.image('enemigo', './img/e.png');
    },
    create: function(){
        fondoJuego = juego.add.tileSprite(0,0,370,550,'fondo');
        nave = juego.add.sprite(juego.width/2, juego.length/2, 'player');
        nave.anchor.setTo(0.5);
    
        cursores = juego.input.keyboard.createCursorKeys();
        btnDisparo = juego.input.keyboard.addKey(Phaser.Keyboar.SPACEBAR);
    
        balas = juego.add.group();
        balas.enableBody = true;
        balas.physicsBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(20, 'laser');
        balas.setAll('anchor.x',0.5);
        balas.setAll('anchor.y',1);
        balas.setAll('outOfBoundsKill', true);
        balas.setAll('checkWorldBounds', true);
        
        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.physicsBodyType = Phaser.Physics.ARCADE;
        
        for(var y = 0; y < 6; y++){
            for(var x = 0; x<7; y++){
                var enemigo = enemigos.create(x*40, y*20, 'enemigo');
                enemigo.anchor.setTo(0.5);
            }
        }
        enemigos.x = 50;
        enemigos.y = 30;
        
        var animacion = juego.add.tween(enemigos).to({x:100}, 1000, Phaser.Easing.Linear.None,true,0,1000,true);
            animacion.onLoop.add(descender, this);
    
    },

    update: function(){
        if(cursores.right.isDown){
            nave.position.x += 3;
        }
        else if(cursores.left.isDown){
            nave.position.x -= 3;
        }
        var bala;
        if(btnDisparo.isDown){
            if(juego.time.now > tiempoBala){
                bala = balas.getFirstExists(false);
            }
            if(bala){
                bala.reset(nave.x, nave.y);
                bala.body.velocity.y = -300;
                tiempoBala = juego.time.now + 100;
            }
        }
        
        juego.physics.arcade.overlap(balas, enemigos, colision, null, this);
    }
};

function colision(bala, enemigo){
    bala.kill();
    enemigo.kill();
}

function descender(){
    enemigos.y += 10;
}

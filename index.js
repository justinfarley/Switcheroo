//#region  initialization
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;
const backgroundImg = new Image();
backgroundImg.src = './images/background.jpg';
const playerImg = new Image();
playerImg.src = './images/player.png';
let playerSpeed = 2.5;
//#endregion


class Sprite{
    constructor({position, startPositon, image, scale, rotation = 0}){
        this.position = position;
        this.image = image;
        this.scale = scale;
        this.startPositon = startPositon;
        this.rotation = rotation;
        this.rotationSpeed = 360 * Math.PI / 180;
        this.rotating = false;
    }

    draw(){
        context.save();
        context.translate(this.position.x + this.image.width/2, this.position.y + this.image.height/2);
        context.rotate(this.rotation);
        context.drawImage(this.image, -this.image.width/2, -this.image.height/2, this.image.width * this.scale.x, this.image.height * this.scale.y);
        context.restore();
    }
    rotate(angle){
        this.rotation += angle * Math.PI / 180;
    }
};
class Boundary{
    constructor({position, width, height}){
        this.position = position;
        this.width = width;
        this.height = height;
    }
    draw(){
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
class Timer{
    static countdown = 10;
    constructor(){
        this.activateTimer();
    }
    activateTimer(){
        setInterval(this.randomizePlayerSpeed, Timer.countdown * 1000);
    }
    randomizePlayerSpeed(){
        let newSpeed;
        do{
            newSpeed = Math.random() * 7 - 2;
        }
        while((newSpeed >= -0.5 && newSpeed <= 0.5) || (playerSpeed - newSpeed <= 0.8 && playerSpeed - newSpeed >= -0.8));
        player.rotating = true;
        playerSpeed = 0;
        setTimeout(() => {player.rotating = false
                          playerSpeed = newSpeed}, 1000);
        ;
    }
}

function isColliding(sprite, boundary){
    if(sprite.position.x + sprite.image.width >= boundary.position.x && 
        sprite.position.x <= boundary.position.x + boundary.width && 
        sprite.position.y + sprite.image.height >= boundary.position.y && 
        sprite.position.y <= boundary.position.y + boundary.height){
            console.log("collid");
            return true;
    }
}

const background = new Sprite(
    {position: {x: 0, y: 0},
     image: backgroundImg,
     scale: {x: 1, y: 1}
    });
const player = new Sprite(
    {
        position: {x: 200, y: 350},
        startPositon: {x: 200, y: 350},
        image: playerImg,
        scale: {x: 1, y: 1}
    });
const testBoundary = new Boundary(
    {
        position: {x: 400, y: 400},
        width: 100,
        height: 100
    });
const playerSpeedRandomizer = new Timer();
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }

};
let previousTime = Date.now();
function Update(){
    window.requestAnimationFrame(Update);
    background.draw();
    testBoundary.draw();
    player.draw();
    let currentTime = Date.now();
    let deltaTime = (currentTime - previousTime) / 1000;
    if(player.rotating){
        player.rotation += player.rotationSpeed * deltaTime;
    }
    else{
        player.rotation = 0 * Math.PI / 180;
    }
    previousTime = currentTime;
    if(keys.w.pressed){
        player.position.y -= playerSpeed;
    }
    if(keys.a.pressed){
        player.position.x -= playerSpeed;
    }
    if(keys.d.pressed){
        player.position.x += playerSpeed;
    }
    if(keys.s.pressed){
        player.position.y += playerSpeed;
    }
    if(isColliding(player, testBoundary)){
        player.position = {x: player.startPositon.x,
                           y: player.startPositon.y};
    }
}

Update();
window.addEventListener('keydown', (ev) => {
//key down logic
switch(ev.key){
    case 'w':
        keys.w.pressed = true;
        break;
    case 'a':
        keys.a.pressed = true;
        break;
    case 's':
        keys.s.pressed = true;
        break;
    case 'd':
        keys.d.pressed = true;
        break;
}
window.addEventListener('keyup', (ev) => {
    //key down logic
    switch(ev.key){
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }

});




});


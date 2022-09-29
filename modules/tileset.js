let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth / 1.5;
canvas.height = window.innerHeight / 1.5;

let collisionsMap = [];

// Création du tableau 2d pour les collisions
// 70 = nomhre de tile dans la largeur de ma map, déffini lors de la craétion de ma map
for (let i = 0; i < collisions.length; i += 70) {
    // i premier argument où je veux slice, 70 eme argument
    collisionsMap.push(collisions.slice(i, 70 + i));
}

//console.log(collisionsMap);

// creation d'objet pour collisions
class Boundary {
    static width = 36;
    static height = 36;
    constructor({position}) {
        this.position = position;
        this.width = 36; // 36px = 12px lors de la création de la map & x 3 car 300% zoom lors de map export 
        this.height = 36;
    }
    draw() {
        ctx.fillStyle = 'red' //color les zones de collisions
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// stocke toutes nos limites à utiliser
let boundaries = [];
let offset = {
    x: -370,
    y: -200
}

collisionsMap.forEach((row, i) => {         // i représente l'index de chaque ligne        j
    row.forEach((symbol, j) => {            // j représente l'index des symbols         i [0,1,1,0]
        if (symbol === 1025)
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x, // +offset permet d'aligner la collisionsMap à la map
                    y: i * Boundary.height + offset.y
                }
            }
        ))
    })
})

//console.log(boundaries);

//Création de nouvelles image (ici la map)
let mapImage = new Image();
mapImage.src =  "../img/map.png";

let playerImage = new Image();
playerImage.src = "../img/playerDown.png";

class Sprite {
    constructor({position, velocity, image, frames = {max: 1}}) {
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            // set largeur (et hauteur) image à la largeur de une seule frame.
            // Sinon la collision sera bug car largeur réel de l'image est de x 4
            // A faire seulement quand l'image est load d'où onload()
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
    }
    draw() {
        ctx.drawImage(
            this.image,
            0, //position x départ crop gauche
            0, // positon y départ crop top
            this.image.width / this.frames.max, // w de division de crop
            this.image.height, // y de division de crop
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,    // taille actuelle en largeur
            this.image.height,   // taille actuelle en hauteur
        );
    }
}

let player = new Sprite({
    position: {
        x: canvas.width /2 - 100 / 4 / 2, // position en x de l'image
        y: canvas.height /2 + 10 / 2, // position en y de l'image
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

// Création d'un Sprite afin de géré l'état du background
let background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapImage
})

// Défini les touches utilisé et leur état
let keys = {
    z: {
        pressed: false
    },
    s: {
        pressed: false
    },
    q: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

// test collisions
/* let testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
}) */

// tableau permettant de simplifier le code dans mon if else
let movables = [background, ...boundaries/* testBoundary */]

// 1er paramètre = player, 2eme paramètre le rectangle de collision
function rectangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&     // coté droit du player >= coté gauche de la box
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&    //coté gauche du player >= coté droit de la box
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&   // top du player <= bas de la box
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y     // bas du player >= au top de la box
    )
}

//Fait le rendus 
function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    //testBoundary.draw();  testing

    
    player.draw()

    let moving = true

    //Change la position du backgroud en fonction de la touche appuyé et de la dernoère enregistré
    if(keys.z.pressed && lastKey === 'z') {
        for(let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }   //testBoundary
                })      
            ) {
                console.log('collision');
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.y +=3;
        })
    } else if (keys.q.pressed && lastKey === 'q') {
        for(let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }   //testBoundary
                })      
            ) {
                console.log('collision');
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x +=3;
        })
    } else if (keys.d.pressed && lastKey === 'd') {
        for(let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }   //testBoundary
                })      
            ) {
                console.log('collision');
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.x -=3;
        })
    } else if (keys.s.pressed && lastKey === 's') {
        for(let i = 0; i < boundaries.length; i++) {
            let boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }   //testBoundary
                })      
            ) {
                console.log('collision');
                moving = false
                break
            }
        }
        if (moving)
        movables.forEach((movable) => {
            movable.position.y -=3;
        })
    }
}
animate();

let lastKey= '' //enregistre la dernière touche pressé

//Passe keys.touche.pressed à true
window.addEventListener('keydown', (e)  => {
    switch (e.key) {
        case 'z':
            keys.z.pressed = true 
            lastKey = 'z'           
            break
        case 's':
            keys.s.pressed = true            
            lastKey = 's'           
            break
        case 'q':
            keys.q.pressed = true            
            lastKey = 'q'           
            break
        case 'd':
            keys.d.pressed = true            
            lastKey = 'd'           
            break
    }
    //console.log(keys.z.pressed)
})

//Remet keys.touche.pressed à false lorsque l'on appuie plus sur la touche
window.addEventListener('keyup', (e)  => {
    switch (e.key) {
        case 'z':
            keys.z.pressed = false            
            break
        case 's':
            keys.s.pressed = false            
            break
        case 'q':
            keys.q.pressed = false            
            break
        case 'd':
            keys.d.pressed = false            
            break
    }
})
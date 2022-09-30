let canvas = document.querySelector(".canvas");
let transiImg = document.querySelector(".transition-battle");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth / 1.5;
canvas.height = window.innerHeight / 1.5;
transiImg.width = canvas.width;
transiImg.height = canvas.height;

let collisionsMap = [];

// Création du tableau 2d pour les collisions
// 70 = nomhre de tile dans la largeur de ma map, déffini lors de la craétion de ma map
for (let i = 0; i < collisions.length; i += 70) {
    // i premier argument où je veux slice, 70 eme argument
    collisionsMap.push(collisions.slice(i, 70 + i));
}

let battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}
console.log(battleZonesMap);

//console.log(battleZonesMap);

// stocke toutes nos limites à utiliser
let boundaries = [];
let offset = {
    x: -370,
    y: -200
};

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
});

let battleZones = [];
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            battleZones.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }
        ))
    })
});
//console.log(boundaries);

//Création de nouvelles image (ici la map)
let mapImage = new Image();
mapImage.src =  "../img/map.png";

let playerImage = new Image();
playerImage.src = "../img/playerDown.png";



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

// tableau permettant de simplifier le code dans mon if else activation du combat
let movables = [background, ...boundaries, ...battleZones /* testBoundary */]

// 1er paramètre = player, 2eme paramètre le rectangle de collision
// check la postion du player par rapport au zones de collisions
function rectangularCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&     // coté droit du player >= coté gauche de la box
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&    // coté gauche du player >= coté droit de la box
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&   // top du player <= bas de la box
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y     // bas du player >= au top de la box
    )
}
// Pas de rencontre.
let battle = {
    initiated: false
}

//Fait le rendus 
function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    battleZones.forEach(battleZone => {
        battleZone.draw();
    })
    //testBoundary.draw();  testing
    player.draw()

    // combat rencontré, je n'execute le code qui suit j'arrete donc de me déplacer.
    if (battle.initiated) return

    // activation du combat
    if(keys.z.pressed || keys.q.pressed || keys.d.pressed || keys.s.pressed) {
        for(let i = 0; i < battleZones.length; i++) {
            let battleZone = battleZones[i]

            // On calcul la taille de zone en supperposition, Le point max en x du player - le point min en x de la box * Le point max en y du player - le point min en y de la box
            let overlappingArea = 
            (Math.min(
                player.position.x + player.width, 
                battleZone.position.x + battleZone.width
            ));
            (Math.min(
                player.position.x + player.width, 
                battleZone.position.x + battleZone.width
            ) - 
                Math.max(player.position.x, battleZone.position.x)) *
            (Math.min(
                player.position.y + player.height,
                battleZone.position.y + battleZone.height
            ) - 
                Math.max(player.position.y, battleZone.position.y))
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone
                }) &&
                //overlappingArea > (player.width * player.height) / 2  // Taille zone de supperpostion entre collision et player supérieur à la moitée de la taille global du player
                Math.random() < 0.001 // chance de déclencer un combat
            ) {
                console.log('battle on');
                audio.city.stop();
                audio.initBattle.play();
                battle.initiated = true;
                gsap.to("#overlayDiv", {
                    opacity: 1,
                    repeat: 5,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to("#overlayDiv", {
                            opacity: 1,
                            duration: 0.4 
                        })
                    }
                });
                break
            }
        }
    }

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
                console.log();
                //console.log('collision');
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
                //console.log('collision');
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
                //console.log('collision');
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
                //console.log('collision');
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
            audio.city.play();
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

let clicked = false
addEventListener('click', () => {
    if(!clicked) {
        clicked = true;
    }
})
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
        ctx.fillStyle = 'rgba(255, 0, 0, 0)' //color les zones de collisions
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

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
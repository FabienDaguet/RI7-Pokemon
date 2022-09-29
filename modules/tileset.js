let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");
let width = canvas.offsetWidth;
let height = canvas.offsetHeight;

//Point de départ en haut à gauche avec un size égale au canvas
ctx.fillRect(0, 0, width, height);

//Création de nouvelles image (ici la map)
const image = new Image();
image.src =  "../img/map.png"

const playerImage = new Image();
playerImage.src = "../img/ACharDown.png"

//Charge l'image une fois la page chargée
image.onload = () => {
    ctx.drawImage(image, -150, -60)
    ctx.drawImage(playerImage, 0, 0)
}

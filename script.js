let canvas = document.getElementById("snakegame");
let context = canvas.getContext("2d");
let box = 32;
let snakegame = [];
snakegame[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "left";
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}
var infoPontos = document.getElementById('pontuar');
let placar = 1;

function criarBG() {
    context.fillStyle = "plum";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnakeGame() {
    for (i = 0; i < snakegame.length; i++) {
        context.fillStyle = "slateblue";
        context.fillRect(snakegame[i].x, snakegame[i].y, box, box);
    }
}

function criaComida() {

    context.fillStyle = "blue"
    context.fillRect(comida.x, comida.y, box, box);

}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function startGame() {
    if (snakegame[0].x > 15 * box && direction == "right") snakegame[0].x = 0;
    if (snakegame[0].x < 0 && direction == "left") snakegame[0].x = 16 * box;
    if (snakegame[0].y > 15 * box && direction == "down") snakegame[0].y = 0;
    if (snakegame[0].y < 0 && direction == "up") snakegame[0].y = 16 * box;

    for (i = 1; i < snakegame.length; i++) {
        if (snakegame[0].x == snakegame[i].x && snakegame[0].y == snakegame[i].y) {
            clearInterval(game);
            alert('Game Over :-(');
        }
    }

    criarBG();
    criarSnakeGame();
    criaComida();

    let snakeX = snakegame[0].x;
    let snakeY = snakegame[0].y;

    if (direction == "left") snakeX -= box;
    if (direction == "right") snakeX += box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != comida.x || snakeY != comida.y) {
        snakegame.pop();
    } else {
        infoPontos.innerHTML = placar++; //conta o placar
        comida.x = Math.floor(Math.random() * 15 + 1) * box;
        comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    console.log(placar);
    let newHead = {
        x: snakeX,
        y: snakeY,
    }
    snakegame.unshift(newHead);
}

function reiniciarGame() {

    location.reload(startGame);

}
/*let pausar;
function pausarGame() {
  pausar = setInterval(game,5000);   
}*/

let game = setInterval(startGame, 100);

noise.seed(Math.random());

let x = 0;
let y = 0;
let size = 30;
let stability = 70;

let blocks = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#FFD700"
];
let blockStep = 2 / blocks.length;

let world = [];

function getBlockTexture(x, y) {
    let noise = getNoiseValue(x, y) + 1;

    let index = Math.round(noise / blockStep);
    return blocks[index];
}

function getNoiseValue(x, y) {
    let noiseValue = noise.simplex2(x / stability, y / stability);
    return noiseValue;
}

function generateWorld(fromX, toX, fromY, toY) {
    for(let xGen = fromX; xGen < toX; xGen++) {
        world[xGen] = [];
        for(let yGen = fromY; yGen < toY; yGen++) {
            world[xGen][yGen] = getNoiseValue(xGen, yGen);
        }
    }
}

function renderArea(size) {
    let gameArea = document.getElementById("gameArea");

    let div = document.createElement("div");

    for(let xRender = x - size; xRender < x + size; xRender++) {
        let row = document.createElement("p");
        row.style.lineHeight = 0;
        for(let yRender = y - size; yRender < y + size; yRender++) {
            let span = document.createElement("span");
            if(xRender !== x || yRender !== y) {
                span.style.color = getBlockTexture(xRender, yRender);
                span.innerText = "⬤";
            } else {
                span.style.color = "#000000";
                span.innerText = "◎";
            }

            row.appendChild(span);
        }
        div.appendChild(row);
    }

    gameArea.replaceChildren(div);
}

document.addEventListener("keypress", function(event) {
    console.log(event.key);
    if (event.key === "w") {
        x -= 1;
        renderArea(size);
    } else if(event.key === "a") {
        y -= 1;
        renderArea(size);
    } else if(event.key === "s") {
        x += 1;
        renderArea(size);
    } else if(event.key === "d") {
        y += 1;
        renderArea(size);
    }
});

generateWorld(-100, 100, -100, 100);
renderArea(size);

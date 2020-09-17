import {objectProcessors} from "/library.js";

const canvas = document.getElementById("the");
export const ctx = canvas.getContext("2d");

function applySize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", applySize);
applySize();

export function renderPlayer(player) {
  ctx.fillStyle = "#AA0077";
  ctx.fillRect(player.position[0] * 10, player.position[1] * 10, 10, -10);
}

export function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

objectProcessors.push({
  classes: ["block"],
  function: object => {
    ctx.fillStyle = object.color;
    ctx.fillRect(
      object.start[0] * 10,
      object.start[1] * 10,
      object.size[0] * 10,
      object.size[1] * 10
    );
  }
});

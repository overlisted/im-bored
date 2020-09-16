import {objectProcessors, world, World, WorldObject} from "/library.js"
import {keyListeners, doInput} from "/input.js"

const canvas = document.getElementById("the");

keyListeners.push({
  keys: ["d"],
  function: () => world.movePlayer([world.player.position[0] + 10, world.player.position[1]])
});
keyListeners.push({
  keys: ["a"],
  function: () => world.movePlayer([world.player.position[0] - 10, world.player.position[1]])
});
keyListeners.push({
  keys: [" "],
  function: () => world.movePlayer([world.player.position[0], world.player.position[1] - 20])
});
keyListeners.push({
  keys: ["n"],
  function: () => {
    world.objects.push(new WorldObject({
      start: [world.player.position[0], world.player.position[1] + 10],
      size: [20, 20],
      color: "#666"
    }, world));
  }
});

function applySize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", applySize);
applySize();

const ctx = canvas.getContext("2d");

async function downloadWorld() {
  const worldFile = await fetch("world.json");
  return worldFile.json();
}

function renderWorld(ctx) {
  for(const object of world.objects) {
    ctx.fillStyle = object.color;
    ctx.fillRect(object.start[0], object.start[1], object.size[0], object.size[1]);
  }
}

function fall() {
  world.movePlayer([world.player.position[0], world.player.position[1] + 10]);
}

world.player.position = [50, 10];

function renderPlayer(ctx) {
  ctx.fillStyle = "#AA0077";
  ctx.fillRect(world.player.position[0], world.player.position[1], 10, -10);
}

async function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(!world.objects) {
    world.objects = await downloadWorld();
    world.objects = world.objects.map(it => new WorldObject(it, world));
  }

  for(const processor of objectProcessors) {
    processor.function(world.getObjectById(processor.id));
  }

  doInput();
  renderWorld(ctx);
  fall();
  renderPlayer(ctx);
}

setInterval(loop, 100);

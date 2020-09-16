import {objectProcessors, world, World, WorldObject, setWorld} from "/library.js"
import {keyListeners, doInput} from "/input.js"

const canvas = document.getElementById("the");

keyListeners.push({
  keys: ["d"],
  function: () => world.movePlayer([world.player.position[0] + 1, world.player.position[1]])
});
keyListeners.push({
  keys: ["a"],
  function: () => world.movePlayer([world.player.position[0] - 1, world.player.position[1]])
});
keyListeners.push({
  keys: [" "],
  function: () => world.movePlayer([world.player.position[0], world.player.position[1] - 2])
});
keyListeners.push({
  keys: ["n"],
  function: () => {
    world.objects.push(new WorldObject({
      start: [world.player.position[0], world.player.position[1] + 1],
      size: [2, 2],
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
    ctx.fillRect(object.start[0] * 10, object.start[1] * 10, object.size[0] * 10, object.size[1] * 10);
  }
}

function fall() {
  world.movePlayer([world.player.position[0], world.player.position[1] + 1]);
}

function renderPlayer(ctx) {
  ctx.fillStyle = "#AA0077";
  ctx.fillRect(world.player.position[0] * 10, world.player.position[1] * 10, 10, -10);
}

async function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(!world) {
    const json = await downloadWorld();

    setWorld(new World());
    world.player = json.player;
    world.objects = json.objects.map(it => new WorldObject(it, world));
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

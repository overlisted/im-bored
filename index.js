import {objectProcessors, world, World, WorldObject, setWorld} from "/library.js"
import {keyListeners, doInput} from "/input.js"
import {renderWorld, renderPlayer, clearScreen} from "/render.js"

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

async function downloadWorld() {
  const worldFile = await fetch("world.json");
  return worldFile.json();
}

function fall() {
  world.movePlayer([world.player.position[0], world.player.position[1] + 1]);
}

async function loop() {
  clearScreen();

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
  renderWorld(world);
  fall();
  renderPlayer(world.player);
}

setInterval(loop, 100);

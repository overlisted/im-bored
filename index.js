import {objectProcessors, world, World, WorldObject, setWorld} from "/library.js"
import {keyListeners, doInput, mousePosition} from "/input.js"
import {renderWorld, renderPlayer, clearScreen} from "/render.js"

let debug = false;

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

addEventListener("keydown", e => {
  if(e.key == "F6") debug = !debug;
})

async function downloadWorld(url) {
  const worldFile = await fetch(url);
  return worldFile.json();
}

function fall() {
  world.movePlayer([world.player.position[0], world.player.position[1] + 1]);
}

async function loop() {
  clearScreen();

  if(!world) {
    const json = await downloadWorld(prompt("Enter world URL", document.location + "world.json"));

    setWorld(new World());
    world.player = json.player;
    world.objects = json.objects.map(it => new WorldObject(it, world));
  }

  if(!debug) {
    for(const processor of objectProcessors) {
      const object = world.getObjectById(processor.id);
      if(object != null) processor.function(object);
    }

    doInput();
    fall();
  }

  renderWorld(world);
  renderPlayer(world.player);

  if(debug) {
    for(const object of world.objects) {
      if(object.isPointInside([mousePosition[0] / 10, mousePosition[1] / 10])) {
        console.debug(object);
      }
    }
  }

  setTimeout(loop, 100);
}

loop();

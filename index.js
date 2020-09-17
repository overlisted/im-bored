import {objectProcessors, world, World, WorldObject, setWorld} from "/library.js"
import {keyListeners, doInput, mousePosition} from "/input.js"
import {renderPlayer, clearScreen} from "/render.js"

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
    let json;
    try {
      const request = await fetch(
        prompt("Enter world URL", document.location + "world.json")
      );

      if(!request.ok) throw new Error(request.statusText);
      json = await request.json();

      setWorld(new World());
      world.player = json.player;
      world.objects = json.objects.map(it => new WorldObject(it, world));
      json.scripts.forEach(it => import(it));
    } catch(e) {
      alert(e.message);
      return;
    }
  }

  for(const processor of objectProcessors) {
    const objects = world.getObjectsWithClasses(processor.classes);
    objects.forEach(processor.function);
  }

  doInput();
  fall();

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

import {renderPlayer, clearScreen} from "/render.js"
import {doInput} from "/input.js"
import {objectProcessors, world, World, WorldObject, setWorld} from "/library.js"

async function downloadWorld(url) {
  const worldFile = await fetch(url);
  return worldFile.json();
}

function fall() {
  world.movePlayer([world.player.position[0], world.player.position[1] + 1]);
}

let debug = false;

export default async function loop() {
  clearScreen();

  if(!world) {
    let json;
    try {
      const request = await fetch(
        prompt("Enter world URL", document.location + "examples/1.json")
      );

      if(!request.ok) throw new Error(request.statusText);
      json = await request.json();

      setWorld(new World());
      world.player = json.player;
      world.objects = json.objects.map(it => new WorldObject(it, world));
      for(const script of json.scripts) await import(script);
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

import {renderPlayer, clearScreen} from "/render.js"
import {objectProcessors, world, setWorld, World, WorldObject} from "/library.js"

export default async function loop() {
  clearScreen();

  if(!world) setWorld(new World());

  for(const processor of objectProcessors) {
    const objects = world.getObjectsWithClasses(processor.classes);
    objects.forEach(processor.function);
  }

  setTimeout(loop, 100);
}

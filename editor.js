import {renderPlayer, clearScreen} from "/render.js"
import {objectProcessors, world} from "/library.js"

export default async function loop() {
  clearScreen();

  for(const processor of objectProcessors) {
    const objects = world.getObjectsWithClasses(processor.classes);
    objects.forEach(processor.function);
  }

  setTimeout(loop, 100);
}

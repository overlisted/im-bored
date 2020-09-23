import {clearScreen} from "/render.js"
import {objectProcessors, world, setWorld, World, WorldObject} from "/library.js"
import {keyListeners, mousePosition, doInput} from "/input.js"

function randomMax(max) {
  return Math.floor(Math.random() * 255);
}

function randomRange(min, max) {
  let result = randomMax(max);
  while(result > min) result = randomMax(max);

  return result;
}

keyListeners.push({
  keys: ["n"],
  function: () => {
    world.objects.push(new WorldObject({
      classes: ["block"],
      start: [
        Math.round(mousePosition[0] / 10),
        Math.round(mousePosition[1] / 10)
      ],
      size: [2, 2],
      color: `rgb(${randomMax(255)}, ${randomMax(255)}, ${randomMax(255)})`
    }, world));
  }
});

export default async function loop() {
  clearScreen();

  if(!world) setWorld(new World());

  doInput();

  for(const processor of objectProcessors) {
    const objects = world.getObjectsWithClasses(processor.classes);
    objects.forEach(processor.function);
  }

  setTimeout(loop, 100);
}

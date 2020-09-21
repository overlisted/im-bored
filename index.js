import {keyListeners, mousePosition} from "/input.js"
import editorLoop from "/editor.js"
import playLoop from "/play.js"

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
      classes: ["block"],
      start: [world.player.position[0], world.player.position[1] + 1],
      size: [2, 2],
      color: "#666"
    }, world));
  }
});

addEventListener("keydown", e => {
  if(e.key == "F6") debug = !debug;
})

let loop = () => console.error("No loop!");

switch(prompt("Game mode", "play")) {
  case "play": loop = playLoop; break;
  case "editor": loop = editorLoop; break;
}

loop();

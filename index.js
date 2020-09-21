import editorLoop from "/editor.js"
import playLoop from "/play.js"

let loop = () => console.error("No loop!");

switch(prompt("Game mode", "play")) {
  case "play": loop = playLoop; break;
  case "editor": loop = editorLoop; break;
}

loop();

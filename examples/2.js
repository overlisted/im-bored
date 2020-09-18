import {objectProcessors} from "/library.js";

objectProcessors.push({
  classes: ["block", "moving"],
  function: object => {
    if(
      object.world.getPlayerGround() == object
      && object.max > object.start
    ) object.move(object.vector);
  }
});

objectProcessors.push({
  classes: ["block", "victory"],
  function: object => {
    if(object.world.getPlayerGround() == object) alert("win");
  }
});

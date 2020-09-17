import {objectProcessors} from "/library.js";

objectProcessors.push({
  classes: ["block", "moving"],
  function: object => object.move(object.vector)
});

objectProcessors.push({
  classes: ["block", "trap"],
  function: object => {
    if(object.world.getPlayerGround() == object) object.size = [0, 0]
  }
});

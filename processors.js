import {objectProcessors} from "/library.js";

objectProcessors.push({
  classes: ["moving"],
  function: object => object.move([1, 0])
});

objectProcessors.push({
  classes: ["trap"],
  function: object => {
    if(object.world.getPlayerGround() == object) object.start = [-100, -100];
  }
});

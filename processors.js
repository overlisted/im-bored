import {objectProcessors} from "/library.js";

objectProcessors.push({
  id: "moving",
  function: object => object.move([1, 0])
});

objectProcessors.push({
  id: "trap",
  function: object => {
    if(object.world.getPlayerGround() == object) object.start = [-100, -100];
  }
});

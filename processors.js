import {objectProcessors} from "/library.js";
import {ctx} from "/render.js"

objectProcessors.push({
  classes: ["block"],
  function: object => {
    ctx.fillStyle = object.color;
    ctx.fillRect(object.start[0] * 10, object.start[1] * 10, object.size[0] * 10, object.size[1] * 10);
  }
});

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

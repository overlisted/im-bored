import {objectProcessors} from "/library.js";

objectProcessors.push({
  id: "moving",
  function: object => object.move([new Date().getTime() % 10, 0])
});

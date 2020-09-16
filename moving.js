import {objectProcessors} from "/library.js";

objectProcessors.push({
  id: "moving",
  function: object => object.move([1, 0])
});

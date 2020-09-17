export const pressedKeys = {};
export let mousePosition = [undefined, undefined];

window.onkeyup = e => pressedKeys[e.key] = false;
window.onkeydown = e => pressedKeys[e.key] = true;
window.onmousemove = e => mousePosition = [e.clientX, e.clientY];

export const keyListeners = [];

export function doInput() {
  for(const listener of keyListeners) {
    if(listener.keys.every(it => pressedKeys[it])) listener.function();
  }
}

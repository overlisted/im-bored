const pressedKeys = {};
window.onkeyup = e => pressedKeys[e.key] = false;
window.onkeydown = e => pressedKeys[e.key] = true;

export const keyListeners = [];

export function doInput() {
  for(const listener of keyListeners) {
    if(listener.keys.every(it => pressedKeys[it])) listener.function();
  }
}

export class World {
  player = {};
  objects;

  movePlayer(newPosition) {
    if(!this.objects.some(object => object.isPointInside(newPosition))) {
      this.player.position = newPosition;
    }
  }

  getPlayerGround() {
    for(const object of this.objects) {
      if(object.isPointInside([this.player.position[0], this.player.position[1] + 1])) return object;
    }

    return null;
  }

  getObjectsWithClass(className) {
    return this.objects.filter(it => it.classes.includes(className));
  }

  getObjectsWithClasses(classes) {
    return this.objects.filter(
      it => classes.every(
        className => it.classes.includes(className)));
  }
}

export class WorldObject {
  classes = [];
  world;

  constructor(json, world) {
    Object.assign(this, json);
    this.world = world;
  }

  isPointInside(point) {
    const a = point[0] >= this.start[0];
    const b = point[0] < this.start[0] + this.size[0];
    const c = point[1] > this.start[1];
    const d = point[1] < this.start[1] + this.size[1];

    return a && b && c && d;
  }

  move(difference) {
    this.start[0] += difference[0];
    this.start[1] += difference[1];

    if(this.world.getPlayerGround() == this) {
      this.world.player.position[0] += difference[0];
      this.world.player.position[1] += difference[1];
    }
  }
}

export const objectProcessors = [];
export let world = null;
export const setWorld = value => world = value;

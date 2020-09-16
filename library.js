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
      if(object.isPointInside([this.player.position[0], this.player.position[1] + 10])) return object;
    }

    return null;
  }

  getObjectById(id) {
    for(const object of this.objects) if(object.id == id) return object;

    return null;
  }
}

export class WorldObject {
  id;
  start;
  size;
  color;
  world;

  constructor(json, world) {
    this.id = json.id;
    this.start = json.start;
    this.size = json.size;
    this.color = json.color;
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
export let world = new World();

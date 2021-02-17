// 将拓展签入 Creep 原型
module.exports = function () {
  _.assign(StructureTower.prototype, towerExtension);
};

// 自定义的 Creep 的拓展
const towerExtension = {
  work() {
    let target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    let structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) =>
        s.hits < s.hitsMax &&
        s.structureType != STRUCTURE_WALL &&
        s.structureType != STRUCTURE_RAMPART,
      algorithm: "dijkstra",
    });

    if (target != undefined) this.attack(target);
    else if (structure != undefined) this.repair(structure);
  },
};

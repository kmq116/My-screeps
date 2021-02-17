module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, { reusePath: 5 });
  },
  // 升级
  target: (creep) => {
    // find all walls in the room
    let walls = creep.room.find(FIND_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_WALL,
    });

    let target = undefined;

    // loop with increasing percentages
    for (
      let percentage = 0.0001;
      percentage <= 1;
      percentage = percentage + 0.0001
    ) {
      // find a wall with less than percentage hits
      for (let wall of walls) {
        if (wall.hits / wall.hitsMax < percentage) {
          target = wall;
          break;
        }
      }

      // if there is one
      if (target != undefined) {
        // break the loop
        break;
      }
    }
    // if we find a wall that has to be repaired
    if (target != undefined) {
      // try to repair it, if not in range
      if (creep.repair(target) == ERR_NOT_IN_RANGE) {
        // move towards it
        creep.moveTo(target, { reusePath: 5 });
      }
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

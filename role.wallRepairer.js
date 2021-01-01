var roleBuilder = require("role.builder");

module.exports = {
  // a function to run the logic for this role
  run: function (creep) {
    // 判断工作状态

    if (creep.memory.working == false && creep.store.getFreeCapacity() == 0) {
      creep.memory.working = true;
    }
    // 工作完成 能量为零 切换状态为 取能量
    if (
      creep.memory.working == true &&
      creep.store.getFreeCapacity() == creep.store.getCapacity()
    ) {
      creep.memory.working = false;
    }

    // if creep is supposed to repair something
    if (creep.memory.working == true) {
      // find all walls in the room
      var walls = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_WALL,
      });

      var target = undefined;

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
          creep.moveTo(target);
        }
      }
      // if we can't fine one
      else {
        // look for construction sites
        roleBuilder.run(creep);
      }
    }
    // if creep is supposed to harvest energy from source
    else {
      if (
        creep.withdraw(Game.rooms.W7N14.storage, RESOURCE_ENERGY) ==
        ERR_NOT_IN_RANGE
      ) {
        creep.moveTo(Game.rooms.W7N14.storage);
      }
    }
  },
};

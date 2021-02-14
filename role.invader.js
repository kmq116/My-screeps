let roleInvader = {
  run: function (creep) {
    if (creep.room.name !== "W7N15") {
      const pos = new RoomPosition(14, 39, "W7N15");
      if (creep.moveTo(pos) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    } else {
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

      // if creep is supposed to transfer energy to a structure
      if (creep.memory.working == true) {
        creep.say("📤");
        var constructionSite = creep.pos.findClosestByPath(
          FIND_CONSTRUCTION_SITES
        );
        // if one is found
        if (constructionSite != undefined) {
          // try to build, if the constructionSite is not in range
          if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
            // move towards the constructionSite
            creep.moveTo(constructionSite);
          }
        }
      } else {
        creep.say("⛏️");
        const sources = creep.room.find(FIND_SOURCES);
        const pos = new RoomPosition(25, 32, "W7N15");
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[1]);
        }
      }
    }
  },
};

module.exports = roleInvader;

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
        // find closest constructionSite
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
        const source = creep.room.find(FIND_SOURCES)[1];
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }
    }
  },
};

module.exports = roleInvader;

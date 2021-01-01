var roleUpgrader = require("role.upgrader");

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

    // if creep is supposed to complete a constructionSite
    if (creep.memory.working == true) {
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
      // if no constructionSite is found
      else {
        // go upgrading the controller
        roleUpgrader.run(creep);
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

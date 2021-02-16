var roleTransporter = {
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
    // 不能工作先去storage or link取能量 工作则运送能量
    if (creep.memory.working == false) {
      // 房间的link
      const linkMain = Game.rooms["W7N14"].lookForAt("structure", 38, 28)[0];
      //   搬运能量
      if (linkMain.store[RESOURCE_ENERGY]) {
        if (creep.withdraw(linkMain, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(linkMain);
        }
      }
    
    } else {
      // // find closest spawn, extension or tower which is not full
      // if (
      //   creep.transfer(Game.rooms.W7N14.storage, RESOURCE_ENERGY) ==
      //   ERR_NOT_IN_RANGE
      // ) {
      //   creep.moveTo(Game.rooms.W7N14.storage);
      // }

      for (const resourceType in creep.carry) {
        creep.transfer(Game.rooms.W7N14.storage,resourceType);
      }
    }
  },
};
module.exports = roleTransporter;

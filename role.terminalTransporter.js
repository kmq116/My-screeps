var roleTerminalTransporter = {
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
    // 不能工作先去storage取货 工作则运送货物
    if (creep.memory.working == false) {
      let target = Game.rooms.W7N14.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_FACTORY,
      })[0];

      if (creep.withdraw(target, RESOURCE_LEMERGIUM_BAR) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    } else {
      // let target = Game.rooms.W7N14.find(FIND_STRUCTURES, {
      //   filter: (s) => s.structureType == STRUCTURE_FACTORY,
      // })[0];
      let target = Game.rooms.W7N14.terminal;

      // let target = Game.rooms.W7N14.find(FIND_STRUCTURES, {
      //   filter: (s) => s.structureType == STRUCTURE_POWER_SPAWN,
      // })[0];
      // 生产压缩矿物
      try {
        if (target.cooldown === 0) target.produce(RESOURCE_LEMERGIUM_BAR);
      } catch (error) {}

      for (const resourceType in creep.carry) {
        if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    }
  },
};
module.exports = roleTerminalTransporter;

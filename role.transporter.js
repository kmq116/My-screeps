module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  },
  // 升级
  target: (creep) => {
    if (
      creep.transfer(Game.rooms[creep.memory.room].storage, RESOURCE_ENERGY) ==
      ERR_NOT_IN_RANGE
    ) {
      creep.moveTo(Game.rooms[creep.memory.room].storage);
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

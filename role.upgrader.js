module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, );
  },
  // 升级
  target: (creep) => {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, );
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

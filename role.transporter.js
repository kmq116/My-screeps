module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, { reusePath: 5 });
  },
  // 升级
  target: (creep) => {
    if (
      creep.transfer(Game.rooms.W7N14.storage, RESOURCE_ENERGY) ==
      ERR_NOT_IN_RANGE
    ) {
      creep.moveTo(Game.rooms.W7N14.storage);
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});


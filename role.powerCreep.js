module.exports = (sourceId, targetId, resourceType) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, resourceType) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, { reusePath: 5 });
  },
  // 升级
  target: (creep) => {
    const target = Game.getObjectById(targetId);
    if (creep.usePower(PWR_OPERATE_STORAGE, target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

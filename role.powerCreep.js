module.exports = (sourceId, targetId, resourceType) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, resourceType, 400) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, { reusePath: 5 });
  },
  // 升级
  target: (creep) => {
    const target = Game.getObjectById(targetId);
    let energy = creep.room.energyCapacityAvailable;
    let powerSpawn = Game.getObjectById("5fb1893ae7f0760f5449d7ed");
    if (
      creep.room.energyAvailable < energy * 0.7 &&
      creep.usePower(PWR_OPERATE_EXTENSION, target) == ERR_NOT_IN_RANGE
    ) {
      creep.moveTo(target);
    } else if (
      creep.room.storage.store.getCapacity() == 1000000 &&
      creep.usePower(PWR_OPERATE_STORAGE, target) == ERR_NOT_IN_RANGE
    ) {
    } else {
      creep.usePower(PWR_GENERATE_OPS);
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

module.exports = (sourceId, targetId, resourceType) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, resourceType, 400) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, );
  },
  // 升级
  target: (creep) => {
    const target = Game.getObjectById(targetId);
    let energy = creep.room.energyCapacityAvailable;
    if (
      creep.room.energyAvailable < energy * 0.8 &&
      creep.usePower(PWR_OPERATE_EXTENSION, target) == ERR_NOT_IN_RANGE
    ) {
      console.log("extension 可用能量不足80%");
      creep.moveTo(target);
    } else if (
      creep.room.storage.store.getCapacity() == 1000000 &&
      creep.usePower(PWR_OPERATE_STORAGE, target) == ERR_NOT_IN_RANGE
    ) {
      console.log("storage容量下降");
      creep.moveTo(target);
    } else {
      creep.usePower(PWR_GENERATE_OPS);
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

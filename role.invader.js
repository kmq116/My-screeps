module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, );
  },
  // storage传能量
  target: (creep) => {
    let control = Game.getObjectById("5bbcac7e9099fc012e6358d0");
    if (creep.upgradeController(control, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(control, );
    
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

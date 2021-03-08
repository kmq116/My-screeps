module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    // 找自己房间的 storage
    let storage = creep.room.storage;
    if (
      creep.withdraw(storage, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE &&
      storage.store[RESOURCE_ENERGY] >= 200000
    )
      creep.moveTo(storage);
  },
  //   给link传送能量
  target: (creep) => {
    let terminal = creep.room.terminal;
    // creep.drop(RESOURCE_LEMERGIUM);
    for (const resourceType in creep.carry) {
      creep.drop(resourceType);
    }
    // if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //   // move towards it
    //   creep.moveTo(terminal);
    // }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

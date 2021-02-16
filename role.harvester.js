module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);
  },
  //   给link传送能量
  target: (creep) => {
    const link = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
      filter: { structureType: STRUCTURE_LINK },
    });
    // 有link给link 传送 否则给storage
    if (link) {
      if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(link);
      }
    } else {
      if (
        creep.transfer(Game.rooms.W7N15.storage, RESOURCE_ENERGY) ==
        ERR_NOT_IN_RANGE
      ) {
        creep.moveTo(Game.rooms.W7N15.storage);
      }
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

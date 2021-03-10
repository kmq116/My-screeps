module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    // 捡能量
    const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
    if (target) {
      if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    } else if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(source);
  },
  //   给link传送能量
  target: (creep) => {
    // find closest constructionSite
    let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    // if one is found
    if (constructionSite != undefined) {
      // try to build, if the constructionSite is not in range
      if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
        // move towards the constructionSite
        creep.moveTo(constructionSite);
      }
    } else {
      creep.suicide();
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

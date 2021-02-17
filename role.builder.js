module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, { reusePath: 5 });
  },
  //   给link传送能量
  target: (creep) => {
    if (creep.room.name !== "W7N15") {
      const pos = new RoomPosition(14, 39, "W7N15");
      if (creep.moveTo(pos) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, { reusePath: 5 });
      }
    } else {
      // find closest constructionSite
      var constructionSite = creep.pos.findClosestByPath(
        FIND_CONSTRUCTION_SITES
      );
      // if one is found
      if (constructionSite != undefined) {
        // try to build, if the constructionSite is not in range
        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
          // move towards the constructionSite
          creep.moveTo(constructionSite, { reusePath: 5 });
        }
      }
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

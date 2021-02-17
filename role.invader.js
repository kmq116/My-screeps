module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, { reusePath: 5 });
  },
  //   storage传能量
  target: (creep) => {
    if (creep.room.name !== "W7N15") {
      const pos = new RoomPosition(14, 39, "W7N15");
      if (creep.moveTo(pos) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, { reusePath: 5 });
      }
    } else {
      if (creep.memory.working == true) {
        if (
          creep.transfer(Game.rooms.W7N15.storage, RESOURCE_ENERGY) ==
          ERR_NOT_IN_RANGE
        ) {
          creep.moveTo(Game.rooms.W7N15.storage, { reusePath: 5 });
        }
      }
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

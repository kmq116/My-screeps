module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, { reusePath: 5 });
  },
  //   给link传送能量
  target: (creep) => {
    var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      // the second argument for findClosestByPath is an object which takes
      // a property called filter which can be a function
      // we use the arrow operator to define it
      filter: (s) =>
        (s.structureType == STRUCTURE_SPAWN ||
          s.structureType == STRUCTURE_EXTENSION ||
          s.structureType == STRUCTURE_TOWER ||
          s.structureType == STRUCTURE_POWER_SPAWN) &&
        s.energy < s.energyCapacity,
    });

    //  var  structure = Game.rooms.W7N14.terminal
    // if we found one
    if (structure != undefined) {
      // try to transfer energy, if it is not in range
      if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        // move towards it
        creep.say("🚚");
        creep.moveTo(structure, { reusePath: 5 });
      }
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

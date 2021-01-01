var roleCarrier = {
  run: function (creep) {
    // 判断工作状态

    if (creep.memory.working == false && creep.store.getFreeCapacity() == 0) {
      creep.memory.working = true;
    }
    // 工作完成 能量为零 切换状态为 取能量
    if (
      creep.memory.working == true &&
      creep.store.getFreeCapacity() == creep.store.getCapacity()
    ) {
      creep.memory.working = false;
    }
    // 不能工作先去storage取能量 工作则运送能量
    if (creep.memory.working == false) {
      if (
        creep.withdraw(Game.rooms.W7N14.storage,RESOURCE_ENERGY) ==
        ERR_NOT_IN_RANGE
      ) {
        creep.moveTo(Game.rooms.W7N14.storage);
      }
    } else {
      

      var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        // the second argument for findClosestByPath is an object which takes
        // a property called filter which can be a function
        // we use the arrow operator to define it
        filter: (s) =>
          (s.structureType == STRUCTURE_SPAWN ||
            s.structureType == STRUCTURE_EXTENSION ||
            s.structureType == STRUCTURE_TOWER 
            ) &&
          s.energy < s.energyCapacity,
      });

    //  var  structure = Game.rooms.W7N14.terminal
      // if we found one
      if (structure != undefined) {
        // try to transfer energy, if it is not in range
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          // move towards it
          creep.say('🚚')
          creep.moveTo(structure);
        }
      }
    }
  },
};
module.exports = roleCarrier;

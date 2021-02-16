module.exports = (sourceId) => ({
  // 收获能量
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(source);
  },
  //   storage传能量
  target: (creep) => {
    if (creep.room.name !== "W7N15") {
      const pos = new RoomPosition(14, 39, "W7N15");
      if (creep.moveTo(pos) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    } else {
      if (creep.memory.working == true) {
        if (
          creep.transfer(Game.rooms.W7N15.storage, RESOURCE_ENERGY) ==
          ERR_NOT_IN_RANGE
        ) {
          creep.moveTo(Game.rooms.W7N15.storage);
        }
      }
    }
  },
  //   切换工作状态
  switch: (creep) => creep.updateState(),
});

// let roleInvader = {
//   run: function (creep) {
//     if (creep.room.name !== "W7N15") {
//       const pos = new RoomPosition(14, 39, "W7N15");
//       if (creep.moveTo(pos) == ERR_NOT_IN_RANGE) {
//         creep.moveTo(creep.room.controller);
//       }
//     } else {
//       // 判断工作状态
//       if (creep.memory.working == false && creep.store.getFreeCapacity() == 0) {
//         creep.memory.working = true;
//       }
//       // 工作完成 能量为零 切换状态为 取能量
//       if (
//         creep.memory.working == true &&
//         creep.store.getFreeCapacity() == creep.store.getCapacity()
//       ) {
//         creep.memory.working = false;
//       }

//       // if creep is supposed to transfer energy to a structure
//       if (creep.memory.working == true) {
//         if (
//           creep.transfer(Game.rooms.W7N15.storage, RESOURCE_ENERGY) ==
//           ERR_NOT_IN_RANGE
//         ) {
//           creep.moveTo(Game.rooms.W7N15.storage);
//         }
//       } else {
//         creep.say("⛏️");
//         const source = creep.room.find(FIND_SOURCES)[1];
//         if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//           creep.moveTo(source);
//         }
//       }
//     }
//   },
// };

// module.exports = roleInvader;

module.exports = {
  // a function to run the logic for this role
  run: function (creep) {
    // if creep is bringing energy to a structure but has no energy left
    if (creep.memory.working == true && creep.store.getFreeCapacity() > 0) {
      // switch state
      creep.memory.working = false;
    }
    // if creep is harvesting energy but is full
    else if (
      creep.memory.working == false &&
      creep.store.getFreeCapacity() == 0
    ) {
      // switch state
      creep.memory.working = true;
    }

    // if creep is supposed to transfer energy to a structure
    if (creep.memory.working == true) {
      if (
        creep.transfer(Game.rooms.W7N14.terminal, RESOURCE_LEMERGIUM) ==
        ERR_NOT_IN_RANGE
      ) {
        creep.moveTo(Game.rooms.W7N14.terminal, { reusePath: 5 });
      }
    }
    // if creep is supposed to harvest energy from source
    else {
      creep.say("⛏️");
      var sources = creep.room.find(FIND_MINERALS);

      // try to harvest energy, if the source is not in range
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        // move towards the source
        creep.moveTo(sources[0], { reusePath: 5 });
      }
    }
  },
};

module.exports = (sourceId) => ({
  source: (creep) => {
    const source = Game.getObjectById(sourceId);
    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.moveTo(source, );
  },
  target: (creep) => {
    creep.say("🛠️");
    let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL,
    });

    if (structure != undefined) {
      if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure, );
      }
    }
  },
  switch: (creep) => creep.updateState(),
});

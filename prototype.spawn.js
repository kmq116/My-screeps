module.exports = function () {
  // create a new function for StructureSpawn
  StructureSpawn.prototype.createCustomCreep = function (energy, roleName) {
    var newName = roleName + Game.time;
    if (roleName == "harvester1" || roleName == "harvester2") {
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
      }
      return this.spawnCreep(body, newName, {
        memory: {
          role: roleName,
          working: false,
          source: Number(roleName.slice(9)) - 1,
        },
      });
    } else if (roleName == "invader") {
      // 入侵部件
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(MOVE);
        body.push(MOVE);
      }
      return this.spawnCreep(body, newName, {
        memory: {
          role: roleName,
          working: false,
        },
      });
    } else {
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(CARRY);
        body.push(MOVE);
      }
      return this.spawnCreep(body, newName, {
        memory: {
          role: roleName,
          working: false,
        },
      });
    }
  };
};

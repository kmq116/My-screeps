module.exports = function () {
  // create a new function for StructureSpawn
  StructureSpawn.prototype.createCustomCreep = function (energy, roleName) {
    var newName = roleName + Game.time;
    if (
      roleName == "harvester1" ||
      roleName == "harvester2" ||
      roleName == "harvester3" ||
      roleName == "harvester4"
    ) {
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
        },
      });
    } else if (roleName == "invader") {
      // 入侵部件
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
        body.push(CARRY);
        body.push(CARRY);
        body.push(CARRY);
        body.push(CARRY);
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
    } else if (roleName == "builder") {
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
        },
      });
    } else if (roleName == "carrier") {
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(CARRY);
        body.push(CARRY);
        body.push(MOVE);
        body.push(MOVE);
        body.push(MOVE);
        body.push(MOVE);
      }
      return this.spawnCreep(body, newName, {
        memory: {
          role: roleName,
          working: false,
        },
      });
    } else if (roleName == "upgrader1") {
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
        },
      });
    } else {
      {
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
          },
        });
      }
    }
  };
};

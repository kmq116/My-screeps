module.exports = function () {
  // create a new function for StructureSpawn
  StructureSpawn.prototype.createCustomCreep = function (energy, roleName) {
    let newName = roleName + Game.time;
    if (
      roleName == "harvester1" ||
      roleName == "harvester2" ||
      roleName == "harvester3" ||
      roleName == "harvester4"
    ) {
      let numberOfParts = Math.floor(energy / 200);
      let body = [];
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
      let numberOfParts = Math.floor(energy / 200);
      let body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
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
      let numberOfParts = Math.floor(energy / 200);
      let body = [];
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
      let numberOfParts = Math.floor(energy / 200);
      let body = [];
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
      let numberOfParts = Math.floor(energy / 200);
      let body = [];
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
        let numberOfParts = Math.floor(energy / 200);
        let body = [];
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

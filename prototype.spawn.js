module.exports = function () {
  // create a new function for StructureSpawn
  StructureSpawn.prototype.createCustomCreep = function (energy, roleName) {
    if (roleName == "harvester1" || roleName == "harvester2") {
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
      }
      for (let i = 0; i < numberOfParts - 1; i++) {
        body.push(CARRY);
      }
      for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
      }
      var newName = roleName + Game.time;
      // create creep with the created body and the given role
      return this.createCreep(body, newName, {
        role: roleName,
        working: false,
        source: Number(roleName.slice(9)) - 1,
      });
    } else if (roleName == "invader") {
      // 入侵部件
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
      }
      for (let i = 0; i < numberOfParts ; i++) {
        body.push(CARRY);
      }
      // for (let i = 0; i < numberOfParts; i++) {
      //   body.push(CLAIM);
      // }
      for (let i = 0; i < numberOfParts * 2; i++) {
        body.push(MOVE);
      }
      var newName = roleName + Game.time;
      // create creep with the created body and the given role
      return this.createCreep(body, newName, {
        role: roleName,
        working: false,
      });
    } else {
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
      }
      for (let i = 0; i < numberOfParts * 2; i++) {
        body.push(CARRY);
      }
      for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
      }
      var newName = roleName + Game.time;
      // create creep with the created body and the given role
      return this.createCreep(body, newName, {
        role: roleName,
        working: false,
      });
    }
  };
};

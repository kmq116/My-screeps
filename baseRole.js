module.exports = {
  carrier: (sourceId) => ({
    // 收获能量
    source: (creep) => {
      const source = Game.getObjectById(sourceId);
      if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        creep.moveTo(source);
    },
    //   给link传送能量
    target: (creep) => {
      let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        // the second argument for findClosestByPath is an object which takes
        // a property called filter which can be a function
        // we use the arrow operator to define it
        filter: (s) =>
          (s.structureType == STRUCTURE_SPAWN ||
            s.structureType == STRUCTURE_EXTENSION ||
            s.structureType == STRUCTURE_TOWER ||
            s.structureType == STRUCTURE_POWER_SPAWN) &&
          s.energy < s.energyCapacity,
        algorithm: "dijkstra",
      });

      //  let  structure = Game.rooms.W7N14.terminal
      // if we found one
      if (structure != undefined) {
        // try to transfer energy, if it is not in range
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          // move towards it
          creep.say("🚚");
          creep.moveTo(structure);
        }
      }
    },
    //   切换工作状态
    switch: (creep) => creep.updateState(),
  }),
  powerCreep: (sourceId, targetId, resourceType) => ({
    // 收获能量
    source: (creep) => {
      const source = Game.getObjectById(sourceId);
      if (creep.withdraw(source, resourceType, 400) == ERR_NOT_IN_RANGE)
        creep.moveTo(source);
    },
    // 升级
    target: (creep) => {
      const target = Game.getObjectById(targetId);
      let energy = creep.room.energyCapacityAvailable;
      if (
        creep.room.energyAvailable < energy * 0.8 &&
        creep.usePower(PWR_OPERATE_EXTENSION, target) == ERR_NOT_IN_RANGE
      ) {
        console.log("extension 可用能量不足80%");
        creep.moveTo(target);
      } else if (
        creep.room.storage.store.getFreeCapacity() <= 1000 &&
        creep.usePower(PWR_OPERATE_STORAGE, target) == ERR_NOT_IN_RANGE
      ) {
        console.log("storage容量下降");
        creep.moveTo(target);
      } else if (
        creep.store.getFreeCapacity() == 0 &&
        creep.transfer(creep.room.terminal, RESOURCE_OPS) == ERR_NOT_IN_RANGE
      ) {
        // 我满了，先放下一部分
        console.log("我满了，先放下一部分");
        creep.moveTo(creep.room.terminal);
      } else {
        creep.usePower(PWR_GENERATE_OPS);
      }
    },
    //   切换工作状态
    switch: (creep) => creep.updateState(),
  }),
  harvester: (sourceId) => ({
    // 收获能量
    source: (creep) => {
      const source = Game.getObjectById(sourceId);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);
    },
    //   给link传送能量
    target: (creep) => {
      const link = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_LINK },
      });
      // 有link给link 传送 否则给storage
      if (link) {
        if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(link);
        }
      } else {
        if (
          creep.transfer(Game.rooms.W7N15.storage, RESOURCE_ENERGY) ==
          ERR_NOT_IN_RANGE
        ) {
          creep.moveTo(Game.rooms.W7N15.storage);
        }
      }
    },
    //   切换工作状态
    switch: (creep) => creep.updateState(),
  }),
  upgrader: (sourceId) => ({
    // 收获能量
    source: (creep) => {
      const source = Game.getObjectById(sourceId);
      if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        creep.moveTo(source);
    },
    // 升级
    target: (creep) => {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    },

    //   切换工作状态
    switch: (creep) => creep.updateState(),
  }),
  transporter: (sourceId) => ({
    // 收获能量
    source: (creep) => {
      const source = Game.getObjectById(sourceId);
      if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    },
    // 升级
    target: (creep) => {
      if (
        creep.transfer(
          Game.rooms[creep.memory.room].storage,
          RESOURCE_ENERGY
        ) == ERR_NOT_IN_RANGE
      ) {
        creep.moveTo(Game.rooms[creep.memory.room].storage);
      }
    },
    //   切换工作状态
    switch: (creep) => creep.updateState(),
  }),
  terminalTransporter: (sourceId, targetId, resourceType) => ({
    // 收获能量
    source: (creep) => {
      const source = Game.getObjectById(sourceId);

      if (creep.withdraw(source, resourceType) == ERR_NOT_IN_RANGE)
        creep.moveTo(source);

      // const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
      // if (target) {
      //   if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
      //     creep.moveTo(target);
      //   }
      // }
    },
    // 升级
    target: (creep) => {
      const target = Game.getObjectById(targetId);

      for (const resourceType in creep.carry) {
        if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    },
    //   切换工作状态
    switch: (creep) => creep.updateState(),
  }),
  builder: (sourceId) => ({
    // 收获能量
    source: (creep) => {
      const source = Game.getObjectById(sourceId);
      // 捡能量
      const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
      if (target) {
        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      } else if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        creep.moveTo(source);
    },
    //   给link传送能量
    target: (creep) => {
      // find closest constructionSite
      let constructionSite = creep.pos.findClosestByPath(
        FIND_CONSTRUCTION_SITES
      );
      // if one is found
      if (constructionSite != undefined) {
        // try to build, if the constructionSite is not in range
        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
          // move towards the constructionSite
          creep.moveTo(constructionSite);
        }
      } else {
        creep.suicide();
      }
    },
    //   切换工作状态
    switch: (creep) => creep.updateState(),
  }),
  repairer: (sourceId) => ({
    source: (creep) => {
      const source = Game.getObjectById(sourceId);
      if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        creep.moveTo(source);
    },
    target: (creep) => {
      creep.say("🛠️");
      let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL,
      });

      if (structure != undefined) {
        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }
      }
    },
    switch: (creep) => creep.updateState(),
  }),
  wallRepairer: (sourceId) => ({
    // 收获能量
    source: (creep) => {
      const source = Game.getObjectById(sourceId);
      if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        creep.moveTo(source);
    },
    // 升级
    target: (creep) => {
      // find all walls in the room
      let walls = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_WALL,
      });

      let target = undefined;

      // loop with increasing percentages
      for (
        let percentage = 0.0001;
        percentage <= 1;
        percentage = percentage + 0.0001
      ) {
        // find a wall with less than percentage hits
        for (let wall of walls) {
          if (wall.hits / wall.hitsMax < percentage) {
            target = wall;
            break;
          }
        }

        // if there is one
        if (target != undefined) {
          // break the loop
          break;
        }
      }
      // if we find a wall that has to be repaired
      if (target != undefined) {
        // try to repair it, if not in range
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
          // move towards it
          creep.moveTo(target);
        }
      }
    },
    //   切换工作状态
    switch: (creep) => creep.updateState(),
  }),
  invader: (sourceId) => ({
    // 收获能量
    source: (creep) => {
      // 找自己房间的 storage
      let storage = creep.room.storage;
      if (
        creep.withdraw(storage, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE &&
        storage.store[RESOURCE_ENERGY] >= 200000
      )
        creep.moveTo(storage);
    },
    //   给link传送能量
    target: (creep) => {
      let terminal = creep.room.terminal;
      // creep.drop(RESOURCE_LEMERGIUM);
      for (const resourceType in creep.carry) {
        creep.drop(resourceType);
      }
      // if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      //   // move towards it
      //   creep.moveTo(terminal);
      // }
    },
    //   切换工作状态
    switch: (creep) => creep.updateState(),
  }),
};

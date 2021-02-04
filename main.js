// 导入模块
require("prototype.spawn")();
var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var roleWallRepairer = require("role.wallRepairer");
var roleCarrier = require("role.carrier");
var roleTransporter = require("role.transporter");
var roleMiner = require("role.miner");
var roleTerminalTranspoter = require("role.terminalTranspoter");

module.exports.loop = function () {
  const linkDown = Game.rooms["W7N14"].lookForAt("structure", 44, 30)[0];
  const linkUp = Game.rooms["W7N14"].lookForAt("structure", 40, 19)[0];

  // link 传送能量
  function linkTransfer(link) {
    const linkTo = linkUp.pos.findInRange(FIND_MY_STRUCTURES, 9, {
      filter: { structureType: STRUCTURE_LINK },
    })[0];
    return link.transferEnergy(linkTo);
  }
  if (linkUp.store.getFreeCapacity(RESOURCE_ENERGY) <= 100) {
    linkTransfer(linkUp);
  }
  if (linkDown.store.getFreeCapacity(RESOURCE_ENERGY) <= 100) {
    linkTransfer(linkDown);
  }

  // 通过遍历Memory.creeps检查死亡的小兵的内存   删除内存
  for (let name in Memory.creeps) {
    // 并检查小兵是否还活着
    if (Game.creeps[name] == undefined) {
      // 如果不是，则删除内存条目
      delete Memory.creeps[name];
    }
  }

  // 遍历所有creeps 分角色执行任务
  for (let name in Game.creeps) {
    // get the creep object
    var creep = Game.creeps[name];

    // if creep is harvester, call harvester script
    if (
      creep.memory.role == "harvester1" ||
      creep.memory.role == "harvester2"
    ) {
      roleHarvester.run(creep);
    }
    // if creep is upgrader, call upgrader script
    else if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    // if creep is builder, call builder script
    else if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
    // if creep is repairer, call repairer script
    else if (creep.memory.role == "repairer") {
      roleRepairer.run(creep);
    }
    // if creep is wallRepairer, call wallRepairer script
    else if (creep.memory.role == "wallRepairer") {
      roleWallRepairer.run(creep);
    } 
    else if (creep.memory.role == "carrier") {
      roleCarrier.run(creep);
    } 
    else if (creep.memory.role == "transporter") {
      roleTransporter.run(creep);
    } 
    else if (creep.memory.role == "terminalTranspoter") {
      roleTerminalTranspoter.run(creep);
    } 
    else if (creep.memory.role == "miner") {
      roleMiner.run(creep);
    }
  }

  //获得自己房间里的所有建筑
  var towers = Game.rooms.W7N14.find(FIND_STRUCTURES, {
    filter: (s) => s.structureType == STRUCTURE_TOWER,
  });
  for (let tower of towers) {
    var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target != undefined) {
      tower.attack(target);
    }
  }

  // 设置不同角色最小值
  var minimumNumberOfHarvesters = 1;
  var minimumNumberOfUpgraders = 1;
  var minimumNumberOfBuilders = 1;
  var minimumNumberOfRepairers = 1;
  var minimumNumberOfWallRepairers = 1;
  var minimumNumberOfCarrier = 2;
  var minimumNumberOfTransporter = 1;
  var minimumNumberOfMiner = 1;

  // 获得每个角色数量
  // _.sum will count the number of properties in Game.creeps filtered by the
  //  arrow function, which checks for the creep being a harvester
  var numberOfHarvesters1 = _.sum(
    Game.creeps,
    (c) => c.memory.role == "harvester1"
  );
  var numberOfHarvesters2 = _.sum(
    Game.creeps,
    (c) => c.memory.role == "harvester2"
  );
  var numberOfUpgraders = _.sum(
    Game.creeps,
    (c) => c.memory.role == "upgrader"
  );
  var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
  var numberOfRepairers = _.sum(
    Game.creeps,
    (c) => c.memory.role == "repairer"
  );
  var numberOfWallRepairers = _.sum(
    Game.creeps,
    (c) => c.memory.role == "wallRepairer"
  );
  var numberOfCarrier = _.sum(Game.creeps, (c) => c.memory.role == "carrier");
  var numberOfTransporter = _.sum(
    Game.creeps,
    (c) => c.memory.role == "transporter"
  );
  var numberOfMiner = _.sum(Game.creeps, (c) => c.memory.role == "miner");
  var numberOfTerminalTranspoter = _.sum(Game.creeps, (c) => c.memory.role == "terminalTranspoter");

  // 判断是否孵化中
  var mySpawn = Game.spawns.Spawn1;

  // if (Game.spawns.Spawn1.spawning) {
  //   mySpawn = Game.spawns.Spawn2;
  // } else if(Game.spawns.Spawn2.spawning){
  //      mySpawn = Game.spawns.Spawn3;
  // }else if(Game.spawns.Spawn3.spawning){
  //     mySpawn = Game.spawns.Spawn1;
  // }

  // var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
  var name = undefined;

  if (numberOfCarrier < minimumNumberOfCarrier) {
    name = mySpawn.createCustomCreep(1000, "carrier");
  }
  // 搬运能量到storage
  else if (numberOfTransporter < minimumNumberOfTransporter) {
    // try to spawn one
    name = mySpawn.createCustomCreep(800, "transporter");
  }
  // if not enough harvesters
  else if (numberOfHarvesters1 < minimumNumberOfHarvesters) {
    // try to spawn one
    name = mySpawn.createCustomCreep(1000, "harvester1");
    // if spawning failed and we have no harvesters left
  } else if (numberOfHarvesters2 < minimumNumberOfHarvesters) {
    // try to spawn one
    name = mySpawn.createCustomCreep(1000, "harvester2");
  }

  // if not enough upgraders
  else if (numberOfUpgraders < minimumNumberOfUpgraders) {
    // try to spawn one
    name = mySpawn.createCustomCreep(800, "upgrader");
  }

  // if not enough repairers
  else if (numberOfRepairers < minimumNumberOfRepairers) {
    // try to spawn one
    name = mySpawn.createCustomCreep(600, "repairer");
  }

  // if not enough builders
  else if (numberOfBuilders < minimumNumberOfBuilders) {
    // try to spawn one
    name = mySpawn.createCustomCreep(800, "builder");
  }

  // if not enough wallRepairers
  else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
    // try to spawn one
    name = mySpawn.createCustomCreep(600, "wallRepairer");
  } else if (numberOfMiner < minimumNumberOfMiner) {
    // try to spawn one
    name = mySpawn.createCustomCreep(800, "miner");
  } 
  // else if (numberOfTerminalTranspoter < minimumNumberOfMiner) {
  //   // try to spawn one
  //   name = mySpawn.createCustomCreep(800, "terminalTranspoter");
  // } 
  else if (
    Game.rooms.W7N14.storage.store[RESOURCE_ENERGY] >= 100000 &&
    numberOfBuilders < 1
  ) {
    name = mySpawn.createCustomCreep(600, "builder");
  }
};

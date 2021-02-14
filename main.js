// 导入模块
require("prototype.spawn")();
const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleRepairer = require("role.repairer");
const roleWallRepairer = require("role.wallRepairer");
const roleCarrier = require("role.carrier");
const roleTransporter = require("role.transporter");
const roleMiner = require("role.miner");
const roleTerminalTransporter = require("role.terminalTransporter");
const roleInvader = require("role.invader");
const config = require("config");

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
    // creep 如果死亡，从内存中删除
    if (Game.creeps[name] == undefined) {
      // 如果不是，则删除内存条目
      delete Memory.creeps[name];
    }
  }

  // 遍历所有creeps 分角色执行任务
  for (let name in Game.creeps) {
    // 获得角色
    let creep = Game.creeps[name];
    // 最小角色
    let minRoles = {
      harvester1: () => {
        roleHarvester.run(creep);
      },
      harvester2: () => {
        roleHarvester.run(creep);
      },
      upgrader: () => {
        roleUpgrader.run(creep);
      },
      builder: () => {
        roleBuilder.run(creep);
      },
      repairer: () => {
        roleRepairer.run(creep);
      },
      wallRepairer: () => {
        roleWallRepairer.run(creep);
      },
      carrier: () => {
        roleCarrier.run(creep);
      },
      transporter: () => {
        roleTransporter.run(creep);
      },
      terminalTransporter: () => {
        roleTerminalTransporter.run(creep);
      },
      miner: () => {
        roleMiner.run(creep);
      },
      invader: () => {
        roleInvader.run(creep);
      },
    };
    minRoles[creep.memory.role]();
  }

  //获得自己房间里的所有建筑
  // tower 的自动修路 逻辑
  let towers = Game.rooms.W7N14.find(FIND_STRUCTURES, {
    filter: (s) => s.structureType == STRUCTURE_TOWER,
  });
  for (let tower of towers) {
    let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    let structure = tower.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL&&s.structureType != STRUCTURE_RAMPART,
    });
    if (target != undefined) {
      tower.attack(target);
    }else if(structure != undefined){
      tower.repair(structure);
    }
  }
  // 获得每个角色数量
  let numberOfHarvesters1 = _.sum(
    Game.creeps,
    (c) => c.memory.role == "harvester1"
  );
  let numberOfHarvesters2 = _.sum(
    Game.creeps,
    (c) => c.memory.role == "harvester2"
  );
  let numberOfUpgraders = _.sum(
    Game.creeps,
    (c) => c.memory.role == "upgrader"
  );
  let numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
  let numberOfRepairers = _.sum(
    Game.creeps,
    (c) => c.memory.role == "repairer"
  );
  let numberOfWallRepairers = _.sum(
    Game.creeps,
    (c) => c.memory.role == "wallRepairer"
  );
  let numberOfCarrier = _.sum(Game.creeps, (c) => c.memory.role == "carrier");
  let numberOfTransporter = _.sum(
    Game.creeps,
    (c) => c.memory.role == "transporter"
  );
  let numberOfMiner = _.sum(Game.creeps, (c) => c.memory.role == "miner");
  let numberOfTerminalTransporter = _.sum(
    Game.creeps,
    (c) => c.memory.role == "terminalTransporter"
  );
  let numberOfInvader = _.sum(Game.creeps, (c) => c.memory.role == "invader");

  let mySpawn = Game.spawns.Spawn1;
  if (mySpawn.spawning) {
    mySpawn = Game.spawns.Spawn2;
  }
  let name = undefined;
  //判断 角色数量 执行生产逻辑
  if (numberOfCarrier < config.roleNumber.minCarrier)
    name = mySpawn.createCustomCreep(1000, "carrier");
  if (numberOfTransporter < config.roleNumber.minTransporter)
    name = mySpawn.createCustomCreep(800, "transporter");
  if (numberOfHarvesters1 < config.roleNumber.minHarvesters)
    name = mySpawn.createCustomCreep(1000, "harvester1");
  if (numberOfHarvesters2 < config.roleNumber.minHarvesters)
    name = mySpawn.createCustomCreep(1000, "harvester2");
  if (numberOfUpgraders < config.roleNumber.minUpgraders)
    name = mySpawn.createCustomCreep(600, "upgrader");
  // if (numberOfRepairers < config.roleNumber.minRepairers)
  //   name = mySpawn.createCustomCreep(600, "repairer");
  // if (numberOfBuilders < config.roleNumber.minBuilders)
  //   name = mySpawn.createCustomCreep(800, "builder");
  // if (numberOfWallRepairers < config.roleNumber.minWallRepairers)
  //   name = mySpawn.createCustomCreep(600, "wallRepairer");
  // if (numberOfMiner < config.roleNumber.minMiner)
  //   name = mySpawn.createCustomCreep(800, "miner");
  if (numberOfTerminalTransporter < config.roleNumber.minMiner)
    name = mySpawn.createCustomCreep(1000, "terminalTransporter");
  if (numberOfInvader < config.roleNumber.minInvader)
    name = mySpawn.createCustomCreep(1000, "invader");
  // if (
  //   Game.rooms.W7N14.storage.store[RESOURCE_ENERGY] >= 100000 &&
  //   numberOfBuilders < 1
  // )
  //   name = mySpawn.createCustomCreep(600, "builder");
};

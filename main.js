// 导入模块
require("mount.spawn")();
require("mount.creep")();
require("mount.tower")();

module.exports.loop = function () {
  // // link 传送能量
  (function () {
    const linkDown = Game.rooms["W7N14"].lookForAt("structure", 44, 30)[0];
    const linkUp = Game.rooms["W7N14"].lookForAt("structure", 40, 19)[0];
    const Main = linkUp.pos.findInRange(FIND_MY_STRUCTURES, 9, {
      filter: { structureType: STRUCTURE_LINK },
    })[0];

    if (linkUp.store.getFreeCapacity(RESOURCE_ENERGY) <= 100) {
      linkUp.transferEnergy(Main);
    }
    if (linkDown.store.getFreeCapacity(RESOURCE_ENERGY) <= 100) {
      linkDown.transferEnergy(Main);
    }
  })();

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
    let creep = Game.creeps[name];
    creep.work();
  }

  //获得自己房间里的所有塔
  let towers = Game.rooms.W7N14.find(FIND_STRUCTURES, {
    filter: (s) => s.structureType == STRUCTURE_TOWER,
  });
  for (let tower of towers) {
    tower.work();
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
  let numberOfHarvesters3 = _.sum(
    Game.creeps,
    (c) => c.memory.role == "harvester3"
  );
  let numberOfHarvesters4 = _.sum(
    Game.creeps,
    (c) => c.memory.role == "harvester4"
  );
  let numberOfUpgraders = _.sum(
    Game.creeps,
    (c) => c.memory.role == "upgrader1"
  );
  let numberOfUpgradersW7N15 = _.sum(
    Game.creeps,
    (c) => c.memory.role == "upgraderW7N15"
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
  let numberOfCarrierW7N15 = _.sum(
    Game.creeps,
    (c) => c.memory.role == "carrierW7N15"
  );
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

  // 两个生产互相切换
  let mySpawn = Game.spawns.Spawn1;
  let otherSpawn = Game.spawns.Spawn3;
  if (mySpawn.spawning) {
    mySpawn = Game.spawns.Spawn2;
  }
  let name = undefined;

  //判断 角色数量 执行生产逻辑
  if (numberOfCarrier < 1)
    name = mySpawn.createCustomCreep(1000, "carrier");
  if (numberOfCarrierW7N15 < 1)
    name = otherSpawn.createCustomCreep(600, "carrierW7N15");
  if (numberOfTransporter < 1)
    name = mySpawn.createCustomCreep(800, "transporter");
  if (numberOfHarvesters1 < 1)
    name = mySpawn.createCustomCreep(1000, "harvester1");
  if (numberOfHarvesters3 < 1)
    name = otherSpawn.createCustomCreep(800, "harvester3");
  if (numberOfHarvesters2 < 1)
    name = mySpawn.createCustomCreep(1000, "harvester2");
  if (numberOfHarvesters4 < 1)
    name = otherSpawn.createCustomCreep(800, "harvester4");
  if (numberOfUpgraders < 1)
    name = mySpawn.createCustomCreep(300, "upgrader1");
  if (numberOfUpgradersW7N15 < 5)
    name = otherSpawn.createCustomCreep(1000, "upgraderW7N15");
  if (numberOfBuilders < 1)
    name = otherSpawn.createCustomCreep(1000, "builder");
  if (numberOfWallRepairers < 1)
    name = mySpawn.createCustomCreep(600, "wallRepairer");
  if (numberOfTerminalTransporter < 1)
    name = mySpawn.createCustomCreep(1000, "terminalTransporter");
  if (numberOfInvader < 1)
    name = mySpawn.createCustomCreep(1200, "invader");
};

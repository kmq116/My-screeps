// 导入模块
require("mount.spawn")();
require("mount.creep")();
require("mount.tower")();
require("mount.powerCreep")();

// Game.rooms.W7N14.memory.spawnList = ["terminalTransporterW7N14"];
// Game.rooms.W7N15.memory.spawnList = ["builderW7N15",'builderW7N15']

module.exports.loop = function () {
//   try {
//      Game.market.deal("6045865a64712e34f91f20ef", 100000, "W7N14");
//   } catch (err) {}
  // link 传送能量
  (function () {
    const linkDown = Game.rooms["W7N14"].lookForAt("structure", 44, 30)[0];
    const linkUp = Game.rooms["W7N14"].lookForAt("structure", 40, 19)[0];
    const Main = linkUp.pos.findInRange(FIND_MY_STRUCTURES, 9, {
      filter: { structureType: STRUCTURE_LINK },
    })[0];

    let linkUpW7N15 = Game.getObjectById("6040ff2f5d6e9501df00c2b0");
    let linkRightW7N15 = Game.getObjectById("6046ebdab4c30dd261bfb578");
    let linkMainW7N15 = Game.getObjectById("6040dcc3a6bccc07e74f52f7");

    if (linkUpW7N15.store.getFreeCapacity(RESOURCE_ENERGY) <= 100) {
      linkUpW7N15.transferEnergy(linkMainW7N15);
    }

    if (linkRightW7N15.store.getFreeCapacity(RESOURCE_ENERGY) <= 100) {
      linkRightW7N15.transferEnergy(linkMainW7N15);
    }

    if (linkUp.store.getFreeCapacity(RESOURCE_ENERGY) <= 100) {
      linkUp.transferEnergy(Main);
    }

    if (linkDown.store.getFreeCapacity(RESOURCE_ENERGY) <= 100) {
      linkDown.transferEnergy(Main);
    }
  })();

  if (Game.cpu.bucket == 10000) {
    Game.cpu.generatePixel();
  }

  // 超能注册
  let powerSpawn = Game.getObjectById("5fb1893ae7f0760f5449d7ed");
  powerSpawn.processPower();

  // 超能逻辑
  let fhtx = Game.powerCreeps["fhtx"];
  fhtx.work();

  // 工厂生产
  let factory = Game.getObjectById("5f572ed57d36e2eb6c6dfebe");
  if (factory.cooldown == 0) {
    factory.produce(RESOURCE_LEMERGIUM_BAR);
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
  let towersW7N15 = Game.rooms.W7N15.find(FIND_STRUCTURES, {
    filter: (s) => s.structureType == STRUCTURE_TOWER,
  });
  for (let tower of towersW7N15) {
    tower.work();
  }

  // 两个生产互相切换
  let mySpawn = Game.spawns.Spawn1;

  let spawn3 = Game.spawns.Spawn3;
  if (mySpawn.spawning) {
    mySpawn = Game.spawns.Spawn2;
  }
  mySpawn.work();
  spawn3.work();
};

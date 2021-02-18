// 导入模块
require("mount.spawn")();
require("mount.creep")();
require("mount.tower")();
const creepNumber = require("config.role.number");

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


  // Game.rooms.W7N14.memory.spawnList = ['harvesterW7N1401',"harvesterW7N1402","carrierW7N14",'upgraderW7N14','transporterW7N14','wallRepairerW7N14','terminalTransporterW7N14']
  // Game.rooms.W7N15.memory.spawnList = ['harvesterW7N1501','harvesterW7N1502','carrierW7N15','upgraderW7N15','builderW7N15']


  //获得自己房间里的所有塔
  let towers = Game.rooms.W7N14.find(FIND_STRUCTURES, {
    filter: (s) => s.structureType == STRUCTURE_TOWER,
  });
  for (let tower of towers) {
    tower.work();
  }

  // 两个生产互相切换
  for (let name in Game.spawns) {
    let spawn = Game.spawns[name];
    spawn.work();
  }

 
};

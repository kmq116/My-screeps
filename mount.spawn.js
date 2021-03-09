// 引入 creep number 配置项
const creepConfig = require("config.bodys");

// 将拓展签入 Creep 原型
module.exports = function () {
  _.assign(Spawn.prototype, spawnExtension);
};

// 自定义的 Creep 的拓展
const spawnExtension = {
  work() {
    // 自己已经在生成了 / 内存里没有生成队列 / 生产队列为空 就啥都不干
    if (
      this.spawning ||
      !this.room.memory.spawnList ||
      this.room.memory.spawnList.length == 0
    )
      return;
    // 进行生成
    const spawnSuccess = this.mainSpawn(this.room.memory.spawnList[0]);
    // 生成成功后移除任务
    if (spawnSuccess) this.room.memory.spawnList.shift();
  },

  mainSpawn(taskName) {
    let newName = taskName + Game.time;
    let config = creepConfig.find((item) => item.role == taskName);
    console.log(config.role);
    let bodys = calcBodyPart(config.bodys);
    let ok = undefined;
    if (bodys) {
      ok = this.spawnCreep(bodys, newName, {
        memory: {
          role: taskName,
          working: false,
          hasSendRebirth: false,
          // 哪个房间生产的就 给哪个房间发命令
          room: this.room.name,
        },
      });
      
    }
    console.log(ok);

    return ok == OK ? true : false;
  },
};

/**
 * 计算身体部件的属性
 * @param {object} bodyConfig
 */
function calcBodyPart(bodyConfig) {
  let config = Object.keys(bodyConfig).map((item) => {
    return Array(bodyConfig[item]).fill(item);
  });
  console.log(config[0][0]);
  return [].concat(...config);
}

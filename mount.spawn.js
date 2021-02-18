// 引入 creep number 配置项
const creepNumber = require("config.role.number");
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
    let config = creepNumber.find((item) => item.role == taskName);
    console.log(config);
    if (config) {
      this.spawnCreep(config.bodys, newName, {
        memory: {
          role: taskName,
          working: false,
          hasSendRebirth: false,
        },
      });
    }
    return config;
  },
};

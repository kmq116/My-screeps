// 引入 creep 配置项
const creepConfigs = require("config.creep");

// 将拓展签入 Creep 原型
module.exports = function () {
  _.assign(PowerCreep.prototype, powerCreepExtension);
};

// 自定义的 Creep 的拓展
const powerCreepExtension = {
  // 更新工作状态
  updateState() {
    if (this.memory.working == false && this.store.getFreeCapacity() <= 200) {
      this.memory.working = true;
      this.say("执行 target 阶段");
    }
    // 工作完成 能量为零 切换状态为 取能量
    if (
      this.memory.working == true &&
      this.store.getFreeCapacity() == this.store.getCapacity()
    ) {
      this.memory.working = false;
      this.say("执行 source 阶段");
    }
    return this.memory.working;
  },

  work() {
    let powerSpawn = Game.getObjectById("5fb1893ae7f0760f5449d7ed");
    if (this.ticksToLive <= 100 && this.renew(powerSpawn) == ERR_NOT_IN_RANGE)
      return this.moveTo(powerSpawn);

    if (!(this.memory.role in creepConfigs))
      return console.log(
        `${this.memory.role}内存的role 属性不在 creepConfigs 中`
      );
    const creepConfig = creepConfigs[this.memory.role];
    const working = creepConfig.switch ? creepConfig.switch(this) : true;
    if (working) {
      if (creepConfig.target) creepConfig.target(this);
    } else {
      if (creepConfig.source) creepConfig.source(this);
    }
  },

  // creep 监控状态检查
  isHealthy() {
    if (this.ticksToLive <= 10) return false;
    else return true;
  },
};

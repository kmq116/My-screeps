// 引入 creep 配置项
const creepConfigs = require("config.creep");

// 将拓展签入 Creep 原型
module.exports = function () {
  _.assign(Creep.prototype, creepExtension);
};

// 自定义的 Creep 的拓展
const creepExtension = {
  // 更新工作状态
  updateState() {
    // creep 身上没有能量 && creep 之前的状态为“工作”
    if (this.store[RESOURCE_ENERGY] <= 0 && this.memory.working) {
      this.memory.working = false;
      this.say("执行 source 阶段");
    }
    // creep 身上能量满了 && creep 之前的状态为“不工作”
    if (
      this.store[RESOURCE_ENERGY] >= this.store.getCapacity() &&
      !this.memory.working
    ) {
      this.memory.working = true;
      this.say("执行 target 阶段");
    }

    return this.memory.working;
  },

  work() {
    // 如果 creep 还没有发送重生信息的话，执行健康检查，保证只发送一次生成任务
    // 健康检查不通过则向 spawnList 发送自己的生成任务
    if(!this.memory.hasSendRebirth){
      const health = this.isHealthy()
      if(!health){
        this.room.memory.spawnList.push(this.memory.role)
      }
    }

    if (!(this.memory.role in creepConfigs)) return;
    // console.log(
    //   `${this.memory.role}内存的role 属性不在 creepConfigs 中`
    // );
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

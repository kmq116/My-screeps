module.exports = {
    // a function to run the logic for this role
    run: function (creep) {

        // 判断工作状态

        if (creep.memory.working == false && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true
        }
        // 工作完成 能量为零 切换状态为 取能量
        if (creep.memory.working == true && creep.store.getFreeCapacity() == creep.store.getCapacity()) {
            creep.memory.working = false
        }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working == true) {
            // instead of upgraderController we could also use:
            // if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.say('📤')
            // try to upgrade the controller
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
                creep.moveTo(creep.room.controller);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            if (creep.withdraw(Game.rooms.W7N14.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms.W7N14.storage);
            }
        }
    }
};
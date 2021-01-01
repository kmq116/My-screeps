module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        const link = creep.pos.findInRange(FIND_MY_STRUCTURES, 2, { filter: { structureType: STRUCTURE_LINK } })[0]


        // 判断工作状态

        if (creep.memory.working == false && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true
        }
        // 工作完成 能量为零 切换状态为 取能量
        if (creep.memory.working == true && creep.store.getFreeCapacity() == creep.store.getCapacity()) {
            creep.memory.working = false
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // if (creep.transfer(Game.rooms.W7N14.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(Game.rooms.W7N14.storage)
            // }
            if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link)
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            creep.say('⛏️')
            // var sources = creep.room.find(FIND_MINERALS);
            var sources = creep.room.find(FIND_SOURCES);

            // try to harvest energy, if the source is not in range
            if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(sources[creep.memory.source]);
            }

        }
    }
};
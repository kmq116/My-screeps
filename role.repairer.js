var roleBuilder = require('role.builder');

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

        // if creep is supposed to repair something
        if (creep.memory.working == true) {
            // find closest structure with less than max hits
            // Exclude walls because they have way too many max hits and would keep
            // our repairers busy forever. We have to find a solution for that later.
            creep.say('🛠️')
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleBuilder.run(creep);
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
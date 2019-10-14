const creepActions = require("../utils/creep-actions");

var upgraderRole = {

    /**
     * @param {Creep} creep
     */
    run: (creep) => {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	    }

	    if(creep.memory.upgrading) {
            creepActions.upgrader.upgradeController(creep);
        }
        else {
            creepActions.harvester.harvest(creep);
        }
	}
};

module.exports = upgraderRole;
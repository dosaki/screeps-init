const creepActions = require("../utils/creep-actions");

const harvesterRole = {
    /**
     * @param {Creep} creep
     */
    run: (creep) => {
	    if(creep.carry.energy < creep.carryCapacity) {
            creepActions.harvester.harvest(creep);
        }
        else {
            creepActions.harvester.deliver(creep);
        }
	}
};

module.exports = harvesterRole;
const creepActions = require("../utils/creep-actions");

const builderRole = {
    /**
     * @param {Creep} creep
     */
    run: (creep) => {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
            creepActions.builder.build(creep);
	    }
	    else {
            creepActions.harvester.harvest(creep);
	    }
	}
};

module.exports = builderRole;
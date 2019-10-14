const creepUtils = require("../utils/creep-utils");

const commonActions = {

};

const harvesterActions = {
    /**
     * @param {Creep} creep
     */
    harvest: (creep) => {
        const sources = creepUtils.find.sources(creep);
        if(!creep.memory.preferredSource) {
            const preferredSource = sources[Math.floor(Math.random() * sources.length)];
            creep.memory.preferredSource = preferredSource.id;
        }
        const source = Game.getObjectById(creep.memory.preferredSource)
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
    /**
     * @param {Creep} creep
     */
    deliver: (creep) => {
        const targets = creepUtils.find.structuresByTypes(creep, [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER]);
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    },
};

const builderActions = {
    /**
     * @param {Creep} creep
     */
    build: (creep) => {
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    },
};

const upgraderActions = {
    /**
     * @param {Creep} creep
     */
    upgradeController: (creep) => {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    },
};

module.exports = {
    harvester: harvesterActions,
    builder: builderActions,
    upgrader: upgraderActions,
}
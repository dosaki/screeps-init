const findStructuresByTypes = (creep, types) => {
    return creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (types.indexOf(structure.structureType) > 0) &&
                structure.energy < structure.energyCapacity;
        }
    });
};

const findSources = (creep) => {
    return creep.room.find(FIND_SOURCES);
};

module.exports = {
    find: {
        structuresByTypes: findStructuresByTypes,
        sources: findSources
    }
}
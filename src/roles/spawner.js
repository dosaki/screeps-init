const makeParts = (parts) => {
    return _.map(parts, (part) => {
        return part.name;
    });
};

const calculateCost = (parts) => {
    return _.reduce(parts, (cost, part) => {
        return cost + part.cost;
    }, 0);
};

const makeCreepPart = (name, cost) => {
    return {
        name: name,
        cost: cost
    }
};
const makeRole = (parts) => {
    return {
        parts: makeParts(parts),
        cost: calculateCost(parts)
    }
};

//For costs, see https://github.com/screeps/docs/blob/master/api/source/Creep.md
MOVE = makeCreepPart("move", 50);
WORK = makeCreepPart("work", 100);
CARRY = makeCreepPart("carry", 50);
ATTACK = makeCreepPart("attack", 80);
RANGED_ATTACK = makeCreepPart("ranged_attack", 150);
HEAL = makeCreepPart("heal", 250);
CLAIM = makeCreepPart("claim", 600);
TOUGH = makeCreepPart("tough", 10);

const roles = {
    'harvester-0': makeRole([WORK, CARRY, MOVE]),
    'harvester-1': makeRole([WORK, CARRY, MOVE, MOVE]),
    'harvester-2': makeRole([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]),
    'upgrader-0': makeRole([WORK, CARRY, MOVE]),
    'upgrader-1': makeRole([WORK, CARRY, MOVE, MOVE]),
    'upgrader-2': makeRole([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]),
    'claimer-0': makeRole([CLAIM, MOVE]),
    'claimer-1': makeRole([CLAIM, MOVE, MOVE, MOVE]),
    'claimer-2': makeRole([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]),
};


const spawnCreep =  (spawner, role, size) => {
    return spawner.spawnCreep(roles[`${role}-${size}`].parts, `${role}-${size}-${Math.ceil(Math.random()*10000)}`, {
        memory: {
            role: role
        }
    });
};

const spawnBestAvailable = (spawner, role, isEmergencyMode) => {
    const energyAvailable = (spawner.room||{}).energyAvailable || spawner.energy;
    const energyCapacityAvailable = (spawner.room||{}).energyCapacityAvailable || spawner.energyCapacity;
    for(let i=2; i>=0; i--) {
        if(isEmergencyMode || energyCapacityAvailable >= roles[`${role}-${i}`].cost){
            if(roles[`${role}-${i}`].cost <= energyAvailable){
                const result = spawnCreep(spawner, role, i);
                if(result === 0) {
                    return result;
                }
            }
        }
    }
    return null;
};

const spawnerRole = {
    creep: spawnBestAvailable
};

module.exports = spawnerRole;
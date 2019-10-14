const spawner = require('./roles/spawner');
const roles = {
    harvester: require('./roles/harvester'),
    upgrader: require('./roles/upgrader'),
    builder: require('./roles/builder')
};

const max = {
    harvester: 5,
    upgrader: 3
};

module.exports.loop = () => {
    //Free memory of dead creeps
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    const isEmergencyMode = false;
    // var tower = Game.getObjectById('e3b7d3f6ac69ab74297425b4');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }

    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }
    const current = {
        harvester: 0,
        upgrader: 0
    }
    for(let name in Game.creeps) {
        const creep = Game.creeps[name];
        if(creep.memory.role in roles){
            current[creep.memory.role]++;
            roles[creep.memory.role].run(creep);
        }
    }
    
    if(current.harvester < max.harvester) {
        spawner.creep(Game.spawns['Inibria'], "harvester", isEmergencyMode);
    }
    
    if(current.upgrader < max.upgrader) {
        spawner.creep(Game.spawns['Inibria'], "upgrader", isEmergencyMode);
    }
}
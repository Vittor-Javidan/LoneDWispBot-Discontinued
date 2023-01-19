import deepCopy from '../../../Utils/deepCopy'
import EQUIPMENT_TYPES from '../Globals/EQUIPMENT_TYPES'

/**
 * @typedef {import ('../TypeDefinitions/Types').CS_EquipmentDataBase} CS_EquipmentDataBase
 * @typedef {import ('../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData
 * @typedef {import ('../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData
*/

/**
 * @type {CS_EquipmentDataBase}
 */
const equipmentDataBase = {

    longRangeWeapon: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            damage_multipliers: {
                vitality: 100,
                agility: 100,
                strenght: 100,
                intelligence: 100,
            },
            description: "Dummy Equipment. Used for code testing purpose"
        },
        "Arco de madeira": {
            name: "Arco de madeira",
            damage_multipliers: {
                vitality: 0,
                agility: 0,
                strenght: 0.2,
                intelligence: 0,
            },
            description: "Um arco simples de madeira."
        }
    },

    meleeWeapon: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            damage_multipliers: {
                vitality: 100,
                agility: 100,
                strenght: 100,
                intelligence: 100,
            },
            description: "Dummy Equipment. Used for code testing purpose"
        },
        "Adaga": {
            name: "Adaga",
            damage_multipliers: {
                vitality: 0,
                agility: 0,
                strenght: 0.2,
                intelligence: 0
            },
            description: "Uma adaga comum. Tão especial quanto uma pedra na estrada."
        },
        "Espada enferrujada": {
            name: "Espada enferrujada",
            damage_multipliers: {
                vitality: 0,
                agility: 0,
                strenght: 0.3,
                intelligence: 0
            }
        }
    },

    helmet: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            defense_multipliers: {
                vitality: 100,
                agility: 100,
                strenght: 100,
                intelligence: 100,
            },
            description: "Dummy Equipment. Used for code testing purpose"
        },
        "Chapéu de caçador": {
            name: "Chapéu de caçador",
            defense_multipliers: {
                vitality: 0.1,
                agility: 0,
                strenght: 0.1,
                intelligence: 0,
            },
            description: "Chapéu de caçador. Usado para se camuflar na floresta."
        },
        "Elmo enferrujado": {
            name: "Elmo enferrujado",
            defense_multipliers: {
                vitality: 0.1,
                agility: 0,
                strenght: 0.1,
                intelligence: 0
            }
        }
    },

    bodyArmor: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            defense_multipliers: {
                vitality: 100,
                agility: 100,
                strenght: 100,
                intelligence: 100,
            },
            description: "Dummy Equipment. Used for code testing purpose"
        },
        "Roupa de caçador": {
            name: "Roupa de caçador",
            defense_multipliers: {
                vitality: 0.1,
                agility: 0,
                strenght: 0.1,
                intelligence: 0,
            },
            description: "Roupa de caçador. Usado para se camuflar na floresta."
        },
        "Armadura enferrujada": {
            name: "Armadura enferrujada",
            defense_multipliers: {
                vitality: 0.1,
                agility: 0,
                strenght: 0.1,
                intelligence: 0
            }
        }
    },

    gloves: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            defense_multipliers: {
                vitality: 100,
                agility: 100,
                strenght: 100,
                intelligence: 100,
            },
            description: "Dummy Equipment. Used for code testing purpose"
        },
        "Luvas de caçador": {
            name: "Luvas de caçador",
            defense_multipliers: {
                vitality: 0.1,
                agility: 0,
                strenght: 0.1,
                intelligence: 0,
            },
            description: "Luvas de caçador. Usado para se camuflar na floresta."
        },
        "Luvas enferrujadas": {
            name: "Luvas enferrujadas",
            defense_multipliers: {
                vitality: 0.1,
                agility: 0,
                strenght: 0.1,
                intelligence: 0
            }
        }
    },

    boots: {
        "Dummy Equipment": {
            name: "Dummy Equipment",
            defense_multipliers: {
                vitality: 100,
                agility: 100,
                strenght: 100,
                intelligence: 100,
            },
            description: "Dummy Equipment. Used for code testing purpose"
        },
        "Botas de caçador": {
            name: "Botas de caçador",
            defense_multipliers: {
                vitality: 0.0,
                agility: 0.2,
                strenght: 0.0,
                intelligence: 0,
            },
            description: "Botas de caçador. Usado para se camuflar na floresta."
        },
        "Botas enferrujadas": {
            name: "Botas enferrujadas",
            defense_multipliers: {
                vitality: 0.1,
                agility: 0,
                strenght: 0.1,
                intelligence: 0
            }
        }
    }
}
export default equipmentDataBase

export const equipmentEntries = {
    WEAPONS: {
        LONG_RANGE: {
            DUMMY_EQUIPMENT: "Dummy Equipment",
            ARCO_DE_MADEIRA: "Arco de madeira"
        },
        MELEE: {
            DUMMY_EQUIPMENT: "Dummy Equipment",
            ADAGA: "Adaga",
            ESPADA_ENFERRUJADA: "Espada enferrujada"
        },
    },
    ARMORS:  {
        HELMETS: {
            DUMMY_EQUIPMENT: "Dummy Equipment",
            CHAPEU_DE_CACADOR: "Chapéu de caçador",
            ELMO_ENFERRUJADO: "Elmo enferrujado"
        },
        BODY_ARMOR: {
            DUMMY_EQUIPMENT: "Dummy Equipment",
            ROUPA_DE_CACADOR: "Roupa de caçador",
            ARMADURA_ENFERRUJADA: "Armadura enferrujada"
        },
        GLOVES: {
            DUMMY_EQUIPMENT: "Dummy Equipment",
            LUVAS_DE_CACADOR: "Luvas de caçador",
            LUVAS_ENFERRUJADAS: "Luvas enferrujadas"
        },
        BOOTS: {
            DUMMY_EQUIPMENT: "Dummy Equipment",
            BOTAS_DE_CACADOR: "Botas de caçador",
            BOTAS_ENFERRUJADAS: "Botas enferrujadas"
        }
    }
}

const typesKeys = Object.values(EQUIPMENT_TYPES)

/**
 * Returns a equipment data of given name and type
 * @param {string} equipmentType 
 * @param {string} mapArea
 * @returns {CS_Equipment_ArmorData | CS_Equipment_WeaponData}
 */
export function getEquipment(equipmentName, equipmentType) {

    if(!typesKeys.includes(equipmentType)) {
        throw Error('ERROR: "getEquipment" function: Equipment type not found')
    }

    const equipmentTypeDataBase = equipmentDataBase[equipmentType]
    const equipmentkeys = Object.keys(equipmentTypeDataBase)

    if(!equipmentkeys.includes(equipmentName)) {
        throw Error('ERROR: "getEquipment" function: Equipment not found')
    }

    return deepCopy(equipmentTypeDataBase[equipmentName])
}

/**
 * Returns all equipments data of the given type
 * @param {string} equipmentType 
 * @returns {Object<string, CS_Equipment_WeaponData | CS_Equipment_ArmorData>}
 */
export function getAllEquipmentByType(equipmentType) {

    if(!typesKeys.includes(equipmentType)) {
        throw Error('ERROR: "getEquipment" function: Equipment type not found')
    }

    return deepCopy(equipmentDataBase[equipmentType])
}
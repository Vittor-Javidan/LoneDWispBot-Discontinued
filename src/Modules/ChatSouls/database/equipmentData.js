/**
 * @typedef {Object} CS_EquipmentDataBase
 * @property {Object} WEAPONS
 * @property {Object<string, CS_Equipment_WeaponData>} WEAPONS.LONG_RANGE
 * @property {Object<string, CS_Equipment_WeaponData>} WEAPONS.MELEE
 * @property {Object} ARMORS
 * @property {Object<string, CS_Equipment_ArmorData>} ARMORS.HELMETS
 * @property {Object<string, CS_Equipment_ArmorData>} ARMORS.BODY
 * @property {Object<string, CS_Equipment_ArmorData>} ARMORS.GLOVES
 * @property {Object<string, CS_Equipment_ArmorData>} ARMORS.BOOTS
 * 
 * @typedef {Object} CS_Equipment_WeaponData
 * @property {Object} NAME
 * @property {string} NAME.ENG
 * @property {string} NAME.PT_BR
 * @property {Object} DMG_MULTIPLIERS
 * @property {number} DMG_MULTIPLIERS.vitality
 * @property {number} DMG_MULTIPLIERS.agility
 * @property {number} DMG_MULTIPLIERS.strenght
 * @property {number} DMG_MULTIPLIERS.intelligence
 * @property {string} DESCRIPTION
 * 
 * @typedef {Object} CS_Equipment_ArmorData
 * @property {Object} NAME
 * @property {string} NAME.ENG
 * @property {string} NAME.PT_BR
 * @property {Object} DEF_MULTIPLIERS
 * @property {number} DEF_MULTIPLIERS.vitality
 * @property {number} DEF_MULTIPLIERS.agility
 * @property {number} DEF_MULTIPLIERS.strenght
 * @property {number} DEF_MULTIPLIERS.intelligence
 * @property {string} DESCRIPTION
*/

/**
 * @type {CS_EquipmentDataBase}
 */
const equipmentDataBase = {

    WEAPONS : {

        LONG_RANGE: {
            "Wooden Bow": {
                NAME: {
                    ENG: "Wooden Bow",
                    PT_BR: "Arco de madeira",
                },
                DMG_MULTIPLIERS: {
                    vitality: 0,
                    agility: 3,
                    strenght: 1,
                    intelligence: 0,
                },
                DESCRIPTION: "Um arco simples de madeira."
            }
        },

        MELEE: {
            "Dagger": {
                NAME: {
                    ENG: "Dagger",
                    PT_BR: "Adaga",
                },
                DMG_MULTIPLIERS: {
                    vitality: 0,
                    agility: 2,
                    strenght: 2,
                    intelligence: 0
                },
                DESCRIPTION: "Uma adaga comum. Tão especial quanto uma pedra na estrada."
            }
        }
    },

    ARMORS: {

        HELMETS: {
            "Hunter Hat": {
                NAME: {
                    ENG: "Hunter Hat",
                    PT_BR: "Chapéu de caçador",
                },
                DEF_MULTIPLIERS: {
                    vitality: 1,
                    agility: 0,
                    strenght: 1,
                    intelligence: 0,
                },
                DESCRIPTION: "Chapéu de caçador. Usado para se camuflar na floresta."
            }
        },
    
        BODY: {
            "Hunter Vest": {
                NAME: {
                    ENG: "Hunter Vest",
                    PT_BR: "Roupa de caçador",
                },
                DEF_MULTIPLIERS: {
                    vitality: 1,
                    strenght: 1,
                    agility: 0,
                    intelligence: 0,
                },
                DESCRIPTION: "Roupa de caçador. Usado para se camuflar na floresta."
            }
        },
    
        GLOVES: {
            "Hunter Gloves": {
                NAME: {
                    ENG: "Hunter Gloves",
                    PT_BR: "Luvas de caçador",
                },
                DEF_MULTIPLIERS: {
                    vitality: 1,
                    strenght: 1,
                    agility: 0,
                    intelligence: 0,
                },
                DESCRIPTION: "Luvas de caçador. Usado para se camuflar na floresta."
            }
        },
    
        BOOTS: {
            "Hunter Boots": {
                NAME: {
                    ENG: "Hunter Boots",
                    PT_BR: "Botas de caçador"
                },
                DEF_MULTIPLIERS: {
                    vitality: 1,
                    strenght: 1,
                    agility: 0,
                    intelligence: 0,
                },
                DESCRIPTION: "Botas de caçador. Usado para se camuflar na floresta."
            }
        }

    },
}
export default equipmentDataBase
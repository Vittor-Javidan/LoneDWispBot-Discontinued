/**
 * @typedef {import ('../TypeDefinitions/Types').CS_EquipmentDataBase} CS_EquipmentDataBase
 * @typedef {import ('../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData
 * @typedef {import ('../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData
*/

/**
 * @type {CS_EquipmentDataBase}
 */
const equipmentDataBase = {

    WEAPONS : {

        LONG_RANGE: {
            "Arco de madeira": {
                name: "Arco de madeira",
                damage_multipliers: {
                    vitality: 0,
                    agility: 3,
                    strenght: 1,
                    intelligence: 0,
                },
                description: "Um arco simples de madeira."
            }
        },

        MELEE: {
            "Adaga": {
                name: "Adaga",
                damage_multipliers: {
                    vitality: 0,
                    agility: 2,
                    strenght: 2,
                    intelligence: 0
                },
                description: "Uma adaga comum. Tão especial quanto uma pedra na estrada."
            }
        }
    },

    ARMORS: {

        HELMETS: {
            "Chapéu de caçador": {
                name: "Chapéu de caçador",
                defense_multipliers: {
                    vitality: 1,
                    agility: 0,
                    strenght: 1,
                    intelligence: 0,
                },
                description: "Chapéu de caçador. Usado para se camuflar na floresta."
            }
        },
    
        BODY: {
            "Roupa de caçador": {
                name: "Roupa de caçador",
                defense_multipliers: {
                    vitality: 1,
                    strenght: 1,
                    agility: 0,
                    intelligence: 0,
                },
                description: "Roupa de caçador. Usado para se camuflar na floresta."
            }
        },
    
        GLOVES: {
            "Luvas de caçador": {
                name: "Luvas de caçador",
                defense_multipliers: {
                    vitality: 1,
                    strenght: 1,
                    agility: 0,
                    intelligence: 0,
                },
                description: "Luvas de caçador. Usado para se camuflar na floresta."
            }
        },
    
        BOOTS: {
            "Botas de caçador": {
                name: "Botas de caçador",
                defense_multipliers: {
                    vitality: 1,
                    strenght: 1,
                    agility: 0,
                    intelligence: 0,
                },
                description: "Botas de caçador. Usado para se camuflar na floresta."
            }
        }

    },
}
export default equipmentDataBase
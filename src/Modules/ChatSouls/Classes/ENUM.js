/**
 * @typedef {Object} ENUM
 * @property {Object} EQUIPMENT_TYPES
 * @property {EQUIPMENT_TYPES} EQUIPMENT_TYPES.MELEE_WEAPON
 * @property {EQUIPMENT_TYPES} EQUIPMENT_TYPES.LONG_RANGE_WEAPON
 * @property {EQUIPMENT_TYPES} EQUIPMENT_TYPES.HELMET
 * @property {EQUIPMENT_TYPES} EQUIPMENT_TYPES.BODY_ARMOR
 * @property {EQUIPMENT_TYPES} EQUIPMENT_TYPES.GLOVES
 * @property {EQUIPMENT_TYPES} EQUIPMENT_TYPES.BOOTS
 * 
 * @typedef {string} EQUIPMENT_TYPES
 */

const ENUM = {
    RESTING: {
        PRIMARY: "RESTING",
        SECONDARY: {
            JUST_RESTING : "RESTING_0",
            STATS_MENU: "RESTING_1",
            ATRIBUTE_UPGRADE: "RESTING_2",
            EQUIPMENT: "RESTING_3",
            EQUIPMENT_MELEE: "RESTING_4",
            EQUIPMENT_MELEE_INVENTORY: "RESTING_5",
            EQUIPMENT_LONG_RANGE: "RESTING_6",
            EQUIPMENT_LONG_RANGE_INVENTORY: "RESTING_7",
            EQUIPMENT_HELMET: "RESTING_8",
            EQUIPMENT_HELMET_INVENTORY: "RESTING_9",
            EQUIPMENT_BODY_ARMOR: "RESTING_10",
            EQUIPMENT_BODY_ARMOR_INVENTORY: "RESTING_11",
            EQUIPMENT_GLOVES: "RESTING_12",
            EQUIPMENT_GLOVES_INVENTORY: "RESTING_13",
            EQUIPMENT_BOOTS: "RESTING_14",
            EQUIPMENT_BOOTS_INVENTORY: "RESTING_15"
        }
    },
    EXPLORING: {
        PRIMARY: "EXPLORING",
        SECONDARY: {
            IDLE: "EXPLORING_0",
            HUNTING: "EXPLORING_1",
            FORAGING: "EXPLORING_2",
            TRAVEL: "EXPLORING_3"
        }
    },
    ATTRIBUTES: {
        VITALITY: "VITALITY",
        AGILITY: "AGILITY",
        STRENGHT: "STRENGHT",
        INTELLLIGENCE: "INTELLIGENCE",
    },
    MAP_AREAS: {
        THE_WOODS: "THE WOODS"
    },
    EQUIPMENT_TYPES: {
        MELEE_WEAPON: "meleeWeapon",
        LONG_RANGE_WEAPON: "longRangeWeapon",
        HELMET: "helmet",
        BODY_ARMOR: "bodyArmor",
        GLOVES: "gloves",
        BOOTS: "boots"
    }
}

export default ENUM
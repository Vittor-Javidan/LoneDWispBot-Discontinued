import EQUIPMENT_TYPES from "../EquipmentChilds/EQUIPMENT_TYPES"
import Player from "./Player"

const PLAYER_STATES = {
    FIRE_PIT: {
        PRIMARY: "FIRE_PIT",
        SECONDARY: {
            RESTING_ON_FIRE_PIT : "RESTING_ON_FIRE_PIT",
            STATS_MENU: "STATS_MENU",
            ATRIBUTE_UPGRADE: "ATRIBUTE_UPGRADE",
            EQUIPMENT: "EQUIPMENT",
            MELEE_MENU: "meleeWeapon menu",
            LONG_RANGE_MENU: "longRangeWeapon menu",
            HELMET_MENU: "helmet menu",
            BODY_ARMOR_MENU: "bodyArmor menu",
            GLOVES_MENU: "gloves menu",
            BOOTS_MENU: "boots menu",
            MELEE_INVENTORY: "meleeWeapon inventory",
            LONG_RANGE_INVENTORY: "longRangeWeapon inventory",
            HELMET_INVENTORY: "helmet inventory",
            BODY_ARMOR_INVENTORY: "bodyArmor inventory",
            GLOVES_INVENTORY: "gloves inventory",
            BOOTS_INVENTORY: "boots inventory"
        }
    },
    EXPLORING: {
        PRIMARY: "EXPLORING",
        SECONDARY: {
            IDLE: "IDLE",
            HUNTING: "HUNTING",
            FORAGING: "FORAGING",
            TRAVEL: "TRAVEL"
        }
    }
}
export default PLAYER_STATES

/**
 * @param {string} equipmentType 
 * @returns {string}
 */
export function returnEquipmentMenuStateByType(equipmentType) {
    return `${equipmentType} menu`
}

/**
 * @param {string} equipmentType 
 * @returns {string}
 */
export function returnEquipmentMenuInventoryStateByType(equipmentType) {
    return `${equipmentType} inventory`
}

/**
 * @param {Player} playerInstance 
 * @returns {string}
 */
export function getEquipmentTypeByPlayerState(playerInstance) {

    const equipmentType = playerInstance.secondaryState.split(" ")[0]
    
    const equipmentTypesArray = Object.values(EQUIPMENT_TYPES)
    if(!equipmentTypesArray.includes(equipmentType)) {
        throw Error(`ERROR: getEquipmentTypeByPlayerState: equipment type is not recognized`)
    }

    return equipmentType
}
import Player from "../../Classes/EntityChilds/Player"
import CS_ENUM from "../../Classes/ENUM"

import attributeUpgrade from "./Resting/attributeUpgrade"
import equipment_Body from "./Resting/Equipment/bodyArmor"
import equipment_boots from "./Resting/Equipment/boots"
import equipment_BodyArmorInventory from "./Resting/Equipment/equipment_BodyArmorInventory"
import equipment_BootsInventory from "./Resting/Equipment/equipment_BootsInventory"
import equipment_GlovesInventory from "./Resting/Equipment/equipment_GlovesInventory"
import equipment_HelmetInventory from "./Resting/Equipment/equipment_HelmetInventory"
import equipment_LongRangeInventory from "./Resting/Equipment/equipment_LongRangeInventory"
import equipment_MeleeInventory from "./Resting/Equipment/equipment_MeleeInventory"
import equipment_Gloves from "./Resting/Equipment/gloves"
import equipment_Helmet from "./Resting/Equipment/helmet"
import equipment_LongRange from "./Resting/Equipment/longRange"
import equipment_Melee from "./Resting/Equipment/melee"
import equipment_Menu from "./Resting/equipmentMenu"
import justResting from "./Resting/justResting"
import statsMenu from "./Resting/statsMenu"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function resting(data){

    const playerState = data.playerInstance.getCurrentState()
    
    switch(playerState.secondary) {
        
        case CS_ENUM.STATES.RESTING.SECONDARY.JUST_RESTING: justResting(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.STATS_MENU: statsMenu(data); break    
        case CS_ENUM.STATES.RESTING.SECONDARY.ATRIBUTE_UPGRADE: attributeUpgrade(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT: equipment_Menu(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_MELEE: equipment_Melee(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_MELEE_INVENTORY: equipment_MeleeInventory(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_LONG_RANGE: equipment_LongRange(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_LONG_RANGE_INVENTORY: equipment_LongRangeInventory(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_HELMET: equipment_Helmet(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_HELMET_INVENTORY: equipment_HelmetInventory(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_BODY_ARMOR: equipment_Body(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_BODY_ARMOR_INVENTORY: equipment_BodyArmorInventory(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_GLOVES: equipment_Gloves(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_GLOVES_INVENTORY: equipment_GlovesInventory(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_BOOTS: equipment_boots(data); break
        case CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_BOOTS_INVENTORY: equipment_BootsInventory(data); break
    }
}
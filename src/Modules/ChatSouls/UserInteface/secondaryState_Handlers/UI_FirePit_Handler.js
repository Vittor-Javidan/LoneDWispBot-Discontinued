import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Global/PLAYER_STATES";
import UI_EquipmentInventoryTypeMenu from "../UI_EquipmentsMenu/UI_EquipmentInventoryTypeMenu";
import UI_Equipments_Menu from "../UI_EquipmentsMenu/UI_EquipmentsMenu";
import UI_EquipmentTypeMenu from "../UI_EquipmentsMenu/UI_EquipmentTypeMenu";

import UI_firePit from "../UI_FirePit/UI_FirePit";
import UI_AttributeUpgradeMenu from "../UI_StatisticsMenu/UI_AttributeUpgradeMenu";
import UI_StatisticsMenu from "../UI_StatisticsMenu/UI_StatisticsMenu";

/**
 * Handle !cs play commands when the player has a primary state of "RESTING_ON_FIRE_PIT"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function UI_FirePit_Handler(data){

    const playerState = data.playerInstance.currentState
    const firePitStates = PLAYER_STATES.FIRE_PIT.SECONDARY
    
    switch(playerState.secondary) {
        
        //Main Menu
        case firePitStates.RESTING_ON_FIRE_PIT:     UI_firePit(data)                    ;break

        //StatistcsMenu
        case firePitStates.STATS_MENU:              UI_StatisticsMenu(data)             ;break
        case firePitStates.ATRIBUTE_UPGRADE:        UI_AttributeUpgradeMenu(data)       ;break

        //EquipmentMenu
        case firePitStates.EQUIPMENT:               UI_Equipments_Menu(data)            ;break
        case firePitStates.MELEE_MENU:              UI_EquipmentTypeMenu(data)          ;break
        case firePitStates.LONG_RANGE_MENU:         UI_EquipmentTypeMenu(data)          ;break
        case firePitStates.HELMET_MENU:             UI_EquipmentTypeMenu(data)          ;break
        case firePitStates.BODY_ARMOR_MENU:         UI_EquipmentTypeMenu(data)          ;break
        case firePitStates.GLOVES_MENU:             UI_EquipmentTypeMenu(data)          ;break
        case firePitStates.BOOTS_MENU:              UI_EquipmentTypeMenu(data)          ;break
        case firePitStates.MELEE_INVENTORY:         UI_EquipmentInventoryTypeMenu(data) ;break
        case firePitStates.LONG_RANGE_INVENTORY:    UI_EquipmentInventoryTypeMenu(data) ;break
        case firePitStates.HELMET_INVENTORY:        UI_EquipmentInventoryTypeMenu(data) ;break
        case firePitStates.BODY_ARMOR_INVENTORY:    UI_EquipmentInventoryTypeMenu(data) ;break
        case firePitStates.GLOVES_INVENTORY:        UI_EquipmentInventoryTypeMenu(data) ;break
        case firePitStates.BOOTS_INVENTORY:         UI_EquipmentInventoryTypeMenu(data) ;break
    }
}
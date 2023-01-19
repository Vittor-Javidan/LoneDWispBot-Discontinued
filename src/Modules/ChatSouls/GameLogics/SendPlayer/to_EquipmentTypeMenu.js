import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES, { getEquipmentTypeByPlayerState, returnEquipmentMenuStateByType } from "../../Globals/PLAYER_STATES";
import { sendMessage_UI_EquipmentTypeMenu } from "../../UserInteface/sendMessage_Customized/sendMessage_UI_EquipmentTypeMenu";

/**
 * @param {Player} playerInstance
 * @param {string} equipmentType
 * @param {string} menuMessage
 */
export default function to_EquipmentTypeMenu(playerInstance, menuMessage) {

    const equipmentType = getEquipmentTypeByPlayerState(playerInstance)
    playerInstance.secondaryState = returnEquipmentMenuStateByType(equipmentType)
    sendMessage_UI_EquipmentTypeMenu(playerInstance, menuMessage)
}

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export function to_MeleeMenu(playerInstance, menuMessage) {

    playerInstance.secondaryState = PLAYER_STATES.FIRE_PIT.SECONDARY.MELEE_MENU
    sendMessage_UI_EquipmentTypeMenu(playerInstance, menuMessage)
}

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export function to_LongRangeMenu(playerInstance, menuMessage) {

    playerInstance.secondaryState = PLAYER_STATES.FIRE_PIT.SECONDARY.LONG_RANGE_MENU
    sendMessage_UI_EquipmentTypeMenu(playerInstance, menuMessage)
}

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export function to_HelmetMenu(playerInstance, menuMessage) {

    playerInstance.secondaryState = PLAYER_STATES.FIRE_PIT.SECONDARY.HELMET_MENU
    sendMessage_UI_EquipmentTypeMenu(playerInstance, menuMessage)
}


/**
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export function to_BodyArmorMenu(playerInstance, menuMessage) {

    playerInstance.secondaryState = PLAYER_STATES.FIRE_PIT.SECONDARY.BODY_ARMOR_MENU
    sendMessage_UI_EquipmentTypeMenu(playerInstance, menuMessage)
}

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export function to_GlovesMenu(playerInstance, menuMessage) {

    playerInstance.secondaryState = PLAYER_STATES.FIRE_PIT.SECONDARY.GLOVES_MENU
    sendMessage_UI_EquipmentTypeMenu(playerInstance, menuMessage)
}

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export function to_BootsMenu(playerInstance, menuMessage) {

    playerInstance.secondaryState = PLAYER_STATES.FIRE_PIT.SECONDARY.BOOTS_MENU
    sendMessage_UI_EquipmentTypeMenu(playerInstance, menuMessage)
}

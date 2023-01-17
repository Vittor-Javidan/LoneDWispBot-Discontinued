import Player from "../Classes/EntityChilds/Player"
import { getEquipmentTypeByPlayerState } from "../Classes/EntityChilds/PLAYER_STATES"
import returnEquipmentDetailByType from "../UserInteface/sendMessage_Customized/returnEquipmentDetailByType"
import { sendMessage_UI_EquipmentTypeMenu } from "../UserInteface/sendMessage_Customized/sendMessage_UI_EquipmentTypeMenu"

/**
 * @param {Player} playerInstance
 * @param {string} message
 */
export default function checkEquipmentDetais(playerInstance) {

    const equipmentType = getEquipmentTypeByPlayerState(playerInstance)
    const equippedEquipment = playerInstance.getCurrentEquipment()[equipmentType]   

    if(!equippedEquipment.name) {
        sendMessage_UI_EquipmentTypeMenu(playerInstance,`você está sem capacete equipado`)
        return
    }
    const equipmentDetails = returnEquipmentDetailByType(equippedEquipment, equipmentType)
    sendMessage_UI_EquipmentTypeMenu(playerInstance, equipmentDetails)
}

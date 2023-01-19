import Player from "../Classes/EntityChilds/Player"
import { getEquipmentTypeByPlayerState, returnEquipmentMenuStateByType } from "../Global/PLAYER_STATES"
import returnEquippingMessage from "../UserInteface/sendMessage_Customized/returnEquippingMessage"
import returnMenuEquipmentMessageByType from "../UserInteface/sendMessage_Customized/returnMenuEquipmentMessageByType"
import { sendMessage_UI_EquipmentTypeMenu } from "../UserInteface/sendMessage_Customized/sendMessage_UI_EquipmentTypeMenu"

/**
 * @param {Player} playerInstance 
 * @param {number} itemIndex 
 */
export default function equipAndReturnToEquipmentTypeMenu(playerInstance, itemIndex) {

    const equipmentType = getEquipmentTypeByPlayerState(playerInstance)

    playerInstance.equipFromInventory(itemIndex, equipmentType)
    playerInstance.calculateStats()
    playerInstance.recoverHP()
    playerInstance.save()
    playerInstance.secondaryState = returnEquipmentMenuStateByType(equipmentType)

    const equippedEquipment = playerInstance.getCurrentEquipment_KV()[equipmentType]
    sendMessage_UI_EquipmentTypeMenu(playerInstance, 
        `${returnEquippingMessage(equippedEquipment)}. ${returnMenuEquipmentMessageByType(equipmentType)}`
    )
}

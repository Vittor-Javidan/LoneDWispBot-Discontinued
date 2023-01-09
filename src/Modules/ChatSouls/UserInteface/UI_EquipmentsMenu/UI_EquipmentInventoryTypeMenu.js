import Player from "../../Classes/EntityChilds/Player"
import { getEquipmentTypeByPlayerState } from "../../Classes/EntityChilds/PLAYER_STATES"
import equipAndReturnToEquipmentTypeMenu from "../../GameLogics/equip"
import to_EquipmentTypeMenu from "../../GameLogics/SendPlayer/to_EquipmentTypeMenu"
import returnMenuEquipmentMessageByType from "../sendMessage_Customized/returnMenuEquipmentMessageByType"
import { sendMessage_UI_EquipmentTypeInventoryMenu } from "../sendMessage_Customized/sendMessage_UI_EquipmentTypeInventoryMenu"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_BOOTS_INVENTORY"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function UI_EquipmentInventoryTypeMenu(data) {

    const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance
    const equipmentType = getEquipmentTypeByPlayerState(playerInstance)

	if (commandWord === '!cs') {
        sendMessage_UI_EquipmentTypeInventoryMenu(playerInstance, `O que deseja equipar?`)
        return
	}

    let commandCode = Number(commandWord)
    switch (true) {

        case commandCode === 0: 
            const menuMessage = returnMenuEquipmentMessageByType(equipmentType)
            to_EquipmentTypeMenu(playerInstance, menuMessage)
            break
        //

        case (commandCode <= playerInstance.getEquipmentInventoryAmount(equipmentType)):
            
            const itemIndex = commandCode - 1
            equipAndReturnToEquipmentTypeMenu(playerInstance, itemIndex)
            break
        //

        default:
            sendMessage_UI_EquipmentTypeInventoryMenu(playerInstance , `Código inválido. O que deseja equipar?`)
            break
        //
    }
}

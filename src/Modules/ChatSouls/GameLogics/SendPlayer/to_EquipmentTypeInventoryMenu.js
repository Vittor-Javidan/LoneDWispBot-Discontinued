import Player from "../../Classes/EntityChilds/Player"
import { getEquipmentTypeByPlayerState, returnEquipmentMenuInventoryStateByType } from "../../Globals/PLAYER_STATES"
import { sendMessage_UI_EquipmentTypeInventoryMenu } from "../../UserInteface/sendMessage_Customized/sendMessage_UI_EquipmentTypeInventoryMenu"
import { sendMessage_UI_EquipmentTypeMenu } from "../../UserInteface/sendMessage_Customized/sendMessage_UI_EquipmentTypeMenu"

/**
 * @param {Player} playerInstance
 * @param {string} inventoryType
 */
export default function to_EquipmentTypeInventoryMenu(playerInstance, menuMessage) {

    const inventoryType = getEquipmentTypeByPlayerState(playerInstance)

    if (playerInstance.isInventoryEquipmentsTypeEmpty(inventoryType)) {
		sendMessage_UI_EquipmentTypeMenu(playerInstance, `Seu inventário está vazio.`)
		return
	}

    playerInstance.secondaryState = returnEquipmentMenuInventoryStateByType(inventoryType)
	sendMessage_UI_EquipmentTypeInventoryMenu(
        playerInstance,
        menuMessage
	)
}

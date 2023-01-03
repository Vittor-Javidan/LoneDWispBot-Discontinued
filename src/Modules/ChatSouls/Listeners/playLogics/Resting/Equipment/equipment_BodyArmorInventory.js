import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import ENUM from "../../../../Classes/ENUM"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_BODY_ARMOR_INVENTORY"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_BodyArmorInventory(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()

    // BODY ARMOR INVENTORY LIST =======================================================================
    // If "!cs"
	if (words.length === 1) {

		const allEquipmentString = playerInstance.getInventoryEquipmentsString(ENUM.EQUIPMENT_TYPES.BODY_ARMOR)
        sendMessage(
            `/w @${userName} Você está olhando seu inventário de armaduras. Qual deseja equipar?: 
            | 0. Voltar ${allEquipmentString}
            |`
        )
	}

	// if "!cs <itemCode>"
	if (words.length === 2) {
 
        let itemCode = Number(words[1])
    
        switch (true) {

			//GO BODY ARMOR EQUIPMENT MENU =============================================================
            case itemCode === 0:
                
                playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT_BODY_ARMOR)
                sendMessage(
                    `/w ${userName} Você voltou ao menu de armaduras
                    | 0. Voltar
                    | 1. Equipar outra armadura
                    | 2. Ver detalhes da armadura
                    | 3. Desequipar armadura
                    |`
                )
                break
            //

            //CHOSE A BODY ARMOR TO EQUIP AND GO BACK TO BODY ARMOR EQUIPMENT MENU =====================
            case (itemCode <= playerInstance.getInvetoryEquipments(ENUM.EQUIPMENT_TYPES.BODY_ARMOR).length):

                playerInstance.setEquippedEquipment(itemCode, ENUM.EQUIPMENT_TYPES.BODY_ARMOR)
                playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT_BODY_ARMOR)
                sendMessage(
                    `/w @${userName} ${playerInstance.getEquippedEquipment().bodyArmor.name} foi equipado. Voltando ao menu de armaduras. 
                    | 0. Voltar
                    | 1. Equipar outra armadura
                    | 2. Ver detalhes da armadura
                    | 3. Desequipar armadura
                    |`
                )
                break
            //

            default:
                sendMessage(`/w ${userName} Código inválido`)
                break
            //	
		}
	}
}
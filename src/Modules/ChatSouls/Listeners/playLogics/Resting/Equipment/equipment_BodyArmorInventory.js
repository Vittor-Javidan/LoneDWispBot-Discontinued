import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import ENUM from "../../../../Classes/ENUM"
import Player from "../../../../Classes/Player"

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
	const userName = playerInstance.getPlayerName()

    // BODY ARMOR INVENTORY LIST =======================================================================
    // If "!cs play"
	if (words.length === 2) {

		const allEquipmentString = playerInstance.getInventoryEquipmentByType_StringFormat(ENUM.EQUIPMENT_TYPES.BODY_ARMOR)
        sendMessage(
            `/w @${userName} Você está olhando seu inventário de armaduras. Qual deseja equipar?: 
            | 0. Voltar ${allEquipmentString}
            |`
        )
	}

	// if "!cs play <itemCode>"
	if (words.length === 3) {
 
        let itemCode = Number(words[2])
    
        switch (true) {

			//GO BODY ARMOR EQUIPMENT MENU =============================================================
            case itemCode === 0:
                
                playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT_BODY_ARMOR)
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
            case (itemCode <= playerInstance.getPlayerInvetoryEquipment().bodyArmor.length):

                playerInstance.setEquipment(itemCode, ENUM.EQUIPMENT_TYPES.BODY_ARMOR)
                playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT_BODY_ARMOR)
                sendMessage(
                    `/w @${userName} ${playerInstance.getPlayerEquipment().bodyArmor.name} foi equipado. Voltando ao menu de armaduras. 
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
import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import ENUM from "../../../../Classes/ENUM"
import Player from "../../../../Classes/Player"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_BOOTS_INVENTORY"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_BootsInventory(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getPlayerName()

    // BOOTS INVENTORY LIST =======================================================================
    // If "!cs play"
	if (words.length === 2) {

		const allEquipmentString = playerInstance.getInventoryEquipmentByType_StringFormat(ENUM.EQUIPMENT_TYPES.BOOTS)
        sendMessage(
            `/w @${userName} Você está olhando seu inventário de botas. Qual deseja equipar?: 
            | 0. Voltar ${allEquipmentString}
            |`
        )
	}

	// if "!cs play <itemCode>"
	if (words.length === 3) {
 
        let itemCode = Number(words[2])
    
        switch (true) {

			//GO BOOTS EQUIPMENT MENU =============================================================
            case itemCode === 0:
                
                playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT_BOOTS)
                sendMessage(
                    `/w ${userName} Você voltou ao menu de botas
                    | 0. Voltar
                    | 1. Equipar outras botas
                    | 2. Ver detalhes das botas
                    | 3. Desequipar botas
                    |`
                )
                break
            //

            //CHOSE A BOOTS TO EQUIP AND GO BACK TO BOOTS EQUIPMENT MENU =====================
            case (itemCode <= playerInstance.getPlayerInvetoryEquipment().boots.length):

                playerInstance.setEquipment(itemCode, ENUM.EQUIPMENT_TYPES.BOOTS)
                playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT_BOOTS)
                sendMessage(
                    `/w @${userName} ${playerInstance.getPlayerEquipment().boots.name} foi equipado. Voltando ao menu de botas. 
                    | 0. Voltar
                    | 1. Equipar outras botas
                    | 2. Ver detalhes das botas
                    | 3. Desequipar botas
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
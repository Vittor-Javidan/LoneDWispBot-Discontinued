import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import ENUM from "../../../../Classes/ENUM"

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
	const userName = playerInstance.getName()

    // BOOTS INVENTORY LIST =======================================================================
    // If "!cs"
	if (words.length === 1) {

		const allEquipmentString = playerInstance.getInventoryEquipmentsString(ENUM.EQUIPMENT_TYPES.BOOTS)
        sendMessage(
            `/w @${userName} Você está olhando seu inventário de botas. Qual deseja equipar?: 
            | 0. Voltar ${allEquipmentString}
            |`
        )
	}

	// if "!cs <itemCode>"
	if (words.length === 2) {
 
        let itemCode = Number(words[1])
    
        switch (true) {

			//GO BOOTS EQUIPMENT MENU =============================================================
            case itemCode === 0:
                
                playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT_BOOTS)
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
            case (itemCode <= playerInstance.getInvetoryEquipments(ENUM.EQUIPMENT_TYPES.BOOTS).length):

                playerInstance.setEquippedEquipment(itemCode, ENUM.EQUIPMENT_TYPES.BOOTS)
                playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT_BOOTS)
                sendMessage(
                    `/w @${userName} ${playerInstance.getEquippedEquipment().boots.name} foi equipado. Voltando ao menu de botas. 
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
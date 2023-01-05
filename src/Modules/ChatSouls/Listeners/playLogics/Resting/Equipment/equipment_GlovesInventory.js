import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import ENUM from "../../../../Classes/ENUM"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_GLOVES_INVENTORY"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_GlovesInventory(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()

    // GLOVES INVENTORY LIST =======================================================================
    // If "!cs"
	if (words[0] === '!cs') {

		const allEquipmentString = playerInstance.getInventoryEquipmentsString(ENUM.EQUIPMENT_TYPES.GLOVES)
        sendMessage(
            `/w @${userName} Você está olhando seu inventário de luvas. Qual deseja equipar?: 
            | 0. Voltar ${allEquipmentString}
            |`
        )
	}

	// if just a number "<itemCode>"
    let itemCode = Number(words[0])
    switch (true) {

        //GO GLOVES EQUIPMENT MENU =============================================================
        case itemCode === 0:
            
            playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT_GLOVES)
            sendMessage(
                `/w ${userName} Você voltou ao menu de luvas
                | 0. Voltar
                | 1. Equipar outras luvas
                | 2. Ver detalhes das luvas
                | 3. Desequipar luvas
                |`
            )
            break
        //

        //CHOSE A GLOVES TO EQUIP AND GO BACK TO GLOVES EQUIPMENT MENU =====================
        case (itemCode <= playerInstance.getInvetoryEquipments(ENUM.EQUIPMENT_TYPES.GLOVES).length):

            playerInstance.setEquippedEquipment(itemCode, ENUM.EQUIPMENT_TYPES.GLOVES)
            playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT_GLOVES)
            sendMessage(
                `/w @${userName} ${playerInstance.getEquippedEquipment().gloves.name} foi equipado. Voltando ao menu de luvas. 
                | 0. Voltar
                | 1. Equipar outras luvas
                | 2. Ver detalhes das luvas
                | 3. Desequipar luvas
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
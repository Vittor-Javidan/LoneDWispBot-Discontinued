import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import CS_ENUM from "../../../../Classes/ENUM"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_HELMET_INVENTORY"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_HelmetInventory(data) {
    
    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()

    // HELMET INVENTORY LIST ============================================================================
    // If "!cs"
	if (words[0] === '!cs') {
        
        const allEquipmentString = playerInstance.getInventoryEquipmentsString(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.HELMET)
        sendMessage(
            `/w @${userName} Você está olhando seu inventário de capacetes. Qual deseja equipar?: 
            | 0. Voltar ${allEquipmentString}
            |`
        )
    }

	// if just a number "<itemCode>"
    let itemCode = Number(words[0])
    switch (true) {
        
        //GO HELMET EQUIPMENT MENU =============================================================
        case itemCode === 0:
            
            playerInstance.setSecondaryState(CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_HELMET)
            sendMessage(
                `/w ${userName} Você voltou ao menu de capacetes
                | 0. Voltar
                | 1. Equipar outro capate
                | 2. Ver detalhes do capate
                | 3. Desequipar capate
                |`
            )
            break
        //   
        
        //CHOSE A HELMET TO EQUIP AND GO BACK TO HELMET EQUIPMENT MENU ====================================
        case (itemCode <= playerInstance.getInvetoryEquipments(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.HELMET).length):

            playerInstance.setEquippedEquipment(itemCode, CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.HELMET)
            playerInstance.setSecondaryState(CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_HELMET)
            sendMessage(
                `/w @${userName} ${playerInstance.getEquippedEquipment().helmet.name} foi equipado. Voltando ao menu de capacetes. 
                | 0. Voltar
                | 1. Equipar outro capates
                | 2. Ver detalhes do capates
                | 3. Desequipar capates
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
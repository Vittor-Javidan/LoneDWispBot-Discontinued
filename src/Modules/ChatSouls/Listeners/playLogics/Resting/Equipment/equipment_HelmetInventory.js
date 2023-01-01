import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import ENUM from "../../../../Classes/ENUM"
import Player from "../../../../Classes/Player"

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
	const userName = playerInstance.getPlayerName()

    // HELMET INVENTORY LIST ============================================================================
    // If "!cs play"
	if (words.length === 2) {
        
        const allEquipmentString = playerInstance.getInventoryEquipmentByType_StringFormat(ENUM.EQUIPMENT_TYPES.HELMET)
        sendMessage(
            `/w @${userName} Você está olhando seu inventário de capacetes. Qual deseja equipar?: 
            | 0. Voltar ${allEquipmentString}
            |`
        )
    }

	// if "!cs play <itemCode>"
	if (words.length === 3) {
 
        let itemCode = Number(words[2])
    
        switch (true) {
            
            //GO HELMET EQUIPMENT MENU =============================================================
            case itemCode === 0:
                
                playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT_HELMET)
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
            case (itemCode <= playerInstance.getPlayerInvetoryEquipment().helmet.length):

                playerInstance.setEquipment(itemCode, ENUM.EQUIPMENT_TYPES.HELMET)
                playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT_HELMET)
                sendMessage(
                    `/w @${userName} ${playerInstance.getPlayerEquipment().helmet.name} foi equipado. Voltando ao menu de capacetes. 
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
    
}
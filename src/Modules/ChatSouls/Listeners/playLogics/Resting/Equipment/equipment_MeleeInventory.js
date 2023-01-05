import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import ENUM from "../../../../Classes/ENUM"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_MELEE_INVENTORY"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_MeleeInventory(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()
    
    // MELEE INVENTORY LIST ============================================================================
    // If "!cs"
	if (words[0] === '!cs') {
        
        const allEquipmentString = playerInstance.getInventoryEquipmentsString(ENUM.EQUIPMENT_TYPES.MELEE_WEAPON)
        sendMessage(
            `/w @${userName} Você está olhando seu inventário de armas corpo a corpo. Qual deseja equipar?: 
            | 0. Voltar ${allEquipmentString}
            |`
        )
    }
    
	// if just a number "<itemCode>"
    let itemCode = Number(words[0])
    switch (true) {
    
        //GO BACK MELEE EQUIPMENT MENU =============================================================
        case itemCode === 0:
            
            playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT_MELEE)
            sendMessage(
                `/w ${userName} Você voltou ao menu de armas corpo a corpo
                | 0. Voltar
                | 1. Equipar outra arma
                | 2. Ver detalhes da arma
                | 3. Desequipar Arma
                |`
            )
            break
        //

        //CHOSE A WEAPON TO EQUIP AND GO BACK TO MELEE EQUIPMENT MENU ====================================
        case (itemCode <= playerInstance.getInvetoryEquipments(ENUM.EQUIPMENT_TYPES.MELEE_WEAPON).length):

            playerInstance.setEquippedEquipment(itemCode, ENUM.EQUIPMENT_TYPES.MELEE_WEAPON)
            playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT_MELEE)
            sendMessage(
                `/w @${userName} ${playerInstance.getEquippedEquipment().meleeWeapon.name} foi equipado. Voltando ao menu de armas corpo a corpo. 
                | 0. Voltar
                | 1. Equipar outra arma
                | 2. Ver detalhes da arma
                | 3. Desequipar Arma
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
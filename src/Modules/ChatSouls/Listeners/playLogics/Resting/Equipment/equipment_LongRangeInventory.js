import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import CS_ENUM from "../../../../Classes/ENUM"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_LONG_RANGE_INVENTORY"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_LongRangeInventory(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()

    // LONG RANGE INVENTORY LIST =======================================================================
    // If "!cs"
	if (words[0] === '!cs') {
        const allEquipmentString = playerInstance.getInventoryEquipmentsString(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.LONG_RANGE_WEAPON)
        sendMessage(
            `/w @${userName} Você está olhando seu inventário de armas longo alcance. Qual arma deseja equipar?: 
            | 0. Voltar ${allEquipmentString}
            |`
        )
    }

    // if just a number "<itemCode>"
    let itemCode = Number(words[0])
    switch (true) {

        //GO BACK LONG RANGE EQUIPMENT MENU =============================================================
        case itemCode === 0:
            
            playerInstance.setSecondaryState(CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_LONG_RANGE)
            sendMessage(
                `/w ${userName} Você voltou ao menu de armas longo alcance
                | 0. Voltar
                | 1. Equipar outra arma
                | 2. Ver detalhes da arma
                | 3. Desequipar Arma
                |`
            )
            break
        //

        //CHOSE A WEAPON TO EQUIP AND GO BACK TO LONG RANGE EQUIPMENT MENU =========================
        case (itemCode <= playerInstance.getInvetoryEquipments(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.LONG_RANGE_WEAPON).length):

            playerInstance.setEquippedEquipment(itemCode, CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.LONG_RANGE_WEAPON)
            playerInstance.setSecondaryState(CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_LONG_RANGE)
            sendMessage(
                `/w @${userName} ${playerInstance.getEquippedEquipment().longRangeWeapon.name} foi equipado. Vontando ao menu de armas longo alcance. 
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
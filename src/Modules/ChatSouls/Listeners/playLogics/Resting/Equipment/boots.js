import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import ENUM from "../../../../Classes/ENUM"
import Boots from "../../../../Classes/EquipmentChilds/Boots"
import Player from "../../../../Classes/Player"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_BOOTS"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_boots(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getPlayerName()
	const equippedArmor = playerInstance.getPlayerEquipment().boots

	// BOOTS EQUIPMENT MENU =======================================================================
	// If "!cs play"
	if (words.length === 2) {
		sendMessage(
			`/w ${userName} Você está no menu de botas
			| 0. Voltar
			| 1. Equipar outra botas
			| 2. Ver detalhes da botas
			| 3. Desequipar botas
			|`
		)
    }

	// if "!cs play <itemCode>"
	if (words.length === 3) {

		let itemCode = Number(words[2])

		switch (itemCode) {

            //GO BACK TO EQUIPMENT MENU ================================================================
			case 0:
				playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT)
				sendMessage (
					`/w ${userName} Você voltou a olhar seus equipamentos. 
                    | 0. Voltar 
                    | 1. Arma Corpo a Corpo 
                    | 2. Arma Longo alcance 
                    | 3. Capacetes 
                    | 4. Armaduras 
                    | 5. Luvas 
                    | 6. Botas 
                    | 7. Summário Geral 
                    |`
				)
				break
			//

            // EQUIP ANOTHER BOOTS ====================================================================
			case 1:

				const inventory_Boots = playerInstance.getPlayerInvetoryEquipment().boots
				if (!inventory_Boots) {
					sendMessage(`/w @${userName} Seu inventário está vazio.`)
                    return
				}

				playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT_BOOTS_INVENTORY)
                sendMessage(
                    `/w @${userName} Quais botas deseja equipar?: | 0. Voltar ${playerInstance.getInventoryEquipmentByType_StringFormat(ENUM.EQUIPMENT_TYPES.BOOTS)}`
                )
				break
			//

            // CHECK BOOTS DETAILS =====================================================================
			case 2:

				if(!equippedArmor) {
					sendMessage(`/w @${userName} você está sem botas equipadas`)
					return
				}
				new Boots(equippedArmor).printDetailsTo(userName)
				break
			//

            // UNEQUIP BOOTS ======================================================================
            case 3:
                if(!equippedArmor){
                    sendMessage(`/w @${userName} você não possui nenhuma bota equipada`)
                    return
                }
                playerInstance.unequip(ENUM.EQUIPMENT_TYPES.BOOTS)
				break
			//

            default:
                sendMessage(`/w ${userName} Código inválido`)
                break
            //
        }
    }
}
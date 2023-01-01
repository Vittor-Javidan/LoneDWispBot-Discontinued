import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import ENUM from "../../../../Classes/ENUM"
import BodyArmor from "../../../../Classes/EquipmentChilds/BodyArmor"
import Player from "../../../../Classes/Player"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_BODY"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_Body(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getPlayerName()
	const equippedArmor = playerInstance.getPlayerEquipment().bodyArmor

	// BODY EQUIPMENT MENU =======================================================================
	// If "!cs play"
	if (words.length === 2) {
		sendMessage(
			`/w ${userName} Você está no menu de armaduras
			| 0. Voltar
			| 1. Equipar outra armadura
			| 2. Ver detalhes da armadura
			| 3. Desequipar armadura
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

            // EQUIP ANOTHER BODY ARMOR =========================================================
			case 1:

				const inventory_BodyArmors = playerInstance.getPlayerInvetoryEquipment().bodyArmor
				if (!inventory_BodyArmors) {
					sendMessage(`/w @${userName} Seu inventário está vazio.`)
                    return
				}

				playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT_BODY_ARMOR_INVENTORY)
                sendMessage(
                    `/w @${userName} Qual armadura deseja equipar?: | 0. Voltar ${playerInstance.getInventoryEquipmentByType_StringFormat(ENUM.EQUIPMENT_TYPES.BODY_ARMOR)}`
                )
				break
			//

            // CHECK BODY ARMOR DETAILS =========================================================
			case 2:

				if(!equippedArmor) {
					sendMessage(`/w @${userName} você está sem armadura equipada`)
					return
				}
				new BodyArmor(equippedArmor).printDetailsTo(userName)
				break
			//

            // UNEQUIP BODY ARMOR ===============================================================
            case 3:
                if(!equippedArmor){
                    sendMessage(`/w @${userName} você não possui nenhuma armadura equipada`)
                    return
                }
                playerInstance.unequip(ENUM.EQUIPMENT_TYPES.BODY_ARMOR)
				break
			//

            default:
                sendMessage(`/w ${userName} Código inválido`)
                break
            //
        }
    }
}
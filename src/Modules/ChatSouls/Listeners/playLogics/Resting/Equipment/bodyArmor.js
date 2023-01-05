import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import ENUM from "../../../../Classes/ENUM"
import BodyArmor from "../../../../Classes/EquipmentChilds/BodyArmor"

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
	const userName = playerInstance.getName()
	const equippedArmor = playerInstance.getEquippedEquipment().bodyArmor

	// BODY EQUIPMENT MENU =======================================================================
	// If "!cs"
	if (words.length === 1) {
		sendMessage(
			`/w ${userName} Você está no menu de armaduras
			| 0. Voltar
			| 1. Equipar outra armadura
			| 2. Ver detalhes da armadura
			| 3. Desequipar armadura
			|`
		)
    }

	// if "!cs <itemCode>"
	if (words.length === 2) {

		let itemCode = Number(words[1])

		switch (itemCode) {

            //GO BACK TO EQUIPMENT MENU ================================================================
			case 0:
				playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT)
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

				const inventory_BodyArmors = playerInstance.getInvetoryEquipments(ENUM.EQUIPMENT_TYPES.BODY_ARMOR)
				if (!inventory_BodyArmors) {
					sendMessage(`/w @${userName} Seu inventário está vazio.`)
                    return
				}

				playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT_BODY_ARMOR_INVENTORY)
                sendMessage(
                    `/w @${userName} Qual armadura deseja equipar?: | 0. Voltar ${playerInstance.getInventoryEquipmentsString(ENUM.EQUIPMENT_TYPES.BODY_ARMOR)}`
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
                playerInstance.unequipEquipment(ENUM.EQUIPMENT_TYPES.BODY_ARMOR)
				sendMessage(`/w @${userName} Armadura desequipada`)
				break
			//

            default:
                sendMessage(`/w ${userName} Código inválido`)
                break
            //
        }
    }
}
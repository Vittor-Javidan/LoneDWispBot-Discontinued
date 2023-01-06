import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import CS_ENUM from "../../../../Classes/ENUM"
import Gloves from "../../../../Classes/EquipmentChilds/Gloves"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_GLOVES"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_Gloves(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()
	const equippedArmor = playerInstance.getEquippedEquipment().gloves

	// GLOVES EQUIPMENT MENU =======================================================================
	// If "!cs"
	if (words[0] === '!cs') {
		sendMessage(
			`/w ${userName} Você está no menu de luvas
			| 0. Voltar
			| 1. Equipar outra luvas
			| 2. Ver detalhes da luvas
			| 3. Desequipar luvas
			|`
		)
    }

	// if just a number "<itemCode>"
	let itemCode = Number(words[0])
	switch (itemCode) {

		//GO BACK TO EQUIPMENT MENU ================================================================
		case 0:
			playerInstance.setSecondaryState(CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT)
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

		// EQUIP ANOTHER GLOVE ====================================================================
		case 1:

			const inventory_GlovesArmor = playerInstance.getInvetoryEquipments(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.GLOVES)
			if (!inventory_GlovesArmor) {
				sendMessage(`/w @${userName} Seu inventário está vazio.`)
				return
			}

			playerInstance.setSecondaryState(CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_GLOVES_INVENTORY)
			sendMessage(
				`/w @${userName} Quais luvas deseja equipar?: | 0. Voltar ${playerInstance.getInventoryEquipmentsString(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.GLOVES)}`
			)
			break
		//

		// CHECK GLOVES DETAILS =====================================================================
		case 2:

			if(!equippedArmor) {
				sendMessage(`/w @${userName} você está sem luvas equipadas`)
				return
			}
			new Gloves(equippedArmor).printDetailsTo(userName)
			break
		//

		// UNEQUIP GLOVES ======================================================================
		case 3:
			if(!equippedArmor){
				sendMessage(`/w @${userName} você não possui nenhuma luva equipada`)
				return
			}
			playerInstance.unequipEquipment(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.GLOVES)
			sendMessage(`/w @${userName} Luvas desequipadas`)
			break
		//

		default:
			sendMessage(`/w ${userName} Código inválido`)
			break
		//
	}
}
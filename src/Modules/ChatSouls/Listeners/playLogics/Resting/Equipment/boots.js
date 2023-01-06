import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import CS_ENUM from "../../../../Classes/ENUM"
import Boots from "../../../../Classes/EquipmentChilds/Boots"

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
	const userName = playerInstance.getName()
	const equippedArmor = playerInstance.getEquippedEquipment().boots

	// BOOTS EQUIPMENT MENU =======================================================================
	// If "!cs"
	if (words[0] === '!cs') {
		sendMessage(
			`/w ${userName} Você está no menu de botas
			| 0. Voltar
			| 1. Equipar outra botas
			| 2. Ver detalhes da botas
			| 3. Desequipar botas
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

		// EQUIP ANOTHER BOOTS ====================================================================
		case 1:

			const inventory_Boots = playerInstance.getInvetoryEquipments(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.BOOTS)
			if (!inventory_Boots) {
				sendMessage(`/w @${userName} Seu inventário está vazio.`)
				return
			}

			playerInstance.setSecondaryState(CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_BOOTS_INVENTORY)
			sendMessage(
				`/w @${userName} Quais botas deseja equipar?: | 0. Voltar ${playerInstance.getInventoryEquipmentsString(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.BOOTS)}`
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
			playerInstance.unequipEquipment(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.BOOTS)
			sendMessage(`/w @${userName} Botas desequipadas`)
			break
		//

		default:
			sendMessage(`/w ${userName} Código inválido`)
			break
		//
	}
}
import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import CS_ENUM from "../../../../Classes/ENUM"
import Helmet from "../../../../Classes/EquipmentChilds/Helmet"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_HELMET"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_Helmet(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()
	const equippedArmor = playerInstance.getEquippedEquipment().helmet

	// HELMET EQUIPMENT MENU =======================================================================
	// If "!cs"
	if (words[0] === '!cs') {
		sendMessage(
			`/w ${userName} Você está no menu de capacetes
			| 0. Voltar
			| 1. Equipar outro capacete
			| 2. Ver detalhes do capacete
			| 3. Desequipar capacete
			|`
		)
    }

	// if "!cs <itemCode>"
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

		// EQUIP ANOTHER HELMET ====================================================================
		case 1:

			const inventory_Helmets = playerInstance.getInvetoryEquipments(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.HELMET)
			if (!inventory_Helmets) {
				sendMessage(`/w @${userName} Seu inventário está vazio.`)
				return
			}

			playerInstance.setSecondaryState(CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_HELMET_INVENTORY)
			sendMessage(
				`/w @${userName} Qual capacete deseja equipar?: | 0. Voltar ${playerInstance.getInventoryEquipmentsString(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.HELMET)}`
			)
			break
		//

		// CHECK WEAPON DETAILS ====================================================================
		case 2:

			if(!equippedArmor) {
				sendMessage(`/w @${userName} você está sem capacete equipado`)
				return
			}
			new Helmet(equippedArmor).printDetailsTo(userName)
			break
		//

		// UNEQUIP HELMET ======================================================================
		case 3:
			if(!equippedArmor){
				sendMessage(`/w @${userName} você não possui nenhum capacete equipado`)
				return
			}
			playerInstance.unequipEquipment(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.HELMET)
			sendMessage(`/w @${userName} Capacete desequipado`)
			break
		//

		default:
			sendMessage(`/w ${userName} Código inválido`)
			break
		//
	}
}
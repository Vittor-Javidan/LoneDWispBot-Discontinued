import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import Player from "../../../../Classes/EntityChilds/Player"
import CS_ENUM from "../../../../Classes/ENUM"
import LongRangeWeapon from "../../../../Classes/EquipmentChilds/LongRangeWeapon"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_LONG_RANGE"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_LongRange(data) {

	const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()
	const equippedWeapon = playerInstance.getEquippedEquipment().longRangeWeapon

	// LONG RANGE EQUIPMENT MENU =======================================================================
	// If "!cs"
	if (words[0] === '!cs') {
		sendMessage(
			`/w ${userName} Você está no menu de armas longo alcance
			| 0. Voltar
			| 1. Equipar outra arma
			| 2. Ver detalhes da arma
			| 3. Desequipar Arma
			|`
		)
	}

	// if just a number "<itemCode>"
	let itemCode = Number(words[0])
	switch (itemCode) {

		//GO BACK EQUIPMENT MENU ===================================================================
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

		// EQUIP ANOTHER LONG RANGE WEAPON =========================================================
		case 1:

			const inventoryWeapons_LongRange = playerInstance.getInvetoryEquipments(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.LONG_RANGE_WEAPON)
			if (!inventoryWeapons_LongRange) {
				sendMessage(`/w @${userName} Seu inventário está vazio.`)
				return
			}

			playerInstance.setSecondaryState(CS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_LONG_RANGE_INVENTORY)
			sendMessage(
				`/w @${userName} Qual arma deseja equipar?: | 0. Voltar ${playerInstance.getInventoryEquipmentsString(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.LONG_RANGE_WEAPON)}`
			)
			break
		//

		// CHECK WEAPON DETAILS ====================================================================
		case 2:

			if(!equippedWeapon) {
				sendMessage(`/w @${userName} você está sem arma equipada`)
				return
			}
			new LongRangeWeapon(equippedWeapon).printDetailsTo(userName)
			break
		//


		// UNEQUIP LONG RANGE ======================================================================
		case 3:
			if(!equippedWeapon){
				sendMessage(`/w @${userName} você não possui nenhuma arma equipada`)
				return
			}
			playerInstance.unequipEquipment(CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT.LONG_RANGE_WEAPON)
			sendMessage(`/w @${userName} Arma de longo alcance desequipada`)
			break
		//

		default:
			sendMessage(`/w ${userName} Código inválido`)
			break
		//
	}
}
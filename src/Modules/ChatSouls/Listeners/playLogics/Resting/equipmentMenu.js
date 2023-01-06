import sendMessage from "../../../../../Twitch/sendMessageHandler"
import Player from "../../../Classes/EntityChilds/Player"
import CHATSOULS_ENUM from "../../../Classes/ENUM"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_Menu(data) {

	const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()
	
	// EQUIPMENT MENU =========================================================================
	// If "!cs"
	if (words[0] === '!cs') {
		sendMessage(
			`/w ${userName} Você está olhando seus equipamentos. 
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
		return
	}

	// if just a number "<itemCode>"
	let itemCode = Number(words[0])
	switch (itemCode) {

		// GO BACK TO RESTING MAIN MENU ===================================================
		case 0:
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.RESTING.SECONDARY.JUST_RESTING)
			sendMessage(
				`/w ${userName} Voltou para a fogueira: 
				| 1. Statísticas 
				| 2. Ver Equipamento 
				| 3. Levantar da fogueira 
				|`
			)
			break
		//

		// MELEE EQUIPMENT MENU ===========================================================
		case 1:
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_MELEE)
			sendMessage(
				`/w ${userName} Menu de armas corpo a corpo: 
				| 0. Voltar 
				| 1. Equipar outra arma 
				| 2. Ver detalhes da arma 
				| 3. Desequipar Arma 
				|`
			)
			break
		//

		// LONG RANGE EQUIPMENT MENU ======================================================
		case 2:
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_LONG_RANGE)
			sendMessage(
				`/w ${userName} Menu de armas longo alcance: 
				| 0. Voltar 
				| 1. Equipar outra arma 
				| 2. Ver detalhes da arma 
				| 3. Desequipar Arma 
				|`
			)
			break
		//

		// HELMETS EQUIPMENT MENU =========================================================
		case 3:
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_HELMET)
			sendMessage(
				`/w ${userName} Menu de capacetes: 
				| 0. Voltar 
				| 1. Equipar outro capacete 
				| 2. Ver detalhes do capacete 
				| 3. Desequipar capacete 
				|`
			)
			break
		//

		// BODY EQUIPMENT MENU ============================================================
		case 4:
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_BODY_ARMOR)
			sendMessage(
				`/w ${userName} Menu de armaduras: 
				| 0. Voltar
				| 1. Equipar outra armadura 
				| 2. Ver detalhes da armadura 
				| 3. Desequipar armadura 
				|`
			)
			break
		//

		// GLOVES EQUIPMENT MENU ==========================================================
		case 5:
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_GLOVES)
			sendMessage(
				`/w ${userName} Menu de luvas: 
				| 0. Voltar 
				| 1. Equipar outras luvas 
				| 2. Ver detalhes das luvas 
				| 3. Desequipar luvas 
				|`
			)
			break
		//

		// BOOTS EQUIPMENT MENU ==========================================================
		case 6:
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT_BOOTS)
			sendMessage(
				`/w ${userName} Menu de botas: 
				| 0. Voltar 
				| 1. Equipar outras botas 
				| 2. Ver detalhes das botas 
				| 3. Desequipar botas 
				|`
			)
			break
		//

		// GET EQUIPMENT SUMMARY =========================================================
		case 7:

			const playerEquipments = playerInstance.getEquippedEquipment()
			const playerEquipmentProperties = Object.keys(playerEquipments)

			if(playerEquipmentProperties.length === 0) {
				sendMessage(`/w @${userName} Você está completamente nu!! Shame on you`)
				return
			}

			let equipmentString = 'Atualmente você está equipando: '
			for (let i = 0; i < playerEquipmentProperties.length; i++) {
				equipmentString += `| ${playerEquipments[playerEquipmentProperties[i]].name} `
			}
			equipmentString += `|`

			sendMessage(`/w ${userName} ${equipmentString} Você ainda está no menu de equipamentos.`)
			break
		//


		default:
			sendMessage(`/w ${userName} opção inválida`)
			break
		//
	}
}

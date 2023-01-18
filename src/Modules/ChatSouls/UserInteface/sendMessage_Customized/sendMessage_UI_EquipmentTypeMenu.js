import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * @param {Player} playerInstance 
 * @param {string} menuMessage 
 */
export function sendMessage_UI_EquipmentTypeMenu(playerInstance, menuMessage) {
	
	const playerName = playerInstance.getName()

	const emoji = `SirShield`

	sendMessage(
		`/w ${playerName} ${emoji} ${menuMessage} 
		| 0. Voltar
		| 1. Equipar
		| 2. Ver detalhes
		| 3. Desequipar
		|`
	)
    return
}

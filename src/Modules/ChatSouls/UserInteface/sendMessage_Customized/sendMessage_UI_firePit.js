import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Sends a message to a player with firepit menu options as last info.
 * @param {Player} playerInstance 
 * @param {string} menuMessage 
 */
export function sendMessage_UI_FirePit(playerInstance, menuMessage) {

	const playerName = playerInstance.getName()
	const emoji = `Getcamped`

	sendMessage(
		`/w ${playerName} ${emoji} ${menuMessage} 
		| 0. Levantar da fogueira
		| 1. Statísticas 
		| 2. Ver Equipamento 
		|`
	)
	return
}
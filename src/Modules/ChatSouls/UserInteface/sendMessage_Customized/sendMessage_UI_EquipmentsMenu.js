import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Sends a message to a player with equipment menu options as last info.
 * @param {Player} playerInstance 
 * @param {string} menuMessage 
 */
export function sendMessage_UI_EquipmentsMenu(playerInstance, menuMessage) {

	const playerName = playerInstance.getName()

	sendMessage(
		`/w ${playerName} ${menuMessage}. 
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

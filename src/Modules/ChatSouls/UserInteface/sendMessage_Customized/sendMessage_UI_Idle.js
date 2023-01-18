import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Sends a message to a player with Idle options as last info.
 * @param {Player} playerInstance 
 * @param {string} menuMessage 
 */
export function sendMessage_UI_Idle(playerInstance, menuMessage) {

    const playerName = playerInstance.getName()

    const emoji = `CoolStoryBob`

	sendMessage(
		`/w ${playerName} ${emoji} ${menuMessage} 
        | 0. Voltar a fogueira
        | 1. Explorar 
        | 2. Procurar por recursos (Em progresso)
        | 3. Viajar (Em progresso)
        |`
	)
    return
}

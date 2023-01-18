import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Sends a message to a player with stats menu options as last info.
 * @param {Player} playerInstance 
 * @param {string} menuMessage 
 */
export function sendMessage_UI_StatsMenu(playerInstance, menuMessage) {

    const playerName = playerInstance.getName()

    const emoji = `Squid1 Squid3 Squid4`

	sendMessage(
        `/w ${playerName} ${emoji} ${menuMessage} 
        | 0. Voltar 
        | 1. Ver Atributos 
        | 2. Upar Atributos 
        |`
	)
    return
}

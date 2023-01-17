import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Sends a message to a player with stats menu options as last info.
 * @param {Player} playerInstance 
 * @param {string} menuMessage 
 * @returns {string} Status response
 */
export function sendMessage_UI_StatisticsMenu(playerInstance, menuMessage) {

    const playerName = playerInstance.getName()

	sendMessage(
        `/w ${playerName} ${menuMessage} 
        | 0. Voltar 
        | 1. Ver Atributos 
        | 2. Upar Atributos 
        |`
	)
    return
}

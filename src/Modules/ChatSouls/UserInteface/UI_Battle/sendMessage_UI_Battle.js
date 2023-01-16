import sendMessage from "../../../../Twitch/sendMessageHandler"
import Battle from "../../Classes/Battle"

/**
 * Sends a message to a player with equipment menu options as last info.
 * @param {Battle} battleInstance 
 * @param {string} menuMessage 
 */
export default function sendMessage_UI_Battle(battleInstance, menuMessage) {
    const playerInstance = battleInstance.playerInstance
	sendMessage(
		`/w ${playerInstance.name} ${menuMessage} ${battleInstance.getBattleStatus()}. 
        | 0. Fugir 
        | 1. Atacar 
        |`
	)
    return
}

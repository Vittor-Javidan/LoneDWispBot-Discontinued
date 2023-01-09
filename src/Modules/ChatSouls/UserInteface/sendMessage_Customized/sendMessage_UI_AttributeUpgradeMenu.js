import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Sends a message with attribute upgrade menu options as last info.
 * 
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export function sendMessage_UI_AttributeUpgradeMenu(playerInstance, menuMessage) {
	sendMessage(
        `/w ${playerInstance.name} ${menuMessage} 
		| Seu Level: ${playerInstance.level} 
		| Suas Almas: ${playerInstance.souls} 
		| Custo Upgrade: ${playerInstance.getUpgradeCost()} almas 
		| 0. Voltar 
		| 1. UP Vitalidade 
		| 2. UP Agilidade 
		| 3. UP Força 
		| 4. UP Inteligência 
		| 5. Descrições do bônus de cada atributo 
		|`
	)
	return
}


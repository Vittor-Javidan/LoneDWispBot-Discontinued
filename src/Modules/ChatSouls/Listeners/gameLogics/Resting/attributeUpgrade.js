import sendMessage from "../../../../../Twitch/sendMessageHandler"
import ENUM from "../../../Classes/ENUM"
import Player from "../../../Classes/Player"

/**
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function attributeUpgrade(data) {

	const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getPlayerName()
	
	// If "!cs play"
	if (words.length === 2) {
		sendMessage(`/w ${userName} Você está no menu de atributos: | 0. Voltar |`)
		return
	}

	// if "!cs play <itemCode>"
	if (words.length === 3 ) {
				
		let itemCode = Number(words[2])
			
		switch(itemCode){
					
			case 0:
				playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.JUST_RESTING)
				sendMessage(`/w ${userName} Voltou para a fogueira: | 1. Upar níveis | 2. Ver Equipamento |`)
				break
			//

			default:
				sendMessage(`/w ${userName} opção inválida`)
				break
			//
		}
	}
}

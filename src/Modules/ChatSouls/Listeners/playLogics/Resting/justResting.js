import sendMessage from "../../../../../Twitch/sendMessageHandler"
import ENUM from "../../../Classes/ENUM"
import Player from "../../../Classes/Player"

/**
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function justResting(data) {

	const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getPlayerName()

	// If "!cs play"
	if (words.length === 2) {
		sendMessage(
			`/w ${userName} Você está descansando em uma fogueira. oque deseja fazer?: 
			| 1. Statísticas 
			| 2. Ver Equipamento |`
		)
		return
	}

	// if "!cs play <itemCode>"
	if (words.length === 3) {

		const itemCode = Number(words[2])

		switch (itemCode) {

			case 1:
				playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.STATS_MENU)
				sendMessage(
					`/w ${userName} Você está no menu de estatísticas: 
					| 0. Voltar 
					| 1. Ver Atributos 
					| 2. Upar Atributos |`
				)
				break
			//

			case 2:
				playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT)
				sendMessage(
					`/w ${userName} "EQUIPAMENTOS: 
					| 0. Voltar | Atualmente você não possui nenhum equipamento`
				)
				break
			//

			default:
				sendMessage(`/w ${userName} opção inválida`)
				break
			//
		}
	}
}

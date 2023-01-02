import sendMessage from "../../../../../Twitch/sendMessageHandler"
import ENUM from "../../../Classes/ENUM"
import Player from "../../../Classes/Player"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "JUST_RESTING"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function justResting(data) {

	const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()

	// If "!cs play"
	if (words.length === 2) {
		sendMessage(
			`/w ${userName} Você está descansando em uma fogueira. oque deseja fazer?: 
			| 1. Statísticas 
			| 2. Ver Equipamento 
			| 3. Levantar da fogueira
			|`
		)
		return
	}

	// if "!cs play <itemCode>"
	if (words.length === 3) {

		const itemCode = Number(words[2])

		switch (itemCode) {

			case 1:
				playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.STATS_MENU)
				sendMessage(
					`/w ${userName} Você está no menu de estatísticas: 
					| 0. Voltar 
					| 1. Ver Atributos 
					| 2. Upar Atributos 
					|`
				)
				break
			//

			case 2:
				playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.EQUIPMENT)
				sendMessage(
					`/w ${userName} "EQUIPAMENTOS: 
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
				break
			//

			case 3:
				playerInstance.setPrimaryState(ENUM.EXPLORING.PRIMARY)
				playerInstance.setSecondaryState(ENUM.EXPLORING.SECONDARY.IDLE)
				sendMessage(
					`/w ${userName} Você se levanta da fogueira e olha em volta.
					| 0. Voltar a fogueira
					| 1. Caçar (Em progresso)
					| 2. Procurar por recursos (Em progresso)
					| 3. Viajar (Em progresso)
					|`
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

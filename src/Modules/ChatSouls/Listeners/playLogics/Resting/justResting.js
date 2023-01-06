import sendMessage from "../../../../../Twitch/sendMessageHandler"
import Player from "../../../Classes/EntityChilds/Player"
import CHATSOULS_ENUM from "../../../Classes/ENUM"

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

	// If "!cs"
	if (words[0] === '!cs') {
		sendMessage(
			`/w ${userName} Você está descansando em uma fogueira. oque deseja fazer?: 
			| 1. Statísticas 
			| 2. Ver Equipamento 
			| 3. Levantar da fogueira
			|`
		)
		return
	}

	// if just a number "<itemCode>"
	const itemCode = Number(words[0])
	switch (itemCode) {

		case 1:
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.RESTING.SECONDARY.STATS_MENU)
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
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.RESTING.SECONDARY.EQUIPMENT)
			sendMessage(
				`/w ${userName} EQUIPAMENTOS: 
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
			playerInstance.setPrimaryState(CHATSOULS_ENUM.STATES.EXPLORING.PRIMARY)
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.EXPLORING.SECONDARY.IDLE)
			sendMessage(
				`/w ${userName} Você se levanta da fogueira e olha em volta.
				| 0. Voltar a fogueira
				| 1. Caçar 
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

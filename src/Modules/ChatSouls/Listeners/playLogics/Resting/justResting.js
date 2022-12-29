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
	const level = playerInstance.getPlayerLevel()
	const souls = playerInstance.getSouls()
	const upgradeCost = playerInstance.getUpgradeCost()

	// If "!cs play"
	if (words.length === 2) {
		sendMessage(`/w ${userName} Você está descansando em uma fogueira. oque deseja fazer?: | 1. Upar níveis | 2. Ver Equipamento |`)
		return
	}

	// if "!cs play <itemCode>"
	if (words.length === 3) {

		let itemCode = Number(words[2])

		switch (itemCode) {

			case 1:
				playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.ATRIBUTE_UPGRADE)
				sendMessage(`/w ${userName} Você está no menu de atributos: | Level: ${level} | Almas: ${souls} | Custo Upgrade: ${upgradeCost} almas | 0. Voltar | 1. UP Vitalidade | 2. UP Agilidade | 3. UP Força | 4. UP Inteligência | 5. Descrições Atributos |`)
				break
			//

			case 2:
				playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT)
				sendMessage(`/w ${userName} "EQUIPAMENTOS: | 0. Voltar |`)
				break
			//

			default:
				sendMessage(`/w ${userName} opção inválida`)
				break
			//
		}
	}
}

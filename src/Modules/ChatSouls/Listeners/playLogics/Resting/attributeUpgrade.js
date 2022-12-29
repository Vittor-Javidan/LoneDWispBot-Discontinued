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
	const souls = playerInstance.getSouls()
	const upgradeCost = playerInstance.getUpgradeCost()
	
	// If "!cs play"
	if (words.length === 2) {
		sendMessage(`/w ${userName} Você está no menu de atributos: | Level: ${level} | Almas: ${souls} | Custo Upgrade: ${upgradeCost} almas | 0. Voltar | 1. UP Vitalidade | 2. UP Agilidade | 3. UP Força | 4. UP Inteligência | 5. Descrições Atributos |`)
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

			case 1:
				playerInstance.upgradeAttribute(ENUM.ATTRIBUTES.VITALITY)
				break
			//

			case 2:
				playerInstance.upgradeAttribute(ENUM.ATTRIBUTES.AGILITY)
				break
			//

			case 3:
				playerInstance.upgradeAttribute(ENUM.ATTRIBUTES.STRENGHT)
				break
			//

			case 4:
				playerInstance.upgradeAttribute(ENUM.ATTRIBUTES.INTELLLIGENCE)
				break
			//

			case 5:
				sendMessage(`/w ${userName} Vitalidade: + HP | Agilidade: + evasão | Força: + dano/defesa física | Inteligência: + dano/defesa mágica`)

			default:
				sendMessage(`/w ${userName} opção inválida`)
				break
			//
		}
	}
}

import sendMessage from "../../../../../Twitch/sendMessageHandler"
import Player from "../../../Classes/EntityChilds/Player"
import CHATSOULS_ENUM from "../../../Classes/ENUM"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "ATRIBUTE_UPGRADE"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function attributeUpgrade(data) {

	const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	
	const userName = playerInstance.getName()
	const level = playerInstance.getLevel()
	const souls = playerInstance.getSouls()
	const upgradeCost = playerInstance.getUpgradeCost()
	const soulsBalance_AfterUpgrade = souls - upgradeCost
	
	// If "!cs"
	if (words[0] === '!cs') {
		sendMessage(
			`/w ${userName} Você está no menu de atributos: 
			| Level: ${level} 
			| Almas: ${souls} 
			| Custo Upgrade: ${upgradeCost} almas 
			| 0. Voltar 
			| 1. UP Vitalidade 
			| 2. UP Agilidade 
			| 3. UP Força 
			| 4. UP Inteligência 
			| 5. Descrições Atributos |`
		)
		return
	}

	// if just a number "<itemCode>"
	let itemCode = Number(words[0])
	switch(itemCode){
				
		case 0:
			playerInstance.setSecondaryState(CHATSOULS_ENUM.STATES.RESTING.SECONDARY.STATS_MENU)
			sendMessage(
				`/w ${userName} Você está no menu de estatísticas: 
				| 0. Voltar 
				| 1. Ver Atributos 
				| 2. Upar Atributos |`
			)
			break
		//

		case 1:
			if(soulsBalance_AfterUpgrade < 0 ){
				sendMessage(`/w ${userName} Você não possui almas o suficiente`)
				return
			}
			playerInstance.upgradeAttribute(CHATSOULS_ENUM.TYPES.ATTRIBUTE_TYPES.VITALITY)
			sendMessage(
				`/w ${userName} VITALIDADE AUMENTADA! 
				| Novo level: ${playerInstance.getLevel()} 
				| Almas restantes: ${playerInstance.getSouls()} 
				| custo próximo nível: ${playerInstance.getUpgradeCost()} 
				|`
			)
			break
		//

		case 2:
			if(soulsBalance_AfterUpgrade < 0 ){
				sendMessage(`/w ${userName} Você não possui almas o suficiente`)
				return
			}
			playerInstance.upgradeAttribute(CHATSOULS_ENUM.TYPES.ATTRIBUTE_TYPES.AGILITY)
			sendMessage(
				`/w ${userName} AGILIDADE AUMENTADA! 
				| Novo level: ${playerInstance.getLevel()} 
				| Almas restantes: ${playerInstance.getSouls()} 
				| custo próximo nível: ${playerInstance.getUpgradeCost()} 
				|`
			)
			break
		//

		case 3:
			if(soulsBalance_AfterUpgrade < 0 ){
				sendMessage(`/w ${userName} Você não possui almas o suficiente`)
				return
			}
			playerInstance.upgradeAttribute(CHATSOULS_ENUM.TYPES.ATTRIBUTE_TYPES.STRENGHT)
			sendMessage(
				`/w ${userName} FORÇA AUMENTADA! 
				| Novo level: ${playerInstance.getLevel()} 
				| Almas restantes: ${playerInstance.getSouls()} 
				| custo próximo nível: ${playerInstance.getUpgradeCost()} 
				|`
			)
			break
		//

		case 4:
			if(soulsBalance_AfterUpgrade < 0 ){
				sendMessage(`/w ${userName} Você não possui almas o suficiente`)
				return
			}
			playerInstance.upgradeAttribute(CHATSOULS_ENUM.TYPES.ATTRIBUTE_TYPES.INTELLLIGENCE)
			sendMessage(
				`/w ${userName} INTELIGÊNCIA AUMENTADA! 
				| Novo level: ${playerInstance.getLevel()} 
				| Almas restantes: ${playerInstance.getSouls()} 
				| custo próximo nível: ${playerInstance.getUpgradeCost()} 
				|`
			)
			break
		//

		case 5:
			sendMessage(
				`/w ${userName} O bônus de cada um dos atributos são: 
				| Vitalidade: +HP 
				| Agilidade: +evasão 
				| Força: +dano/defesa(física) 
				| Inteligência: +dano/defesa(mágica) 
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

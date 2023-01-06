import sendMessage from "../../../../../Twitch/sendMessageHandler"
import Battle from "../../../Classes/Battle"
import Player from "../../../Classes/EntityChilds/Player"
import CS_ENUM from "../../../Classes/ENUM"

/**
 * Handle !cs play commands when the player has a primary state of "EXPLORING" and secondary state of "HUNTING"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function hunting(data) {

	const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()
	const battleInstancePvE = Battle.getPvEBattle(userName)

	// If "!cs"
	if (words[0] === '!cs') {
		sendMessage(
			`/w ${userName} Você está em batalha!!! ${battleInstancePvE.getBattleStatusStringPvE()} 
			| 0. Fugir 
			| 1. Atacar 
			|`
		)
		return
	}

	// if just a number "<itemCode>"
	const itemCode = Number(words[0])
	switch (itemCode) {

		// TRY TO FLEE AND GO BACK TO IDLE MENU =============================================
		case 0:
				
			if(!playerInstance.getCanPLay()) {
				sendMessage(`/w ${userName} Você está digitando muito rápido!`)
				return
			}

			const succed = battleInstancePvE.fleePvE()
			if(succed) {
				playerInstance.setSecondaryState(CS_ENUM.STATES.EXPLORING.SECONDARY.IDLE)
				return
			}
			break
		//

		// ATTACK ENEMIE ====================================================================
		case 1:

			//Checks if player action still delayed
			if(!playerInstance.getCanPLay()) {
				sendMessage(`/w ${userName} Você está digitando muito rápido!`)
				return
			}

			battleInstancePvE.attackPvE()

			if(!Battle.doesPvEBattleExist(userName)) {
				return
			}

			sendMessage(
				`/w ${userName} ${battleInstancePvE.getBattleStatusStringPvE()}
				| 0. Fugir 
				| 1. Atacar 
				|`
				, 2000
			)

			playerInstance.delayPlayerAction(2000)
			break
		//

		default:
			sendMessage(`/w ${userName} opção inválida`)
			break
		//
	}
}
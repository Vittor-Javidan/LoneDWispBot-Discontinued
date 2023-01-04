import sendMessage from "../../../../../Twitch/sendMessageHandler"
import Battle from "../../../Classes/Battle"
import Player from "../../../Classes/EntityChilds/Player"
import ENUM from "../../../Classes/ENUM"

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
	if (words.length === 1) {
		sendMessage(
            `/w ${userName} Você está em batalha!!! ${battleInstancePvE.getBattleStatusStringPvE()} 
            | 0. Fugir (Em progresso)
            | 1. Atacar (Em progresso)
            |`
		)
		return
	}

    // if "!cs <itemCode>"
	if (words.length === 2) {

		const itemCode = Number(words[1])

        switch (itemCode) {

            // TRY TO FLEE AND GO BACK TO IDLE MENU =============================================
            case 0:
                
                if(!playerInstance.getCanPLay()) {
                    sendMessage(`/w ${userName} Você está digitando muito rápido!`)
                    return
                }

                const succed = battleInstancePvE.fleePvE()
                if(succed) {
                    Battle.deletePvEBattle(userName)
                    playerInstance.setSecondaryState(ENUM.EXPLORING.SECONDARY.IDLE)
                    sendMessage(`/w @${userName} Fuga bem sucedida!`, 500)
                    return
                }
                sendMessage(`/w @${userName} sua fuga falhou!`, 500)
                break
            //

            // ATTACK ENEMIE ====================================================================
            case 1:

                if(!playerInstance.getCanPLay()) {
                    sendMessage(`/w ${userName} Você está digitando muito rápido!`)
                    return
                }

                //Attack enemie
                battleInstancePvE.attackPvE()

                //Check if enemy is alive
                const enemieInstance = battleInstancePvE.getEnemieInstancePvE()
                if(!enemieInstance.getIsAlive()) {

                    Battle.deletePvEBattle(userName)

                    //send back to idle menu if enemy dies
                    playerInstance.setPrimaryState(ENUM.EXPLORING.PRIMARY)
                    playerInstance.setSecondaryState(ENUM.EXPLORING.SECONDARY.IDLE)
                    return
                }

                if(!playerInstance.getIsAlive()) {
                    sendMessage(`/w ${userName} Você foi derrotado por ${enemieInstance.getName()}. Voltando a fogueira. Todas almas foram perdidas.`)
                    return
                }

                //Feedback message to next round
                sendMessage(
                    `/w ${userName} ${battleInstancePvE.getBattleStatusStringPvE()}
                    | 0. Fugir (Em progresso)
                    | 1. Atacar (Em progresso)
                    |`
                , 2000)

                playerInstance.delayPlayerAction(2000)

                break
            //

            default:
				sendMessage(`/w ${userName} opção inválida`)
				break
			//
        }
    }
}
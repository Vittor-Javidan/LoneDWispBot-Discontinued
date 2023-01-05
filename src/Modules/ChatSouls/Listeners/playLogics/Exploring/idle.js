import sendMessage from "../../../../../Twitch/sendMessageHandler";
import Battle from "../../../Classes/Battle";
import Player from "../../../Classes/EntityChilds/Player";
import ENUM from "../../../Classes/ENUM";

/**
 * Handle !cs play commands when the player has a primary state of "EXPLORING" and secondary state of "IDLE"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function idle(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getName()

	// If "!cs"
	if (words[0] === '!cs') {
		sendMessage(
            `/w ${userName} Você se está planejando seu próximo passo.
            | 0. Montar uma fogueira
            | 1. Caçar 
            | 2. Procurar por recursos (Em progresso)
            | 3. Viajar (Em progresso)
            |`
		)
		return
	}

    // if just a number "<itemCode>"
    const itemCode = Number(words[0])
    switch (itemCode) {

        // GO BACK TO RESTING MENU ==========================================================       
        case 0:
            playerInstance.setPrimaryState(ENUM.RESTING.PRIMARY)
            playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.JUST_RESTING)
            playerInstance.recoverHP()
            sendMessage(
                `/w ${userName} Montou uma fogueira. HP restaurado. 
                | 1. Statísticas 
                | 2. Ver Equipamento 
                | 3. Levantar da fogueira 
                |`
            )
            break
        //

        // START A PVE BATTLE ===============================================================
        case 1:
            Battle.startPvEBattle(playerInstance)
            const battleInstance = Battle.getPvEBattle(userName)
            playerInstance.setSecondaryState(ENUM.EXPLORING.SECONDARY.HUNTING)
            sendMessage(
                `/w ${userName} ${battleInstance.getBattleStatusStringPvE()} 
                | 0. Fugir 
                | 1. Atacar 
                |`
            )
            break
        //

        case 2:
            break
            playerInstance.setSecondaryState(ENUM.EXPLORING.SECONDARY.FORAGING)
            //randomResourceGatteringFunction(playerInstance)
            break
        //

        case 3:
            break
            playerInstance.setSecondaryState(ENUM.EXPLORING.SECONDARY.TRAVEL)
            //travelFunction(playerInstance)
            break
        //

        default:
            sendMessage(`/w ${userName} opção inválida`)
            break
        //
    }
}
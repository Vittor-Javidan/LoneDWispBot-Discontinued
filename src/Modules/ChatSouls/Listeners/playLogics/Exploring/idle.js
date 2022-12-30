import sendMessage from "../../../../../Twitch/sendMessageHandler";
import ENUM from "../../../Classes/ENUM";
import Player from "../../../Classes/Player";

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
	const userName = playerInstance.getPlayerName()

	// If "!cs play"
	if (words.length === 2) {
		sendMessage(
            `/w ${userName} Você se está planejando seu próximo passo.
            | 0. Montar uma fogueira
            | 1. Caçar (Em progresso)
            | 2. Procurar por recursos (Em progresso)
            | 3. Viajar (Em progresso)
            |`
		)
		return
	}

    	// if "!cs play <itemCode>"
	if (words.length === 3) {

		const itemCode = Number(words[2])

        switch (itemCode) {
            
            case 0:
                playerInstance.setPlayerState_Primary(ENUM.RESTING.PRIMARY)
                playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.JUST_RESTING)
                sendMessage(
                    `/w ${userName} Montou uma fogueira: 
					| 1. Statísticas 
					| 2. Ver Equipamento 
					| 3. Levantar da fogueira 
					|`
                )
                break
            //

            case 1:
                break
                playerInstance.setPlayerState_Secondary(ENUM.EXPLORING.SECONDARY.HUNTING)
                //randomBattleEventFunction(playerInstance)
                break
            //

            case 2:
                break
                playerInstance.setPlayerState_Secondary(ENUM.EXPLORING.SECONDARY.FORAGING)
                //randomResourceGatteringFunction(playerInstance)
                break
            //

            case 3:
                break
                playerInstance.setPlayerState_Secondary(ENUM.EXPLORING.SECONDARY.TRAVEL)
                //travelFunction(playerInstance)
                break
        }
    }
}
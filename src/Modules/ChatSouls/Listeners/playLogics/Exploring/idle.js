import sendMessage from "../../../../../Twitch/sendMessageHandler";
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
                playerInstance.setPrimaryState(ENUM.RESTING.PRIMARY)
                playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.JUST_RESTING)
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
                playerInstance.setSecondaryState(ENUM.EXPLORING.SECONDARY.HUNTING)
                //randomBattleEventFunction(playerInstance)
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
        }
    }
}
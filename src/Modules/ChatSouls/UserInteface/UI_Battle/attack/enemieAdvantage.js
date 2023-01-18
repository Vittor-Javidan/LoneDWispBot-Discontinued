import Battle from "../../../Classes/Battle"
import attackAttempt from "../battleScripts/attackAttempt"
import playerDied from "../battleScripts/playerDied"
import playerWon from "../battleScripts/playerWon"
import sendMessage_UI_Battle from "../sendMessage_UI_Battle"

/**
 * @param {Battle} battleInstance
 */
export default function enemieAdvantage(battleInstance) {

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance

    let feedBackMessage = ''

    //Enemie Turn ========================================
    feedBackMessage += attackAttempt(battleInstance, {
        attacker: enemieInstance,
        defensor: playerInstance,
        evasionWeight: 0.5
    })

    if(!playerInstance.getIsAlive()) {
        playerDied(battleInstance, feedBackMessage)
        return
    }

    feedBackMessage += 'e '

    //Player Turn ========================================
    feedBackMessage += attackAttempt(battleInstance, {
        attacker: playerInstance,
        defensor: enemieInstance,
        evasionWeight: 0.5
    }, feedBackMessage)
    
    if(!enemieInstance.getIsAlive()) {
        playerWon(battleInstance, feedBackMessage)
        return   
    }
    
    //End turn message ===================================
    sendMessage_UI_Battle(battleInstance, feedBackMessage)
}

import Battle from "../../../Classes/Battle"
import attackAttempt from "../battleScripts/attackAttempt"
import playerDied from "../battleScripts/playerDied"
import playerWon from "../battleScripts/playerWon"
import sendMessage_UI_Battle from "../sendMessage_UI_Battle"

/**
 * @param {Battle} battleInstance
 * @param {Object} options
 * @param {number} options.dodgeWeight
 */
export default function playerAdvantage(battleInstance, options) {

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance
    
    let feedBackMessage = ''

    //Player Turn ========================================
    feedBackMessage += attackAttempt(battleInstance, {
        attacker: playerInstance,
        defensor: enemieInstance,
        evasionWeight: options.dodgeWeight
    })

    if(!enemieInstance.getIsAlive()) {
        playerWon(battleInstance, feedBackMessage)
        return   
    }

    feedBackMessage += 'e '
    
    //Enemie Turn ========================================
    feedBackMessage += attackAttempt(battleInstance, {
        attacker: enemieInstance,
        defensor: playerInstance,
        evasionWeight: options.dodgeWeight
    }) 

    if(!playerInstance.getIsAlive()) {
        playerDied(battleInstance, feedBackMessage)
        return
    }

    //End turn message ===================================
    sendMessage_UI_Battle(battleInstance, feedBackMessage)
}
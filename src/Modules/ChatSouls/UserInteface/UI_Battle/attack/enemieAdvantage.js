import Battle from "../../../Classes/Battle"
import sendMessage_UI_Battle from "../sendMessage_UI_Battle"
import attackAttempt from "./attackAttempt"
import playerDied from "./playerDied"
import playerWon from "./playerWon"

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
        evasionWeight: 1
    })

    if(!playerInstance.isAlive) {
        playerDied(battleInstance, feedBackMessage)
        return
    }

    feedBackMessage += 'e '

    //Player Turn ========================================
    feedBackMessage += attackAttempt(battleInstance, {
        attacker: playerInstance,
        defensor: enemieInstance,
        evasionWeight: 1
    }, feedBackMessage)
    
    if(!enemieInstance.isAlive) {
        playerWon(battleInstance, feedBackMessage)
        return   
    }
    
    //End turn message ===================================
    sendMessage_UI_Battle(battleInstance, feedBackMessage)
}

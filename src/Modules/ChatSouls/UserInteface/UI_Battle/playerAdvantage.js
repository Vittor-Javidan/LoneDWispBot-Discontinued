import Battle from "../../Classes/Battle"
import attackAttempt from "./attackAttempt"
import playerDied from "./playerDied"
import playerWon from "./playerWon"
import sendMessage_UI_Battle from "./sendMessage_UI_Battle"

/**
 * @param {Battle} battleInstance
 */
export default function playerAdvantage(battleInstance) {

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance
    
    let feedBackMessage = ''

    //Player Turn ========================================
    feedBackMessage += attackAttempt(battleInstance, {
        attacker: playerInstance,
        defensor: enemieInstance,
        evasionWeight: 1
    })

    if(!enemieInstance.isAlive) {
        playerWon(battleInstance, feedBackMessage)
        return   
    }

    feedBackMessage += 'e '
    
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

    //End turn message ===================================
    sendMessage_UI_Battle(battleInstance, feedBackMessage)
}
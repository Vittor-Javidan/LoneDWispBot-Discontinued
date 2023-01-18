import Battle from "../../../Classes/Battle"
import attackAttempt from "../battleScripts/attackAttempt"
import fleeAttempt from "../battleScripts/fleeAttempt"
import playerDied from "../battleScripts/playerDied"
import sendMessage_UI_Battle from "../sendMessage_UI_Battle"

/**
 * @param {Battle} battleInstance 
 * @param {Object} options
 * @param {number} options.fleeWeight
 * @param {number} options.dodgeWeight
 */
export default function flee(battleInstance, options) {

    options = checkOptions()

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance
    
    if(fleeAttempt(battleInstance, {
        coward: playerInstance,
        evasionWeight: options.fleeWeight,
    })) {
        return
    }
    
    const feedBackMessage = attackAttempt(battleInstance, {
        attacker: enemieInstance,
        defensor: playerInstance,
        evasionWeight: options.dodgeWeight
    })
    
    if(!playerInstance.getIsAlive()) {
        playerDied(battleInstance, `${feedBackMessage}`)
        return
    }
    
    sendMessage_UI_Battle(battleInstance, `sua fuga falhou! ${feedBackMessage}`)
}

/**
 * @param {Object} options
 * @param {number} options.fleeWeight
 * @param {number} options.dodgeWeight
 * @returns {{
 *      fleeWeight: number,
 *      dodgeWeight: number
 * }}
 */
function checkOptions(options) {

    if(options == undefined) {
        options = {
            fleeWeight: 1,
            dodgeWeight: 1
        }
    }

    if(options.fleeWeight == undefined) {
        options.fleeWeight = 1
    }

    if(options.fleeWeight == undefined) {
        options.dodgeWeight = 1
    }

    return options
}

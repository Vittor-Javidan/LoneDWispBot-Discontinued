import Battle from "../../Classes/Battle";
import Enemie from "../../Classes/EntityChilds/Enemie";
import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Classes/EntityChilds/PLAYER_STATES";
import { sendMessage_UI_Battle } from "../sendMessage_Customized/sendMessage_UI_Battle";
import { sendMessage_UI_Idle } from "../sendMessage_Customized/sendMessage_UI_Idle";
import playerDied from "./playerDied";

/**
 * @param {Battle} battleInstance
*/
export default function attack(battleInstance) {
    
    const turnPreference = battleInstance.turn
    turnPreference === 1
        ? playerAdvantage(battleInstance)
        : enemieAdvantage(battleInstance)
}

/**
 * @param {Battle} battleInstance
 */
function playerAdvantage(battleInstance) {

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance
    
    let feedBackMessage = ''

    //Player Turn ========================================
    feedBackMessage += attackAttempt(battleInstance, {
        attacker: playerInstance,
        defensor: enemieInstance
    })

    if(!enemieInstance.isAlive) {
        playerWon(battleInstance, feedBackMessage)
        return   
    }

    feedBackMessage += 'e '
    
    //Enemie Turn ========================================
    feedBackMessage += attackAttempt(battleInstance, {
        attacker: enemieInstance,
        defensor: playerInstance
    }) 

    if(!playerInstance.isAlive) {
        playerDied(battleInstance, feedBackMessage)
        return
    }

    //End turn message ===================================
    sendMessage_UI_Battle(battleInstance, feedBackMessage)
}

/**
 * @param {Battle} battleInstance
 */
function enemieAdvantage(battleInstance) {

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance

    let feedBackMessage = ''

    //Enemie Turn ========================================
    feedBackMessage += attackAttempt(battleInstance, {
        attacker: enemieInstance,
        defensor: playerInstance
    })

    if(!playerInstance.isAlive) {
        playerDied(battleInstance, feedBackMessage)
        return
    }

    feedBackMessage += 'e '

    //Player Turn ========================================
    feedBackMessage += attackAttempt(battleInstance, {
        attacker: playerInstance,
        defensor: enemieInstance
    }, feedBackMessage)
    
    if(!enemieInstance.isAlive) {
        playerWon(battleInstance, feedBackMessage)
        return   
    }
    
    //End turn message ===================================
    sendMessage_UI_Battle(battleInstance, feedBackMessage)
}

/**
 * @param {Battle} battleInstance
 * @param {object} o
 * @param {Player | Enemie} o.attacker
 * @param {Player | Enemie} o.defensor
 * @returns {string} action feedback message
 */
function attackAttempt(battleInstance, o) {

    const { attacker, defensor } = o
    let message = ''
    
    //Dodge Phase =========================================================
    if(didDodge(battleInstance, {
        attacker: attacker,
        defensor: defensor
    })) {

        attacker instanceof Player
            ? message = `${message} Você errou o ataque. `
            : message = `${message} ${attacker.name} errou o ataque. `
        //

        return message
    }

    //Damage Phase ========================================================
    const rawDamage = battleInstance.calculateRawDamage({
        attacker: attacker,
        defender: defensor
    })

    defensor.inflictDamage(rawDamage)

    attacker instanceof Player
        ? message = `${message} ${defensor.name} sofreu ${rawDamage} de dano. `
        : message = `${message} você sofreu ${rawDamage} de dano. `
    //
    
    return message
}

/**
 * @param {Battle} battleInstance
 * @param {object} o
 * @param {Player | Enemie} o.attacker
 * @param {Player | Enemie} o.defensor
 */
function didDodge(battleInstance, o) {

    const { attacker, defensor } = o

    return battleInstance.evasionEvent({
        from: defensor,
        against: attacker,
        evasionWeight: 1
    })
}

/**
 * @param {Battle} battleInstance
 * @param {string} FINAL_MESSAGE
 */
function playerWon(battleInstance, FINAL_MESSAGE) {

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance
    playerInstance.secondaryState = PLAYER_STATES.EXPLORING.SECONDARY.IDLE

    FINAL_MESSAGE = `VOCÊ GANHOU!! e recebeu ${enemieInstance.souls} almas. últimos momentos: ${FINAL_MESSAGE}`
    sendMessage_UI_Idle(playerInstance, FINAL_MESSAGE)

    battleInstance.calculateRewards()
    Battle.deleteBattle(playerInstance.name)
}

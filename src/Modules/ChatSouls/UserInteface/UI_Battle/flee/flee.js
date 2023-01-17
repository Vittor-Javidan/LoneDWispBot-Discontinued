import Battle from "../../../Classes/Battle"
import PLAYER_STATES from "../../../Classes/EntityChilds/PLAYER_STATES"
import { sendMessage_UI_FirePit } from "../../sendMessage_Customized/sendMessage_UI_firePit"
import { sendMessage_UI_Idle } from "../../sendMessage_Customized/sendMessage_UI_Idle"
import sendMessage_UI_Battle from "../sendMessage_UI_Battle"

/**
 * @param {Battle} battleInstance 
 */
export default function flee(battleInstance) {
    
    if(didFlee(battleInstance)) {
        return
    }
    
    const damageFeedback = damageFeedBackAttackPhase(battleInstance)
    
    if(didPlayerDied(battleInstance, damageFeedback)) {
        return
    }
    
    sendMessage_UI_Battle(battleInstance, `sua fuga falhou! ${damageFeedback}`)
}

/**
 * @param {Battle} battleInstance 
 * @returns {boolean} `True` if success, `False` otherwise
 */
function didPlayerDied(battleInstance, attackPhaseMessage) {

    const playerInstance = battleInstance.playerInstance
    const isPlayerAlive = playerInstance.isAlive

    if(isPlayerAlive){
        return false 
    }
    
    playerInstance.currentState = {
        primary: PLAYER_STATES.FIRE_PIT.PRIMARY,
        secondary: PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT
    }
    playerInstance.souls = 0
    playerInstance.recoverHP()
    playerInstance.ressurrect()
    playerInstance.save()
    Battle.deleteBattle(playerInstance.getName())
    sendMessage_UI_FirePit(playerInstance, `sua fuga falhou e você morreu! ${attackPhaseMessage}`)
    
    return true
}

/**
 * @param {Battle} battleInstance 
 * @returns {boolean} `True` if success, `False` otherwise
 */
function didFlee(battleInstance) {

    const succed = battleInstance.fleePvE()
    
    if(!succed) {
        return false
    }
    
    const playerInstance = battleInstance.playerInstance
    Battle.deleteBattle(playerInstance.getName())
    playerInstance.secondaryState = PLAYER_STATES.EXPLORING.SECONDARY.IDLE
    sendMessage_UI_Idle(playerInstance,`Fuga bem sucedida!`)
    return true
}

/**
 * @param {Battle} battleInstance 
 * @returns {string} message with a damage feedback
 */
function damageFeedBackAttackPhase(battleInstance){

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance

    const didEvade = battleInstance.evasionEvent({
        from: playerInstance,
        against: enemieInstance,
        evasionWeight: 2
    })

    //If attack dodge
    if(didEvade) {
        return `${enemieInstance.getName()} errou o ataque.`
    }

    //If not
    const rawDamage = battleInstance.calculateRawDamage({
        attacker: battleInstance.enemieInstance, 
        defender: battleInstance.playerInstance
    })
    playerInstance.inflictDamage(rawDamage)
    return `${playerInstance.getName()} Dano sofrido ${rawDamage}.`
}
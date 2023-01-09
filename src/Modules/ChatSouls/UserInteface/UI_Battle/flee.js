import Battle from "../../Classes/Battle"
import PLAYER_STATES from "../../Classes/EntityChilds/PLAYER_STATES"
import { sendMessage_UI_Battle } from "../sendMessage_Customized/sendMessage_UI_Battle"
import { sendMessage_UI_FirePit } from "../sendMessage_Customized/sendMessage_UI_firePit"
import { sendMessage_UI_Idle } from "../sendMessage_Customized/sendMessage_UI_Idle"

/**
 * @param {Battle} battleInstance 
 */
export default function flee(battleInstance) {
    
    if(didFlee(battleInstance)) {
        console.log('Fuga bem sucedida')
        return
    }
    
    const damageFeedback = damageFeedBackAttackPhase(battleInstance)
    
    if(didPlayerDied(battleInstance, damageFeedback)) {
        console.log('Morte')
        return
    }
    console.log('Fuga falhou')
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
    Battle.deleteBattle(playerInstance.name)
    sendMessage_UI_FirePit(playerInstance, `sua fuga falhou e você morreu! ${attackPhaseMessage}`)
    
    return true
}

/**
 * @param {Battle} battleInstance 
 * @returns {boolean} `True` if success, `False` otherwise
 */
function didFlee(battleInstance) {

    const succed = battleInstance.fleePvE()

    console.log(succed)
    
    if(!succed) {
        console.log('Passou aqui')
        return false
    }
    
    const playerInstance = battleInstance.playerInstance
    Battle.deleteBattle(playerInstance.name)
    playerInstance.secondaryState = PLAYER_STATES.EXPLORING.SECONDARY.IDLE
    sendMessage_UI_Idle(playerInstance,`Fuga bem sucedida!`)
    console.log('Passou aqui 2')
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
        return `${enemieInstance.name} errou o ataque.`
    }

    //If not
    const rawDamage = battleInstance.calculateRawDamage({
        attacker: battleInstance.enemieInstance, 
        defender: battleInstance.playerInstance
    })
    playerInstance.inflictDamage(rawDamage)
    return `${playerInstance.name} Dano sofrido ${rawDamage}.`
}
import Battle from "../../Classes/Battle";
import Enemie from "../../Classes/EntityChilds/Enemie";
import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Classes/EntityChilds/PLAYER_STATES";
import { sendMessage_UI_Battle } from "../sendMessage_Customized/sendMessage_UI_Battle";
import { sendMessage_UI_FirePit } from "../sendMessage_Customized/sendMessage_UI_firePit";
import { sendMessage_UI_Idle } from "../sendMessage_Customized/sendMessage_UI_Idle";

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
    
    let FINAL_MESSAGE = ''

    FINAL_MESSAGE += action(battleInstance, {
        attacker: playerInstance,
        defensor: enemieInstance
    })
    if(!enemieInstance.isAlive) {
        playerWon(battleInstance, FINAL_MESSAGE)
        return   
    }
    
    FINAL_MESSAGE += action(battleInstance, {
        attacker: enemieInstance,
        defensor: playerInstance
    }) 
    if(!playerInstance.isAlive) {
        playerDied(battleInstance, FINAL_MESSAGE)
        return
    }

    sendMessage_UI_Battle(battleInstance, FINAL_MESSAGE)
}

/**
 * @param {Battle} battleInstance
 */
function enemieAdvantage(battleInstance) {

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance

    let FINAL_MESSAGE = ''

    FINAL_MESSAGE += action(battleInstance, {
        attacker: enemieInstance,
        defensor: playerInstance
    })
    if(!playerInstance.isAlive) {
        playerDied(battleInstance, FINAL_MESSAGE)
        return
    }

    FINAL_MESSAGE += 'e '

    FINAL_MESSAGE += action(battleInstance, {
        attacker: playerInstance,
        defensor: enemieInstance
    }, FINAL_MESSAGE)
    if(!enemieInstance.isAlive) {
        playerWon(battleInstance, FINAL_MESSAGE)
        return   
    }
    
    sendMessage_UI_Battle(battleInstance, FINAL_MESSAGE)
}

/**
 * @param {Battle} battleInstance
 * @param {object} o
 * @param {Player | Enemie} o.attacker
 * @param {Player | Enemie} o.defensor
 */
function action(battleInstance, o) {

    const { attacker, defensor } = o
    let FINAL_MESSAGE = ''
    
    if(didDodge(battleInstance, {
        attacker: attacker,
        defensor: defensor
    })) {
        attacker instanceof Player
            ? FINAL_MESSAGE = `${FINAL_MESSAGE} Você errou o ataque. `
            : FINAL_MESSAGE = `${FINAL_MESSAGE} ${attacker.name} errou o ataque. `
        return FINAL_MESSAGE
    }

    const rawDamage = battleInstance.calculateRawDamage({
        attacker: attacker,
        defender: defensor
    })
    defensor.inflictDamage(rawDamage)
    attacker instanceof Player
        ? FINAL_MESSAGE = `${FINAL_MESSAGE} ${defensor.name} sofreu ${rawDamage} de dano. `
        : FINAL_MESSAGE = `${FINAL_MESSAGE} você sofreu ${rawDamage} de dano. `
    return FINAL_MESSAGE
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

/**
 * @param {Battle} battleInstance
 */
function playerDied(battleInstance, FINAL_MESSAGE) {

    const playerInstance = battleInstance.playerInstance
    playerInstance.currentState = {
        primary: PLAYER_STATES.FIRE_PIT.PRIMARY,
        secondary: PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT
    }

    FINAL_MESSAGE = `
        VOCÊ MORREU!! e ${playerInstance.souls} almas foram perdidas. 
        últimos momentos: ${FINAL_MESSAGE}.
        Você voltou a fogueira
    `
    sendMessage_UI_FirePit(playerInstance, FINAL_MESSAGE)
    
    playerInstance.souls = 0
    playerInstance.recoverHP()
    playerInstance.ressurrect()
    playerInstance.save()
    Battle.deleteBattle(playerInstance.name)
}
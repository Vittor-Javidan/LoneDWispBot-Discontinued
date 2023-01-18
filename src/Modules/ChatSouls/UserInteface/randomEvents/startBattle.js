import Battle from "../../Classes/Battle";
import Enemie from "../../Classes/EntityChilds/Enemie";
import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Classes/EntityChilds/PLAYER_STATES";
import sendMessage_UI_Battle from "../UI_Battle/sendMessage_UI_Battle";

/**
 * @param {Player} playerInstance 
 */
export default function startBattle(playerInstance) {

    //Battle initialization
    const enemie = Enemie.instantiateRandomEnemie(playerInstance)
    Battle.startBattle(playerInstance, enemie)
    const battleInstance = Battle.getBattle(playerInstance.getName())
    playerInstance.secondaryState = PLAYER_STATES.EXPLORING.SECONDARY.HUNTING

    //Player feedback
    const enemieInstance = battleInstance.enemieInstance
    const emoji = `SMOrc`

    let message = `${emoji} Você encontrou um ${enemieInstance.getName()} `
    message += whosTurnString(battleInstance)
    
    sendMessage_UI_Battle(battleInstance, message)
}

/**
 * Return a string of who has the first turn
 * @param {Battle} battleInstance 
 * @returns 
 */
export function whosTurnString(battleInstance) {
    const turn = battleInstance.turn
    let message = ""
    turn === 1
        ? message += `e você tem a vantagem de ataque `
        : message += `e ele tem a vantagem de ataque `
    return message
}
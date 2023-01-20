import Battle from "../../../Classes/Battle"
import Player from "../../../Classes/EntityChilds/Player"
import PLAYER_STATES from "../../../Globals/PLAYER_STATES"
import { sendMessage_UI_Idle } from "../../sendMessage_Customized/sendMessage_UI_Idle"

/**
 * @param {Battle} battleInstance 
 * @param {Object} o
 * @param {number} o.evasionWeight
 * @param {Player} o.coward
 * @returns {boolean} `True` if success, `False` otherwise
 */
export default function fleeAttempt(battleInstance, o) {

    const { evasionWeight, coward } = o
    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance
    
    if(!battleInstance.evasionEvent({
        from: playerInstance,
        against: enemieInstance,
        evasionWeight: evasionWeight
    })) return false

    Battle.deleteBattle(coward.getName())
    coward.setCurrentState({
        primary: PLAYER_STATES.EXPLORING.PRIMARY,
        secondary: PLAYER_STATES.EXPLORING.SECONDARY.IDLE
    })

    const emoji = `SirSad`

    sendMessage_UI_Idle(coward,`${emoji} Fuga bem sucedida!`)
    
    return true
}
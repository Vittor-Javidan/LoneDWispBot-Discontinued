import Battle from "../../../Classes/Battle"
import PLAYER_STATES from "../../../Classes/EntityChilds/PLAYER_STATES"
import { sendMessage_UI_Idle } from "../../sendMessage_Customized/sendMessage_UI_Idle"

/**
 * @param {Battle} battleInstance
 * @param {string} FINAL_MESSAGE
 */
export default function playerWon(battleInstance, FINAL_MESSAGE) {

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance
    const souls = enemieInstance.getSouls()
    
    FINAL_MESSAGE = `VOCÊ GANHOU!! e recebeu ${souls} almas. últimos momentos: ${FINAL_MESSAGE}`
    sendMessage_UI_Idle(playerInstance, FINAL_MESSAGE)
    
    playerInstance.secondaryState = PLAYER_STATES.EXPLORING.SECONDARY.IDLE
    battleInstance.calculateRewards()
    Battle.deleteBattle(playerInstance.getName())
}
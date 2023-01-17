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
    playerInstance.secondaryState = PLAYER_STATES.EXPLORING.SECONDARY.IDLE

    FINAL_MESSAGE = `VOCÊ GANHOU!! e recebeu ${enemieInstance.souls} almas. últimos momentos: ${FINAL_MESSAGE}`
    sendMessage_UI_Idle(playerInstance, FINAL_MESSAGE)

    battleInstance.calculateRewards()
    Battle.deleteBattle(playerInstance.getName())
}
import Player from "../../Classes/EntityChilds/Player"
import PLAYER_STATES from "../../Globals/PLAYER_STATES"
import { sendMessage_UI_Idle } from "../../UserInteface/sendMessage_Customized/sendMessage_UI_Idle"

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export default function to_Explore(playerInstance, menuMessage) {
    playerInstance.setCurrentState({
        primary: PLAYER_STATES.EXPLORING.PRIMARY,
        secondary: PLAYER_STATES.EXPLORING.SECONDARY.IDLE
    })
    sendMessage_UI_Idle(playerInstance, menuMessage)
}
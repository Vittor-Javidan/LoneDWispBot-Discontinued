import Player from "../../Classes/EntityChilds/Player"
import PLAYER_STATES from "../../Globals/PLAYER_STATES"
import { sendMessage_UI_FirePit } from "../../UserInteface/sendMessage_Customized/sendMessage_UI_firePit"

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export default function to_FirePit(playerInstance, menuMessage) {
    
    playerInstance.setCurrentState({
        primary: PLAYER_STATES.FIRE_PIT.PRIMARY,
        secondary: PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT
    })

    playerInstance.recoverHP()

    sendMessage_UI_FirePit(playerInstance, menuMessage)
}
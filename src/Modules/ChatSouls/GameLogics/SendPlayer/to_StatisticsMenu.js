import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Globals/PLAYER_STATES";

import { sendMessage_UI_StatisticsMenu } from "../../UserInteface/sendMessage_Customized/sendMessage_UI_StatisticsMenu";

/**
 * Handles State Change Process to Stats Menu.
 *  
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export default function to_StatisticsMenu(playerInstance, menuMessage) {
    
    playerInstance.setSecondaryState(PLAYER_STATES.FIRE_PIT.SECONDARY.STATS_MENU)
    sendMessage_UI_StatisticsMenu(playerInstance, menuMessage)
}
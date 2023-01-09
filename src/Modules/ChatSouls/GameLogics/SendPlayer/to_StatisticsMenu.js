import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Classes/EntityChilds/PLAYER_STATES";

import { sendMessage_UI_StatisticsMenu } from "../../UserInteface/sendMessage_Customized/sendMessage_UI_StatisticsMenu";

/**
 * Handles State Change Process to Stats Menu.
 *  
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 * @param {string} menuMessage
 */
export default function to_StatisticsMenu(playerInstance, menuMessage) {
    playerInstance.secondaryState = PLAYER_STATES.FIRE_PIT.SECONDARY.STATS_MENU
    sendMessage_UI_StatisticsMenu(playerInstance, menuMessage)
}
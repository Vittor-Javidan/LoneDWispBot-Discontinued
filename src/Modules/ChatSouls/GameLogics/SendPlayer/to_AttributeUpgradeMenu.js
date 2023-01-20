import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Globals/PLAYER_STATES";
import { sendMessage_UI_AttributeUpgradeMenu } from "../../UserInteface/sendMessage_Customized/sendMessage_UI_AttributeUpgradeMenu";


/**
 * Handles State Change Process to Attribute Upgrade menu.
 * 
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export default function to_AttributeUpgradeMenu(playerInstance, menuMessage) {

    playerInstance.setSecondaryState(PLAYER_STATES.FIRE_PIT.SECONDARY.ATRIBUTE_UPGRADE)
    sendMessage_UI_AttributeUpgradeMenu(playerInstance, menuMessage)
}
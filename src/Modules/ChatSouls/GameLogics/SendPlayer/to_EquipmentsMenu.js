import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Globals/PLAYER_STATES";
import { sendMessage_UI_EquipmentsMenu } from "../../UserInteface/sendMessage_Customized/sendMessage_UI_EquipmentsMenu";

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export default function to_EquipmentsMenu(playerInstance, menuMessage) {
    playerInstance.secondaryState = PLAYER_STATES.FIRE_PIT.SECONDARY.EQUIPMENT
    sendMessage_UI_EquipmentsMenu(playerInstance, menuMessage)
}
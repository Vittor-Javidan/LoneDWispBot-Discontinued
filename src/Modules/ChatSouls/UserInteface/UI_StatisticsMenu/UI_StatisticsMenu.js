import Player from "../../Classes/EntityChilds/Player";
import consultAttributes from "../../GameLogics/checkAttributes";
import to_AttributeUpgradeMenu from "../../GameLogics/SendPlayer/to_AttributeUpgradeMenu";
import to_FirePit from "../../GameLogics/SendPlayer/to_FirePit";
import { sendMessage_UI_StatisticsMenu } from "../sendMessage_Customized/sendMessage_UI_StatisticsMenu";

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "STATS_MENU"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 * @returns {string} Status response
 */
export default function UI_StatisticsMenu(data) {

    const commandWord = data.message.split(" ")[0]
    const playerInstance = data.playerInstance

	if (commandWord === '!cs') {
        sendMessage_UI_StatisticsMenu(playerInstance, `Você está no menu de estatísticas`); return
    }

    const commandCode = Number(commandWord)
    switch (commandCode) {

        case 0: to_FirePit(playerInstance,                  `Você voltou a fogueira`)                       ;break
        case 1: consultAttributes(data,                     `Você ainda está no menu de estatísticas`)      ;break
        case 2: to_AttributeUpgradeMenu(playerInstance,     `Você está no menu de melhoria de attributos`)  ;break
        
        default: sendMessage_UI_StatisticsMenu(playerInstance, `Código inválido`);                          ;break
    }
}

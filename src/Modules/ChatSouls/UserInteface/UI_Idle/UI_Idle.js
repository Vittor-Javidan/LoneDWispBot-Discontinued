import Player from "../../Classes/EntityChilds/Player";
import to_FirePit from "../../GameLogics/SendPlayer/to_FirePit";
import { sendMessage_UI_Idle } from "../sendMessage_Customized/sendMessage_UI_Idle";
import { explorationEvent } from "./explorationEvent";

/**
 * Handle !cs play commands when the player has a primary state of "EXPLORING" and secondary state of "IDLE"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function UI_Idle(data) {

    const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance

    if (commandWord === '!cs') {
        sendMessage_UI_Idle(playerInstance, `Você se está planejando seu próximo passo`)
		return
	}

    const commandCode = Number(commandWord)
    switch (commandCode) {

        case 0: to_FirePit(playerInstance, `Você montou uma fogueira`)  ;break
        case 1: explorationEvent(playerInstance)                        ;break
    }
}

import Battle from "../../Classes/Battle";
import Player from "../../Classes/EntityChilds/Player";
import { sendMessage_UI_Battle } from "../sendMessage_Customized/sendMessage_UI_Battle";
import attack from "./attack";
import flee from "./flee";

/**
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function UI_Battle(data) {

    const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance
    const battleInstance = Battle.getBattle(playerInstance.name)

    if (commandWord === '!cs') {
        sendMessage_UI_Battle(battleInstance, `Você está em batalha!!!`)
		return
	}

	const commandCode = Number(commandWord)
	switch (commandCode) {

		case 0: flee(battleInstance)	;break
		case 1: attack(battleInstance)	;break

		default: sendMessage_UI_Battle(battleInstance,`opção inválida`)	;break
	}
}
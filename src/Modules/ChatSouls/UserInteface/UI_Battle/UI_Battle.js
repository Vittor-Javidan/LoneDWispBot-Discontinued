import Battle from "../../Classes/Battle";
import Player from "../../Classes/EntityChilds/Player";
import attack from "./attack/attack";
import flee from "./flee/flee";
import sendMessage_UI_Battle from "./sendMessage_UI_Battle";

/**
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 * @param {Object} options
 * @param {number} options.fleeWeight
 * @param {number} options.dodgeWeight
 */
export default function UI_Battle(data, options) {

    const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance
    const battleInstance = Battle.getBattle(playerInstance.getName())

    if (commandWord === '!cs') {
        sendMessage_UI_Battle(battleInstance, `Você está em batalha!!!`)
		return
	}

	const commandCode = Number(commandWord)
	switch (commandCode) {

		case 0: flee(battleInstance, options)	;break
		case 1: attack(battleInstance)	;break

		default: sendMessage_UI_Battle(battleInstance,`opção inválida`)	;break
	}
}
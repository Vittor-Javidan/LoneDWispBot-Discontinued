import Player from "../../Classes/EntityChilds/Player"
import to_EquipmentsMenu from "../../GameLogics/SendPlayer/to_EquipmentsMenu"
import to_Explore from "../../GameLogics/SendPlayer/to_Explore"
import to_StatisticsMenu from "../../GameLogics/SendPlayer/to_StatisticsMenu"
import { sendMessage_UI_FirePit } from "../sendMessage_Customized/sendMessage_UI_firePit"

/**
 * Handle commands when the player has a primary state of "FIRE_PIT" and secondary state of "RESTING_ON_FIRE_PIT"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 * @returns {string} Status response
 */
export default function UI_firePit(data) {

	const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance

	if (commandWord === '!cs') {
		sendMessage_UI_FirePit(playerInstance, `Você está na fogueira`);
		return
	}

	const commandCode = Number(commandWord)

	switch (commandCode) {

		case 0: to_Explore(playerInstance,			`Você se levanta da fogueira e olha em volta`);		;break
		case 1: to_StatisticsMenu(playerInstance, 	`Você está no menu de estatísticas`)   				;break
		case 2: to_EquipmentsMenu(playerInstance,	`Você entrou no menu de equipamentos`)  			;break
		
		default: sendMessage_UI_FirePit(playerInstance, `Código Inválido`)								;break
	}
}

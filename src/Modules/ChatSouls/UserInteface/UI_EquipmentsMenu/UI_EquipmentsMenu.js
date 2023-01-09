import Player from "../../Classes/EntityChilds/Player"
import checkCurrentEquipments from "../../GameLogics/checkCurrentEquipments"
import {
	to_BodyArmorMenu,
	to_BootsMenu,
	to_GlovesMenu,
	to_HelmetMenu,
	to_LongRangeMenu,
	to_MeleeMenu
} from "../../GameLogics/SendPlayer/to_EquipmentTypeMenu"
import to_FirePit from "../../GameLogics/SendPlayer/to_FirePit"
import { sendMessage_UI_EquipmentsMenu } from "../sendMessage_Customized/sendMessage_UI_EquipmentsMenu"

/**
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function UI_Equipments_Menu(data) {

	const commandWord = data.message.split(" ")[0]
	const playerInstance = data.playerInstance

	if (commandWord === '!cs') {
		sendMessage_UI_EquipmentsMenu(data.playerInstance, `Você está no menu de quipamentos`)
        return
    }

	const commandCode = Number(commandWord)
	switch (commandCode) {

		case 0: to_FirePit(playerInstance,              `Você voltou para fogueira`)                ;break
        case 1: to_MeleeMenu(playerInstance,    		`Você está no menu de arma corpo a corpo`)	;break
        case 2: to_LongRangeMenu(playerInstance,    	`Você está no menu de armas longo alcance`) ;break
        case 3: to_HelmetMenu(playerInstance,    		`Você está no menu de capacetes`)			;break
        case 4: to_BodyArmorMenu(playerInstance,    	`Você está no menu de armaduras`)			;break
        case 5: to_GlovesMenu(playerInstance,			`Você está no menu de luvas`)				;break
        case 6: to_BootsMenu(playerInstance,    		`Você está no menu de botas`)				;break
		case 7: checkCurrentEquipments(data,            `Você ainda está no menu de quipamentos`)   ;break

		default: sendMessage_UI_EquipmentsMenu(playerInstance, `Código inválido`)
	}
}
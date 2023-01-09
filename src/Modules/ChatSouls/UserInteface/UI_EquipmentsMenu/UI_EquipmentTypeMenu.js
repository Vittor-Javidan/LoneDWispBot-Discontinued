import Player from "../../Classes/EntityChilds/Player"
import checkEquipmentDetais from "../../GameLogics/checkEquipmentDetais"
import to_EquipmentsMenu from "../../GameLogics/SendPlayer/to_EquipmentsMenu"
import to_EquipmentTypeInventoryMenu from "../../GameLogics/SendPlayer/to_EquipmentTypeInventoryMenu"
import unequip from "../../GameLogics/unequip"
import { sendMessage_UI_EquipmentTypeMenu } from "../sendMessage_Customized/sendMessage_UI_EquipmentTypeMenu"

/**
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function UI_EquipmentTypeMenu(data) {
   
    const words = data.message.split(" ")
	const playerInstance = data.playerInstance

	if (words[0] === '!cs') {
        sendMessage_UI_EquipmentTypeMenu(playerInstance, 'Você está no menu de capacetes')
        return
    }

	let itemCode = Number(words[0])
	switch (itemCode) {

		case 0: 	to_EquipmentsMenu(playerInstance, 				`Você voltou para o menu de equipamentos`)	;break
		case 1:		to_EquipmentTypeInventoryMenu(playerInstance, 	`Oque deseja equipar?`)						;break
		case 2: 	checkEquipmentDetais(playerInstance)														;break
		case 3: 	unequip(playerInstance)																		;break
		default:	sendMessage_UI_EquipmentTypeMenu(playerInstance,`Código inválido`)							;break
	}
}
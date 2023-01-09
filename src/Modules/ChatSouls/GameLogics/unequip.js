import Player from "../Classes/EntityChilds/Player"
import { getEquipmentTypeByPlayerState } from "../Classes/EntityChilds/PLAYER_STATES"
import EQUIPMENT_TYPES from "../Classes/EquipmentChilds/EQUIPMENT_TYPES"
import { sendMessage_UI_EquipmentTypeMenu } from "../UserInteface/sendMessage_Customized/sendMessage_UI_EquipmentTypeMenu"

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage
 */
export default function unequip(playerInstance) {

    const equipmentType = getEquipmentTypeByPlayerState(playerInstance)
    const currentEquipment = playerInstance.currentEquipment[equipmentType]
    const message = choseMessageByEquipmentType(equipmentType)

	if(!currentEquipment.name){
		sendMessage_UI_EquipmentTypeMenu(playerInstance, message.noEquipment)
		return
	}

	playerInstance.unequip(equipmentType)
	playerInstance.calculateStats()
    playerInstance.recoverHP()
	playerInstance.save()
	sendMessage_UI_EquipmentTypeMenu(playerInstance, 
        `${currentEquipment.name} ${message.withEquipment}`)
}

/**
 * @param {string} equipmentType
 * @returns {{
 *      noEquipment: string,
 *      withEquipment: string
 * }}
 */
export function choseMessageByEquipmentType(equipmentType) {

    let message = undefined
    switch(equipmentType) {

        case EQUIPMENT_TYPES.MELEE_WEAPON: message = {
            noEquipment: `você não possui nenhuma arma corpor a corpo equipada. Você ainda está no menu de arma corpo a corpo`,
            withEquipment: `desequipado. Você ainda está no menu de arma corpo a corpo`
        }; break

        case EQUIPMENT_TYPES.LONG_RANGE_WEAPON: message = {
            noEquipment: `você não possui nenhuma arma longo alcance equipada. Você ainda está no menu de arma longo alcance`,
            withEquipment: `desequipado. Você ainda está no menu de arma longo alcance`
        }; break

        case EQUIPMENT_TYPES.HELMET: message = {
            noEquipment: `você não possui nenhum capacete equipado. Você ainda está no menu de capacetes`,
            withEquipment: `desequipado. Você ainda está no menu de capacetes`
        }; break

        case EQUIPMENT_TYPES.BODY_ARMOR: message = {
            noEquipment: `você não possui nenhuma armadura equipada. Você ainda está no menu de armaduras`,
            withEquipment: `desequipado. Você ainda está no menu de armaduras`
        }; break

        case EQUIPMENT_TYPES.GLOVES: message = {
            noEquipment: `você não possui nenhuma luva equipada. Você ainda está no menu de luvas`,
            withEquipment: `desequipado. Você ainda está no menu de luvas`
        }; break

        case EQUIPMENT_TYPES.BOOTS: message = {
            noEquipment: `você não possui nenhuma bota equipada. Você ainda está no menu de botas`,
            withEquipment: `desequipado. Você ainda está no menu de botas`
        }; break

        default: throw Error(`ERROR: choseMessageByEquipmentType(): equipment type not recognized`)
    }

    return message
}
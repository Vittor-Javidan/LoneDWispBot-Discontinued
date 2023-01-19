import EQUIPMENT_TYPES from "../../Global/EQUIPMENT_TYPES";

/**
 * @param {string} equipmentType 
 * @returns {string}
 */
export default function returnMenuEquipmentMessageByType(equipmentType) {

    let message = undefined

    switch(equipmentType) {

        case EQUIPMENT_TYPES.MELEE_WEAPON:      message = `Você voltou ao menu de armas corpo a corpo` ;break
        case EQUIPMENT_TYPES.LONG_RANGE_WEAPON: message = `Você voltou ao menu de armas longo alcance` ;break
        case EQUIPMENT_TYPES.HELMET:            message = `Você voltou ao menu de capacetes`           ;break
        case EQUIPMENT_TYPES.BODY_ARMOR:        message = `Você voltou ao menu de armaduras`           ;break
        case EQUIPMENT_TYPES.GLOVES:            message = `Você voltou ao menu de luvas`               ;break
        case EQUIPMENT_TYPES.BOOTS:             message = `Você voltou ao menu de botas`               ;break

        default: throw Error(`ERROR: returnMenuMessageByType(): equipmentType not recognized`)
    }

    return message
}
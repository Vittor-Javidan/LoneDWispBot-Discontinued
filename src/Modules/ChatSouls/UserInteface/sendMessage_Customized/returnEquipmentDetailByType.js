import BodyArmor from "../../Classes/EquipmentChilds/BodyArmor";
import Boots from "../../Classes/EquipmentChilds/Boots";
import Gloves from "../../Classes/EquipmentChilds/Gloves";
import Helmet from "../../Classes/EquipmentChilds/Helmet";
import LongRangeWeapon from "../../Classes/EquipmentChilds/LongRangeWeapon";
import MeleeWeapon from "../../Classes/EquipmentChilds/MeleeWeapon";
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES";

/** See `Types.js` to understand the types
 * @typedef {import("../../TypeDefinitions/Types").CS_Equipment_WeaponData} CS_Equipment_WeaponData
 * @typedef {import("../../TypeDefinitions/Types").CS_Equipment_ArmorData} CS_Equipment_ArmorData
*/

/** 
 * @param {CS_Equipment_WeaponData | CS_Equipment_ArmorData} currentEquipment 
 * @param {string} equipmentType 
 * @returns 
 */
export default function returnEquipmentDetailByType(currentEquipment, equipmentType) {

    let detailsString = undefined

    switch(equipmentType) {
        case EQUIPMENT_TYPES.MELEE_WEAPON:      detailsString = new MeleeWeapon(currentEquipment).detailsString()       ;break
        case EQUIPMENT_TYPES.LONG_RANGE_WEAPON: detailsString = new LongRangeWeapon(currentEquipment).detailsString()   ;break
        case EQUIPMENT_TYPES.HELMET:            detailsString = new Helmet(currentEquipment).detailsString()            ;break
        case EQUIPMENT_TYPES.BODY_ARMOR:        detailsString = new BodyArmor(currentEquipment).detailsString()         ;break
        case EQUIPMENT_TYPES.GLOVES:            detailsString = new Gloves(currentEquipment).detailsString()            ;break
        case EQUIPMENT_TYPES.BOOTS:             detailsString = new Boots(currentEquipment).detailsString()             ;break

        default: throw Error(`ERROR: returnEquipmentDetailByType(): equipmentType not recognized`)
    }

    return detailsString
}
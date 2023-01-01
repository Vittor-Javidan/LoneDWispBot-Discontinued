import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

export default class LongRangeWeapon extends Equiment {

    /**
     * @type {Object<string, import("../../database/equipmentData").CS_Equipment_WeaponData>}
     */
    static database = equipmentDataBase.WEAPONS.LONG_RANGE

    /**
     * @param {import("../Player").CS_Player_EquippedData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!LongRangeWeapon.database[itemObject.name]) {
            throw new Error (`Weapon_LongRange ERROR: The long range weapon ${itemObject.name} doesn't exist`)
        }
        
        super(itemObject)
        super.multipliers = LongRangeWeapon.database[itemObject.name].DMG_MULTIPLIERS
        super.description = LongRangeWeapon.database[itemObject.name].DESCRIPTION
    }
}
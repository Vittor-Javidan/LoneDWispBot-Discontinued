import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

export default class MeleeWeapon extends Equiment {

    /**
     * @type {Object<string, import("../../database/equipmentData").CS_Equipment_WeaponData>}
     */
    static database = equipmentDataBase.WEAPONS.MELEE

    /**
     * @param {import("../Player").CS_EquipmentData} itemObject 
     * @constructor
     */ 
    constructor(itemObject) {

        if(!MeleeWeapon.database[itemObject.name]) {
            throw new Error (`Weapon_Melee ERROR: The melee weapon ${itemObject.name} doesn't exist`)
        }

        super(itemObject)
        super.multipliers = MeleeWeapon.database[itemObject.name].DMG_MULTIPLIERS
        super.description = MeleeWeapon.database[itemObject.name].DESCRIPTION
    }
}
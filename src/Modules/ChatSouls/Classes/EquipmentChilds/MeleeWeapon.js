import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData */

export default class MeleeWeapon extends Equiment {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_WeaponData>}
     */
    static database = equipmentDataBase.WEAPONS.MELEE

    /**
     * @param {CS_Equipment_WeaponData} itemObject
     * @constructor
     */ 
    constructor(itemObject) {

        if(!MeleeWeapon.database[itemObject.name]) {
            throw new Error (`Weapon_Melee ERROR: The melee weapon ${itemObject.name} doesn't exist`)
        }

        super(itemObject)
        super.multipliers = MeleeWeapon.database[itemObject.name].damage_multipliers
        super.description = MeleeWeapon.database[itemObject.name].description
    }
}
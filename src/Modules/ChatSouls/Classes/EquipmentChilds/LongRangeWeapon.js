import equipmentDataBase from "../../database/equipmentData"
import Weapon from "./Weapon"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData */

export default class LongRangeWeapon extends Weapon {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_WeaponData>}
     */
    static database = equipmentDataBase.WEAPONS.LONG_RANGE

    /**
     * @param {CS_Equipment_WeaponData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!LongRangeWeapon.database[itemObject.name]) {
            throw new Error (`Weapon_LongRange ERROR: The long range weapon ${itemObject.name} doesn't exist`)
        }
        
        super(itemObject)
        super.multipliers = LongRangeWeapon.database[itemObject.name].damage_multipliers
        super.description = LongRangeWeapon.database[itemObject.name].description
    }
}
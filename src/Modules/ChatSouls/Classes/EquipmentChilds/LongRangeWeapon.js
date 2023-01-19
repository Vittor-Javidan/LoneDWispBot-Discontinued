import { getAllEquipmentByType } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES"
import Weapon from "./Weapon"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData */

export default class LongRangeWeapon extends Weapon {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_WeaponData>}
     */
    static database = getAllEquipmentByType(EQUIPMENT_TYPES.LONG_RANGE_WEAPON)

    /**
     * @param {CS_Equipment_WeaponData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!LongRangeWeapon.database[itemObject.name]) {
            throw new Error (`Weapon_LongRange ERROR: The long range weapon ${itemObject.name} doesn't exist`)
        }
        
        const databaseObject = LongRangeWeapon.database[itemObject.name]
        super(true, databaseObject)
    }
}
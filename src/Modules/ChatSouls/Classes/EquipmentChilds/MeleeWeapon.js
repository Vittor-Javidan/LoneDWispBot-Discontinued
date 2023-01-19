import { getAllEquipmentByType } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES"
import Weapon from "./Weapon"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData */

export default class MeleeWeapon extends Weapon {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_WeaponData>}
     */
    static database = getAllEquipmentByType(EQUIPMENT_TYPES.MELEE_WEAPON)

    /**
     * @param {CS_Equipment_WeaponData} itemObject
     * @param {string} itemObject.name - item name
     * @constructor
     */ 
    constructor(itemObject) {

        if(!MeleeWeapon.database[itemObject.name]) {
            throw new Error (`Weapon_Melee ERROR: The melee weapon ${itemObject.name} doesn't exist`)
        }

        const databaseObject = MeleeWeapon.database[itemObject.name]
        super(true, databaseObject)
    }
}
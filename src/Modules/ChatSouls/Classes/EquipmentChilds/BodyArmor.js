import { getAllEquipmentByType } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES"
import Armor from "./Armor"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData */

export default class BodyArmor extends Armor {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_ArmorData>}
     */
    static database = getAllEquipmentByType(EQUIPMENT_TYPES.BODY_ARMOR)

    /**
     * @param {CS_Equipment_ArmorData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!BodyArmor.database[itemObject.name]) {
            throw new Error (`BodyArmor ERROR: The body armor ${itemObject.name} doesn't exist`)
        }
        
        const databaseObject = BodyArmor.database[itemObject.name]
        super(true, databaseObject)
    }
}
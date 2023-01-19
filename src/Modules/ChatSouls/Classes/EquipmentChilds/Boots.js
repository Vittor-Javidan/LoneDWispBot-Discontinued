import { getAllEquipmentByType } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES"
import Armor from "./Armor"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData */

export default class Boots extends Armor {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_ArmorData>}
     */
    static database = getAllEquipmentByType(EQUIPMENT_TYPES.BOOTS)

    /**
     * @param {CS_Equipment_ArmorData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!Boots.database[itemObject.name]) {
            throw new Error (`Boots ERROR: The Boots ${itemObject.name} doesn't exist`)
        }
        
        const databaseObject = Boots.database[itemObject.name]
        super(true, databaseObject)
    }
}
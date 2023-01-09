import { getAllEquipmentByType } from "../../database/equipmentData"
import Armor from "./Armor"
import EQUIPMENT_TYPES from "./EQUIPMENT_TYPES"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData */

export default class Gloves extends Armor {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_ArmorData>}
     */
    static database = getAllEquipmentByType(EQUIPMENT_TYPES.GLOVES)

    /**
     * @param {CS_Equipment_ArmorData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!Gloves.database[itemObject.name]) {
            throw new Error (`Gloves ERROR: The Gloves ${itemObject.name} doesn't exist`)
        }
        
        const databaseObject = Gloves.database[itemObject.name]
        super(true, databaseObject)
    }
}
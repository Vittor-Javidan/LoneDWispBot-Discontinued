import { getAllEquipmentByType } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES"
import Armor from "./Armor"

/** See `Types.js` to understand the types
 * @typedef {import('../../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData 
*/

export default class Helmet extends Armor {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_ArmorData>}
     */
    static database = getAllEquipmentByType(EQUIPMENT_TYPES.HELMET)

    /**
     * @param {CS_Equipment_ArmorData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!Helmet.database[itemObject.name]) {
            throw new Error (`Helmet ERROR: The Helmet ${itemObject.name} doesn't exist`)
        }
        
        const databaseObject = Helmet.database[itemObject.name]
        super(true, databaseObject)
    }
}
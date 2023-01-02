import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData */

export default class Gloves extends Equiment {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_ArmorData>}
     */
    static database = equipmentDataBase.ARMORS.GLOVES

    /**
     * @param {CS_Equipment_ArmorData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!Gloves.database[itemObject.name]) {
            throw new Error (`Gloves ERROR: The Gloves ${itemObject.name} doesn't exist`)
        }
        
        super(itemObject)
        super.multipliers = Gloves.database[itemObject.name].defense_multipliers
        super.description = Gloves.database[itemObject.name].description
    }
}
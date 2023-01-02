import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData */

export default class Boots extends Equiment {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_ArmorData>}
     */
    static database = equipmentDataBase.ARMORS.BOOTS

    /**
     * @param {CS_Equipment_ArmorData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!Boots.database[itemObject.name]) {
            throw new Error (`Boots ERROR: The Boots ${itemObject.name} doesn't exist`)
        }
        
        super(itemObject)
        super.multipliers = Boots.database[itemObject.name].defense_multipliers
        super.description = Boots.database[itemObject.name].description
    }
}
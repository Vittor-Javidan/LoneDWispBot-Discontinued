import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData */

export default class Helmet extends Equiment {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_ArmorData>}
     */
    static database = equipmentDataBase.ARMORS.HELMETS

    /**
     * @param {CS_Equipment_ArmorData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!Helmet.database[itemObject.name]) {
            throw new Error (`Helmet ERROR: The Helmet ${itemObject.name} doesn't exist`)
        }
        
        super(itemObject)
        super.multipliers = Helmet.database[itemObject.name].defense_multipliers
        super.description = Helmet.database[itemObject.name].description
    }
}
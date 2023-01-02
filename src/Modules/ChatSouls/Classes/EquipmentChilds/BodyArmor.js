import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData */

export default class BodyArmor extends Equiment {

    /**
     * -keys: `item name string`
     * @type {Object<string, CS_Equipment_ArmorData>}
     */
    static database = equipmentDataBase.ARMORS.BODY

    /**
     * @param {CS_Equipment_ArmorData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!BodyArmor.database[itemObject.name]) {
            throw new Error (`BodyArmor ERROR: The body armor ${itemObject.name} doesn't exist`)
        }
        
        super(itemObject)
        super.multipliers = BodyArmor.database[itemObject.name].defense_multipliers
        super.description = BodyArmor.database[itemObject.name].description
    }
}
import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

export default class Gloves extends Equiment {

    /**
     * @type {Object<string, import("../../database/equipmentData").CS_Equipment_ArmorData>}
     */
    static database = equipmentDataBase.ARMORS.GLOVES

    /**
     * @param {import("../Player").CS_Player_EquippedData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!Gloves.database[itemObject.name]) {
            throw new Error (`Gloves ERROR: The Gloves ${itemObject.name} doesn't exist`)
        }
        
        super(itemObject)
        super.multipliers = Gloves.database[itemObject.name].DEF_MULTIPLIERS
        super.description = Gloves.database[itemObject.name].DESCRIPTION
    }
}
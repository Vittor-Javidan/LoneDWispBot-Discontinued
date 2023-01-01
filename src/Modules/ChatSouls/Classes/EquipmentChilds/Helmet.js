import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

export default class Helmet extends Equiment {

    /**
     * @type {Object<string, import("../../database/equipmentData").CS_Equipment_ArmorData>}
     */
    static database = equipmentDataBase.ARMORS.HELMETS

    /**
     * @param {import("../Player").CS_Player_EquippedData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!Helmet.database[itemObject.name]) {
            throw new Error (`Helmet ERROR: The Helmet ${itemObject.name} doesn't exist`)
        }
        
        super(itemObject)
        super.multipliers = Helmet.database[itemObject.name].DEF_MULTIPLIERS
        super.description = Helmet.database[itemObject.name].DESCRIPTION
    }
}
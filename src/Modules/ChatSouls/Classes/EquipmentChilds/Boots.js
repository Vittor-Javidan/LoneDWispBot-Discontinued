import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

export default class Boots extends Equiment {

    /**
     * @type {Object<string, import("../../database/equipmentData").CS_Equipment_ArmorData>}
     */
    static database = equipmentDataBase.ARMORS.BOOTS

    /**
     * @param {import("../Player").CS_EquipmentData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!Boots.database[itemObject.name]) {
            throw new Error (`Boots ERROR: The Boots ${itemObject.name} doesn't exist`)
        }
        
        super(itemObject)
        super.multipliers = Boots.database[itemObject.name].DEF_MULTIPLIERS
        super.description = Boots.database[itemObject.name].DESCRIPTION
    }
}
import equipmentDataBase from "../../database/equipmentData"
import Equiment from "../Equipment"

export default class BodyArmor extends Equiment {

    /**
     * @type {Object<string, import("../../database/equipmentData").CS_Equipment_ArmorData>}
     */
    static database = equipmentDataBase.ARMORS.BODY

    /**
     * @param {import("../Player").CS_EquipmentData} itemObject 
     * @constructor
     */
    constructor(itemObject){

        if(!BodyArmor.database[itemObject.name]) {
            throw new Error (`BodyArmor ERROR: The body armor ${itemObject.name} doesn't exist`)
        }
        
        super(itemObject)
        super.multipliers = BodyArmor.database[itemObject.name].DEF_MULTIPLIERS
        super.description = BodyArmor.database[itemObject.name].DESCRIPTION
    }
}
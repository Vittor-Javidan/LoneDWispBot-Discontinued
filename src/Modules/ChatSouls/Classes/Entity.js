
/**
 * @typedef {import ('../TypeDefinitions/Types').CS_Database} CS_Database
 * @typedef {import ('../TypeDefinitions/Types').CS_EntityData} CS_EntityData
 * @typedef {import ('../TypeDefinitions/Types').CS_Attributes} CS_Attributes
 * @typedef {import ('../TypeDefinitions/Types').CS_Entity_Equipment} CS_Entity_Equipment
 * @typedef {import ('../TypeDefinitions/Types').CS_EquipmentData} CS_EquipmentData
 * @typedef {import ('../TypeDefinitions/Types').CS_Entity_Inventory} CS_Entity_Inventory
 * @typedef {import ('../TypeDefinitions/Types').CS_Inventory_Equipments} CS_Inventory_Equipments
 * @typedef {import ('../TypeDefinitions/Types').playerState} playerState
*/

export default class Entity {

    /**
     * @type {string}
     */
    name = ''

    /**
     * @type {number}
     */
    souls = 0

    /**
     * @type {number}
     */
    level = 1

    /**
     * @type {CS_Attributes} 
     */
    attributes = {}

    /**
     * @type {CS_Entity_Equipment}
     */
    equipment = {}

    /**
     * @type {CS_Entity_Inventory}
     */
    inventory = {
        equipments: {}
    }

    /**
     * Create a instance of Entity
     * @returns {Entity}
     * @constructor
     */
    constructor(name){
        this.name = name
        this.souls = 0
    }

    //=================================================================================================
    // INSTANCE METHODS ===============================================================================
    //=================================================================================================

    /**
     * Returns entity name
     * @returns {string}
     */
    getName(){
        return this.name
    }

    /**
     * Return entity level
     * @returns {number}
     */
    getLevel(){
        return this.level
    }

    /**
     * Returns entity souls amount
     * @returns {number}
     */
    getSouls(){
        return this.souls
    }

    /**
     * Return entity attributes
     * @returns {CS_Attributes} ATTRIBUTES ENUM to check the keys
     */
    getAttributes(){
        return this.attributes
    }

    /**
     * Returns the entity current equips
     * @returns {CS_Entity_Equipment}
     */
    getEquippedEquipment(){
        return this.equipment
    }

    /**
     * Unequip entity equipment by type
     * @param {string} EQUIPMENT_TYPE_ENUM - Type of selected equipment
     * @returns {void}
     */
    unequipEquipment(EQUIPMENT_TYPE_ENUM){

        const unequippedWeapon = this.equipment[EQUIPMENT_TYPE_ENUM]

        //If the specific equipment inventory type is not empty, just push. Create the specific equipments inventory type property otherwise
        if(!this.inventory.equipments[EQUIPMENT_TYPE_ENUM]) {
            this.inventory.equipments[EQUIPMENT_TYPE_ENUM] = [unequippedWeapon]
        } else {
            this.inventory.equipments[EQUIPMENT_TYPE_ENUM].push(unequippedWeapon)
        }
        //
        
        delete this.equipment[EQUIPMENT_TYPE_ENUM]
        
        this.inventory.equipments[EQUIPMENT_TYPE_ENUM].sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })
    }

    /**
     * Returns the equipment stored in entity inventory
     * @param {string} EQUIPMENT_TYPE_ENUM
     * @returns {CS_Inventory_Equipments | CS_EquipmentData[]} If the type is not specify, all equipment types will return.
     */
    getInvetoryEquipments(EQUIPMENT_TYPE_ENUM){

        if(EQUIPMENT_TYPE_ENUM) {
            return this.inventory.equipments[EQUIPMENT_TYPE_ENUM]
        }
        return this.inventory.equipments
    }

    /**
     * Return a string containing all equipment inside entity inventory.
     * Output example: `| 1. itemName_1 | 2. itemName_2 | ... | n. itemName_n |`
     * 
     * @param {string} EQUIPMENT_TYPE_ENUM
     * @returns {string | undefined} Returns `undefined` if iventory is empty.
     */
    getInventoryEquipmentsString(EQUIPMENT_TYPE_ENUM){

        let equipment = this.inventory.equipments[EQUIPMENT_TYPE_ENUM]
        if (!equipment) {
            return
        }

        //Build the weapon list string
        let equipmentListString = ''
        for(let i = 0; i < equipment.length; i++) {
            equipmentListString += `| ${i + 1}. ${equipment[i].name} `
        }
        return equipmentListString
    }

    /**
     * Equip a type of equipment from entity inventory
     * @param {string} EQUIPMENT_TYPE_ENUM
     * @param {number} itemCode
     * @returns {void}
     */
    setEquippedEquipment(itemCode, EQUIPMENT_TYPE_ENUM) {

        const itemIndex = itemCode - 1

        //`False` if there is no weapon equiped, `True` otherwise
        this.equipment[EQUIPMENT_TYPE_ENUM]
            ? this.equipment[EQUIPMENT_TYPE_ENUM] = this.replaceInventoryEquipment(itemIndex, this.equipment[EQUIPMENT_TYPE_ENUM], EQUIPMENT_TYPE_ENUM)
            : this.equipment[EQUIPMENT_TYPE_ENUM] = this.removeInventoryEquipment(itemIndex, EQUIPMENT_TYPE_ENUM)
        //
    }

    /**
     * Remove and return a equipment type from entity inventory using the indexArray
     * @param {number} itemIndex 
     * @param {string} EQUIPMENT_TYPE_ENUM - Type of selected equipment
     * @returns {CS_EquipmentData}
     */
    removeInventoryEquipment(itemIndex, EQUIPMENT_TYPE_ENUM){

        const itemRemoved = this.inventory.equipments[EQUIPMENT_TYPE_ENUM].splice(itemIndex, 1)
        if (this.inventory.equipments[EQUIPMENT_TYPE_ENUM].length === 0) {
            delete this.inventory.equipments[EQUIPMENT_TYPE_ENUM]
        }
        return itemRemoved[0]
    }

    /**
     * Remove and return a equipment type from entity invetory and replaces to another
     * @param {number} itemIndex 
     * @param {string} itemToReplace 
     * @param {string} type - Type of selected equipment
     */
    replaceInventoryEquipment(itemIndex, itemToReplace, type){

        const itemRemoved = this.inventory.equipments[type].splice(itemIndex, 1, itemToReplace)
        this.inventory.equipments[type].sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })
        return itemRemoved[0]
    }
}
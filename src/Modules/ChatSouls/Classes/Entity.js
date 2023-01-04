
/**
 * @typedef {import ('../TypeDefinitions/Types').CS_Database} CS_Database
 * @typedef {import ('../TypeDefinitions/Types').CS_EntityData} CS_EntityData
 * @typedef {import ('../TypeDefinitions/Types').CS_Attributes} CS_Attributes
 * @typedef {import ('../TypeDefinitions/Types').CS_Entity_Equipment} CS_Entity_Equipment
 * @typedef {import ('../TypeDefinitions/Types').CS_EquipmentData} CS_EquipmentData
 * @typedef {import ('../TypeDefinitions/Types').CS_Entity_Inventory} CS_Entity_Inventory
 * @typedef {import ('../TypeDefinitions/Types').CS_Inventory_Equipments} CS_Inventory_Equipments
 * @typedef {import ('../TypeDefinitions/Types').playerState} playerState
 * @typedef {import ('../TypeDefinitions/Types').CS_Stats} CS_Stats
 * @typedef {import ('../TypeDefinitions/Types').CS_ResourceData} CS_ResourceData
*/

import ENUM from './ENUM'
import Equipment from './Equipment'
import Armor from './EquipmentChilds/Armor'
import BodyArmor from './EquipmentChilds/BodyArmor'
import Boots from './EquipmentChilds/Boots'
import Gloves from './EquipmentChilds/Gloves'
import Helmet from './EquipmentChilds/Helmet'
import LongRangeWeapon from './EquipmentChilds/LongRangeWeapon'
import MeleeWeapon from './EquipmentChilds/MeleeWeapon'
import Weapon from './EquipmentChilds/Weapon'

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
     * @type {CS_Attributes} - Keys: `ATTRIBUTE_TYPE ENUM`
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
     * @type {CS_Stats}
     */
    stats

    /**
     * @type {number}
     */
    currentHP

    /**
     * @type {boolean}
     */
    isAlive = true

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
     * Adds souls to entity souls
     * @param {number} value 
     */
    addSouls(value){
        this.souls += value
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

    /**
     * @param {string} STATS_TYPE_ENUM
     * @returns {Object<string, number> | number} Returns the value directly if the ENUM is specify, otherwise it returns the whole stats object
     */
    getStats(STATS_TYPE_ENUM){
        if(STATS_TYPE_ENUM) {
            return this.stats[STATS_TYPE_ENUM]
        }
        return this.stats
    }

    /**
     * Heavy processing. Calculate only when its really needed. Like before battles or during summary consulting.
     * @returns {void}
     */
    calculateStats() {
        
        let statsFromEquips = {
            [ENUM.STATS_TYPES.HP]: 0,
            [ENUM.STATS_TYPES.EVASION]: 0,
            [ENUM.STATS_TYPES.FISICAL_DMG]: 0,
            [ENUM.STATS_TYPES.FISICAL_DEF]: 0,
            [ENUM.STATS_TYPES.MAGICAL_DMG]: 0,
            [ENUM.STATS_TYPES.MAGICAL_DMG]: 0,
        }
            
        //Sum `statsFromEquips``the stats given by equipment multipliers
        const data = {
            equipment: this.equipment,
            attributes: this.attributes,
        }
        bonusFromEquippment(MeleeWeapon, ENUM.EQUIPMENT_TYPES.MELEE_WEAPON, data)
        bonusFromEquippment(LongRangeWeapon, ENUM.EQUIPMENT_TYPES.LONG_RANGE_WEAPON, data)
        bonusFromEquippment(Helmet, ENUM.EQUIPMENT_TYPES.HELMET, data)
        bonusFromEquippment(BodyArmor, ENUM.EQUIPMENT_TYPES.BODY_ARMOR, data)
        bonusFromEquippment(Gloves, ENUM.EQUIPMENT_TYPES.GLOVES, data)
        bonusFromEquippment(Boots, ENUM.EQUIPMENT_TYPES.BOOTS, data)
        
        //Sum base stats + stats from equipments
        this.stats = {
            [ENUM.STATS_TYPES.HP]: (this.attributes[ENUM.ATTRIBUTES.VITALITY] + statsFromEquips[ENUM.STATS_TYPES.HP]) * 10, 
            [ENUM.STATS_TYPES.EVASION]: (this.attributes[ENUM.ATTRIBUTES.AGILITY] + statsFromEquips[ENUM.STATS_TYPES.EVASION]) * 1,
            [ENUM.STATS_TYPES.FISICAL_DMG]: (this.attributes[ENUM.ATTRIBUTES.STRENGHT] + statsFromEquips[ENUM.STATS_TYPES.FISICAL_DMG]) * 5,
            [ENUM.STATS_TYPES.FISICAL_DEF]: (this.attributes[ENUM.ATTRIBUTES.STRENGHT] + statsFromEquips[ENUM.STATS_TYPES.FISICAL_DEF]) * 1,
            [ENUM.STATS_TYPES.MAGICAL_DMG]: (this.attributes[ENUM.ATTRIBUTES.INTELLLIGENCE] + statsFromEquips[ENUM.STATS_TYPES.MAGICAL_DMG]) * 5,
            [ENUM.STATS_TYPES.MAGICAL_DEF]: (this.attributes[ENUM.ATTRIBUTES.INTELLLIGENCE] + statsFromEquips[ENUM.STATS_TYPES.MAGICAL_DEF]) * 1
        }
        
        //Checks if Maximum HP was reduced
        if(this.currentHP > this.stats[ENUM.STATS_TYPES.HP]) {
            this.currentHP = this.stats[ENUM.STATS_TYPES.HP]
        }
        
        /**
         * @param {Equipment} EquipmentClass Literally the class itself, not the intance of the class
         * @param {string} EQUIPMENT_TYPE_ENUM `EQUIPMENT_TYPE ENUM`
         * @param {Object} data
         * @param {CS_Attributes} data.attributes
         * @param {CS_Entity_Equipment} data.equipment
         */
        function bonusFromEquippment(EquipmentClass, EQUIPMENT_TYPE_ENUM, data){
            //Check if data.equipment is define. Right after checks is data.equipment[EQUIPMENT_TYPE_ENUM] is define.
            if(
                data.equipment &&
                data.equipment[EQUIPMENT_TYPE_ENUM]
            ){
                const equipmentInstance = new EquipmentClass(data.equipment[EQUIPMENT_TYPE_ENUM])

                if(equipmentInstance instanceof Weapon) {

                    statsFromEquips[ENUM.STATS_TYPES.HP]           += data.attributes[ENUM.ATTRIBUTES.VITALITY] * equipmentInstance.multipliers[ENUM.ATTRIBUTES.VITALITY],
                    statsFromEquips[ENUM.STATS_TYPES.EVASION]      += data.attributes[ENUM.ATTRIBUTES.AGILITY] * equipmentInstance.multipliers[ENUM.ATTRIBUTES.AGILITY],
                    statsFromEquips[ENUM.STATS_TYPES.FISICAL_DMG]  += data.attributes[ENUM.ATTRIBUTES.STRENGHT] * equipmentInstance.multipliers[ENUM.ATTRIBUTES.STRENGHT],
                    statsFromEquips[ENUM.STATS_TYPES.FISICAL_DEF]  += 0,
                    statsFromEquips[ENUM.STATS_TYPES.MAGICAL_DMG]  += data.attributes[ENUM.ATTRIBUTES.INTELLLIGENCE] * equipmentInstance.multipliers[ENUM.ATTRIBUTES.STRENGHT],
                    statsFromEquips[ENUM.STATS_TYPES.MAGICAL_DMG]  += 0

                } else if (equipmentInstance instanceof Armor) {

                    statsFromEquips[ENUM.STATS_TYPES.HP]           += data.attributes[ENUM.ATTRIBUTES.VITALITY] * equipmentInstance.multipliers[ENUM.ATTRIBUTES.VITALITY],
                    statsFromEquips[ENUM.STATS_TYPES.EVASION]      += data.attributes[ENUM.ATTRIBUTES.AGILITY] * equipmentInstance.multipliers[ENUM.ATTRIBUTES.AGILITY],
                    statsFromEquips[ENUM.STATS_TYPES.FISICAL_DMG]  += 0,
                    statsFromEquips[ENUM.STATS_TYPES.FISICAL_DEF]  += data.attributes[ENUM.ATTRIBUTES.STRENGHT] * equipmentInstance.multipliers[ENUM.ATTRIBUTES.STRENGHT],
                    statsFromEquips[ENUM.STATS_TYPES.MAGICAL_DMG]  += 0,
                    statsFromEquips[ENUM.STATS_TYPES.MAGICAL_DMG]  += data.attributes[ENUM.ATTRIBUTES.INTELLLIGENCE] * equipmentInstance.multipliers[ENUM.ATTRIBUTES.STRENGHT]
                }
            }
        }
    }

    /**
     * Fully restore the current HP
     */
    recoverHP() {
        this.currentHP = this.stats[ENUM.STATS_TYPES.HP]
    }

    /**
     * Reduce current HP
     * @param {number} value 
     * @returns {boolean} Returns `True` if value reach 0 or less, `False` otherwise
     */
    reduceCurrentHP(value) {
        this.currentHP -= value
        if(this.currentHP <= 0){
            this.isAlive = false
            return true
        }
        return false
    }

    /**
     * @returns {boolean} Returns `True` if its alive, `False` otherwise
     */
    getIsAlive(){
        return this.isAlive
    }

    /**
     * Return the Resources of the entity
     * @returns {Object<string, CS_ResourceData>}
     */
    getResources() {
        return this.inventory.resources
    }

    /**
     * @param {CS_ResourceData} resourceObject
     */
    addResources(resourceObject) {

        //Create the entry if there is the resource section doesn't exist
        if(!this.inventory.resources) {
            this.inventory.resources = {}
        }
        
        //Create the entry if there is thespecific resource doesn't exist
        if(!this.inventory.resources[resourceObject.name]) {
            this.inventory.resources[resourceObject.name] = {
                name: resourceObject.name,
                amount: resourceObject.amount
            }
            return
        }

        //Adds the reource
        this.inventory.resources[resourceObject.name].amount += resourceObject.amount
    }

    /**
     * @param {string} resourceName
     * @param {number} amount
     * @returns {boolean} `False` if oparation is invalid, `True` otherwise.
     */
    removeResources(resourceName, amount){
        
        //Checks if the resource exist
        if(!this.inventory.resources[resourceName]) {
            return false
        }

        //Checks if the amount to remove is bigger than current amount 
        if(amount > this.inventory.resources[resourceName].amount) {
            return false
        }

        //Removes the specify amount
        this.inventory.resources[resourceName].amount -= amount

        //Delete item if amount reachs zero
        if (this.inventory.resources[resourceName].amount === 0) {
            delete this.inventory.resources[resourceName]
        }
    }

    /**
     * Returns the entity current HP
     * @returns {number}
     */
    getCurrentHP() {
        return this.currentHP
    }
}
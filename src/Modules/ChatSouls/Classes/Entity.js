
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

import CS_ENUM from './ENUM'
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
        equipments: {},
        resources: {}
    }

    /**
     * @type {CS_Stats}
     */
    baseStats = {}

    /**
     * @type {CS_Stats}
     */
    statsFromEquips = {}

    /**
     * @type {CS_Stats}
     */
    totalStats = {}

    /**
     * @type {number}
     */
    currentHP = 1

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
     * Set entity souls amount
     * @param {number} value 
     */
    setSouls(value){
        this.souls = value
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
     * @param {string} KEYS_CS_ENTITY_EQUIPMENT - Type of selected equipment
     * @returns {void}
     */
    unequipEquipment(KEYS_CS_ENTITY_EQUIPMENT){

        const unequippedWeapon = this.equipment[KEYS_CS_ENTITY_EQUIPMENT]

        //If the specific equipment inventory type is not empty, just push. Create the specific equipments inventory type property otherwise
        if(!this.inventory.equipments[KEYS_CS_ENTITY_EQUIPMENT]) {
            this.inventory.equipments[KEYS_CS_ENTITY_EQUIPMENT] = [unequippedWeapon]
        } else {
            this.inventory.equipments[KEYS_CS_ENTITY_EQUIPMENT].push(unequippedWeapon)
        }
        //
        
        delete this.equipment[KEYS_CS_ENTITY_EQUIPMENT]
        
        this.inventory.equipments[KEYS_CS_ENTITY_EQUIPMENT].sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })
    }

    /**
     * Returns the equipment stored in entity inventory
     * @param {string} KEY_CS_ENTITY_EQUIPMENT
     * @returns {CS_Inventory_Equipments | CS_EquipmentData[]} If the type is not specify, all equipment types will return.
     */
    getInvetoryEquipments(KEY_CS_ENTITY_EQUIPMENT){

        if(KEY_CS_ENTITY_EQUIPMENT) {
            return this.inventory.equipments[KEY_CS_ENTITY_EQUIPMENT]
        }
        return this.inventory.equipments
    }

    /**
     * Return a string containing all equipment inside entity inventory.
     * Output example: `| 1. itemName_1 | 2. itemName_2 | ... | n. itemName_n |`
     * 
     * @param {string} KEYS_CS_ENTITY_EQUIPMENT
     * @returns {string | undefined} Returns `undefined` if iventory is empty.
     */
    getInventoryEquipmentsString(KEYS_CS_ENTITY_EQUIPMENT){

        let equipment = this.inventory.equipments[KEYS_CS_ENTITY_EQUIPMENT]
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
     * @param {string} KEYS_CS_ENTITY_EQUIPMENT
     * @param {number} itemCode
     * @returns {void}
     */
    setEquippedEquipment(itemCode, KEYS_CS_ENTITY_EQUIPMENT) {

        const itemIndex = itemCode - 1

        //`False` if there is no weapon equiped, `True` otherwise
        this.equipment[KEYS_CS_ENTITY_EQUIPMENT]
            ? this.equipment[KEYS_CS_ENTITY_EQUIPMENT] = this.replaceInventoryEquipment(itemIndex, this.equipment[KEYS_CS_ENTITY_EQUIPMENT], KEYS_CS_ENTITY_EQUIPMENT)
            : this.equipment[KEYS_CS_ENTITY_EQUIPMENT] = this.removeInventoryEquipment(itemIndex, KEYS_CS_ENTITY_EQUIPMENT)
        //
    }

    /**
     * Remove and return a equipment type from entity inventory using the indexArray
     * @param {number} itemIndex 
     * @param {string} KEYS_CS_ENTITY_EQUIPMENT - Type of selected equipment
     * @returns {CS_EquipmentData}
     */
    removeInventoryEquipment(itemIndex, KEYS_CS_ENTITY_EQUIPMENT){

        const itemRemoved = this.inventory.equipments[KEYS_CS_ENTITY_EQUIPMENT].splice(itemIndex, 1)
        if (this.inventory.equipments[KEYS_CS_ENTITY_EQUIPMENT].length === 0) {
            delete this.inventory.equipments[KEYS_CS_ENTITY_EQUIPMENT]
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
     * @param {string} KEYS_CS_STATS
     * @returns {Object<string, number> | number} Returns the value directly if the ENUM is specify, otherwise it returns the whole stats object
     */
    getStats(KEYS_CS_STATS){
        if(KEYS_CS_STATS) {
            return this.totalStats[KEYS_CS_STATS]
        }
        return this.totalStats
    }

    /**
     * Heavy processing. Calculate only when its really needed. Like before battles or during summary consulting.
     * @returns {void}
     */
    calculateStats() {

        this.initializeStats()
        this.calculateBaseStats()
        this.calculateStatsFromEquips()
        
        const statsKeys = CS_ENUM.KEYS.CS_STATS
        const statsKeysArray = Object.values(statsKeys)
        
        //Sum base stats + stats from equipments
        for(let i = 0; i < statsKeysArray.length; i++){
            this.totalStats[statsKeysArray[i]] += this.baseStats[statsKeysArray[i]] + this.statsFromEquips[statsKeysArray[i]]
        }
        
        //Checks if Maximum HP was reduced
        if(this.currentHP > this.totalStats[statsKeys.HP]) {
            this.currentHP = this.totalStats[statsKeys.HP]
        }
    }

    initializeStats(){

        const statsKeys = Object.values(CS_ENUM.KEYS.CS_STATS)
        for(let i = 0; i < statsKeys.length; i++){
            this.baseStats[statsKeys[i]]       = 0
            this.statsFromEquips[statsKeys[i]] = 0
            this.totalStats[statsKeys[i]]      = 0
        }
    }

    calculateBaseStats(){

        const balanceStatsValues = CS_ENUM.BALANCE_VALUES.STATS_WEIGHT
        const statsTypes = CS_ENUM.KEYS.CS_STATS
        const attributeTypes = CS_ENUM.KEYS.CS_ATTRIBUTES

        this.baseStats[statsTypes.HP]             += this.attributes[attributeTypes.VITALITY]        * balanceStatsValues.HP
        this.baseStats[statsTypes.EVASION]        += this.attributes[attributeTypes.AGILITY]         * balanceStatsValues.EVASION
        this.baseStats[statsTypes.FISICAL_DMG]    += this.attributes[attributeTypes.STRENGHT]        * balanceStatsValues.FISICAL_DMG
        this.baseStats[statsTypes.FISICAL_DEF]    += this.attributes[attributeTypes.STRENGHT]        * balanceStatsValues.FISICAL_DEF
        this.baseStats[statsTypes.MAGICAL_DMG]    += this.attributes[attributeTypes.INTELLLIGENCE]   * balanceStatsValues.MAGICAL_DMG
        this.baseStats[statsTypes.MAGICAL_DEF]    += this.attributes[attributeTypes.INTELLLIGENCE]   * balanceStatsValues.MAGICAL_DEF
    }

    calculateStatsFromEquips(){

        const equipmentTypes = CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT

        this.bonusFromEquippment(   MeleeWeapon        ,equipmentTypes.MELEE_WEAPON      )
        this.bonusFromEquippment(   LongRangeWeapon    ,equipmentTypes.LONG_RANGE_WEAPON )
        this.bonusFromEquippment(   Helmet             ,equipmentTypes.HELMET            )
        this.bonusFromEquippment(   BodyArmor          ,equipmentTypes.BODY_ARMOR        )
        this.bonusFromEquippment(   Gloves             ,equipmentTypes.GLOVES            )
        this.bonusFromEquippment(   Boots              ,equipmentTypes.BOOTS             )
    }

    /**
     * @param {Equipment} EquipmentClass 
     * @param {string} KEYS_CS_ENTITY_EQUIPMENT `CHATSOULS_ENUM: EQUIPMENT_TYPE`
     */
    bonusFromEquippment(EquipmentClass, KEYS_CS_ENTITY_EQUIPMENT){

        if(
            !this.equipment ||                      //Check if this.equipment is define. 
            !this.equipment[KEYS_CS_ENTITY_EQUIPMENT]    //Right after checks is this.equipment[EQUIPMENT_TYPE_ENUM] is define.
        ) return
        
        /**@type {Equipment} */
        const equipmentInstance = new EquipmentClass(this.equipment[KEYS_CS_ENTITY_EQUIPMENT])
        const equipMultipliers = equipmentInstance.multipliers
        
        const statsKeys            = CS_ENUM.KEYS.CS_STATS
        const attributeKeys        = CS_ENUM.KEYS.CS_ATTRIBUTES
        const statsWeightValues    = CS_ENUM.BALANCE_VALUES.STATS_WEIGHT

        this.statsFromEquips[statsKeys.HP]           += this.attributes[attributeKeys.VITALITY]        * equipMultipliers[attributeKeys.VITALITY]   * statsWeightValues.HP
        this.statsFromEquips[statsKeys.EVASION]      += this.attributes[attributeKeys.AGILITY]         * equipMultipliers[attributeKeys.AGILITY]    * statsWeightValues.EVASION

        switch (true) {
            case equipmentInstance instanceof Weapon:
                this.statsFromEquips[statsKeys.FISICAL_DMG] += this.attributes[attributeKeys.STRENGHT]        * equipMultipliers[attributeKeys.STRENGHT]         * statsWeightValues.FISICAL_DMG
                this.statsFromEquips[statsKeys.MAGICAL_DMG] += this.attributes[attributeKeys.INTELLLIGENCE]   * equipMultipliers[attributeKeys.INTELLLIGENCE]    * statsWeightValues.MAGICAL_DMG
                break
            case equipmentInstance instanceof Armor:
                this.statsFromEquips[statsKeys.FISICAL_DEF]  += this.attributes[attributeKeys.STRENGHT]        * equipMultipliers[attributeKeys.STRENGHT]        * statsWeightValues.FISICAL_DEF
                this.statsFromEquips[statsKeys.MAGICAL_DMG]  += this.attributes[attributeKeys.INTELLLIGENCE]   * equipMultipliers[attributeKeys.INTELLLIGENCE]   * statsWeightValues.MAGICAL_DEF
                break
            default:
                console.log('ERRO: Entity class, bonusFromEquippment: instanceof Equipment class not recognized')
                break
            //
        }
    }

    /**
     * Fully restore the current HP
     */
    recoverHP() {
        this.currentHP = this.totalStats[CS_ENUM.KEYS.CS_STATS.HP]
    }

    /**
     * Reduce current HP and set `isAlive` to `False` if HP becomes less or equal to zero
     * @param {number} value 
     * @returns {boolean} Returns `True` if value reach 0 or less, `False` otherwise
     */
    inflictDamage(value) {
        this.currentHP -= value
        if(this.currentHP <= 0){
            this.kill()
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
     * Ressurrect entity
     * @returns {void}
     */
    ressurrect(){
        this.isAlive = true
    }

    /**
     * Kill entity
     * @returns {void}
     */
    kill(){
        this.isAlive = false
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
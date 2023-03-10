import deepCopy from '../../../Utils/deepCopy'
import CS_ENUM from './ENUM'
import Equipment from './Equipment'
import Armor from './EquipmentChilds/Armor'
import BodyArmor from './EquipmentChilds/BodyArmor'
import Boots from './EquipmentChilds/Boots'
import EQUIPMENT_TYPES from './EquipmentChilds/EQUIPMENT_TYPES'
import Gloves from './EquipmentChilds/Gloves'
import Helmet from './EquipmentChilds/Helmet'
import LongRangeWeapon from './EquipmentChilds/LongRangeWeapon'
import MeleeWeapon from './EquipmentChilds/MeleeWeapon'
import Weapon from './EquipmentChilds/Weapon'

/**
 * @typedef {import ('../TypeDefinitions/Types').CS_Attributes} CS_Attributes
 * @typedef {import('../TypeDefinitions/Types').CS_Attributes_KV} CS_Attributes_KV
 * @typedef {import ('../TypeDefinitions/Types').CS_Entity_Equipment} CS_Entity_Equipment
 * @typedef {import('../TypeDefinitions/Types').CS_Entity_Equipment_KV} CS_Entity_Equipment_KV
 * @typedef {import ('../TypeDefinitions/Types').CS_Entity_Inventory} CS_Entity_Inventory
 * @typedef {import('../TypeDefinitions/Types').CS_Entity_Inventory_KV} CS_Entity_Inventory_KV
 * @typedef {import ('../TypeDefinitions/Types').CS_Inventory_Equipments} CS_Inventory_Equipments
 * @typedef {import('../TypeDefinitions/Types').CS_Inventory_Equipments_KV} CS_Inventory_Equipments_KV
 * @typedef {import('../TypeDefinitions/Types').CS_Inventory_Resources} CS_Inventory_Resources
 * @typedef {import('../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData
 * @typedef {import('../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData
 * @typedef {import ('../TypeDefinitions/Types').CS_Stats} CS_Stats
 * @typedef {import('../TypeDefinitions/Types').CS_Stats_KV} CS_Stats_KV
 * @typedef {import ('../TypeDefinitions/Types').CS_ResourceData} CS_ResourceData
*/

const attributeTypes = CS_ENUM.KEYS.CS_ATTRIBUTES
const statsTypes = CS_ENUM.KEYS.CS_STATS
const attributeKeys = Object.values(attributeTypes)
const equipmentTypeKeys = Object.values(EQUIPMENT_TYPES)
const statsKeys = Object.values(statsTypes)

export default class Entity {

    //=================================================================================================
    // PROPERTIES =====================================================================================
    //=================================================================================================

    /*** @type {string}*/
    #name = ''

    /** @type {boolean}*/
    #isAlive = true

    /** @type {number}*/
    #souls = 0

    /** @type {number}*/
    #level = 1

    /** @type {number}*/
    #currentHP = 1

    /** @type {CS_Attributes} - Keys: `ATTRIBUTE_TYPE ENUM`*/
    #attributes = {
        vitality: 0,
        agility: 0,
        strenght: 0,
        intelligence: 0
    }

    /** @type {CS_Entity_Equipment}*/
    #currentEquipment = {
        longRangeWeapon: {},
        meleeWeapon: {},
        helmet: {},
        bodyArmor: {},
        gloves: {},
        boots: {},
    }

    /** @type {CS_Entity_Inventory}*/
    #inventory = {
        equipments: {
            longRangeWeapon: [],
            meleeWeapon: [],
            helmet: [],
            bodyArmor: [],
            gloves: [],
            boots: [],
        },
        resources: {},
    }

    /** @type {CS_Stats}*/
    #totalStats = {
        hp: 0,
        evasion: 0,
        fisicalDamage: 0,
        fisicalDefense: 0,
        magicalDamage: 0,
        magicalDefense: 0
    }

    /** @type {CS_Stats}*/
    #baseStats = {
        hp: 0,
        evasion: 0,
        fisicalDamage: 0,
        fisicalDefense: 0,
        magicalDamage: 0,
        magicalDefense: 0
    }

    /** @type {CS_Stats}*/
    #statsFromEquips = {
        hp: 0,
        evasion: 0,
        fisicalDamage: 0,
        fisicalDefense: 0,
        magicalDamage: 0,
        magicalDefense: 0
    }

    //=================================================================================================
    // CONSTRUCTOR ====================================================================================
    //=================================================================================================

    /**
     * Create a instance of Entity
     * @param {boolean} isChild
     * @param {name} name
     * @returns {Entity}
     * @constructor
     */
    constructor(isChild, name){

        if (typeof isChild !== 'boolean' || !isChild) {
            throw Error('Cannot instantiate "Entity" class directly')
        }

        this.setName(name)
    }

    //=================================================================================================
    // GETTERS AND SETTERS ============================================================================
    //=================================================================================================

    /** Getter
     * @returns {string}
     */
    getName() { return this.#name }

    /** Setter
     * @param {string} entityName
     */
    setName(entityName) {
        
        if(typeof entityName !== 'string')
            throw Error('ERROR: Entity class, name must be a string')

        this.#name = entityName
    }

    /** Getter
     * @returns {boolean} 
     */
    getIsAlive() {
    
        return this.#isAlive
    }

    /** Setter
     * @param {boolean} boolean 
     */
    setIsAlive(boolean) {
        
        if(typeof boolean !== 'boolean')
            throw Error('ERROR: Entity class, isAlive must be a boolean')

        this.#isAlive = boolean
    }

    /** Getter
     * @returns {number} 
     */
    getCurrentHP() { return this.#currentHP }

    /** Setter
     * @param {number} value 
     */
    setCurrentHP(value) {

        if(typeof value !== 'number' || isNaN(value)) 
            throw Error('ERROR: Entity class, currentHP must be a number')
        
        this.#currentHP = value
    }

    /** Getter
     * @returns {number}
     */
    getSouls() { return this.#souls }

    /** Setter
     * @param {number} amount 
     */
    setSouls(amount) {
        
        if(typeof amount !== 'number' || isNaN(amount)) 
            throw Error('ERROR: Entity class, souls must be a number')
        if(amount < 0) 
            throw Error('Error: Entity class, souls cannot be negative')

        this.#souls = amount
    }

    /** Getter
     * @return {number} 
     */
    getlevel() { return this.#level }

    /** Setter
     * @param {number} level  
     */
    setlevel(level) {

        if(typeof level !== 'number' || isNaN(level))
            throw Error('ERROR: Entity class, level must be a number')
        if(level < 0)
            throw Error('Error: Entity class, level cannot be negative')
        
        this.#level = level
    }

    /** Getter
     * @returns {CS_Attributes} 
     */
    getAttributes() { return this.#attributes }

    /** Getter
     * @returns {CS_Attributes_KV} 
     */
    getAttributes_KV() { return this.#attributes }

    /** Setter
     * @param {CS_Attributes} object 
     */
    setAttributes(object) {
        
        if(typeof object !== 'object'){
            throw Error(`ERROR: Entity class, attribute must be an object`)
        }
        for(let i = 0; i < attributeKeys.length; i++) {
            if (!object[attributeKeys[i]])                  
                throw Error(`ERROR: Entity class, all attributes must be defined`)
        }

        this.#attributes = deepCopy(object)
    }

    /** Getter
     * @returns {CS_Entity_Equipment} 
     */
    getCurrentEquipment() { return this.#currentEquipment }

    /** Getter
     * @returns {CS_Entity_Equipment_KV} 
     */
    getCurrentEquipment_KV() { return this.#currentEquipment }

    /** Setter
     * @param {CS_Entity_Equipment} newCurrentEquipment 
     */
    setCurrentEquipment(newCurrentEquipment) {
        
        if(typeof newCurrentEquipment !== 'object'){
            throw Error('ERROR: Entity class, "currentEquipment": argument must be an object')
        }

        const newCurrentEquipment_Keys = Object.keys(newCurrentEquipment)
        for(let i = 0; i < newCurrentEquipment_Keys.length; i++) {
            if(!equipmentTypeKeys.includes(newCurrentEquipment_Keys[i])){
                throw Error(`ERROR: Entity class, "currentEquipment" setter: Equipment type must be valid`)
            }
        }

        for(let i = 0; i < equipmentTypeKeys.length; i++) {
            if (!newCurrentEquipment[equipmentTypeKeys[i]]) {
                throw Error(`ERROR: Entity class, "currentEquipment": All properties must be defined`)
            }
        }
                
        this.#currentEquipment = deepCopy(newCurrentEquipment) 
    }

    /** Getter
     * @returns {CS_Entity_Inventory} 
     */
    getInventory() { return this.#inventory }

    /** Getter
     * @returns {CS_Entity_Inventory_KV} 
     */
    getInventory_KV() { return this.#inventory }

    /** Setter
     * @param {CS_Entity_Inventory} inventoryObject 
     */
    setInventory(inventoryObject) {

        if(typeof inventoryObject !== 'object') {
            throw Error('ERROR: Entity class, "inventory" setter: inventory must be a object')
        }

        if(!inventoryObject.resources || !inventoryObject.equipments) {
            throw Error('ERROR: Entity class, "inventory" setter: object property "resources" and "equipments" must be defined')
        }

        const newInventory_EquipmentKeys = Object.keys(inventoryObject.equipments)
        for(let i = 0; i < newInventory_EquipmentKeys.length; i++) {
            if(!equipmentTypeKeys.includes(newInventory_EquipmentKeys[i])){
                throw Error(`ERROR: Entity class, "inventory" setter: inventory equipments type must be valid`)
            }
        }

        for(let i = 0; i < equipmentTypeKeys.length; i++) {
            if (!inventoryObject.equipments[equipmentTypeKeys[i]]) {
                throw Error(`ERROR: Entity class, "inventory setter": all inventory equipments properties must be defined`)
            }
        }
            
        this.#inventory = deepCopy(inventoryObject)
    }

    /** Getter
     * @returns {CS_Inventory_Equipments} 
     */
    getInventoryEquipments() {
        return this.#inventory.equipments
    }

    /** Getter
     * @returns {CS_Inventory_Equipments_KV} 
     */
    getInventoryEquipments_KV() {
        return this.#inventory.equipments
    }

    /** Setter
     * @param {CS_Inventory_Equipments} inventoryEquipmentObject 
     */
    setInventoryEquipments(inventoryEquipmentObject) {

        if(typeof inventoryEquipmentObject !== 'object') {
            throw Error('ERROR: Entity class, "inventoryEquipments" setter: argument must be an object')
        }

        const keys = Object.keys(inventoryEquipmentObject)
        for(let i = 0; i < keys.length; i++) {
            if(!equipmentTypeKeys.includes(keys[i])){
                throw Error(`ERROR: Entity class, "inventoryEquipments" setter: given type must be valid`)
            }
        }

        for(let i = 0; i < equipmentTypeKeys.length; i++) {
            if (!inventoryEquipmentObject[equipmentTypeKeys[i]]) {
                throw Error(`ERROR: Entity class, "inventoryEquipments" setter: all properties must be defined`)
            }
        }

        this.#inventory.equipments = deepCopy(inventoryEquipmentObject) 
    }

    /** Getter
     * @returns {CS_Inventory_Resources} 
     */
    getInventoryResources() {
        return this.#inventory.resources
    }

    /** Setter
     * @param {CS_Inventory_Resources} object 
     */
    setInventoryResources(object) {

        if(typeof object !== 'object') {
            throw Error('ERROR: Entity class, "inventoryResources" setter: argument must be an object')
        }
        const objectKeys = Object.keys(object)
        for(let i = 0; i < objectKeys.length; i++){
            if(
                !object[objectKeys[i]].name     ||
                !object[objectKeys[i]].amount   ||
                !object[objectKeys[i]].type
            ){
                throw Error('ERROR: Entity class, "inventoryResources" setter: all properties must be defined')
            }
        }

        this.#inventory.resources = deepCopy(object) 
    }

    /** Getter
     * @returns {CS_Stats} 
     */
    getTotalStats() { return this.#totalStats }

    /** Getter
     * @returns {CS_Stats_KV} 
     */
    getTotalStats_KV() { return this.#totalStats }

    /** Setter
     * @param {CS_Stats} object 
     */
    setTotalStats(object) {

        if(typeof object !== 'object')
            throw Error('ERROR: Entity class, stats must be objects')
        for(let i = 0; i < statsKeys.length; i++) {
            if (object[statsKeys[i]] === undefined)
                throw Error(`ERROR: Entity class, stats obejcts must have all properties defined`)
        }
        
        this.#totalStats = deepCopy(object) 
    }

    /** Getter
     * @returns {CS_Stats} 
     */
    getBaseStats() { return this.#baseStats }

    /** Getter
     * @returns {CS_Stats_KV} 
     */
    getBaseStats_KV() { return this.#baseStats }

    /** Setter
     * @param {CS_Stats} object 
     */
    setBaseStats(object) {
        
        if(typeof object !== 'object')
            throw Error('ERROR: Entity class, stats must be objects')
        for(let i = 0; i < statsKeys.length; i++) {
            if (object[statsKeys[i]] === undefined)
                throw Error(`ERROR: Entity class, stats obejcts must have all properties defined`)
        }
        
        this.#baseStats = deepCopy(object) 
    }

    /** Getter
     * @returns {CS_Stats} 
     */
    getEquipmentStats() { return this.#statsFromEquips }

    /** Getter
     * @returns {CS_Stats_KV} 
     */
    getEquipmentStats_KV() { return this.#statsFromEquips }

    /** Setter
     * @param {CS_Stats} object 
     */
    setEquipmentStats(object) {

        if(typeof object !== 'object')
            throw Error('ERROR: Entity class, stats must be objects')
        for(let i = 0; i < statsKeys.length; i++) {
            if (object[statsKeys[i]] === undefined)
                throw Error(`ERROR: Entity class, stats obejcts must have all properties defined`)
        }
        
        this.#statsFromEquips = deepCopy(object)
    }

    //=================================================================================================
    // INSTANCE METHODS ===============================================================================
    //=================================================================================================

    /**
     * Adds entity souls by value
     * @param {number} value 
     */
    addSouls(value){
        const souls = this.getSouls()
        this.setSouls(souls + value)
    }

    /**
     * Decrease entity souls by value
     * @param {number} value 
     */
    decreaseSouls(value){

        const souls = this.getSouls()

        if(souls - value < 0){
            this.setSouls(0)
            return
        }

        this.setSouls(souls - value)
    }

    /**
     * Add level by 1
     */
    addLevel(){
        const level = this.getlevel()
        this.setlevel(level + 1)
    }

    /**
     * Add the given attributeType by 1 point.
     * @param {string} attributeType
     */
    addAttributes(attributeType){
        const newAttributes = this.getAttributes_KV()
        newAttributes[attributeType] += 1
        this.setAttributes(newAttributes)
    }

    /**
     * Sort inventory equipment alphabeticaly for the given type
     * @param {string} equipmentType 
     */
    sortInventoryEquipments(equipmentType) {
        this.getInventoryEquipments_KV()[equipmentType].sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })
    }

    /**
     * Returns if there the given equipment type is defined on entity inventory
     * @param {string} equipmentType
     * @returns {CS_Inventory_Equipments | CS_Equipment_WeaponData[] | CS_Equipment_ArmorData[]} `True` if inventory equipment is empty for the given type, `False` otherwise.
     */
    isInventoryEquipmentsTypeEmpty(equipmentType){

        if(!equipmentTypeKeys.includes(equipmentType)) {
            throw Error(`ERROR: Entity class, "isInventoryEquipmentsTypeEmpty": Equipment type must be valid`)
        }

        if(this.getInventoryEquipments_KV()[equipmentType].length > 0){
            return false
        }
        return true
    }

    /**
     * Retrieves the quantity of a specified gear item stored within the entity's inventory
     * @param {string} equipmentType 
     * @returns {number}
     */
    getEquipmentInventoryAmount(equipmentType) {

        if(!equipmentTypeKeys.includes(equipmentType)) {
            throw Error(`ERROR: Entity class, "getEquipmentInventoryAmount" method: equipment type not recognized`)
        }
        
        const amount = this.getInventoryEquipments()[equipmentType].length
        return amount
    }

    /**
     * Sets entity current equipment for a given type
     * @param {string} equipmentType 
     * @param {CS_Equipment_WeaponData | CS_Equipment_ArmorData} equipmentObject 
     */
    equip(equipmentType, equipmentObject){

        if(this.getCurrentEquipment_KV()[equipmentType].name) {
            this.unequip(equipmentType)
        }
        this.getCurrentEquipment_KV()[equipmentType] = deepCopy(equipmentObject)
    }

    /**
     * Unequip the given type of entity current equipment
     * @param {string} equipmentType
     * @returns {void}
     */
    unequip(equipmentType){

        const itemToUnequip = this.getCurrentEquipment_KV()[equipmentType]   
        this.getInventoryEquipments_KV()[equipmentType].push(deepCopy(itemToUnequip))
        this.getCurrentEquipment_KV()[equipmentType] = {}
        this.sortInventoryEquipments(equipmentType)
    }

    /**
     * Sets to current equipment a item of the given index and type from entity inventory equipments
     * @param {string} equipmentType
     * @param {number} itemIndex 
     * @returns {void}
     */
    equipFromInventory(itemIndex, equipmentType) {

        if(itemIndex >= this.getEquipmentInventoryAmount(equipmentType) || itemIndex < 0) {
            throw Error(`ERROR: Entity class, "equipFromInventory": itemIndex out of boundaries`)
        }
        const itemToEquip = this.getInventoryEquipments_KV()[equipmentType].splice(itemIndex, 1)[0]
        this.equip(equipmentType, itemToEquip)
    }

    /**
     * Return a string containing all equipment inside entity inventory.
     * Output example: `| 1. itemName_1 | 2. itemName_2 | ... | n. itemName_n |`
     * 
     * @param {string} equipmentType
     * @returns {string | undefined} Returns `undefined` if iventory is empty.
     */
    getAllEquipmentInventoryString(equipmentType){
        
        if (this.getEquipmentInventoryAmount(equipmentType) <= 0) {
            throw Error(`ERROR: Entity class, "getAllEquipmentInventoryString" method: there is no equipment to format string from`)
        }
        
        let equipment = this.getInventoryEquipments_KV()[equipmentType]
        let equipmentListString = ''

        for(let i = 0; i < equipment.length; i++)
            equipmentListString += `| ${i + 1}. ${equipment[i].name} `
        //
        
        return equipmentListString
    }

    /**
     * Add resources to entity inventory.
     * @param {CS_ResourceData} resourceObject
     */
    addResources(resourceObject) {

        this.getInventoryResources()[resourceObject.name]
            ? this.getInventoryResources()[resourceObject.name].amount += resourceObject.amount
            : this.getInventoryResources()[resourceObject.name] = {
                name: resourceObject.name,
                amount: resourceObject.amount,
                type: resourceObject.type
            }
    }

    /**
     * @param {string} resourceName
     * @param {number} amount
     * @returns {boolean} `False` if oparation is invalid, `True` otherwise.
     */
    removeResources(resourceName, amount){
        
        const resource = this.getInventory().resources[resourceName]

        if(!resource) {
            throw Error(`ERROR: Entity class, "removeResources": resource doesn't exist`)
        }

        if (amount > resource.amount) {
            throw Error(`ERROR: Entity class, "removeResources": trying to remove more resource than what is stored`)
        }

        resource.amount -= amount
        if (resource.amount === 0) {
            delete this.getInventory().resources[resourceName]
        }
    }

    /**
     * Fully restore the current HP
     */
    recoverHP() {
        this.setCurrentHP(this.getTotalStats().hp)
    }

    /** 
     * Reduce current HP and set `isAlive` to `False` if HP becomes less or equal to zero
     * @param {number} value 
     * @returns {boolean}
     */
    inflictDamage(value) {

        const currentHP = this.getCurrentHP()
        this.setCurrentHP(currentHP - value)
        
        if(this.getCurrentHP() <= 0){
            this.kill()
        }
    }

    /**
     * Ressurrect entity
     * @returns {void}
     */
    ressurrect(){
        this.setIsAlive(true)
    }

    /**
     * Kill entity
     * @returns {void}
     */
    kill(){
        this.setIsAlive(false)
    }

    calculateBaseStats(){

        const balanceStatsValues = CS_ENUM.BALANCE_VALUES.STATS_WEIGHT
        const attributes = this.getAttributes()

        this.setBaseStats({
            hp:             attributes.vitality     * balanceStatsValues.HP,
            evasion:        attributes.agility      * balanceStatsValues.EVASION,
            fisicalDamage:  attributes.strenght     * balanceStatsValues.FISICAL_DMG,
            fisicalDefense: attributes.strenght     * balanceStatsValues.FISICAL_DEF,
            magicalDamage:  attributes.intelligence * balanceStatsValues.MAGICAL_DMG,
            magicalDefense: attributes.intelligence * balanceStatsValues.MAGICAL_DEF
        })
    }

    calculateStatsFromEquips(){

        this.setEquipmentStats({
            hp:             0,
            evasion:        0,
            fisicalDamage:  0,
            fisicalDefense: 0,
            magicalDamage:  0,
            magicalDefense: 0
        })

        this.bonusFromEquippment(   MeleeWeapon        ,EQUIPMENT_TYPES.MELEE_WEAPON      )
        this.bonusFromEquippment(   LongRangeWeapon    ,EQUIPMENT_TYPES.LONG_RANGE_WEAPON )
        this.bonusFromEquippment(   Helmet             ,EQUIPMENT_TYPES.HELMET            )
        this.bonusFromEquippment(   BodyArmor          ,EQUIPMENT_TYPES.BODY_ARMOR        )
        this.bonusFromEquippment(   Gloves             ,EQUIPMENT_TYPES.GLOVES            )
        this.bonusFromEquippment(   Boots              ,EQUIPMENT_TYPES.BOOTS             )
    }

    /**
     * @param {Equipment} EquipmentClass 
     * @param {string} equipmentType `CHATSOULS_ENUM: EQUIPMENT_TYPE`
     */
    bonusFromEquippment(EquipmentClass, equipmentType){

        const currentEquipment = this.getCurrentEquipment_KV()

        if(!currentEquipment[equipmentType].name) return
        
        /**@type {Equipment} */
        const equipmentInstance = new EquipmentClass(currentEquipment[equipmentType])
        const equipMultipliers = equipmentInstance.multipliers
        const statsWeightValues    = CS_ENUM.BALANCE_VALUES.STATS_WEIGHT
        const attributes = this.getAttributes()

        const stats = this.getEquipmentStats()

        stats.hp           += attributes.vitality        * equipMultipliers.vitality   * statsWeightValues.HP
        stats.evasion      += attributes.agility         * equipMultipliers.agility    * statsWeightValues.EVASION

        switch (true) {

            case equipmentInstance instanceof Weapon:
                stats.fisicalDamage += attributes.strenght      * equipMultipliers.strenght     * statsWeightValues.FISICAL_DMG
                stats.magicalDamage += attributes.intelligence  * equipMultipliers.intelligence * statsWeightValues.MAGICAL_DMG
                break
            //
                
            case equipmentInstance instanceof Armor:
                stats.fisicalDefense += attributes.strenght     * equipMultipliers.strenght     * statsWeightValues.FISICAL_DEF
                stats.magicalDefense += attributes.intelligence * equipMultipliers.intelligence * statsWeightValues.MAGICAL_DEF
                break
            //
        }
    }

    /**
     * Calculate the total stats.
     */
    calculateStats() {

        this.calculateBaseStats()
        this.calculateStatsFromEquips()

        const baseStats = this.getBaseStats()
        const equipmentStats = this.getEquipmentStats()

        this.setTotalStats({
            hp:             baseStats.hp               + equipmentStats.hp,
            evasion:        baseStats.evasion          + equipmentStats.evasion,
            fisicalDamage:  baseStats.fisicalDamage    + equipmentStats.fisicalDamage,
            fisicalDefense: baseStats.fisicalDefense   + equipmentStats.fisicalDefense,
            magicalDamage:  baseStats.magicalDamage    + equipmentStats.magicalDamage,
            magicalDefense: baseStats.magicalDefense   + equipmentStats.magicalDefense
        })
        
        //Checks if Maximum HP was reduced
        if(this.getCurrentHP() > this.getTotalStats().hp) {
            this.setCurrentHP(this.getTotalStats().hp)
        }
    }
}
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
 * @typedef {import ('../TypeDefinitions/Types').CS_Entity_Equipment} CS_Entity_Equipment
 * @typedef {import ('../TypeDefinitions/Types').CS_Entity_Inventory} CS_Entity_Inventory
 * @typedef {import ('../TypeDefinitions/Types').CS_Inventory_Equipments} CS_Inventory_Equipments
 * @typedef {import('../TypeDefinitions/Types').CS_Inventory_Resources} CS_Inventory_Resources
 * @typedef {import('../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData
 * @typedef {import('../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData
 * @typedef {import ('../TypeDefinitions/Types').CS_Stats} CS_Stats
 * @typedef {import ('../TypeDefinitions/Types').CS_ResourceData} CS_ResourceData
*/

const attributeTypes = CS_ENUM.KEYS.CS_ATTRIBUTES
const statsTypes = CS_ENUM.KEYS.CS_STATS
const attributeKeys = Object.values(attributeTypes)
const equipmentKeys = Object.values(EQUIPMENT_TYPES)
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

    /**
     * @returns {number} Getter
     */
    get currentHP() { return this.#currentHP }

    /**
     * @param {number} value Setter
     */
    set currentHP(value) {

        if(typeof value !== 'number' || isNaN(value)) 
            throw Error('ERROR: Entity class, currentHP must be a number')
        
        this.#currentHP = value
    }

    /**
     * @returns {number} Getter
     */
    get souls() { return this.#souls }

    /**
     * @param {number} amount Setter
     */
    set souls(amount) {
        
        if(typeof amount !== 'number' || isNaN(amount)) 
            throw Error('ERROR: Entity class, souls must be a number')
        if(amount < 0) 
            throw Error('Error: Entity class, souls cannot be negative')

        this.#souls = amount
    }

    /**
     * @return {number} Getter
     */
    get level() { return this.#level }

    /**
     * @param {number} level  Setter
     */
    set level(amount) {

        if(typeof amount !== 'number' || isNaN(amount))
            throw Error('ERROR: Entity class, level must be a number')
        if(amount < 0)
            throw Error('Error: Entity class, level cannot be negative')
        
        this.#level = amount
    }

    /**
     * @returns {CS_Attributes} Getter
     */
    get attributes() { return this.#attributes }

    /** 
     * @param {CS_Attributes} object Setter
     */
    set attributes(object) {
        
        if(typeof object !== 'object'){
            throw Error(`ERROR: Entity class, attribute must be an object`)
        }
        for(let i = 0; i < attributeKeys.length; i++) {
            if (!object[attributeKeys[i]])                  
                throw Error(`ERROR: Entity class, all attributes must be defined`)
        }

        this.#attributes = deepCopy(object)
    }

    /** 
     * @returns {CS_Entity_Equipment} Getter
     */
    get currentEquipment() { return this.#currentEquipment }

    /**
     * @param {CS_Entity_Equipment} object Setter
     */
    set currentEquipment(object) {
        
        if(typeof object !== 'object'){
            throw Error('ERROR: Entity class, "currentEquipment": argument must be an object')
        }

        const objectKeys = Object.keys(object)
        for(let i = 0; i < objectKeys.length; i++) {
            if(!equipmentKeys.includes(objectKeys[i])){
                throw Error(`ERROR: Entity class, "currentEquipment" setter: Equipment type must be valid`)
            }
        }

        for(let i = 0; i < equipmentKeys.length; i++) {
            if (!this.currentEquipment[equipmentKeys[i]]) {
                throw Error(`ERROR: Entity class, "currentEquipment": All properties must be defined`)
            }
        }
                
        this.#currentEquipment = deepCopy(object) 
    }

    /**
     * @returns {CS_Entity_Inventory} Getter
     */
    get inventory() { return this.#inventory }

    /**
     * @param {CS_Entity_Inventory} inventoryObject Setter
     */
    set inventory(inventoryObject) {

        if(typeof inventoryObject !== 'object') {
            throw Error('ERROR: Entity class, "inventory" setter: inventory must be a object')
        }

        if(!inventoryObject.resources || !inventoryObject.equipments) {
            throw Error('ERROR: Entity class, "inventory" setter: object property "resources" and "equipments" must be defined')
        }

        const objectKeys = Object.keys(inventoryObject.equipments)
        for(let i = 0; i < objectKeys.length; i++) {
            if(!equipmentKeys.includes(objectKeys[i])){
                throw Error(`ERROR: Entity class, "inventory" setter: inventory equipments type must be valid`)
            }
        }

        for(let i = 0; i < equipmentKeys.length; i++) {
            if (!inventoryObject.equipments[equipmentKeys[i]]) {
                throw Error(`ERROR: Entity class, "inventory setter": all inventory equipments properties must be defined`)
            }
        }
            
        this.#inventory = deepCopy(inventoryObject)
    }

    /**
     * @returns {CS_Inventory_Equipments} Getter
     */
    get inventoryEquipments() {
        return this.#inventory.equipments
    }

    /**
     * @param {CS_Inventory_Equipments} inventoryEquipmentObject Setter
     */
    set inventoryEquipments(inventoryEquipmentObject) {

        if(typeof inventoryEquipmentObject !== 'object') {
            throw Error('ERROR: Entity class, "inventoryEquipments" setter: argument must be an object')
        }

        const objectKeys = Object.keys(inventoryEquipmentObject)
        for(let i = 0; i < objectKeys.length; i++) {
            if(!equipmentKeys.includes(objectKeys[i])){
                throw Error(`ERROR: Entity class, "inventoryEquipments" setter: given type must be valid`)
            }
        }

        for(let i = 0; i < equipmentKeys.length; i++) {
            if (!inventoryEquipmentObject[equipmentKeys[i]]) {
                throw Error(`ERROR: Entity class, "inventoryEquipments" setter: all properties must be defined`)
            }
        }

        this.#inventory.equipments = deepCopy(inventoryEquipmentObject) 
    }

    /**
     * @returns {CS_Inventory_Resources} Getter
     */
    get inventoryResources() {
        return this.#inventory.resources
    }

    /**
     * @param {CS_Inventory_Resources} object Setter
     */
    set inventoryResources(object) {

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

    /**
     * @returns {CS_Stats} Getter
     */
    get totalStats() { return this.#totalStats }

    /**
     * @param {CS_Stats} object Setter
     */
    set totalStats(object) {

        if(typeof object !== 'object')
            throw Error('ERROR: Entity class, stats must be objects')
        for(let i = 0; i < statsKeys.length; i++) {
            if (object[statsKeys[i]] === undefined)
                throw Error(`ERROR: Entity class, stats obejcts must have all properties defined`)
        }
        
        this.#totalStats = deepCopy(object) 
    }

    /**
     * @returns {CS_Stats} Getter
     */
    get baseStats() { return this.#baseStats }

    /**
     * @param {CS_Stats} object Setter
     */
    set baseStats(object) {
        
        if(typeof object !== 'object')
            throw Error('ERROR: Entity class, stats must be objects')
        for(let i = 0; i < statsKeys.length; i++) {
            if (object[statsKeys[i]] === undefined)
                throw Error(`ERROR: Entity class, stats obejcts must have all properties defined`)
        }
        
        this.#baseStats = deepCopy(object) 
    }

    /**
     * @returns {CS_Stats} Getter
     */
    get statsFromEquips() { return this.#statsFromEquips }

    /**
     * @param {CS_Stats} object Setter
     */
    set statsFromEquips(object) {

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
        this.souls += value
    }

    /**
     * Decrease entity souls by value
     * @param {number} value 
     */
    decreaseSouls(value){

        if(this.souls - value < 0){
            this.souls = 0
            return
        }
        this.souls -= value
    }

    /**
     * Add level by 1
     */
    addLevel(){
        this.level += 1
    }

    /**
     * Add attributes points by 1 to the specified type.
     * @param {string} equipmentType
     */
    addAttributes(equipmentType){
        this.attributes[equipmentType] += 1
    }

    /**
     * Sort inventory equipment alphabeticaly for the given type
     * @param {string} equipmentType 
     */
    sortInventoryEquipments(equipmentType) {
        this.inventoryEquipments[equipmentType].sort((a, b) => {
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

        if(!equipmentKeys.includes(equipmentType)) {
            throw Error(`ERROR: Entity class, "isInventoryEquipmentsTypeEmpty": Equipment type must be valid`)
        }

        if(this.inventoryEquipments[equipmentType].length > 0){
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

        if(!equipmentKeys.includes(equipmentType)) {
            throw Error(`ERROR: Entity class, "getEquipmentInventoryAmount" method: equipment type not recognized`)
        }
        
        const amount = this.inventoryEquipments[equipmentType].length
        return amount
    }

    /**
     * Sets entity current equipment for a given type
     * @param {string} equipmentType 
     * @param {CS_Equipment_WeaponData} equipmentObject 
     */
    equip(equipmentType, equipmentObject){

        const newObject = this.currentEquipment 
        newObject[equipmentType] = equipmentObject
        this.currentEquipment = deepCopy(newObject)
    }

    /**
     * Unequip the given type of entity current equipment
     * @param {string} equipmentType
     * @returns {void}
     */
    unequip(equipmentType){

        const unequippedWeapon = deepCopy(this.currentEquipment[equipmentType])        
        this.inventoryEquipments[equipmentType].push(unequippedWeapon)
        this.currentEquipment[equipmentType] = {}
        this.sortInventoryEquipments(equipmentType)
    }

    /**
     * Sets to current equipment a item of the given index and type from entity inventory equipments
     * @param {string} equipmentType
     * @param {number} itemIndex 
     * @returns {void}
     */
    equipFromInventory(itemIndex, equipmentType) {

        if(itemIndex >= this.inventoryEquipments[equipmentType].length || itemIndex < 0) {
            throw Error(`ERROR: Entity class, "equipFromInventory": itemIndex out of boundaries`)
        }
        
        /**@type {CS_Equipment_WeaponData[] | CS_Equipment_ArmorData[]} */
        const inventoryEquipments = deepCopy(this.inventoryEquipments)
        
        /**@type {CS_Equipment_WeaponData | CS_Equipment_ArmorData} */
        let currentEquipment = deepCopy(this.currentEquipment)

        let itemToStore = deepCopy(currentEquipment[equipmentType])
        
        let removedItemArray
        itemToStore.name !== undefined
            ? removedItemArray = inventoryEquipments[equipmentType].splice(itemIndex, 1, itemToStore)
            : removedItemArray = inventoryEquipments[equipmentType].splice(itemIndex, 1)

        currentEquipment[equipmentType] = removedItemArray[0]
        
        this.currentEquipment = currentEquipment
        this.inventoryEquipments = inventoryEquipments
    }

    /**
     * Return a string containing all equipment inside entity inventory.
     * Output example: `| 1. itemName_1 | 2. itemName_2 | ... | n. itemName_n |`
     * 
     * @param {string} equipmentType
     * @returns {string | undefined} Returns `undefined` if iventory is empty.
     */
    getAllEquipmentInventoryString(equipmentType){
        
        let equipment = this.inventoryEquipments[equipmentType]
        if (equipment.length <= 0) {
            throw Error(`ERROR: Entity class, "getAllEquipmentInventoryString" method: there is no equipment to format string from`)
        }

        //Build the weapon list string
        let equipmentListString = ''
        for(let i = 0; i < equipment.length; i++) {
            equipmentListString += `| ${i + 1}. ${equipment[i].name} `
        }
        return equipmentListString
    }

    /**
     * Add resources to entity inventory.
     * @param {CS_ResourceData} resourceObject
     */
    addResources(resourceObject) {

        this.inventoryResources[resourceObject.name]
            ? this.inventoryResources[resourceObject.name].amount += resourceObject.amount
            : this.inventoryResources[resourceObject.name] = {
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
        
        if(!this.inventoryResources[resourceName]) {
            throw Error(`ERROR: Entity class, "removeResources": resource doesn't exist`)
        }
        if (amount > this.inventory.resources[resourceName].amount) {
            throw Error(`ERROR: Entity class, "removeResources": trying to remove more resource than what is stored`)
        }

        //Removes the specify amount
        this.inventory.resources[resourceName].amount -= amount

        //Delete item if amount reachs zero
        if (this.inventory.resources[resourceName].amount === 0) {
            delete this.inventory.resources[resourceName]
        }
    }

    /**
     * Fully restore the current HP
     */
    recoverHP() {
        this.currentHP = this.totalStats[statsTypes.HP]
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

    initializeStats(){

        const statsKeys = Object.values(CS_ENUM.KEYS.CS_STATS)
        const statsObject = {}
        for(let i = 0; i < statsKeys.length; i++){
            statsObject[statsKeys[i]] = 0
        }
        this.totalStats = deepCopy(statsObject)
        this.baseStats = deepCopy(statsObject)
        this.statsFromEquips = deepCopy(statsObject)
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

        if(
            !this.currentEquipment[equipmentType].name    //Right after checks is this.equipment[EQUIPMENT_TYPE_ENUM] is define.
        ) return
        
        /**@type {Equipment} */
        const equipmentInstance = new EquipmentClass(this.currentEquipment[equipmentType])
        const equipMultipliers = equipmentInstance.multipliers
        const statsWeightValues    = CS_ENUM.BALANCE_VALUES.STATS_WEIGHT

        this.statsFromEquips.hp           += this.attributes.vitality        * equipMultipliers.vitality   * statsWeightValues.HP
        this.statsFromEquips.evasion      += this.attributes.agility         * equipMultipliers.agility    * statsWeightValues.EVASION

        switch (true) {
            case equipmentInstance instanceof Weapon:
                this.statsFromEquips.fisicalDamage += this.attributes.strenght      * equipMultipliers.strenght     * statsWeightValues.FISICAL_DMG
                this.statsFromEquips.magicalDamage += this.attributes.intelligence  * equipMultipliers.intelligence * statsWeightValues.MAGICAL_DMG
                break
            case equipmentInstance instanceof Armor:
                this.statsFromEquips.fisicalDefense += this.attributes.strenght     * equipMultipliers.strenght     * statsWeightValues.FISICAL_DEF
                this.statsFromEquips.magicalDefense += this.attributes.intelligence * equipMultipliers.intelligence * statsWeightValues.MAGICAL_DEF
                break
            //
        }
    }

    /**
     * Calculate the total stats.
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
        if(this.currentHP > this.totalStats.hp) {
            this.currentHP = this.totalStats.hp
        }
    }
}
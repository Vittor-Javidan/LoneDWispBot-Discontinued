import sendMessage from "../../../Twitch/sendMessageHandler"
import dbSystem from "../database/dbSystem"
import ENUM from "./ENUM"

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

export default class Player {

    /**
     * @type {CS_Database}
     * @private
     */
    static database

    /**
     * @type {Player[]}
     * @private
     */
    static onlinePlayers = []
    
    /**
     * @type {string}
     * @private
     */
    name = ''

    /**
     * @type {playerState}
     * @private
     */
    currentState = {
        primary: ENUM.RESTING.PRIMARY,
        secondary: ENUM.RESTING.SECONDARY.JUST_RESTING
    }

    /**
     * @type {number}
     * @private
     */
    souls = 0

    /**
     * @type {number}
     * @private
     */
    level = 1

    /**
     * @type {CS_Attributes} 
     * @private
     */
    attributes = {
        [ENUM.ATTRIBUTES.VITALITY]: 1,
        [ENUM.ATTRIBUTES.AGILITY]: 1,
        [ENUM.ATTRIBUTES.STRENGHT]: 1,
        [ENUM.ATTRIBUTES.INTELLLIGENCE]: 1
    }

    /**
     * @type {CS_Entity_Equipment}
     */
    equipment = {
        [ENUM.EQUIPMENT_TYPES.LONG_RANGE_WEAPON]: {name: 'Arco de madeira'},
        [ENUM.EQUIPMENT_TYPES.MELEE_WEAPON]: {name: 'Adaga'},
        [ENUM.EQUIPMENT_TYPES.HELMET]: {name: 'Chapéu de caçador'},
        [ENUM.EQUIPMENT_TYPES.BODY_ARMOR]: {name: 'Roupa de caçador'},
        [ENUM.EQUIPMENT_TYPES.GLOVES]: {name: 'Luvas de caçador'},
        [ENUM.EQUIPMENT_TYPES.BOOTS]: {name: 'Botas de caçador'}
    }

    /**
     * @type {CS_Entity_Inventory}
     */
    inventory = {
        equipments: {}
    }

    /**
     * Create a instance of Player
     * @returns {Player}
     * @constructor
     */
    constructor(userName){
        this.name = userName
    }

    //=================================================================================================
    // CLASS METHODS ==================================================================================
    //=================================================================================================

    /**
     * @param {string} userName 
     * @returns {boolean} `True` if instance created, `False` otherwise
     */
    static init(userName){

        if(!this.database){
            this.loadDB()
        }

        const playerInstance = new Player(userName)
        playerInstance.load(userName)
        this.onlinePlayers.push(playerInstance)
        return true
    }

    /**
     * Load local database
     * @returns {void}
     */
    static loadDB(){
        this.database = dbSystem.loadDb()
    }

    /**
     * Returns the instance of the 
     * @param {string} userName 
     * @returns {Player | undefined} If undefined, that means no player was found
    */
    static getPlayerInstance(userName) {

        let playerInstance
        for(let i = 0; i < this.onlinePlayers.length; i++){
            if(userName === this.onlinePlayers[i].name){

                playerInstance = this.onlinePlayers[i]
            }
        }
        return playerInstance
    }

    //=================================================================================================
    // INSTANCE METHODS ===============================================================================
    //=================================================================================================

    /**
     * Load player information from database
     * @param {string} userName 
     * @returns 
     */
    load(userName){

        //Check for register
        if(!Player.database[`${userName}`]){
            this.save()
            sendMessage(`O jogador ${userName} acabou de se cadastrar em ChatSouls Muahaha *-*`)
            return
        }

        //Load saved player data from database
        this.checkMissingInfo()
        const playerData = Player.database[`${userName}`]

        //Replace default values for saved values
        this.souls = playerData.souls
        this.level = playerData.level
        this.attributes = playerData.attributes
        this.equipment = playerData.equipment
        this.inventory = playerData.inventory
        
        sendMessage(`/w ${userName} Seu progresso foi restaurado com sucesso`)
    }

    /**
     * Checks for missing information on player database.
     * If there is missing information due game updates, the function automatically provide a default value for it.
     */
    checkMissingInfo(){

        const playerData = Player.database[`${this.name}`]

        if(!playerData.souls) Player.database[`${this.name}`].souls = this.souls
        if(!playerData.level) Player.database[`${this.name}`].level = this.level
        if(!playerData.attributes) Player.database[`${this.name}`].attributes = this.attributes
        if(!playerData.equipment) Player.database[`${this.name}`].equipment = this.equipment
        if(!playerData.inventory) Player.database[`${this.name}`].inventory = this.inventory
        if(!playerData.inventory.equipments) Player.database[`${this.name}`].inventory.equipments = this.inventory.equipments
    }
    
    /**
     * Save player info on database
     */
    save(){
    
        /** @type {CS_EntityData} */
        const playerData = {
            name: this.name,
            souls: this.souls,
            level: this.level,
            attributes: this.attributes,
            equipment: this.equipment,
            inventory: this.inventory
        }
        
        Player.database[`${this.name}`] = playerData
        dbSystem.writeDb(Player.database)
    }

    /**
     * @returns {playerState}
     */
    getCurrentState(){
        return this.currentState
    }

    /**
     * Set player primary state
     * @param {string} ENUM_STATE 
     */
    setPrimaryState(ENUM_STATE) {
        this.currentState.primary = ENUM_STATE
    }

    /**
     * Set player secondary state
     * @param {string} ENUM_STATE 
     */
    setSecondaryState(ENUM_STATE) {
        this.currentState.secondary = ENUM_STATE
    }

    /**
     * Returns player name
     * @returns {string}
     */
    getName(){
        return this.name
    }

    /**
     * Return player level
     * @returns {number}
     */
    getLevel(){
        return this.level
    }

    /**
     * Returns player souls amount
     * @returns {number}
     */
    getSouls(){
        return this.souls
    }

    /**
     * Return attribute upgrade cost
     * @returns {number}
     */
    getUpgradeCost(){
        return this.level * 100
    }

    /**
     * Return player attributes
     * @returns {CS_Attributes} ATTRIBUTES ENUM to check the keys
     */
    getAttributes(){
        return this.attributes
    }

    /**
     * Handles attribute upgrade logics
     * @param {string} ATTRIBUTE_ENUM 
     * @returns 
     */
    upgradeAttribute(ATTRIBUTE_ENUM){

        const upgradeCost = this.getUpgradeCost()
        const soulsBalance = this.souls - upgradeCost

        if(soulsBalance < 0) {
            sendMessage(`/w ${this.name} Você não possui almas o suficiente`)
            return
        }

        switch (ATTRIBUTE_ENUM) {

            case ENUM.ATTRIBUTES.VITALITY:
                this.souls -= upgradeCost
                this.attributes[ENUM.ATTRIBUTES.VITALITY] += 1
                this.level += 1
                sendMessage(`/w ${this.name} VITALIDADE AUMENTADA! LEVEL: ${this.level} | Almas restantes: ${this.souls} | custo próximo nível: ${ this.getUpgradeCost() } | `)
                break;
            //

            case ENUM.ATTRIBUTES.AGILITY:
                this.souls -= upgradeCost
                this.attributes[ENUM.ATTRIBUTES.AGILITY] += 1
                this.level += 1
                sendMessage(`/w ${this.name} AGILIDADE AUMENTADA! LEVEL: ${this.level} | Almas restantes: ${this.souls} | custo próximo nível: ${ this.getUpgradeCost() } | `)
                break
            //

            case ENUM.ATTRIBUTES.STRENGHT:
                this.souls -= upgradeCost
                this.attributes[ENUM.ATTRIBUTES.STRENGHT] += 1
                this.level += 1
                sendMessage(`/w ${this.name} FORÇA AUMENTADA! LEVEL: ${this.level} | Almas restantes: ${this.souls} | custo próximo nível: ${ this.getUpgradeCost() } | `)
                break
            //

            case ENUM.ATTRIBUTES.INTELLLIGENCE:
                this.souls -= upgradeCost
                this.attributes[ENUM.ATTRIBUTES.INTELLLIGENCE] += 1
                this.level += 1
                sendMessage(`/w ${this.name} INTELIGÊNCIA AUMENTADA! LEVEL: ${this.level} | Almas restantes: ${this.souls} | custo próximo nível: ${ this.getUpgradeCost() } | `)
                break
            //

            default:
                console.log(`${this.name}: Invalid Upgrade Attribute`)
                break
            //
        }

        this.save()
    }

    /**
     * Returns the player current equips
     * @returns {CS_Entity_Equipment}
     */
    getEquippedEquipment(){
        return this.equipment
    }

    /**
     * Unequip player equipment by type
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
        this.save()
    }

    /**
     * Returns the equipment stored in player inventory
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
     * Return a string containing all equipment inside players inventory.
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
     * Equip a type of equipment from player inventory
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

        this.save()
    }

    /**
     * Remove and return a equipment type from player inventory using the indexArray
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
     * Remove and return a equipment type from player invetory and replaces to another
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
import sendMessage from "../../../Twitch/sendMessageHandler"
import dbSystem from "../database/dbSystem"
import ENUM from "./ENUM"

/**
 * @typedef {Object<string, CS_PlayerData>} CS_Database x is playerName string
 * 
 * @typedef {Object} CS_PlayerData
 * @property {string} playerName - player name
 * @property {number} souls - Currency of ChatSouls
 * @property {number} level - Player level
 * @property {CS_Player_Attributes} attributes
 * @property {CS_Player_Equipped} equipment
 * @property {CS_Player_Inventory} inventory
 * 
 * @typedef {Object} CS_Player_Attributes
 * @property {number} vitality
 * @property {number} agility
 * @property {number} strenght
 * @property {number} intelligence
 * 
 * @typedef {Object} CS_Player_Equipped
 * @property {CS_Player_EquippedData} longRangeWeapon
 * @property {CS_Player_EquippedData} meleeWeapon
 * @property {CS_Player_EquippedData} helmet
 * @property {CS_Player_EquippedData} bodyArmor
 * @property {CS_Player_EquippedData} gloves
 * @property {CS_Player_EquippedData} boots
 * 
 * @typedef {Object} CS_Player_Inventory
 * @property {CS_Player_Inventory_Equipment} equipment
 * 
 * @typedef {Object } CS_Player_Inventory_Equipment
 * @property {CS_Player_EquippedData[]} longRangeWeapon
 * @property {CS_Player_EquippedData[]} meleeWeapon
 * @property {CS_Player_EquippedData[]} helmet
 * @property {CS_Player_EquippedData[]} bodyArmor
 * @property {CS_Player_EquippedData[]} gloves
 * @property {CS_Player_EquippedData[]} boots
 * 
 * @typedef {Object} CS_Player_EquippedData
 * @property {string} name
*/

/**
 * @typedef {Object} playerState
 * @property {string} primary
 * @property {string} secondary
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
    playerName = ''

    /**
        * Player current state
        * @type {playerState}
        * @private
        */
    playerState = {
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
     * @type {CS_Player_Attributes}
     * @private
     */
    attributes = {
        vitality: 1,
        agility: 1,
        strenght: 1,
        intelligence: 1
    }

    /**
     * @type {CS_Player_Equipped}
     */
    equipment = {
        longRangeWeapon: {name: 'Wooden Bow'},
        meleeWeapon: {name: 'Dagger'},
        helmet: {name: 'Hunter Hat'},
        bodyArmor: {name: 'Hunter Vest'},
        gloves: {name: 'Hunter Gloves'},
        boots: {name: 'Hunter Boots'}
    }

    /**
     * @type {CS_Player_Inventory}
     */
    inventory = {
        equipment: {}
    }

    /**
     * Create a instance of Player
     * @returns {Player}
     * @constructor
     */
    constructor(userName){
        this.playerName = userName
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
            if(userName === this.onlinePlayers[i].playerName){

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

        const playerData = Player.database[`${this.playerName}`]

        if(!playerData.souls) Player.database[`${this.playerName}`].souls = this.souls
        if(!playerData.level) Player.database[`${this.playerName}`].level = this.level
        if(!playerData.attributes) Player.database[`${this.playerName}`].attributes = this.attributes
        if(!playerData.equipment) Player.database[`${this.playerName}`].equipment = this.equipment
        if(!playerData.inventory) Player.database[`${this.playerName}`].inventory = this.inventory
    }
    
    /**
     * Save player info on database
     */
    save(){
    
        /** @type {CS_PlayerData} */
        const playerData = {
            playerName: this.playerName,
            souls: this.souls,
            level: this.level,
            attributes: this.attributes,
            equipment: this.equipment,
            inventory: this.inventory
        }
        
        Player.database[`${this.playerName}`] = playerData
        dbSystem.writeDb(Player.database)
    }

    /**
     * @returns {playerState}
     */
    getPlayerState(){
        return this.playerState
    }

    /**
     * Set player primary state
     * @param {string} ENUM_STATE 
     */
    setPlayerState_Primary(ENUM_STATE) {
        this.playerState.primary = ENUM_STATE
    }

    /**
     * Set player secondary state
     * @param {string} ENUM_STATE 
     */
    setPlayerState_Secondary(ENUM_STATE) {
        this.playerState.secondary = ENUM_STATE
    }

    /**
     * Returns player name
     * @returns {string}
     */
    getPlayerName(){
        return this.playerName
    }

    /**
     * Return player level
     * @returns {number}
     */
    getPlayerLevel(){
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
     * @returns {CS_Player_Attributes}
     */
    getPlayerAttibutes(){
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
            sendMessage(`/w ${this.playerName} Você não possui almas o suficiente`)
            return
        }

        switch (ATTRIBUTE_ENUM) {

            case ENUM.ATTRIBUTES.VITALITY:
                this.souls -= upgradeCost
                this.attributes.vitality += 1
                this.level += 1
                sendMessage(`/w ${this.playerName} VITALIDADE AUMENTADA! LEVEL: ${this.level} | Almas restantes: ${this.souls} | custo próximo nível: ${ this.getUpgradeCost() } | `)
                break;
            //

            case ENUM.ATTRIBUTES.AGILITY:
                this.souls -= upgradeCost
                this.attributes.agility += 1
                this.level += 1
                sendMessage(`/w ${this.playerName} AGILIDADE AUMENTADA! LEVEL: ${this.level} | Almas restantes: ${this.souls} | custo próximo nível: ${ this.getUpgradeCost() } | `)
                break
            //

            case ENUM.ATTRIBUTES.STRENGHT:
                this.souls -= upgradeCost
                this.attributes.strenght += 1
                this.level += 1
                sendMessage(`/w ${this.playerName} FORÇA AUMENTADA! LEVEL: ${this.level} | Almas restantes: ${this.souls} | custo próximo nível: ${ this.getUpgradeCost() } | `)
                break
            //

            case ENUM.ATTRIBUTES.INTELLLIGENCE:
                this.souls -= upgradeCost
                this.attributes.intelligence += 1
                this.level += 1
                sendMessage(`/w ${this.playerName} INTELIGÊNCIA AUMENTADA! LEVEL: ${this.level} | Almas restantes: ${this.souls} | custo próximo nível: ${ this.getUpgradeCost() } | `)
                break
            //

            default:
                sendMessage(`Invalid Upgrade Attribute`)
                console.log(`${this.playerName}: Invalid Upgrade Attribute`)
                break
            //
        }

        this.save()
    }

    /**
     * Returns the player current equips
     * @returns {CS_Player_Equipped}
     */
    getPlayerEquipment(){
        return this.equipment
    }

    /**
     * Unequip player equipment by type
     * @param {import("./ENUM").EQUIPMENT_TYPES} type - Type of selected equipment
     * @returns {void}
     */
    unequip(type){

        const unequippedWeapon = this.equipment[type]

        if(!this.inventory.equipment[type]) {
            this.inventory.equipment[type] = [unequippedWeapon]
        } else {
            this.inventory.equipment[type].push(unequippedWeapon)
        }
        
        delete this.equipment[type]
        
        sendMessage(`/w @${this.playerName} ${unequippedWeapon.name} foi desequipada`)
        this.inventory.equipment[type].sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })
        this.save()
    }

    /**
     * Returns the equipment stored in player inventory
     * @returns {CS_Player_Inventory_Equipment}
     */
    getPlayerInvetoryEquipment(){
        return this.inventory.equipment
    }

    /**
     * Return a string containing all equipment inside players inventory.
     * Output example: `| 1. itemName_1 | 2. itemName_2 | ... | n. itemName_n |`
     * 
     * @param {import("./ENUM").EQUIPMENT_TYPES} type - Type of selected equipment
     * @returns {string | undefined}
     */
    getInventoryEquipmentByType_StringFormat(type){

        let equipment = this.inventory.equipment[type]
        
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
     * Equip a type of equipment
     * @param {import("./ENUM").EQUIPMENT_TYPES} type - Type of selected equipment
     * @param {number} itemCode
     * @returns {void}
     */
    setEquipment(itemCode, type) {

        const itemIndex = itemCode - 1

        //`False` if there is no weapon equiped, `True` otherwise
        this.equipment[type]
            ? this.equipment[type] = this.replaceInventoryEquipment(itemIndex, this.equipment[type], type)
            : this.equipment[type] = this.removeInventoryEquipment(itemIndex, type)
        //

        this.save()
    }

    /**
     * Remove and return a equipment type from player inventory using the indexArray
     * @param {number} itemIndex 
     * @param {import("./ENUM").EQUIPMENT_TYPES} type - Type of selected equipment
     * @returns {CS_Player_EquippedData}
     */
    removeInventoryEquipment(itemIndex, type){

        const itemRemoved = this.inventory.equipment[type].splice(itemIndex, 1)
        if (this.inventory.equipment[type].length === 0) {
            delete this.inventory.equipment[type]
        }
        return itemRemoved[0]
    }

    /**
     * Remove and return a equipment type from player invetory and replaces to another
     * @param {number} itemIndex 
     * @param {string} itemToReplace 
     * @param {import("./ENUM").EQUIPMENT_TYPES} type - Type of selected equipment
     */
    replaceInventoryEquipment(itemIndex, itemToReplace, type){

        const itemRemoved = this.inventory.equipment[type].splice(itemIndex, 1, itemToReplace)
        this.inventory.equipment[type].sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })
        return itemRemoved[0]
    }

}
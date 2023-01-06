import sendMessage from "../../../../Twitch/sendMessageHandler"
import DbSystem from "../../database/DbSystem"
import Entity from "../Entity"
import CHATSOULS_ENUM from "../ENUM"

/**
 * @typedef {import ('../../TypeDefinitions/Types').CS_Database} CS_Database
 * @typedef {import ('../../TypeDefinitions/Types').CS_EntityData} CS_EntityData
 * @typedef {import ('../../TypeDefinitions/Types').CS_Attributes} CS_Attributes
 * @typedef {import ('../../TypeDefinitions/Types').CS_Entity_Equipment} CS_Entity_Equipment
 * @typedef {import ('../../TypeDefinitions/Types').CS_EquipmentData} CS_EquipmentData
 * @typedef {import ('../../TypeDefinitions/Types').CS_Entity_Inventory} CS_Entity_Inventory
 * @typedef {import ('../../TypeDefinitions/Types').CS_Inventory_Equipments} CS_Inventory_Equipments
 * @typedef {import ('../../TypeDefinitions/Types').playerState} playerState
*/

export default class Player extends Entity {

    /**
     * - keys: `player name string`
     * @type {CS_Database}
     * @private
     */
    static database = DbSystem.loadDb()

    /**
     * @type {Player[]}
     * @private
     */
    static onlinePlayers = []

    /**
     * @type {playerState}
     * @private
     */
    currentState = {
        primary: CHATSOULS_ENUM.STATES.RESTING.PRIMARY,
        secondary: CHATSOULS_ENUM.STATES.RESTING.SECONDARY.JUST_RESTING
    }

    /**
     * @type {string} - type: `MAP_AREAS ENUM`
     */
    currentLocation = CHATSOULS_ENUM.MAP_AREAS.THE_WOODS

    /**
     * used to define if player can play in some situations
     * @type {boolean}
     */
    canPlay = true

    /**
     * Create a instance of Player
     * @returns {Player}
     * @constructor
     */
    constructor(userName){
        
        super(userName)
        
        const attributeTypes = CHATSOULS_ENUM.TYPES.ATTRIBUTE_TYPES
        const playerAttributes = CHATSOULS_ENUM.BALANCE.PLAYER_START.ATTRIBUTES
        this.attributes = {
            [attributeTypes.VITALITY]:      playerAttributes.VITALITY,
            [attributeTypes.AGILITY]:       playerAttributes.AGILITY,
            [attributeTypes.STRENGHT]:      playerAttributes.STRENGHT,
            [attributeTypes.INTELLLIGENCE]: playerAttributes.INTELLLIGENCE
        }

        const equipTypes = CHATSOULS_ENUM.TYPES.EQUIPMENT_TYPES
        const playerEquips = CHATSOULS_ENUM.BALANCE.PLAYER_START.EQUIPMENTS
        this.equipment = {
            [equipTypes.LONG_RANGE_WEAPON]: playerEquips.LONG_RANGE_WEAPON,
            [equipTypes.MELEE_WEAPON]:      playerEquips.MELEE_WEAPON,
            [equipTypes.HELMET]:            playerEquips.HELMET,
            [equipTypes.BODY_ARMOR]:        playerEquips.BODY_ARMOR,
            [equipTypes.GLOVES]:            playerEquips.GLOVES,
            [equipTypes.BOOTS]:             playerEquips.BOOTS
        }
    }

    //=================================================================================================
    // CLASS METHODS ==================================================================================
    //=================================================================================================

    /**
     * @param {string} userName 
     * @returns {boolean} `True` if instance created, `False` otherwise
     */
    static init(userName){

        const playerInstance = new Player(userName)
        playerInstance.load(userName)
        playerInstance.calculateStats()
        playerInstance.recoverHP()
        this.loginPlayer(playerInstance)
        return true
    }

    /**
     * @param {Player}
     */
    static loginPlayer(playerInstance){
        this.onlinePlayers.push(playerInstance)
    }

    /**
     * Load local database
     * @returns {void}
     */
    static loadDB(){
        this.database = DbSystem.loadDb()
    }

    /**
     * Returns the instance of the player
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

    static deletePlayerInstance(userName) {
        for (let i = 0; i < this.onlinePlayers.length; i++) {
            if (userName === this.onlinePlayers[i].getName()) {
                this.onlinePlayers.splice(i, 1)
            }
        }
    }

    //=================================================================================================
    // INSTANCE METHODS ===============================================================================
    //=================================================================================================

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
        DbSystem.writeDb(Player.database)
    }

    /**
     * Load player information from database
     * @param {string} userName 
     * @returns {string}
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
        this.souls      =   playerData.souls
        this.level      =   playerData.level
        this.attributes =   playerData.attributes
        this.equipment  =   playerData.equipment
        this.inventory  =   playerData.inventory
        
        sendMessage(`/w ${userName} Seu progresso foi restaurado com sucesso`)
    }

    /**
     * Checks for missing information on player database.
     * If there is missing information due game updates, the function automatically provide a default value for it.
     */
    checkMissingInfo(){

        const playerData = Player.database[`${this.name}`]

        if(!playerData.souls)       Player.database[`${this.name}`].souls = this.souls
        if(!playerData.level)       Player.database[`${this.name}`].level = this.level
        if(!playerData.attributes)  Player.database[`${this.name}`].attributes = this.attributes
        if(!playerData.equipment)   Player.database[`${this.name}`].equipment = this.equipment
        if(!playerData.inventory)   Player.database[`${this.name}`].inventory = this.inventory
        if(!playerData.inventory.equipments) Player.database[`${this.name}`].inventory.equipments = this.inventory.equipments
    }

    /**
     * Get player current state
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
     * Return attribute upgrade cost
     * @returns {number}
     */
    getUpgradeCost(){
        return this.level * 100
    }

    /**
     * Handles attribute upgrade logics
     * @param {string} ATTRIBUTE_ENUM 
     * @returns 
     */
    upgradeAttribute(ATTRIBUTE_ENUM){

        const upgradeCost = this.getUpgradeCost()

        this.souls -= upgradeCost
        this.attributes[ATTRIBUTE_ENUM] += 1
        this.level += 1
        this.calculateStats()
        this.recoverHP()
        this.save()
    }

    /**
     * Unequip player equipment by type
     * @param {string} EQUIPMENT_TYPE_ENUM - Type of selected equipment
     * @returns {void}
     */
    unequipEquipment(EQUIPMENT_TYPE_ENUM){

        super.unequipEquipment(EQUIPMENT_TYPE_ENUM)
        this.calculateStats()
        this.save()
    }

    /**
     * Equip a type of equipment from player inventory
     * @param {string} EQUIPMENT_TYPE_ENUM
     * @param {number} itemCode
     * @returns {void}
     */
    setEquippedEquipment(itemCode, EQUIPMENT_TYPE_ENUM) {

        super.setEquippedEquipment(itemCode, EQUIPMENT_TYPE_ENUM)
        this.calculateStats()
        this.save()
    }

    /**
     * Returns the player current location. The return string type is a `MAP_AREAS ENUM`
     * @returns {string}
     */
    getCurrentLocation() {
        return this.currentLocation
    }

    delayPlayerAction(milisseconds){
        
        this.canPlay = false
        const delay = setInterval(() => {
            this.canPlay = true
            clearDelayTimer()
        }, milisseconds)

        function clearDelayTimer(){
            clearInterval(delay)
        }
    }

    getCanPLay() {
        return this.canPlay
    }
}
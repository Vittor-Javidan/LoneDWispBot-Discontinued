import sendMessage from "../../../../Twitch/sendMessageHandler"
import DbSystem from "../../database/DbSystem"
import Entity from "../Entity"
import CS_ENUM from "../ENUM"

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
        primary: CS_ENUM.STATES.RESTING.PRIMARY,
        secondary: CS_ENUM.STATES.RESTING.SECONDARY.JUST_RESTING
    }

    /**
     * @type {string} - type: `MAP_AREAS ENUM`
     */
    currentLocation = CS_ENUM.MAP_AREAS.THE_WOODS

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
        
        const attributeTypes = CS_ENUM.KEYS.CS_ATTRIBUTES
        const playerAttributes = CS_ENUM.BALANCE_VALUES.PLAYER_START.ATTRIBUTES
        this.attributes = {
            [attributeTypes.VITALITY]:      playerAttributes.VITALITY,
            [attributeTypes.AGILITY]:       playerAttributes.AGILITY,
            [attributeTypes.STRENGHT]:      playerAttributes.STRENGHT,
            [attributeTypes.INTELLLIGENCE]: playerAttributes.INTELLLIGENCE
        }

        const equipTypes = CS_ENUM.KEYS.CS_ENTITY_EQUIPMENT
        const playerEquips = CS_ENUM.BALANCE_VALUES.PLAYER_START.EQUIPMENTS
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
        this.updateMissingInfo()
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
    updateMissingInfo(){

        const playerData = Player.database[`${this.name}`]

        if(!playerData.souls)       Player.database[`${this.name}`].souls = this.souls
        if(!playerData.level)       Player.database[`${this.name}`].level = this.level
        if(!playerData.attributes)  Player.database[`${this.name}`].attributes = this.attributes
        if(!playerData.equipment)   Player.database[`${this.name}`].equipment = this.equipment
        if(!playerData.inventory)   Player.database[`${this.name}`].inventory = this.inventory
        if(!playerData.inventory.equipments)    Player.database[`${this.name}`].inventory.equipments = this.inventory.equipments
        if(!playerData.inventory.resources)     Player.database[`${this.name}`].inventory.resources = this.inventory.resources
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
     * @param {string} STATE 
     */
    setPrimaryState(STATE) {
        this.currentState.primary = STATE
    }

    /**
     * Set player secondary state
     * @param {string} STATE 
     */
    setSecondaryState(STATE) {
        this.currentState.secondary = STATE
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
     * @param {string} KEYS_CS_ATTRIBUTES 
     * @returns 
     */
    upgradeAttribute(KEYS_CS_ATTRIBUTES){

        const upgradeCost = this.getUpgradeCost()

        this.souls -= upgradeCost
        this.attributes[KEYS_CS_ATTRIBUTES] += 1
        this.level += 1
        this.calculateStats()
        this.recoverHP()
        this.save()
    }

    /**
     * Unequip player equipment by type
     * @param {string} KEYS_CS_ENTITY_EQUIPMENT - Type of selected equipment
     * @returns {void}
     */
    unequipEquipment(KEYS_CS_ENTITY_EQUIPMENT){

        super.unequipEquipment(KEYS_CS_ENTITY_EQUIPMENT)
        this.calculateStats()
        this.save()
    }

    /**
     * Equip a type of equipment from player inventory
     * @param {string} KEYS_CS_ENTITY_EQUIPMENT
     * @param {number} itemCode
     * @returns {void}
     */
    setEquippedEquipment(itemCode, KEYS_CS_ENTITY_EQUIPMENT) {

        super.setEquippedEquipment(itemCode, KEYS_CS_ENTITY_EQUIPMENT)
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
import sendMessage from "../../../../Twitch/sendMessageHandler"
import deepCopy from "../../../../Utils/deepCopy"
import DbSystem, { playerDataBasePath } from "../../database/DbSystem"
import Entity from "../Entity"
import CS_ENUM from "../ENUM"
import EQUIPMENT_TYPES from "../EquipmentChilds/EQUIPMENT_TYPES"
import PLAYER_STATES from "./PLAYER_STATES"

/**
 * @typedef {import ('../../TypeDefinitions/Types').CS_Database} CS_Database
 * @typedef {import ('../../TypeDefinitions/Types').CS_EntityData} CS_EntityData
 * @typedef {import ('../../TypeDefinitions/Types').CS_Attributes} CS_Attributes
 * @typedef {import ('../../TypeDefinitions/Types').CS_Entity_Equipment} CS_Entity_Equipment
 * @typedef {import ('../../TypeDefinitions/Types').CS_PlayerState} CS_playerState
 * @typedef {import ('../../TypeDefinitions/Types').CS_PlayerPayload} CS_PlayerPayload
*/

const equipmentKeys = Object.values(EQUIPMENT_TYPES)

export default class Player extends Entity {

    /**
     * @type {CS_Database}
     */
    static #database = DbSystem.loadDb(playerDataBasePath)

    /**
     * @type {Player[]}
     */
    static #onlinePlayers = []

    /**
     * @type {CS_playerState}
     */
    #currentState = {
        primary: PLAYER_STATES.FIRE_PIT.PRIMARY,
        secondary: PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT
    }

    /**
     * @type {string} - type: `MAP_AREAS ENUM`
     */
    #currentLocation = CS_ENUM.MAP_AREAS.THE_WOODS

    /**
     * used to define if player can play in some situations
     * @type {boolean}
     */
    #canPlay = true

    /**@type {boolean} */
    isNewPlayer = false

    /**
     * @param {string} name
     * @returns {Player}
     * @constructor
     */
    constructor(name){
        super(true, name)
        
        const playerAttributes = CS_ENUM.BALANCE_VALUES.PLAYER_START.ATTRIBUTES
        this.attributes = {
            vitality:       playerAttributes.VITALITY,
            agility:        playerAttributes.AGILITY,
            strenght:       playerAttributes.STRENGHT,
            intelligence:   playerAttributes.INTELLLIGENCE
        }

        const playerEquips = CS_ENUM.BALANCE_VALUES.PLAYER_START.EQUIPMENTS
        this.currentEquipment = {
            longRangeWeapon:    playerEquips.LONG_RANGE_WEAPON,
            meleeWeapon:        playerEquips.MELEE_WEAPON,
            helmet:             playerEquips.HELMET,
            bodyArmor:          playerEquips.BODY_ARMOR,
            gloves:             playerEquips.GLOVES,
            boots:              playerEquips.BOOTS
        }
    }

    //=================================================================================================
    // GETTERS AND SETTERS ============================================================================
    //=================================================================================================

    /**
     * - keys: `player name string`
     * @return {CS_Database} Getter
     */
    static get database() {
        return this.#database
    }

    /**
     * @param {CS_Database} data
     */
    static set database(data) {

        if(!data.Authorization || !data.Authorization.key) {
            throw Error(`ERROR: Player class, "database" setter. You probably sending wrong data to replace the actual data base.`)
        }
        this.#database = data
    }

    /**
     * Setter only. Sets the player info inside class pre loaded database. 
     * To really save the player data, use the instance method save() after set 
     * the player data using this.
     * @param {CS_EntityData} playerData
     */
    static set sendToDataBase(playerData) {

        if(!playerData.name) throw Error(`ERROR: Player class, "sendToDataBase" setter: playerData must have at least a name.`)
        
        this.#database[playerData.name] = deepCopy(playerData)
    }

    /**
     * @returns {Player[]} Getter
     */ 
    static get onlinePlayers() {
        return this.#onlinePlayers
    }

    /**
     * @param {Player[]} playerArray Setter
     */
    static set onlinePlayers(playerArray) {

        for(let i = 0; i < playerArray.length; i++) {
            if(!(playerArray[i] instanceof Player)) throw Error(`ERROR, Player class, "onlinePlayer" setter: only array of players are allowed`)
        }

        this.#onlinePlayers = playerArray
    }

    /**
     * @returns {CS_playerState} Getter
     */
    get currentState() {
        return this.#currentState
    }

    /**
     * @param {CS_playerState} stateObject Setter
     */
    set currentState(stateObject) {
        this.#currentState = deepCopy(stateObject)
    }

    /**
     * @returns {string} Getter
     */
    get primaryState() {
        return this.#currentState.primary
    }

    /**
     * @param {string} state Setter
     */
    set primaryState(state) {
        this.#currentState.primary = state
    }

    /**
     * @returns {string} Getter
     */
    get secondaryState() {
        return this.#currentState.secondary
    }

    /**
     * @param {string} state Setter
     */
    set secondaryState(state) {
        this.#currentState.secondary = state
    }

    /**
     * @returns {string} Getter
     */
    get currentLocation() {
        return this.#currentLocation
    }

    /**
     * @param {string} mapName Setter
     */
    set currentLocation(mapName) {
        this.#currentLocation = mapName
    }

    /**
     * @returns {boolean} Getter
     */
    get canPlay() {
        return this.#canPlay
    }

    /**
     * @param {boolean} boolean Setter
     */
    set canPlay(boolean) {

        if(typeof boolean !== 'boolean') throw Error(`ERROR: Player class, "canPlay" setter: you can only set booleans`)

        this.#canPlay = boolean
    }

    //=================================================================================================
    // CLASS METHODS ==================================================================================
    //=================================================================================================

    /**
     * Force save database current info.
     * Use with caution.
     */
    static forceSaveDataBase(){
        DbSystem.writeDb(this.database, playerDataBasePath)
    }

    /**
     * @param {string} userName 
     * @returns {Player}
     */
    static startGame(userName){

        const playerInstance = new Player(userName)

        this.register(playerInstance)
        this.updateDataBaseMissingInfo(playerInstance)
        this.loginPlayerInstance(playerInstance)

        playerInstance.load()
        playerInstance.calculateStats()
        playerInstance.recoverHP()

        return playerInstance
    }

    /**
     * Register new players on database. Sends `True` if player was registered, `False` otherwise
     * @param {Player} playerInstance 
     * @returns {boolean}
     */
    static register(playerInstance){

        if(!Player.database[`${playerInstance.getName()}`]){
            
            playerInstance.isNewPlayer = true
            Player.sendToDataBase = {
                name: playerInstance.getName()
            }
            return
        }
        
        playerInstance.isNewPlayer = false
    }

    /**
     * Checks for missing information on player database.
     * If there is missing information due game updates, the function automatically provide a default value for it.
     * @param {Player} playerInstance
     */
    static updateDataBaseMissingInfo(playerInstance){

        const playerName = playerInstance.getName()
        const playerData = this.database[`${playerName}`]

        if(!playerData.souls)                   playerData.souls = playerInstance.souls
        if(!playerData.level)                   playerData.level = playerInstance.level
        if(!playerData.attributes)              playerData.attributes = deepCopy(playerInstance.attributes)
        if(!playerData.equipment)               playerData.equipment = deepCopy(playerInstance.currentEquipment)
        if(!playerData.inventory)               playerData.inventory = deepCopy(playerInstance.inventory)
        if(!playerData.inventory.equipments)    playerData.inventory.equipments = deepCopy(playerInstance.inventoryEquipments)
        if(!playerData.inventory.resources)     playerData.inventory.resources = deepCopy(playerInstance.inventoryResources)

        
        for(let i = 0; i < equipmentKeys.length; i++){
            if(!playerData.inventory.equipments[equipmentKeys[i]]) {
                playerData.inventory.equipments[equipmentKeys[i]] = deepCopy(playerInstance.inventoryEquipments[equipmentKeys[i]])
            }
        }
        
        this.sendToDataBase = playerData
    }

    /**
     * Return `True` if player has started the game, `False` otherwise
     * @param {string} userName
     * @returns {boolean}
     */
    static isLogged(userName){
        for(let i = 0; i < this.onlinePlayers.length; i++){
            if(userName === this.onlinePlayers[i].getName()){
                return true
            }
        }
        return false
    }

    /**
     * @param {Player} playerInstance
     */
    static loginPlayerInstance(playerInstance){

        for (let i = 0; i < this.onlinePlayers.length; i++){
            if (this.onlinePlayers[i].getName() === playerInstance.getName()){
                throw Error('ERROR: Player is already logged. Use this method only when a player is not logged in the game')
            }
        }
        this.onlinePlayers.push(playerInstance)
    }

    /**
     * logout player instance
     * @param {Player} playerInstance 
     */
    static logoutPlayerInstance(playerInstance) {
        for (let i = 0; i < this.onlinePlayers.length; i++) {
            if (playerInstance.getName() === this.onlinePlayers[i].getName()) {
                this.onlinePlayers.splice(i, 1)
                return
            }
        }
        throw Error(`ERROR: Player class, "logoutPlayerInstance" method: player instance is not logged`)
    }

    /**
     * Returns the instance of the player
     * @param {string} userName 
     * @returns {Player | undefined} If undefined, that means no player was found
    */
    static getPlayerInstanceByName(userName) {
        for(let i = 0; i < this.onlinePlayers.length; i++){
            if(userName === this.onlinePlayers[i].getName()){
                return this.onlinePlayers[i]
            }
        }
        throw Error(`ERROR: Player class, "getPlayerInstanceByName" method: cannot get a instance that is not inside onlinePlayers array`)
    }

    //=================================================================================================
    // INSTANCE METHODS ===============================================================================
    //=================================================================================================

    /**
     * Load player information from database
     * @returns {string}
     */
    load(){

        //Load saved player data from database
        
        const playerData = Player.database[`${this.getName()}`]

        //Replace default values for saved values
        this.souls      =   playerData.souls
        this.level      =   playerData.level
        this.attributes =   playerData.attributes
        this.currentEquipment  =   playerData.equipment
        this.inventory  =   playerData.inventory
        
        sendMessage(`/w ${this.getName()} Seu progresso foi restaurado com sucesso`)
    }

    /**
     * Save player info on database
     */
    save(){
    
        /** @type {CS_EntityData} */
        const playerData = {
            name: this.getName(),
            souls: this.souls,
            level: this.level,
            attributes: this.attributes,
            equipment: this.currentEquipment,
            inventory: this.inventory
        }
        
        Player.sendToDataBase = playerData
        DbSystem.writeDb(Player.database, playerDataBasePath)
    }

    /**
     * Return attribute upgrade cost
     * @returns {number}
     */
    getUpgradeCost(){
        return this.level * 100
    }

    /**
     * Handles attribute upgrade logics when add 1 attribute point for a player
     * @param {string} KEYS_CS_ATTRIBUTES 
     * @returns 
     */
    upgradeAttributeProcessHandler(KEYS_CS_ATTRIBUTES){

        const upgradeCost = this.getUpgradeCost()

        this.decreaseSouls(upgradeCost)
        this.addAttributes(KEYS_CS_ATTRIBUTES)
        this.addLevel()
        this.calculateStats()
        this.recoverHP()
        this.save()
    }

    /**
     * Delay player action for given amount of milisseconds.
     * Use it when you want to want player to stop playing in some situations,
     * like when you need to send many messages to a player, and you have
     * to send then slower, so twitch don't think you are spamming
     * using their API.
     *  
     * @param {number} milisseconds 
     */
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
}
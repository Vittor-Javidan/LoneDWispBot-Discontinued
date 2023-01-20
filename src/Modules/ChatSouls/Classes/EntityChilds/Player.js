import deepCopy from "../../../../Utils/deepCopy"
import DbSystem, { playerDataBasePath } from "../../database/DbSystem"
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES"
import { PLAYER_DEFAULT } from "../../Globals/PLAYER_DEFAULT"
import Entity from "../Entity"

/** See `Types.js` to understand the types
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
     * used to define if player can play or not in some situations
     * @type {boolean}
     */
    #canPlay = true

    /**@type {boolean} */
    isNewPlayer = false

    /**
     * @type {CS_playerState}
     */
    #currentState = deepCopy(PLAYER_DEFAULT.STATES)

    /**
     * @type {string} - type: `MAP_AREAS ENUM`
     */
    #currentLocation = PLAYER_DEFAULT.CURRENT_LOCATION

    /**
     * @param {string} name
     * @returns {Player}
     * @constructor
     */
    constructor(name){
        super(true, name)
        this.setAttributes(deepCopy(PLAYER_DEFAULT.ATTRIBUTES))
        this.setCurrentEquipment(deepCopy(PLAYER_DEFAULT.EQUIPMENTS))
    }

    //=================================================================================================
    // GETTERS AND SETTERS ============================================================================
    //=================================================================================================

    /** Getter
     * - keys: `player name string`
     * @return {CS_Database} Getter
     */
    static getDatabase() {
        return this.#database
    }

    /** Setter
     * @param {CS_Database} data
     */
    static setDatabase(data) {

        if(!data.Authorization || !data.Authorization.key) {
            throw Error(`ERROR: Player class, "database" setter. You probably sending wrong data to replace the actual data base.`)
        }
        this.#database = data
    }

    /** Getter
     * @param {string} playerName
     * @returns {CS_EntityData}
     */
    static getPlayerData(playerName) {

        return this.#database[playerName]
    }

    /** Setter
     * @param {CS_EntityData} playerData
     */
    static setPlayerData(playerData) {

        if(!playerData.name) {
            throw Error(`ERROR: Player class, "playerData" setter: playerData must have at least a name.`)
        }
        this.#database[playerData.name] = deepCopy(playerData)
    }

    /** Getter
     * @returns {Player[]} 
     */ 
    static getOnlinePlayers() {
        return this.#onlinePlayers
    }

    /** Setter
     * @param {Player[]} playerArray 
     */
    static setOnlinePlayers(playerArray) {

        for(let i = 0; i < playerArray.length; i++) {
            if(!(playerArray[i] instanceof Player)) {
                throw Error(`ERROR, Player class, "onlinePlayer" setter: only array of players are allowed`)
            }
        }
        this.#onlinePlayers = playerArray
    }

    /** Getter
     * @returns {CS_playerState}
     */
    getCurrentState() {
        return this.#currentState
    }

    /** Setter
     * @param {CS_playerState} stateObject
     */
    setCurrentState(stateObject) {
        this.#currentState = deepCopy(stateObject)
    }

    /** Getter
     * @returns {string} 
     */
    getPrimaryState() {
        return this.#currentState.primary
    }

    /** Setter
     * @param {string} state 
     */
    setPrimaryState(state) {
        this.#currentState.primary = state
    }

    /** Getter
     * @returns {string} 
     */
    getSecondaryState() {
        return this.#currentState.secondary
    }

    /** Setter
     * @param {string} state 
     */
    setSecondaryState(state) {
        this.#currentState.secondary = state
    }

    /**
     * @returns {string} Getter
     */
    getCurrentLocation() {
        return this.#currentLocation
    }

    /**
     * @param {string} mapName Setter
     */
    setCurrentLocation(mapName) {
        this.#currentLocation = mapName
    }

    /**
     * @returns {boolean} Getter
     */
    getCanPlay() {
        return this.#canPlay
    }

    /**
     * @param {boolean} boolean Setter
     */
    setCanPlay(boolean) {

        if(typeof boolean !== 'boolean') throw Error(`ERROR: Player class, "canPlay" setter: you can only set booleans`)

        this.#canPlay = boolean
    }

    //=================================================================================================
    // CLASS METHODS ==================================================================================
    //=================================================================================================

    static forceUpdateDatabase() {

        this.forEachUser(userName => Player.startGame(userName))
        this.forceSaveDataBase()
        this.forEachUser(userName => Player.logoutPlayerInstanceByName(userName))
    }

    /**
     * @param {function((userName: string) => {}): void} callBack
     * @returns {void}
     */
    static forEachUser(callBack){

        const users = Object.keys(Player.getDatabase())
        users.forEach(userName => {if(userName !== "Authorization") {
            callBack(userName)
        }})
    }

    /**
     * Force save local database current info.
     * Use with caution.
     */
    static forceSaveDataBase(){
        DbSystem.writeDb(this.getDatabase(), playerDataBasePath)
    }

    /**
     * Deletes Player From LOCAL database, use with caution.
     * To delete for good, force save right after.
     * @param {string} userName
     * @param {boolean} areYouSure 
     */
    static deletePlayer(userName, areYouSure){
        if(areYouSure) {
            delete Player.#database[userName]
        }
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

        if(!Player.getPlayerData(`${playerInstance.getName()}`)){
            
            playerInstance.isNewPlayer = true
            Player.setPlayerData({
                name: playerInstance.getName()
            })
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
        const playerData = this.getPlayerData(`${playerName}`)

        if(!playerData.souls)                   playerData.souls                = playerInstance.getSouls()
        if(!playerData.level)                   playerData.level                = playerInstance.getlevel()
        if(!playerData.attributes)              playerData.attributes           = deepCopy(playerInstance.getAttributes())
        if(!playerData.equipment)               playerData.equipment            = deepCopy(playerInstance.getCurrentEquipment())
        if(!playerData.inventory)               playerData.inventory            = deepCopy(playerInstance.getInventory())
        if(!playerData.inventory.equipments)    playerData.inventory.equipments = deepCopy(playerInstance.getInventoryEquipments())
        if(!playerData.inventory.resources)     playerData.inventory.resources  = deepCopy(playerInstance.getInventoryResources())

        const inventoryEquipments = playerInstance.getInventoryEquipments_KV()
        for(let i = 0; i < equipmentKeys.length; i++){
            if(!playerData.inventory.equipments[equipmentKeys[i]]) {
                playerData.inventory.equipments[equipmentKeys[i]] = deepCopy(inventoryEquipments[equipmentKeys[i]])
            }
        }
        
        this.setPlayerData(playerData) 
    }

    /**
     * Return `True` if player has started the game, `False` otherwise
     * @param {string} userName
     * @returns {boolean}
     */
    static isLogged(userName){
        for(let i = 0; i < this.getOnlinePlayers().length; i++){
            if(userName === this.getOnlinePlayers()[i].getName()){
                return true
            }
        }
        return false
    }

    /**
     * @param {Player} playerInstance
     */
    static loginPlayerInstance(playerInstance){

        this.getOnlinePlayers().forEach(player => {
            if(player.getName() === playerInstance.getName()) {
                throw Error('ERROR: Player is already logged. Use this method only when a player is not logged in the game')
            }
        })
        this.getOnlinePlayers().push(playerInstance)
    }

    /**
     * logout player instance
     * @param {Player} playerInstance 
     */
    static logoutPlayerInstance(playerInstance) {

        for (let i = 0; i < this.getOnlinePlayers().length; i++) {
            if (playerInstance.getName() === this.getOnlinePlayers()[i].getName()) {
                this.getOnlinePlayers().splice(i, 1)
                return
            }
        }
        throw Error(`ERROR: Player class, "logoutPlayerInstance" method: player instance is not logged`)
    }

    /**
     * - logout player instance by using just a name.
     * - If you already have the instance available, use the
     * method `logoutPlayerInstance(playerInstance)`.
     * @param {string} playerName 
     */
    static logoutPlayerInstanceByName(playerName) {
        this.logoutPlayerInstance(this.getPlayerInstanceByName(playerName))
    }

    /**
     * - Returns the instance of the player
     * @param {string} userName 
     * @returns {Player | undefined} If undefined, that means no player was found
    */
    static getPlayerInstanceByName(userName) {
        
        for(let i = 0; i < this.getOnlinePlayers().length; i++){
            if(userName === this.getOnlinePlayers()[i].getName()){
                return this.getOnlinePlayers()[i]
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
        const playerData = Player.getPlayerData(`${this.getName()}`)

        //Replace default values for saved values
        this.setSouls(playerData.souls)
        this.setlevel(playerData.level)
        this.setAttributes(playerData.attributes)
        this.setCurrentEquipment(playerData.equipment)
        this.setInventory(playerData.inventory)
    }

    /**
     * Save player info on database
     */
    save(){
    
        /** @type {CS_EntityData} */
        const playerData = {
            name:       this.getName(),
            souls:      this.getSouls(),
            level:      this.getlevel(),
            attributes: this.getAttributes(),
            equipment:  this.getCurrentEquipment(),
            inventory:  this.getInventory()
        }
        
        Player.setPlayerData(playerData)
        DbSystem.writeDb(Player.getDatabase(), playerDataBasePath)
    }

    /**
     * Return attribute upgrade cost
     * @returns {number}
     */
    getUpgradeCost(){
        return Math.round(500 * Math.pow(1.10, this.getlevel()))
    }

    /**
     * Handles attribute upgrade logics when add 1 attribute point for a player
     * @param {string} attributeType 
     * @returns 
     */
    upgradeAttributeProcessHandler(attributeType){

        const upgradeCost = this.getUpgradeCost()

        this.decreaseSouls(upgradeCost)
        this.addAttributes(attributeType)
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
        
        this.setCanPlay(false)
        const delay = setInterval(() => {
            this.setCanPlay(true)
            clearDelayTimer()
        }, milisseconds)

        function clearDelayTimer(){
            clearInterval(delay)
        }
    }
}
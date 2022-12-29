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
 * @property {CS_Attributes} attributes
 * 
 * @typedef {Object} CS_Attributes
 * @property {number} vitality
 * @property {number} agility
 * @property {number} strenght
 * @property {number} intelligence
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
        vitality: 1,
        agility: 1,
        strenght: 1,
        intelligence: 1
    }

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
     * @returns {Player?} If null, that means no player was found
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
        
        sendMessage(`/w ${userName} Seu progresso foi restaurado com sucesso`)
    }

    checkMissingInfo(){

        const playerData = Player.database[`${this.playerName}`]

        if(!playerData.souls) Player.database[`${this.playerName}`].souls = this.souls
        if(!playerData.level) Player.database[`${this.playerName}`].level = this.level
        if(!playerData.attributes) Player.database[`${this.playerName}`].attributes = this.attributes
    }
    
    save(){
    
        /** @type {CS_PlayerData} */
        const playerData = {
            playerName: this.playerName,
            souls: this.souls,
            level: this.level,
            attributes: this.attributes
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

    setPlayerState_Primary(ENUM_STATE) {
        this.playerState.primary = ENUM_STATE
    }

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
}
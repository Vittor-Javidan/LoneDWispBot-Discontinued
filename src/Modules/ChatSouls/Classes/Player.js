import sendMessage from "../../../Twitch/sendMessageHandler"
import dbSystem from "../database/dbSystem"
import ENUM from "./ENUM"

/**
 * @typedef {Object<string, CS_PlayerData>} CS_Database x is playerName string
 * @typedef {Object} CS_PlayerData
 * @property {string} playerName - player name
 * @property {number} souls - Currency of ChatSouls
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
        if(!Player.database[`${userName}`]){
            this.save()
            sendMessage(`O jogador ${userName} acabou de se cadastrar em ChatSouls Muahaha *-*`)
        } else {
            const playerData = Player.database[`${userName}`]
            this.souls = playerData.souls
            sendMessage(`/w ${userName} Seu progresso foi restaurado com sucesso`)
        }
    }
    
    save(){
    
        /** @type {CS_PlayerData} */
        const playerData = {
            playerName: this.playerName,
            souls: this.souls
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
     * Returns player souls amount
     * @returns {number}
     */
    getSouls(){
        return this.souls
    }
}
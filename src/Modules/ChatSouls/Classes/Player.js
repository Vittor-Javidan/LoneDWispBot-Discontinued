import sendMessage from "../../../Twitch/sendMessageHandler"
import dbSystem from "../database/dbSystem"

/**
 * @typedef {Object<string, CS_PlayerData>} CS_Database x is playerName string
 * @typedef {Object} CS_PlayerData
 * @property {string} playerName - player name
 * @property {number} souls - Currency of ChatSouls
*/

export default class Player {

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
        playerInstance.load()
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

    load(){
        if(!Player.database[`${this.playerName}`]){
            this.save()
            sendMessage(`O jogador ${this.userName} acabou de se cadastrar em ChatSouls Muahaha *-*`)
        } else {
            const playerData = Player.database[`${this.playerName}`]
            this.souls = playerData.souls
            sendMessage(`/w ${this.playerName} Seu progresso foi restaurado com sucesso`)
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
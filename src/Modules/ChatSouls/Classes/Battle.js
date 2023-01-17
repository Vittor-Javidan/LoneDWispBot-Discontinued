import enemiesDataBase from '../database/enemiesData';
import Entity from './Entity';
import Enemie from './EntityChilds/Enemie';
import Player from './EntityChilds/Player';
import CS_ENUM from './ENUM';

/**
 * @typedef {import('../TypeDefinitions/Types').CS_EntityData} CS_EntityData
 * @typedef {import('../TypeDefinitions/Types').CS_ResourceData} CS_ResourceData
 * @typedef {import('../TypeDefinitions/Types').CS_Stats} CS_Stats
 * @typedef {import('../TypeDefinitions/Types').CS_Inventory_Resources} CS_Inventory_Resources
*/


export default class Battle {

    static enemiesDataBase = enemiesDataBase

    /**
     * @type {Battle[]}
     */
    static battlesList = []

    /**
     * It's always a Player
     * @type {Player}
     */
    playerInstance

    /**
     * @type {Enemie}
     */
    enemieInstance

    /**
     * `1` if its player turn, `2` if its the enemie turn
     * @type {number}
     */
    turn = undefined

    /**
     * @param {Player} playerInstance 
     * @param {Enemie} enemieInstance 
     */
    constructor(playerInstance, enemieInstance){

        //store instances localy
        this.playerInstance = playerInstance
        this.enemieInstance = enemieInstance
    }

    //=================================================================================================
    // CLASS METHODS ==================================================================================
    //=================================================================================================

    /**
     * Starts a PvE battle for a given player
     * @param {Player} playerInstance 
     * @param {Enemie} enemieInstance
     * @param {Battle}
     */
    static startBattle(playerInstance, enemieInstance) {
        const battleInstance = new Battle(playerInstance, enemieInstance)
        this.determineFirstTurn(battleInstance)
        this.battlesList.push(battleInstance)
        return battleInstance
    }

    /**
     * Decides who is the first to have action during the battle
     * @param {Battle} battleInstance 
     */
    static determineFirstTurn(battleInstance){
        const playerInstance = battleInstance.playerInstance
        const enemieInstance = battleInstance.enemieInstance
        battleInstance.evasionEvent({
            from: playerInstance, 
            against: enemieInstance, 
            evasionWeight: 1
        }) ? battleInstance.turn = 1 : battleInstance.turn = 2
    }
    
    /**
     * Return a PvE battle instance for a specific username
     * @param {string} userName 
     * @returns {Battle}
    */
    static getBattle(userName) {
        for (let i = 0; i < this.battlesList.length; i++) {
            if (userName === this.battlesList[i].playerInstance.getName()) {
               return this.battlesList[i]
            }
        }
        throw Error(`ERROR: Battle class, "getBattle": Battle doesn't exist`)
    }
    


    /**
     * Delete a PvE battle instance for a specific username
     * @param {string} userName 
     * @returns {void}
     */
    static deleteBattle(userName) {
        for (let i = 0; i < this.battlesList.length; i++) {
            if (userName === this.battlesList[i].playerInstance.getName()) {
                this.battlesList.splice(i, 1)
                return
            }
        }
        throw Error(`ERROR: Battle class, "deleteBattle" method: impossible to delete a Battle that doesn't exist`)
    }

    /**
     * `True` if battle exist, `False` otherwise
     * @param {string} userName 
     * @returns {boolean}
     */
    static doesBattleExist(userName){
        for (let i = 0; i < this.battlesList.length; i++) {
            if (userName === this.battlesList[i].playerInstance.getName()) {
                return true
            }
        }
        return false
    }

    /**
     * Returns a formated string message containing all current battles happening
     * @returns {string}
     */
    static returnStringWithAllBattles(){
        let message = 'Jogadores em batalha nesse momento: '
        if(this.battlesList.length === 0){
            message += '| Nenhum |'
            return message
        }
        
        for (let i = 0; i < this.battlesList.length; i++){
            const playerString = this.battlesList[i].getPlayerStatus()
            const enemieString = this.battlesList[i].getEnemieStatus()
            message += `| ${playerString} vs ${enemieString} `
        }
        message += "|"
        return message
    }

    //=================================================================================================
    // INSTANCE METHODS ===============================================================================
    //=================================================================================================

    /**
     * Returns if both Player and other entity is alive
     * @returns {boolean}
     */
    isBothAlive(){
        return this.playerInstance.getIsAlive() && this.enemieInstance.getIsAlive()
    }

    /**
     * @returns {boolean} `True` if flee succed, `False` otherwise
     */
    fleePvE() {
        return this.evasionEvent({
            from: this.playerInstance, 
            against: this.enemieInstance, 
            evasionWeight: 1
        })
    }

    /**
     * Calculet the damage from attacker perspective and returns the value
     * @param {Object} object
     * @param {Entity} object.attacker 
     * @param {Entity} object.defender
     * @returns {number}
     */
    calculateRawDamage(object) {

        const attacker_fisicalDmg = object.attacker.totalStats.fisicalDamage
        const defender_fisicalDef = object.defender.totalStats.fisicalDefense
        let rawDamage = attacker_fisicalDmg - defender_fisicalDef
        if (rawDamage < 1) {
            rawDamage = 1
        }
        return Math.floor(rawDamage)
    }

    /**
     * Calculate the rewards when battle ends
     * @returns {void}
     */
    calculateRewards() {
        /**@type {CS_Inventory_Resources} */
        const resources = this.enemieInstance.inventoryResources
        const resourceKeys = Object.keys(resources)
        for(let  i = 0; i < resourceKeys.length; i++) {
            const randomNumber = Math.random()
            this.giveLootHandler(resources[resourceKeys[i]], randomNumber)
        }
        this.playerInstance.addSouls(this.enemieInstance.souls)
    }

    /**
     * Handles if the player should or not receive the loot, 
     * according to an already calculated and given random number, 
     * @param {CS_ResourceData} resources 
     * @param {number} randomNumber 
     */
    giveLootHandler(resources, randomNumber){
        if(resources.dropChance >= randomNumber) {
            this.playerInstance.addResources({
                name: resources.name,
                amount: resources.amount,
                type: resources.type
            })
        }
    }

    /**
     * @param {Object} object
     * @param {Player | Enemie} object.from
     * @param {Player | Enemie} object.against
     * @param {number} object.evasionWeight
     * @returns {boolean} `True` if event succed, `False Otherwise`
     */
    evasionEvent(object){
        
        const evasion = object.from.totalStats.evasion
        const oponent_evasion = object.against.totalStats.evasion

        const evasionChance = (evasion * object.evasionWeight) / (oponent_evasion + evasion)
        const randomNumber = Math.random()

        if(evasionChance >= randomNumber) {
            return true
        }
        return false
    }

    /**
     * Returns a string with Player current HP and Enemie current HP already formatted.
     * @returns {string}
     */
    getBattleStatus(){
        return `| ${this.getPlayerStatus()} | ${this.getEnemieStatus()}`
    }

    /**
     * Returns a string with Player current and max HP already formatted.
     * @returns {string}
     */
    getPlayerStatus(){
        
        const playerName = this.playerInstance.getName()
        const playerHP = this.playerInstance.currentHP
        const playerMaxHP = this.playerInstance.totalStats[CS_ENUM.KEYS.CS_STATS.HP]
        const playerHPString = `${playerName}: ${playerHP}/${playerMaxHP} HP`

        return `${playerHPString}`
    }

    /**
     * Returns a string with Enemie current and max HP already formatted.
     * @returns {string}
     */
    getEnemieStatus(){
        
        const enemieName = this.enemieInstance.getName()
        const enemieHP = this.enemieInstance.currentHP
        const enemieMaxHP = this.enemieInstance.totalStats[CS_ENUM.KEYS.CS_STATS.HP]
        const enemieHPString = `${enemieName}: ${enemieHP}/${enemieMaxHP} HP`

        return `${enemieHPString}`
    }

}

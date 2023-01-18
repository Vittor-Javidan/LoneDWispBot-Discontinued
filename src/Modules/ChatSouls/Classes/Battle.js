import deepCopy from '../../../Utils/deepCopy';
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
     * @type {CS_ResourceData[]}
    */
    earnerResources = []

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

    /**
     * @param {number} damageValue 
     * @param {number} luck Int number between 1 to 6
     * @returns {number}
     */
    static returnEffectiveDamage(damageValue, luck) {

        if(
            typeof damageValue !== 'number' || 
            isNaN(damageValue)              ||
            damageValue < 0
        ) {
            throw Error(`ERROR: damageValue must be a valid number`)
        }

        switch(luck) {
            
            case 1: damageValue = damageValue * 0.5     ;break
            case 2: damageValue = damageValue * 0.75    ;break
            case 3: damageValue = damageValue * 0.9     ;break
            case 4: damageValue = damageValue * 1.1     ;break
            case 5: damageValue = damageValue * 1.25    ;break
            case 6: damageValue = damageValue * 1.5     ;break
        }

        damageValue = Math.floor(damageValue)

        if(damageValue < 1) {
            damageValue = 1
        }

        return damageValue
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
     * @param {number} evasionWeight
     * @returns {boolean} `True` if flee succed, `False` otherwise
     */
    fleePvE(evasionWeight) {
        return this.evasionEvent({
            from: this.playerInstance, 
            against: this.enemieInstance, 
            evasionWeight: evasionWeight
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

        const attacker_fisicalDmg = object.attacker.getTotalStats().fisicalDamage
        const defender_fisicalDef = object.defender.getTotalStats().fisicalDefense
        let rawDamage = attacker_fisicalDmg - defender_fisicalDef
        if (rawDamage < 1) {
            rawDamage = 1
        }
        return Math.floor(rawDamage)
    }

    /**
     * Calculate the rewards when battle ends
     * @returns {CS_Inventory_Resources}
     */
    calculateRewards() {
        
        const resources = this.enemieInstance.getInventoryResources()
        const resourceKeys = Object.keys(resources)
        for(let  i = 0; i < resourceKeys.length; i++) {
            const randomNumber = Math.random()
            this.giveLootHandler(resources[resourceKeys[i]], randomNumber)
        }
        this.playerInstance.addSouls(this.enemieInstance.getSouls())
    }

    /**
     * Handles if the player should or not receive the loot, 
     * according to an already calculated and given random number, 
     * @param {CS_ResourceData} resources 
     * @param {number} randomNumber 
     */
    giveLootHandler(resources, randomNumber){
        
        if(resources.dropChance >= randomNumber) {
            const newResourceObject = {
                name: resources.name,
                amount: resources.amount,
                type: resources.type
            }
            this.playerInstance.addResources(newResourceObject)
            this.earnerResources.push(deepCopy(newResourceObject))
        }
    }

    /**
     * @returns {string}
     */
    returnResourcesRewardsString(){

        let message = `Recursos ganhos: `

        if(this.earnerResources.length <= 0) {
            message += `nenhum :(`
        }

        for(let i = 0; i < this.earnerResources.length; i++) {
            const amount = this.earnerResources[i].amount
            const resourceName = this.earnerResources[i].name
            message += `${amount}x ${resourceName}, `
        }

        return message
    }

    /**
     * @param {Object} o
     * @param {Player | Enemie} o.from
     * @param {Player | Enemie} o.against
     * @param {number} o.evasionWeight
     * @returns {boolean} `True` if event succed, `False Otherwise`
     */
    evasionEvent(o){

        const { from, against, evasionWeight } = o
        
        const evasion = from.getTotalStats().evasion
        const oponent_evasion = against.getTotalStats().evasion

        let sharedEvasion = oponent_evasion + evasion
        if(sharedEvasion <= 0) {
            sharedEvasion = 100
        }

        const evasionChance = (evasion * evasionWeight) / (sharedEvasion)
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
        const playerHP = this.playerInstance.getCurrentHP()
        const playerMaxHP = this.playerInstance.getTotalStats()[CS_ENUM.KEYS.CS_STATS.HP]
        const playerHPString = `${playerName}: ${playerHP}/${playerMaxHP} HP`

        return `${playerHPString}`
    }

    /**
     * Returns a string with Enemie current and max HP already formatted.
     * @returns {string}
     */
    getEnemieStatus(){
        
        const enemieName = this.enemieInstance.getName()
        const enemieHP = this.enemieInstance.getCurrentHP()
        const enemieMaxHP = this.enemieInstance.getTotalStats()[CS_ENUM.KEYS.CS_STATS.HP]
        const enemieHPString = `${enemieName}: ${enemieHP}/${enemieMaxHP} HP`

        return `${enemieHPString}`
    }

}

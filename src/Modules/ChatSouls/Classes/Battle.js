import sendMessage from '../../../Twitch/sendMessageHandler';
import enemiesDataBase from '../database/enemiesData';
import Entity from './Entity';
import Enemie from './EntityChilds/Enemie';
import Player from './EntityChilds/Player';
import ENUM from './ENUM';

/**
 * @typedef {import('../TypeDefinitions/Types').CS_EntityData} CS_EntityData
 * @typedef {import('../TypeDefinitions/Types').CS_ResourceData} CS_ResourceData
*/


export default class Battle {

    static enemiesDataBase = enemiesDataBase

    /**
     * @type {Battle[]}
     */
    static PvEBattles = []

    /**
     * It's always a Player
     * @type {Player}
     */
    playerInstance

    /**
     * @type {Player | Enemie}
     */
    entityInstance

    /**
     * @type {number}
     */
    entity_1_TimeAction = 0

    /**
     * @type {number}
     */
    entity_2_TimeAction = 0

    /**
     * These are the stats that can be modify during the battle.
     * @type {Object<string, number>}
     */
    TempStats_1

    /**
     * These are the stats that can be modify during the battle
     * @type {Object<string, number>}
     */
    TempStats_2

    /**
     * `1` if its player turn, `2` if its the entityInstance turn
     * @type {number}
     */
    turn

    /**
     * @param {Player} playerInstance 
     * @param {Player | Enemie} entityInstance 
     */
    constructor(playerInstance, entityInstance){

        //store instances localy
        this.playerInstance = playerInstance
        this.entityInstance = entityInstance

        //Ensure stats are updated before start battle
        this.playerInstance.calculateStats()
        this.entityInstance.calculateStats()

        //Get instaces stats. 
        this.TempStats_1 = this.playerInstance.getStats()
        this.TempStats_2 = this.entityInstance.getStats()
    }

    /**
     * @param {Player} playerInstance 
     */
    static startPvEBattle(playerInstance) {
        
        const playerMapArea = playerInstance.getCurrentLocation()
        const playerLevel = playerInstance.getLevel()
        const enemiesArray = Object.values(enemiesDataBase[playerMapArea])
        const possibleEnemies = []

        for (let i = 0; i < enemiesArray.length; i++){
            if (playerLevel >= enemiesArray[i].level) {
                possibleEnemies.push(enemiesArray[i])
            }
        }

        const randomIndex = Math.floor(Math.random() * possibleEnemies.length);
        const randomEnemie = possibleEnemies[randomIndex];
        const enemieInstance = new Enemie(randomEnemie)
        
        const battleInstance = new Battle(playerInstance, enemieInstance)
        battleInstance.whosFirstPvE()
        
        Battle.PvEBattles.push(battleInstance)
    }

    /**
     * Return a PvE battle instance for a specific username
     * @param {string} userName 
     * @returns {Battle}
     */
    static getPvEBattle(userName) {

        for (let i = 0; i < this.PvEBattles.length; i++) {
            if (userName === this.PvEBattles[i].playerInstance.getName()) {
                return this.PvEBattles[i]
            }
        }

        //If there is no battle
        sendMessage(
            `Erro: Batalha PvE não encotrada: ${userName}`
        )
        console.log(`Erro: Batalha PvE não encotrada: ${userName}`)
    }

    /**
     * Delete a PvE battle instance for a specific username
     * @param {string} userName 
     * @returns {void}
     */
    static deletePvEBattle(userName) {

        for (let i = 0; i < this.PvEBattles.length; i++) {
            if (userName === this.PvEBattles[i].playerInstance.getName()) {
                this.PvEBattles.splice(i, 1)
            }
        }
    }

    whosFirstPvE(){
        
        const succed = this.evasionEvent(this.playerInstance, this.entityInstance, 1)

        succed
            ? this.turn = 1
            : this.turn = 2
        //
            
        const playerName = this.playerInstance.getName()
        const enemieName = this.entityInstance.getName()
        this.turn === 1
            ? sendMessage(`/w ${playerName} Você encontrou um ${enemieName} e tem a vantagem de começar atacando`)
            : sendMessage(`/w ${playerName} Você encontrou um ${enemieName} e ele começa atacando`)
        //
    }

    chargeTimeActionPvE() {

        const player = this.playerInstance.getStats(ENUM.STATS_TYPES.EVASION)
        const enemie = this.entityInstance.getStats(ENUM.STATS_TYPES.EVASION)

        //Checks if any player can reapeat his round
        this.entity_1_TimeAction += player
        this.entity_2_TimeAction += enemie
        if (entity_1_TimeAction >= (1.5 * entity_2_TimeAction)) {
            this.turn = 1
            entity_1_TimeAction = 0
            entity_2_TimeAction = 0
        } else if (entity_2_TimeAction >= (1.5 * entity_1_TimeAction)) {
            this.turn = 2
            entity_1_TimeAction = 0
            entity_2_TimeAction = 0
        }
    }

    attackPvE(){

        if( //PVE battle
            this.playerInstance instanceof Player &&
            this.entityInstance instanceof Enemie
        ) {
            switch (this.turn) {
                case 1:
                    if(this.playerInstance.getIsAlive()) this.calculateDmg(this.playerInstance, this.entityInstance)
                    if(this.entityInstance.getIsAlive()) this.calculateDmg(this.entityInstance, this.playerInstance)
                    break
                //
                case 2:
                    if(this.entityInstance.getIsAlive()) this.calculateDmg(this.entityInstance, this.playerInstance)
                    if(this.playerInstance.getIsAlive()) this.calculateDmg(this.playerInstance, this.entityInstance)
                    break
                //
            }
        }
    }

    /**
     * @returns {boolean} `True` if flee succed, `False` otherwise
     */
    fleePvE() {

        const succes = this.evasionEvent(this.playerInstance, this.entityInstance, 0.5)
        if(!succes) {
            this.calculateDmg(this.entityInstance, this.playerInstance)
            return succes
        }
        return succes
    }

    /**
     * Calcula the damage from attacker perspective
     * @param {Entity} attacker 
     * @param {Entity} defender 
     */
    calculateDmg(attacker, defender) {

        //Check if a dogde just happend
        if (this.isDodgeSucced(attacker, defender)) return

        //Calculate damage value
        const attacker_fisicalDmg = attacker.getStats(ENUM.STATS_TYPES.FISICAL_DMG)
        const defender_fisicalDef = defender.getStats(ENUM.STATS_TYPES.FISICAL_DEF)
        let damageCaused = attacker_fisicalDmg - defender_fisicalDef
        let effectiveDamage = this.calculateEffectivenessDmg(damageCaused)
        
        if (effectiveDamage < 1) {
            effectiveDamage = 1
        }
        
        //player feedback
        if (attacker instanceof Player) {
            sendMessage(
                `/w ${attacker.getName()} Você causou ${effectiveDamage} de dano`
                , 500)
            }
        if (defender instanceof Player) {
            sendMessage(
                `/w ${defender.getName()} Você sofreu ${effectiveDamage} de dano`
            , 500)
        }

        const isDefeated = defender.reduceCurrentHP(effectiveDamage)
        
        //Check if the defender die
        if(isDefeated) {
            if(attacker instanceof Player) {
                this.calculateRewards(attacker, defender)
            }
        }
    }

    /**
     * Return the value of number after effectiveness calculation
     * @param {number} damageCaused
     * @returns {number}
     */
    calculateEffectivenessDmg(damageCaused) {
        const randomNumber = Math.floor(Math.random() * 6) + 1
        switch (randomNumber) {
            case 1: return Math.floor(damageCaused * 0.5) 
            case 2: return Math.floor(damageCaused * 0.75)
            case 3: return Math.floor(damageCaused)
            case 4: return Math.floor(damageCaused)
            case 5: return Math.floor(damageCaused * 1.25)
            case 6: return Math.floor(damageCaused * 1.5)
        }
    }

    /**
     * Calculate the rewards when battle ends
     * @param {Entity} attacker 
     * @param {Entity} defender 
     * @returns {void}
     */
    calculateRewards(attacker, defender) {

        //Gets loser souls
        attacker.addSouls(defender.getSouls())

        //Gets resources from Enemie Class
        if(defender instanceof Enemie) {

            /** @type {Object<string, CS_ResourceData>} */
            const resources = defender.getResources()
            const resourcesNames = Object.keys(resources)

            let lootString = '|'
            for (let i = 0; i < resourcesNames.length; i++) {
                attacker.addResources(resources[resourcesNames[i]])
                lootString += `|  ${resources[resourcesNames[i]].amount}x ${resourcesNames[i]} |`
            }
            lootString += '|'

            sendMessage(
                `/w ${attacker.getName()} ${defender.getName()} foi derrotado. ${defender.getSouls()} almas absorvidas. Recursos ganhos: ${lootString}`
            , 1500)
        }

        if(attacker instanceof Player) {
            attacker.save()
        }
    }

    /**
     * return the current HP of the entity
     * @param {string} entityName
     * @returns {Player | Enemie}
     */
    getEnemieInstancePvE(){
        return this.entityInstance
    }

    /**
     * @param {Player | Enemie} attacker 
     * @param {Player | Enemie} defender 
     * @returns 
     */
    isDodgeSucced(attacker, defender){

        if(this.evasionEvent(defender, attacker, 0.5)) {
            sendMessage(
                `/w @${this.playerInstance.getName()} ${attacker.getName()} errou o ataque em ${defender.getName()}`
            , 500)
            return true
        }
        return false
    }

    /**
     * @param {Player | Enemie} whoCalling
     * @param {Player | Enemie} against
     * @returns {boolean}
     */
    evasionEvent(whoCalling, against, evasionWeight){
        
        //Evasion from each entity
        const oponent_evasion = against.getStats(ENUM.STATS_TYPES.EVASION)
        const whosCall_evasion = whoCalling.getStats(ENUM.STATS_TYPES.EVASION)

        //evasion event chance
        const whosCallEvasionChance = (whosCall_evasion * evasionWeight) / (oponent_evasion + whosCall_evasion) * 100
        const randomNumber = Math.random() * 100

        //Return if the evasion event succed ocurred
        if(whosCallEvasionChance > randomNumber) {
            return true
        }
        return false
    }

    /**
     * Returns a string with Player current HP and Enemie current HP already formatted.
     * @returns {string}
     */
    getBattleStatusStringPvE(){

        const playerHP = this.playerInstance.getCurrentHP()
        const playerMaxHP = this.playerInstance.getStats(ENUM.STATS_TYPES.HP)
        const playerHPString = `${this.playerInstance.getName()}: ${playerHP}/${playerMaxHP} HP`

        const enemieName = this.entityInstance.getName()
        const enemieHP = this.entityInstance.getCurrentHP()
        const enemieMaxHP = this.entityInstance.getStats(ENUM.STATS_TYPES.HP)
        const enemieHPString = `${enemieName}: ${enemieHP}/${enemieMaxHP} HP`

        return `| ${playerHPString} | ${enemieHPString}`
    }
}
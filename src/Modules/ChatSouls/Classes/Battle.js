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

    //=================================================================================================
    // CLASS METHODS ==================================================================================
    //=================================================================================================

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

    /**
     * `True` if battle exist, `False` otherwise
     * @param {string} userName 
     * @returns {boolean}
     */
    static doesPvEBattleExist(userName){
        for (let i = 0; i < this.PvEBattles.length; i++) {
            if (userName === this.PvEBattles[i].playerInstance.getName()) {
                return true
            }
        }
        return false
    }

    static sendMessageWithAllPvEBattles(){
        let message = 'Jogadores em batalha nesse momento: '

        if(this.PvEBattles.length === 0){
            message += '| Nenhum |'
            sendMessage(message)
            return
        }
        
        for (let i = 0; i < this.PvEBattles.length; i++){
            const playerString = this.PvEBattles[i].getPlayerBattleStatusStringPvE()
            const enemieString = this.PvEBattles[i].getEnemieBattleStatusStringPvE()
            message += `| ${playerString} vs ${enemieString} `
        }
        message += "|"
        sendMessage(message)
    }

    //=================================================================================================
    // INSTANCE METHODS ===============================================================================
    //=================================================================================================

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
                    console.log('case 1')
                    if(this.isBothAlive()) this.calculateDmg(this.playerInstance, this.entityInstance)
                    if(this.isBothAlive()) this.calculateDmg(this.entityInstance, this.playerInstance)
                    break
                //
                case 2:
                    console.log('case 2')
                    if(this.isBothAlive()) this.calculateDmg(this.entityInstance, this.playerInstance)
                    if(this.isBothAlive()) this.calculateDmg(this.playerInstance, this.entityInstance)
                    break
                //
            }
        }

        //If anyone dies
        if(!this.isBothAlive()){

            //if enemie died
            if(!this.entityInstance.getIsAlive()) {
                this.calculateRewardsPvE()
            }

            //if player died
            if(!this.playerInstance.getIsAlive()) {
                this.sendDeadPlayerBackHome()
            }
            
            Battle.deletePvEBattle(this.playerInstance.getName())                  
        }
    }

    /**
     * Returns if both Player and other entity is alive
     * @returns {boolean}
     */
    isBothAlive(){
        return this.playerInstance.getIsAlive() && this.entityInstance.getIsAlive()
    }

    /**
     * @returns {boolean} `True` if flee succed, `False` otherwise
     */
    fleePvE() {

        const succes = this.evasionEvent(this.playerInstance, this.entityInstance, 0.5)
        if(!succes) {
            sendMessage(`/w ${this.playerInstance.getName()} sua fuga falhou!`)
            this.calculateDmg(this.entityInstance, this.playerInstance)
            return succes
        }
        sendMessage(`/w ${this.playerInstance.getName()} Fuga bem sucedida!`)
        Battle.deletePvEBattle(this.playerInstance.getName())
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
        if (effectiveDamage < 1) effectiveDamage = 1
        
        defender.reduceCurrentHP(effectiveDamage)  
        
        //player feedback
        if (attacker instanceof Player) {
            sendMessage(
                `/w ${attacker.getName()} Você causou ${effectiveDamage} de dano`
            )
            }
        if (defender instanceof Player) {
            sendMessage(
                `/w ${defender.getName()} Você sofreu ${effectiveDamage} de dano`
            )
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
     * @returns {void}
     */
    calculateRewardsPvE() {

        const resources = this.entityInstance.getResources()
        const resourcesNames = Object.keys(resources)
        
        let lootString = '|'
        for (let i = 0; i < resourcesNames.length; i++) {
            this.playerInstance.addResources(resources[resourcesNames[i]])
            lootString += `|  ${resources[resourcesNames[i]].amount}x ${resourcesNames[i]} |`
        }
        lootString += '|'

        this.playerInstance.setSecondaryState(ENUM.EXPLORING.SECONDARY.IDLE)
        this.playerInstance.addSouls(this.entityInstance.getSouls())
        this.playerInstance.save()
        
        sendMessage(
            `/w ${this.playerInstance.getName()} ${this.entityInstance.getName()} foi derrotado. ${this.entityInstance.getSouls()} almas absorvidas. Recursos ganhos: ${lootString}. 
            Você voltou a planejar seu próximo passo.
            | 0. Montar uma fogueira
            | 1. Caçar 
            | 2. Procurar por recursos (Em progresso)
            | 3. Viajar (Em progresso)
            |`
            , 1000
        )
    }

    /**
     * Sends player back to fire pit after he dies in battle
     */
    sendDeadPlayerBackHome(){
        
        this.playerInstance.setPrimaryState(ENUM.RESTING.PRIMARY)
        this.playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.JUST_RESTING)
        this.playerInstance.setSouls(0)
        this.playerInstance.ressurrect()
        this.playerInstance.recoverHP()
        this.playerInstance.save()
        
        sendMessage(
            `/w ${this.playerInstance.getName()} Você morreu para ${this.entityInstance.getName()} e perdeu todas suas almas. Voltando para fogueira: 
            | 1. Statísticas 
            | 2. Ver Equipamento 
            | 3. Levantar da fogueira 
            |`, 1000
        )
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
            )
            return true
        }
        return false
    }

    /**
     * @param {Player | Enemie} whosEvading
     * @param {Player | Enemie} against
     * @returns {boolean}
     */
    evasionEvent(whosEvading, against, evasionWeight){
        
        const evasion = whosEvading.getStats(ENUM.STATS_TYPES.EVASION)
        const oponent_evasion = against.getStats(ENUM.STATS_TYPES.EVASION)

        const evasionChance = (evasion * evasionWeight) / (oponent_evasion + evasion) * 100
        const randomNumber = Math.random() * 100

        if(evasionChance > randomNumber) {
            return true
        }
        return false
    }

    /**
     * Returns a string with Player current HP and Enemie current HP already formatted.
     * @returns {string}
     */
    getBattleStatusStringPvE(){
        return `| ${this.getPlayerBattleStatusStringPvE()} 
                | ${this.getEnemieBattleStatusStringPvE()}`
    }

    /**
     * Returns a string with Player current HP already formatted.
     * @returns {string}
     */
    getPlayerBattleStatusStringPvE(){
        
        const playerName = this.playerInstance.getName()
        const playerHP = this.playerInstance.getCurrentHP()
        const playerMaxHP = this.playerInstance.getStats(ENUM.STATS_TYPES.HP)
        const playerHPString = `${playerName}: ${playerHP}/${playerMaxHP} HP`

        return `${playerHPString}`
    }

    getEnemieBattleStatusStringPvE(){
        
        const enemieName = this.entityInstance.getName()
        const enemieHP = this.entityInstance.getCurrentHP()
        const enemieMaxHP = this.entityInstance.getStats(ENUM.STATS_TYPES.HP)
        const enemieHPString = `${enemieName}: ${enemieHP}/${enemieMaxHP} HP`

        return `${enemieHPString}`
    }
}
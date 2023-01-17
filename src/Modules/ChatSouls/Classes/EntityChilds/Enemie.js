import enemiesDataBase from '../../database/enemiesData'
import Entity from '../Entity'
import Player from './Player'

/**
 * @typedef {import ('../../TypeDefinitions/Types').CS_EntityData} CS_EntityData
 * @typedef {import('../../TypeDefinitions/Types').CS_ResourceData} CS_ResourceData
*/


export default class Enemie extends Entity{

    /**
     * @param {CS_EntityData} enemieData
     * @constructor
     */
    constructor(enemieData){

        super(true, enemieData.name)
        this.setSouls(enemieData.souls)
        this.setlevel(enemieData.level)
        this.setAttributes(enemieData.attributes)
        this.setCurrentEquipment(enemieData.equipment)
        this.inventory = enemieData.inventory
    }

    /**
     * @param {CS_EntityData} enemieData
     * @constructor
     */
    static initialize(enemieData){

        const enemie = new Enemie(enemieData)
        enemie.calculateStats()
        enemie.recoverHP()
        
        return enemie
    }

    /**
     * Instantiate and return a random enemie according to player level
     * @param  {Player} playerInstance
     * @returns {Enemie}
     */
    static instantiateRandomEnemie(playerInstance) {
        
        const possibleEnemies = this.getPossibleEnemies(playerInstance)
        const randomIndex = Math.floor(Math.random() * possibleEnemies.length);
        const randomEnemieData = possibleEnemies[randomIndex];
        const enemie = Enemie.initialize(randomEnemieData)

        return enemie
    }

    /**
     * Get possible enemies related playerInstance current area and level
     * @param  {Player} playerInstance
     * @returns {CS_EntityData[]}
     */
    static getPossibleEnemies(playerInstance){

        const playerMapArea = playerInstance.currentLocation
        const playerLevel = playerInstance.getlevel()
        const areaEnemies = enemiesDataBase[playerMapArea]
        const enemiesArray = Object.values(areaEnemies)
        const possibleEnemies = []
        
        for (let i = 0; i < enemiesArray.length; i++){
            if (playerLevel >= enemiesArray[i].level) {
                possibleEnemies.push(enemiesArray[i])
            }
        }
        
        return possibleEnemies
    }
}
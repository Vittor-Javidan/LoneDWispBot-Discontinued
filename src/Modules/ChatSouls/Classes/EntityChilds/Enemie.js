import Entity from '../Entity'

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
        super(enemieData.name)
        this.level = enemieData.level
        this.souls = enemieData.souls
        this.attributes = enemieData.attributes
        this.equipment = enemieData.equipment
        this.inventory = enemieData.inventory

        this.calculateStats()
        this.recoverHP()
    }
}
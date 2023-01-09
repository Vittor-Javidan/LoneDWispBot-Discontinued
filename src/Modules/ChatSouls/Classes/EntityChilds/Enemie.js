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
        super(true, enemieData.name)
        this.level = enemieData.level
        this.souls = enemieData.souls
        this.attributes = enemieData.attributes
        this.currentEquipment = {...enemieData.equipment}
        this.inventory = {
            equipments: {...enemieData.inventory.equipments},
            resources: {...enemieData.inventory.resources}
        }
    }

    static initialize(enemieData){
        const enemie = new Enemie(enemieData)
        enemie.calculateStats()
        enemie.recoverHP()
        return enemie
    }
}
import Equipment from "../Equipment"

/** See `Types.js` to understand the types 
 * @typedef {import('../../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData 
*/

export default class Armor extends Equipment {

    /**
     * @param {CS_Equipment_ArmorData} itemObject
     * @param {string} itemObject.name - item name
     * @constructor
     */ 
    constructor(isChild, itemObject) {

        if (typeof isChild !== 'boolean' || !isChild) {
            throw Error('Cannot instantiate "Equipment" class directly')
        }

        super(true, itemObject)
        this.multipliers = itemObject.defense_multipliers
        this.description = itemObject.description
    }

    /**
     * Prints to a specific user the weapons details
     */
    detailsString(){
        return `
        DESCRIÇÃO: ${this.description} 
        MULTIPLICADORES: 
        HP = ${this.multipliers.vitality}x Vitalidade, 
        Evasão = ${this.multipliers.agility}x Agilidade, 
        Defesa física = ${this.multipliers.strenght}x Força, 
        Defesa mágica = ${this.multipliers.intelligence}x Inteligência`
    }
}
import Equipment from "../Equipment"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData */

export default class Weapon extends Equipment {

    /**
     * @param {CS_Equipment_WeaponData} itemObject
     * @param {string} itemObject.name - item name
     * @constructor
     */ 
    constructor(isChild, itemObject) {

        if (typeof isChild !== 'boolean' || !isChild) {
            throw Error('Cannot instantiate "Weapon" class directly')
        }

        super(true, itemObject)
        this.multipliers = itemObject.damage_multipliers
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
        Dano físico = ${this.multipliers.strenght}x Força, 
        Dano mágico = ${this.multipliers.intelligence}x Inteligência`
    }
}
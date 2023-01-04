import sendMessage from "../../../../Twitch/sendMessageHandler"
import ENUM from "../ENUM"
import Equipment from "../Equipment"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData */

export default class Weapon extends Equipment {

    /**
     * @param {CS_Equipment_WeaponData} itemObject
     * @param {string} itemObject.name - item name
     * @constructor
     */ 
    constructor(itemObject) {
        super(itemObject)
    }

    /**
     * Prints to a specific user the weapons details
     * @param {string} userName 
     */
    printDetailsTo(userName){
        sendMessage(
            `/w @${userName} 
            DESCRIÇÃO: ${this.description} 
            MULTIPLICADORES: 
            | +HP = ${this.multipliers[ENUM.ATTRIBUTES.VITALITY]}x Vitalidade 
            | +Evasão = ${this.multipliers[ENUM.ATTRIBUTES.AGILITY]}x Agilidade 
            | +Dano físico = ${this.multipliers[ENUM.ATTRIBUTES.STRENGHT]}x Força
            | +Dano mágico = ${this.multipliers[ENUM.ATTRIBUTES.INTELLLIGENCE]}x Inteligência
            |`
        )
    }
}
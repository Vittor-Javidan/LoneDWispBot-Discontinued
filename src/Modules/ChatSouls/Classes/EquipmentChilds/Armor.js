import sendMessage from "../../../../Twitch/sendMessageHandler"
import CHATSOULS_ENUM from "../ENUM"
import Equipment from "../Equipment"

/** @typedef {import('../../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData */

export default class Armor extends Equipment {

    /**
     * @param {CS_Equipment_ArmorData} itemObject
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
            | +HP = ${this.multipliers[CHATSOULS_ENUM.TYPES.ATTRIBUTE_TYPES.VITALITY]}x Vitalidade 
            | +Evasão = ${this.multipliers[CHATSOULS_ENUM.TYPES.ATTRIBUTE_TYPES.AGILITY]}x Agilidade 
            | +Defesa física = ${this.multipliers[CHATSOULS_ENUM.TYPES.ATTRIBUTE_TYPES.STRENGHT]}x Força 
            | +Defesa mágica = ${this.multipliers[CHATSOULS_ENUM.TYPES.ATTRIBUTE_TYPES.INTELLLIGENCE]}x Inteligência 
            |`
        )
    }
}
import sendMessage from "../../../Twitch/sendMessageHandler"
import ENUM from "./ENUM"

/** @typedef {import('../TypeDefinitions/Types').CS_Attributes} CS_Attributes - Keys: `ATTRIBUTE_TYPE ENUM` */
/** @typedef {import('../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData */
/** @typedef {import('../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData */

export default class Equiment {

    /**
     * @type {string}
     */
    name

    /**
     * @type {CS_Attributes}
     */
    multipliers
    
    /**
     * @type {string}
     */
    description

    /**
     * @param {CS_Equipment_WeaponData | CS_Equipment_ArmorData} Object 
     * @constructor
    */
    constructor(Object){
        this.name = Object.name
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
            | ${this.multipliers[ENUM.ATTRIBUTES.VITALITY]}x Vitalidade 
            | ${this.multipliers[ENUM.ATTRIBUTES.AGILITY]}x Agilidade 
            | ${this.multipliers[ENUM.ATTRIBUTES.STRENGHT]}x Força
            | ${this.multipliers[ENUM.ATTRIBUTES.INTELLLIGENCE]}x Inteligência
            `
        )
    }
}
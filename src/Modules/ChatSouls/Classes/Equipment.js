import sendMessage from "../../../Twitch/sendMessageHandler"
import ENUM from "./ENUM"

export default class Equiment {

    /**
     * @type {string}
     */
    name

    /**
     * @type {import("./Player").CS_Attributes}
     */
    multipliers
    
    /**
     * @type {string}
     */
    description

    /**
     * @param {import("./Player").CS_EquipmentData} Object 
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
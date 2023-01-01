import sendMessage from "../../../Twitch/sendMessageHandler"

export default class Equiment {

    /**
     * @type {string}
     */
    name

    /**
     * @type {import("./Player").CS_Player_Attributes}
     */
    multipliers
    
    /**
     * @type {string}
     */
    description

    /**
     * @param {import("./Player").CS_Player_EquippedData} Object 
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
            | ${this.multipliers.vitality}x Vitalidade 
            | ${this.multipliers.agility}x Agilidade 
            | ${this.multipliers.strenght}x Força
            | ${this.multipliers.intelligence}x Inteligência
            `
        )
    }
}
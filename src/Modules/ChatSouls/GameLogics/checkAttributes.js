import Player from "../Classes/EntityChilds/Player"
import { sendMessage_UI_StatisticsMenu } from "../UserInteface/sendMessage_Customized/sendMessage_UI_StatisticsMenu"


/**
 * Handles Attribute consult inside Statistics Menu
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function consultAttributes(data, menuMessage) {

    const playerAttributes = data.playerInstance.getAttributes()
    const vitality = playerAttributes.vitality
    const agility = playerAttributes.agility
    const strenght = playerAttributes.strenght
    const intelligence = playerAttributes.intelligence
    
    sendMessage_UI_StatisticsMenu(data.playerInstance, 
        `${menuMessage}. Seus attributos:
        Vitalidade: ${vitality} 
        - Agilidade: ${agility} 
        - Força: ${strenght} 
        - Inteligência: ${intelligence}`
    )
}
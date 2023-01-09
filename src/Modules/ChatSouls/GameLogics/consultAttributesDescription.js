import Player from "../Classes/EntityChilds/Player"
import { sendMessage_UI_AttributeUpgradeMenu } from "../UserInteface/sendMessage_Customized/sendMessage_UI_AttributeUpgradeMenu"

/**
 * Handles Attribute Description Consult
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function consultAttributesDescription(data, menuMessage) {

    sendMessage_UI_AttributeUpgradeMenu(data.playerInstance,
        `${menuMessage} 
        Vitalidade: +HP, 
        Agilidade: +evasão, 
        Força: +dano/resistência física,
        Inteligência: +dano/resistência mágica`
    )
}
import Player from "../Classes/EntityChilds/Player"
import CS_ENUM from "../Classes/ENUM"
import { sendMessage_UI_AttributeUpgradeMenu } from "../UserInteface/sendMessage_Customized/sendMessage_UI_AttributeUpgradeMenu"
import doHaveEnoughSoulsBalance from "./doHaveEnoughSoulsBalance"

/**
 * Handles player upgrade attribute proccess
 * 
 * @param {Object} object
 * @param {Player} object.playerInstance
 * @param {string} object.attributePicked
 * @param {string} object.menuMessage
 */
export default function upgradeAttributeByType(object) {

    if(!doHaveEnoughSoulsBalance(object.playerInstance)) {
        sendMessage_UI_AttributeUpgradeMenu(object.playerInstance,
            `Você não possui almas suficientes`
        )
        return
    }

    const attributeTypes = CS_ENUM.KEYS.CS_ATTRIBUTES
    const attributeTypesArray = Object.values(attributeTypes)

    for(let i = 0; i < attributeTypesArray.length; i++) {
        if(!attributeTypesArray.includes(object.attributePicked)) {
            throw Error(`ERROR: upgradeAttributeByType(): Attribute type not recognized`)
        }
    }

    object.playerInstance.upgradeAttributeProcessHandler(object.attributePicked)
    sendMessage_UI_AttributeUpgradeMenu(object.playerInstance,
        `${object.menuMessage} 
        - Novo level: ${object.playerInstance.level} 
        - Almas restantes: ${object.playerInstance.souls} 
        - custo próximo nível: ${object.playerInstance.getUpgradeCost()} `
    )
}

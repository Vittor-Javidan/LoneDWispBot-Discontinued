import Player from "../Classes/EntityChilds/Player"
import CS_ENUM from "../Classes/ENUM"
import { sendMessage_UI_AttributeUpgradeMenu } from "../UserInteface/sendMessage_Customized/sendMessage_UI_AttributeUpgradeMenu"
import doHaveEnoughSoulsBalance from "./doHaveEnoughSoulsBalance"

/**
 * Handles player upgrade attribute proccess
 * 
 * @param {Object} o
 * @param {Player} o.playerInstance
 * @param {string} o.attributePicked
 * @param {string} o.menuMessage
 */
export default function upgradeAttributeByType(o) {

    //TODO: Refactor this function

    const { playerInstance, attributePicked, menuMessage } = o

    if(!doHaveEnoughSoulsBalance(playerInstance)) {
        sendMessage_UI_AttributeUpgradeMenu(playerInstance,
            `Você não possui almas suficientes`
        )
        return
    }

    const attributeTypes = CS_ENUM.KEYS.CS_ATTRIBUTES
    const attributeTypesArray = Object.values(attributeTypes)

    for(let i = 0; i < attributeTypesArray.length; i++) {
        if(!attributeTypesArray.includes(attributePicked)) {
            throw Error(`ERROR: upgradeAttributeByType(): Attribute type not recognized`)
        }
    }

    playerInstance.upgradeAttributeProcessHandler(attributePicked)

    //Feedback Message
    const souls = playerInstance.getSouls()
    const level = playerInstance.getlevel()
    const nextUpgradeCost = playerInstance.getUpgradeCost()

    sendMessage_UI_AttributeUpgradeMenu(playerInstance,
        `${menuMessage} 
        - Novo level: ${level} 
        - Almas restantes: ${souls} 
        - custo próximo nível: ${nextUpgradeCost} `
    )
}

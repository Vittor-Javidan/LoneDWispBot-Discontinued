import sendMessage from "../../../Twitch/sendMessageHandler"
import Player from "../Classes/EntityChilds/Player"
import { TYPE_DEFINITIONS_KEYS } from "../Globals/TYPE_DEFINITIONS_KEYS"
import { sendMessage_UI_AttributeUpgradeMenu } from "../UserInteface/sendMessage_Customized/sendMessage_UI_AttributeUpgradeMenu"
import doHaveEnoughSoulsBalance from "./doHaveEnoughSoulsBalance"

const attributeTypes = TYPE_DEFINITIONS_KEYS.CS_ATTRIBUTES
const attributeTypesArray = Object.values(attributeTypes)

/**
 * Handles player upgrade attribute proccess
 * 
 * @param {Object} o
 * @param {Player} o.playerInstance
 * @param {string} o.attributePicked
 * @param {string} o.menuMessage
 */
export default function upgradeAttributeByType(o) {

    const { playerInstance, attributePicked, menuMessage } = o

    if(!doHaveEnoughSoulsBalance(playerInstance)) {
        sendMessage_UI_AttributeUpgradeMenu(playerInstance,
            `Você não possui almas suficientes`
        )
        return
    }

    for(let i = 0; i < attributeTypesArray.length; i++) {
        if(!attributeTypesArray.includes(attributePicked)) {
            throw Error(`ERROR: upgradeAttributeByType(): Attribute type not recognized`)
        }
    }

    playerInstance.upgradeAttributeProcessHandler(attributePicked)
    const playerName = playerInstance.getName()
    const souls = playerInstance.getSouls()
    const level = playerInstance.getlevel()
    const nextUpgradeCost = playerInstance.getUpgradeCost()

    sendMessage(`@${playerName} upou para o nível ${level}!!`)
    sendMessage_UI_AttributeUpgradeMenu(playerInstance,
        `${menuMessage} 
        - Novo level: ${level} 
        - Almas restantes: ${souls} 
        - custo próximo nível: ${nextUpgradeCost} `
    )
}

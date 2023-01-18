import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage 
 * @param {string} equipmentsMessage 
 */
export function sendMessage_UI_EquipmentTypeInventoryMenu(playerInstance, menuMessage) {

    const equipmentype = playerInstance.secondaryState.split(" ")[0]
    const playerName = playerInstance.getName()
    const equipmentCodes = playerInstance.getAllEquipmentInventoryString(equipmentype)

    const emoji = `SirShield`

    sendMessage(
        `/w @${playerName} ${emoji} ${menuMessage}: 
        | 0. Voltar ${equipmentCodes}
        |`
    )
    return
}

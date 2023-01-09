import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * @param {Player} playerInstance
 * @param {string} menuMessage 
 * @param {string} equipmentsMessage 
 */
export function sendMessage_UI_EquipmentTypeInventoryMenu(playerInstance, menuMessage) {

    const equipmentype = playerInstance.secondaryState.split(" ")[0]

    sendMessage(
        `/w @${playerInstance.name} ${menuMessage}: 
        | 0. Voltar ${playerInstance.getAllEquipmentInventoryString(equipmentype)}
        |`
    )
    return
}

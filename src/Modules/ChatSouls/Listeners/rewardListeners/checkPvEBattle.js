import sendMessage from "../../../../Twitch/sendMessageHandler"
import Battle from "../../Classes/Battle"

/**
 * Send a message on chat stream containing all actual players on battle
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 */
export default function checkPvEBattle(data) {
    const message = Battle.returnStringWithAllBattles()
    sendMessage(message)
}
import client from "./connect"

/**
 * @param {string} message
 */
function sendTwitchChatMessage(message) {

    client.say('#lonedwisp', message)
}
export default sendTwitchChatMessage
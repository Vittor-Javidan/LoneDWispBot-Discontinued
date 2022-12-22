import client from "./src/connect"

/**
 * @param {string} message
 */
function sendChatMessage(message) {

    client.say('#lonedwisp', message)
}
export default sendChatMessage
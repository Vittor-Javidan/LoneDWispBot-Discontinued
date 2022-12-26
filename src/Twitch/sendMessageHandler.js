import client from "./connect"

/**
 * @param {string} message
 */
function sendMessage(message) {

    client.say('#lonedwisp', message)
}
export default sendMessage
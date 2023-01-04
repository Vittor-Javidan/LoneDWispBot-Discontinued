import client from "./connect"

/**
 * @param {string} message
 */
function sendMessage(message, delay_milisseconds) {

    if(delay_milisseconds) {

        setTimeout(()=> {
            client.say('#lonedwisp', message)
        }, delay_milisseconds)

    } else {

        client.say('#lonedwisp', message)
        
    }
}
export default sendMessage
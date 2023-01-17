import client from "./connect"

/**
 * @param {string} message
 */
function sendMessage(message, delay_milisseconds) {

    if (process.env.NODE_ENV === 'test') {
        return
    }

    if(delay_milisseconds) {

        setTimeout(()=> {
            client.say('#lonedwisp', message).catch(err => {
                console.log('Could no sent delayed message to channels chat')
                console.log(err)
            })
        }, delay_milisseconds)

    } else {

        client.say('#lonedwisp', message).catch(err => {
            console.log('Could no sent message to channels chat')
            console.log(err)
        })
        
    }
}

export default sendMessage
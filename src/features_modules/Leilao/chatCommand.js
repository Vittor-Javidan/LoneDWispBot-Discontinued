import tmi from 'tmi.js'
import Leilao from './Leilao'

/**
 * @param {string} channel 
 * @param {string} message 
 * @param {boolean} self
 * @param {tmi.Client} client 
 */
function leilaoChatCommand(channel, message, self, client) {

    if(message.toLowerCase().includes('!leilão unitário')) {

        //Error handler
        if(!stringValidation(message)) {
            client.say(channel, 'Commando inválido seu noob!')
            return
        }

        const item = message.split(' ')[2]
        const minutes = Number(message.split(' ')[3])
        Leilao.init({
            item: item,
            minutes: minutes,
            channel: channel,
            client: client
        })
    }
}

export default leilaoChatCommand

/**
 * @param {string} message 
 * @returns {boolean}
 */
function stringValidation(message) {

    const messageWords = message.split(' ')

    //Check if the string has lenght 4
    if( messageWords.length !== 4 ) return false

    //Verify if the last word is a valid number
    if( !isNaN(messageWords[4]) ) return false

    //Verify if the last word is a very low number
    //if( Number(messageWords[4]) < 10 ) return false

    return true
}
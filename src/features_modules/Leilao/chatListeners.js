import tmi from 'tmi.js'
import Leilao from './Leilao'

/**
 * @param {string} channel 
 * @param {string} message 
 * @param {boolean} self
 * @param {tmi.Client} client 
 */
function createAuction(channel, message, self, client) {

    if(message.toLowerCase().includes('!leilão')) {

        //Error handler
        if(!stringValidation(message)) {
            client.say(channel, 'Commando inválido seu noob!')
            return
        }

        const item = message.split(' ')[1]
        const minutes = Number(message.split(' ')[2])
        Leilao.init({
            item: item,
            minutes: minutes,
            channel: channel,
            client: client
        })
    }
}

/**
 * @param {string} channel 
 * @param {string} message 
 * @param {boolean} self
 * @param {tmi.Client} client 
 */
function setAuctionTimeLeft(channel, message, self, client) {

    if(message.toLowerCase().includes('!leilão timeleft')) {
        const minutes = Number(message.split(' ')[2])
        if(minutes !== NaN) {
            Leilao.getInstance().minutes = minutes
            client.say(channel, `Tempo restante do Leilão[${Leilao.getInstance().item}] modificado para ${minutes} minutos`)
        } else {
            client.say(channel, `Comando inválido!`)
        }
    }

}

const leilaoChatListeners = {
    createAuction,
    setAuctionTimeLeft
}
export default leilaoChatListeners

/**
 * @param {string} message 
 * @returns {boolean}
 */
function stringValidation(message) {

    const messageWords = message.split(' ')

    //Check if the string has lenght 4
    if( messageWords.length !== 3 ) return false

    //Verify if the last word is a valid number
    if( isNaN(messageWords[2]) ) return false

    return true
}
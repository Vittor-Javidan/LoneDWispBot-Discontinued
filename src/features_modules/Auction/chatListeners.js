import tmi from 'tmi.js'
import Auction from './Auction'

/**
 * @param {string} channel 
 * @param {string} message 
 * @param {boolean} self
 * @param {tmi.Client} client 
 */
function createAuction(channel, message, self, client) {

    if(message.toLowerCase().includes('!leilão') && !message.toLowerCase().includes('timeleft')) {

        //Error handler
        if(!stringValidation(message)) {
            client.say(channel, 'Commando inválido seu noob!')
            return
        }

        const item = message.split(' ')[1]
        const minutes = Number(message.split(' ')[2])
        Auction.init({
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

        if(Auction.auctions.length > 0) {

            const minutes = Number(message.split(' ')[2])
            if(minutes !== NaN) {
                Auction.getInstance().minutes = minutes
                client.say(channel, `Tempo restante do Leilão[${Auction.getInstance().item}] modificado para ${minutes} minutos`)
            } else {
                client.say(channel, `Comando inválido!`)
            }
            
        } else {
            client.say(channel,
                `Não há nenhum leilão em andamento no momento`    
            )
        }
    }

}

const auctionChatListeners = {
    createAuction,
    setAuctionTimeLeft
}
export default auctionChatListeners

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
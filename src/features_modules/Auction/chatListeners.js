import client from '../../connect'
import Auction from './Auction'

/**
 * @param {string} channel
 * @param {string} message
 */
function createAuction(channel, message) {
	if (
		message.toLowerCase().includes('!leilão') &&
		!message.toLowerCase().includes('timeleft')
	) {
		
		//Error handler
		if (!stringValidation(message)) {
			client.say(channel, 'Commando inválido seu noob!')
			return
		}

		const item = message.split(' ')[1]
		const minutes = Number(message.split(' ')[2])
		Auction.init({
			item: item,
			minutes: minutes,
			channel: channel,
		})
	}
}

/**
 * @param {string} channel
 * @param {string} message
 */
function setAuctionTimeLeft(channel, message) {

	if (message.toLowerCase().includes('!leilão timeleft')) {

		const minutes = Number(message.split(' ')[2])

		if (Auction.auctions.length <= 0) {
			client.say(channel, `Não há nenhum leilão em andamento no momento`)
			return
		}

		if (isNaN(minutes)) {
			client.say(channel, `Comando inválido!`)
			return
		}

		Auction.getInstance().minutes = minutes
		client.say(
			channel,
			`Tempo restante do Leilão[${
				Auction.getInstance().item
			}] modificado para ${minutes} minutos`
		)
	}
}

const auctionChatListeners = {
	createAuction,
	setAuctionTimeLeft,
}
export default auctionChatListeners

/**
 * @param {string} message
 * @returns {boolean}
 */
function stringValidation(message) {
	const messageWords = message.split(' ')

	//Check if the string has lenght 4
	if (messageWords.length !== 3) return false

	//Verify if the last word is a valid number
	if (isNaN(messageWords[2])) return false

	return true
}

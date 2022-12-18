import client from '../../connect'
import Auction from './Auction'

/**
 * @param {string} channel
 * @param {string} message
 */
function createAuction(channel, message) {
	if (
		message.toLowerCase().startsWith('!leilão start')
	) {
		
		const words = message.split(' ')

		//Check if the string has lenght 4
		if (words.length !== 4) {
			client.say(channel, 'digite: !leilão start <item> <minutos>')
			return
		}
	
		//Verify if the last word is a valid number
		if (isNaN(words[3])) {
			client.say(channel, `o tempo precisa ser um número`)
			return
		}

		//Verify if the last word is a positive number
		if(words[3] < 0) {
			client.say(channel, `o tempo precisa ser maior que zero`)
			return
		}

		const item = words[2]
		const minutes = Number(words[3])
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
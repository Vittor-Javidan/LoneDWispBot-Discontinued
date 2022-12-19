import sendChatMessage from '../../../sendMessageHandler'
import Auction from './Auction'

/**
 * @param {string} channel
 * @param {string} message
 */
function createAuction(message) {

	if(!message.toLowerCase().startsWith('!leilão start')) {
		return
	}

	const commandWords = message.split(' ')

	//Check if the string has lenght 4
	if (commandWords.length !== 4) {
		sendChatMessage('digite: !leilão start <item> <minutos>')
		return
	}

	//Verify if the last word is a valid number
	if (isNaN(commandWords[3])) {
		sendChatMessage(`o tempo precisa ser um número`)
		return
	}

	//Verify if the last word is a positive number
	if(commandWords[3] < 0) {
		sendChatMessage(`o tempo precisa ser maior que zero`)
		return
	}

	const item = commandWords[2]
	const minutes = Number(commandWords[3])
	Auction.init({
		item: item,
		minutes: minutes,
	})
}

/**
 * @param {string} channel
 * @param {string} message
 */
function setAuctionTimeLeft(message) {

	if (!message.toLowerCase().startsWith('!leilão timeleft')) {
		return
	}

	const minutes = Number(message.split(' ')[2])

	if (Auction.auctions.length <= 0) {
		sendChatMessage(`Não há nenhum leilão em andamento no momento`)
		return
	}

	if (isNaN(minutes)) {
		sendChatMessage(`Comando inválido!`)
		return
	}

	Auction.getInstance().minutes = minutes
	sendChatMessage(`Tempo restante do Leilão[${Auction.getInstance().item}] modificado para ${minutes} minutos`)
}

/**
 * @param {string} channel
 * @param {string} message
 */
function endAuction(message) {

	if (!message.toLowerCase().startsWith('!leilão end')) {
		return
	}

	Auction.getInstance().deleteAuction()
	sendChatMessage(`Leilão finalizado com sucesso. Qualquer ponto gasto irá ser reembolsado em breve`)
}

const auctionChatListeners = {
	createAuction,
	setAuctionTimeLeft,
	endAuction
}
export default auctionChatListeners
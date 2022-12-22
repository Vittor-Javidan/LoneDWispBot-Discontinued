import sendChatMessage from "../../../../sendMessageHandler"
import Auction from "../Auction"

/** ====================================================
 * Receives a string text sentence in the format of "!commandName subCommandName itemName minutes" as an argument, and creates an Auction instance with it.
 *
 * @param {string} message - The text message containing the auction name and time information.
 * @returns {void}
 */
export default function createAuction(message) {

	//Parse the message into words
	const words = message.split(' ')
	
	//Is command right using format?
	if(isInvalidMessageLenght(words)) return

	//Format inputs to right format
	const itemName = words[2].toUpperCase()						
	const minutes = Number(words[3])
	
	//Is minutes a a valid number or ther is already a item with the same name?
	if(
		isAuctionDuplicate(itemName) ||
		!isMinutesValid(minutes)
	) return 
	
	//Initiate the auction instance and send a feedback message to twitch channel chat
	Auction.init({
		item: itemName,
		minutes: minutes,
	})
	sendChatMessage(`LEILÃO DE UM ${itemName.toUpperCase()} COMEÇOU E ACABA EM ${minutes} MINUTOS!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`)
}

function isInvalidMessageLenght(words){
	
	if(words.length !== 4){
		sendChatMessage(`commando possui um número de argumentos diferente do esperado`)
		return true
	}
	return false
}

function isAuctionDuplicate(itemName) {

	if(Auction.isAuctionItemDuplicate(itemName)) {
		sendChatMessage(`O item de nome ${itemName} já está sendo leiloado`)
		return true
	}
	return false
}

function isMinutesValid(minutes){
	
	if (
		typeof minutes !== 'number' ||
		minutes < 0
	) {
		sendChatMessage(`o tempo precisa ser um número, e ser positivo`)
		return false
	}
	return true
}

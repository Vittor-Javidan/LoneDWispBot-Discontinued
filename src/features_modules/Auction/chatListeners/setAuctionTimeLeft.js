import sendTwitchChatMessage from "../../../Twitch/sendMessageHandler"
import Auction from "../Auction"

/** ====================================================
 * Receives a string text sentence in the format of "!commandName subCommandName itemCode minutes" as an argument, and changes the remaining time of a specific Auction instance with it.
 *
 * @param {string} message - The text message containing the auction information.
 * @returns {void}
 */
export default function setAuctionTimeLeft(message) {

	//Parse the message into words
	const words = message.split(' ')

	//Is the command using the right format?
	if(isInvalidMessageLenght(words)) return

	//Gets the auction instance using the item code
	const itemCode = Number(words[2])
	const instance = Auction.getInstanceByCode(itemCode)
	
	//Is instance null?
	if(!instance){
		sendTwitchChatMessage(`O leilão de código "${itemCode}" não existe`)
		return
	}
	
	//Checks if minutes is a valid positive number
	const minutes = Number(words[3])
	if(!isMinutesValidNumber) return

	//Sets the auction remaining minutes and send a feedback message in the twitch channels chat
	instance.setMinutes(minutes)
	sendTwitchChatMessage(`Tempo restante do Leilão[${instance.getItemName()}] foi modificado para ${minutes} minutos`)
}

function isInvalidMessageLenght(words){
	
	if(words.length !== 4){
		sendTwitchChatMessage(`commando inválido.`)
		return true
	}
	return false
}

function isMinutesValidNumber(minutes){

	if(
		typeof minutes !== 'number' 		||
		minutes < 0
	) {
		sendTwitchChatMessage(`o tempo precisa ser um número, e ser positivo`)
		return false
	}
	return true
}
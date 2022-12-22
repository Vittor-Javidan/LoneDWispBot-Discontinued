import sendChatMessage from "../../../../sendMessageHandler"
import Auction from "../Auction"

/** ====================================================
 * Retrieves the rank of an item in an auction.
 *
 * @param {Object} data - The data for the auction item.
 * @param {string} data.message - The message containing the item code and bid amount.
 * @param {string} data.userName - The name of the user placing the bid.
 * @returns {void}
 */
export default function auctionItemRank(data) {

	//Checks is there is no auction happening
	if(Auction.getAuctionsAmount() <= 0){
		sendChatMessage(`Não há nenhum leilão acontencendo no momento`)
		return
	}

	//Parse Viewer message to find the right auction instance
	const userName = data.userName
	const words = data.message.split(' ')
	const itemCode = Number(words[0])
	const auctionInstance = Auction.getInstanceByCode(itemCode)
	
	//checks if auctionInstance is null
	if(!auctionInstance) {
		sendChatMessage(`@${userName} O código ${itemCode} não existe`)
		return
	}
	
	//checks if there is no participant yet
	const itemName = auctionInstance.getItemName()
	const participantsArray = auctionInstance.getRank()
	if(participantsArray.length === 0) {
		sendChatMessage(`Ainda não há nenhum lance para ${itemName}`)
		return
	}
	
	//Build and send the message text viewers will see
	buildAndSendMessage(itemName, participantsArray)
	
}

function buildAndSendMessage(itemName, participantsArray){

	//Build the rank message using only the first 5 participants
	let rankText = ''
	for(let i = 0; i < 5 && i < participantsArray.length; i++) {
		rankText += `| ${i + 1}. ${participantsArray[i].name} : ${participantsArray[i].score} pontos |`
	}
	rankText += '|'
	sendChatMessage(`RANK ${itemName}: |${rankText}`)
}
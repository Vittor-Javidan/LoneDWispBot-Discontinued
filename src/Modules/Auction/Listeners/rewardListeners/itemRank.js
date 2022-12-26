import sendMessage from "../../../../Twitch/sendMessageHandler"
import Auction from "../../Auction"

/** ====================================================
 * Sends a chat message of the item rank in an auction.
 *
 * @param {Object} data - The data for the auction item.
 * @param {string} data.userName - The name of the user.
 * @param {number} data.itemCode - The item code.
 * @returns {void}
 */
export default function itemRank(data) {

	//Parse Viewer message to find the right auction instance
	const userName = data.userName
	const itemCode = data.itemCode
	const auctionInstance = Auction.getInstanceByCode(itemCode)
	
	//checks if auctionInstance is null
	if(!auctionInstance) {
		sendMessage(`@${userName} O código ${itemCode} não existe`)
		return
	}
	
	//checks if there is no participant yet
	const itemName = auctionInstance.getItemName()
	const participantsArray = auctionInstance.getRank()
	if(participantsArray.length === 0) {
		sendMessage(`Ainda não há nenhum lance para ${itemName}`)
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
	sendMessage(`RANK ${itemName}: |${rankText}`)
}
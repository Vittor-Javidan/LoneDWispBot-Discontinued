import sendChatMessage from "../../../../sendMessageHandler"
import Auction from "../Auction"

/** ====================================================
 * Place a bid in an auction.
 *
 * @param {Object} data - Object containing the user name and message.
 * @param {string} data.userName - The user name of the bidder.
 * @param {string} data.message - The message containing the bid details.
 * @param {number} bidValue - The value of the bid.
 * @returns {void}
 */
export default function auctionBid(data, bidValue) {

	//Checks is there is no auction happening
	if(Auction.getAuctionsAmount() <= 0){
		sendChatMessage(`Não há nenhum leilão acontencendo no momento`)
		return
	}
	
	//Gets the auction instance using the itemCode number
	const words = data.message.split(' ')
	const itemCode = Number(words[0])
	const auctionInstance = Auction.getInstanceByCode(itemCode)

	//Get the userName to provide him feedback errors or to register his bid
	const userName = data.userName
	
	//Is auctionInstance null?
	if(!auctionInstance) {
		sendChatMessage(`@${userName} O código ${itemCode} não existe`)
		return
	}

	//Is this auction finished already?
	if(auctionInstance.isAuctionFinished()) {
		sendChatMessage(`@${userName}, esse leilão já foi finalizado!`)
		return 
	}

	//Register the bid
	auctionInstance.bid({ 
		userName: userName,
		bidValue: bidValue
	})
}
import sendChatMessage from "../../../../sendMessageHandler"
import Auction from "../Auction"

import itemRank from "./itemRank"
import generalRank from "./generalRank"

/** ====================================================
 * Sends the item rank as a chat message of the selected item. Or the general rank if item code is '0'.
 * 
 * @param {Object} data - The data for the auction item.
 * @param {string} data.userName - The name of the user placing the bid.
 * @param {string} data.message - The message containing the item code and bid amount.
 * @return {void}
 */
export default function avaibleAuctions(data){

	//Checks is there is no auction happening
	if(Auction.getAuctionsAmount() <= 0){
		sendChatMessage(`Não há nenhum leilão acontencendo no momento`)
		return
	}

	const userName = data.userName
	const words = data.message.split(' ')
	const itemCode = Number(words[0])

	if(itemCode === 0){
		generalRank({
			userName: userName
		})
	} else if (itemCode > 0) {
		itemRank({
			userName: userName, 
			itemCode: itemCode
		})
	} else {
		sendChatMessage(`@${userName} O código ${itemCode} não existe`)
	}
}


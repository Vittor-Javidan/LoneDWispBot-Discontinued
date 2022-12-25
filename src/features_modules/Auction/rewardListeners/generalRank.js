import sendTwitchChatMessage from "../../../Twitch/sendMessageHandler"
import Auction from "../Auction"

/** ====================================================
 * Sends a chat message with the general rank 
 * 
 * @param {Object} data - The data for the auction item.
 * @param {string} data.userName - The name of the user placing the bid.
 * @return {void}
 */
export default function generalRank(data) {
	//Gets all auctions instances
	const allAuctions = Auction.getAuctionList()

	//Builds the message with a general rank of all auctions and the respectives first places
	const userName = data.userName
	buildAndSendMessage(userName, allAuctions)
}

/**
 * @param {string} userName 
 * @param {Auction[]} auctionsArray 
 */
function buildAndSendMessage(userName, auctionsArray) {

	let availableAuctions = ''

	//Iterate through all auctions instances
	for(let i = 0; i < auctionsArray.length; i++){

		const auction = auctionsArray[i]
		const itemName = auction.getItemName().toUpperCase()
		const timeLeft = auction.getSecondsLeft()
		const podium = auction.getRank()

		availableAuctions += `| ${i + 1}. ${itemName} -`
		
		//If no bids
		if(podium.length === 0) {
			availableAuctions += `- Sem Lances |`
		}
		
		//If only 1 bid
		if(podium.length === 1) {
			if(timeLeft > 0) {
				availableAuctions += `- Rank 1: ${podium[0].name} ${podium[0].score} pontos |`
			} else if (podium[0] && timeLeft <= 0){
				availableAuctions += `- Ganhador: ${podium[0].name} ${podium[0].score} pontos |`
			}
		}

		//If more than 1 bid
		if(podium.length > 1){
			if(podium[0].score === podium[1].score && timeLeft > 0) {
				availableAuctions += `- Empate: ${podium[0].name} e ${podium[1].name} ${podium[0].score} pontos |`
			} else if(timeLeft > 0) {
				availableAuctions += `- Rank 1: ${podium[0].name} ${podium[0].score} pontos |`
			} else if (timeLeft <= 0){
				availableAuctions += `- Ganhador: ${podium[0].name} ${podium[0].score} pontos |`
			}
		}

	}
	availableAuctions += `| Lembrando que ao vencer um leilão, é necessário coletar o prêmio ANTES QUE A LIVE ACABE!!!`

	sendTwitchChatMessage(`@${userName}, CÓDIGOS DOS LEILÕES SÃO: |${availableAuctions}`)
}
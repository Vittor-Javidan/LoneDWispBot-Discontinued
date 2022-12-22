import sendChatMessage from "../../../../sendMessageHandler"
import Auction from "../Auction"

/** ==================================================== 
 * Deletes all available auction instances.
 * 
 * @returns {void}
 * 
 * @warning This will interrupt the auction, giving no winners.
 */
export default function endAllAuctions() {
	
	Auction.clearAuctionList()
	sendChatMessage(`Leilão finalizado com sucesso. Qualquer ponto gasto irá ser reembolsado em breve`)
}
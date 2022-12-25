import sendTwitchChatMessage from "../../../Twitch/sendMessageHandler"
import Auction from "../Auction"

/** ==================================================== 
 * Deletes all available auction instances.
 * 
 * @returns {void}
 * 
 * @warning This will interrupt the auction, giving no winners.
 */
export default function endAllAuctions() {
	
	Auction.clearAuction()
	sendTwitchChatMessage(`Leilão finalizado com sucesso. Histórico de ganhadores deletado`)
}
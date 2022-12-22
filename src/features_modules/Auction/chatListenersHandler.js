import createAuction from './chatListeners/createAuction'
import setAuctionTimeLeft from './chatListeners/setAuctionTimeLeft'
import endAllAuctions from './chatListeners/endAllAuctions'
import createManyAuctions from './chatListeners/createManyAuctions'
import pinMessage from './chatListeners/pinMessage'

/** ==================================================== */
const auctionChatListeners = {
	createAuction,
	setAuctionTimeLeft,
	endAllAuctions,
	createManyAuctions,
	pinMessage
}
export default auctionChatListeners
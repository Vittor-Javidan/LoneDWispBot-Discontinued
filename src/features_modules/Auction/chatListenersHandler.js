import createAuction from './chatListeners/createAuction'
import setAuctionTimeLeft from './chatListeners/setAuctionTimeLeft'
import endAllAuctions from './chatListeners/endAllAuctions'
import createManyAuctions from './chatListeners/createManyAuctions'

/** ==================================================== */
const auctionChatListeners = {
	createAuction,
	setAuctionTimeLeft,
	endAllAuctions,
	createManyAuctions
}
export default auctionChatListeners
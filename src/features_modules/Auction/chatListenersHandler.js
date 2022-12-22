import createAuction from './chatListeners/createAuction'
import setAuctionTimeLeft from './chatListeners/setAuctionTimeLeft'
import endAllAuctions from './chatListeners/endAllAuctions'

/** ==================================================== */
const auctionChatListeners = {
	createAuction,
	setAuctionTimeLeft,
	endAllAuctions
}
export default auctionChatListeners
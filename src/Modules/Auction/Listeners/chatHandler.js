import env from '../../../env'
import createAuction from './chatListeners/createAuction'
import createManyAuctions from './chatListeners/createManyAuctions'
import endAllAuctions from './chatListeners/endAllAuctions'
import pinMessage from './chatListeners/pinMessage'
import setAuctionTimeLeft from './chatListeners/setAuctionTimeLeft'

/**
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @returns {void}
 */
export default function auctionChatListeners(data) {

	const {userName, message} = data
	const auctionCommands = env.TWITCH.MODULES.AUCTION.COMMANDS

	//Broadcaster exclusive chat commands area
	if(userName === env.TWITCH.BROADCASTER_NAME) {

		if(message.startsWith(auctionCommands.CREATE_MANY_AUCTIONS)) createManyAuctions(message)
		if(message.startsWith(auctionCommands.CREATE_AUCTION)) createAuction(message)
		if(message.startsWith(auctionCommands.SET_AUCTION_TIME_LEFT)) setAuctionTimeLeft(message)
		if(message.startsWith(auctionCommands.END_ALL_AUCTIONS)) endAllAuctions()
		if(message.startsWith(auctionCommands.PIN_MESSAGE)) pinMessage()
	}
}
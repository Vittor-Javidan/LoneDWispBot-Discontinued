import websiteChatListeners from "../features_modules/Website/chatListeners"
import auctionChatListeners from "../features_modules/Auction/chatListenersHandler"
import env from "../env"

/*
	If this file gets bigger, that's not a problem. 
	It's the same concept as when you install a game 
	and you have a mod manager to see which modules 
	you have installed.

	In this case, the purpose is to see which commands 
	are enabled. If you want to disable any, all you 
	have to do is comment out the commands or modules 
	you want to."
*/

/** ====================================================
 * Listen for messages to identify chat commands
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @returns {void}
 */
export default function chatListeners(data) {

	const message = data.message.toLocaleLowerCase()
	
	//COMMAND IMPORTS
	const modules = env.MODULES
	const websiteCommands = modules.WEBSITE.COMMANDS
	const auctionCommands = modules.AUCTION.COMMANDS

	//WEBSITE MODULE ====================================================
	if(message.startsWith(websiteCommands.GIVE_WEBSITE_URL)) websiteChatListeners.giveURL()
	//

	//Broadcaster exclusive chat commands area
	if(data.userName === env.BROADCASTER_NAME){

		//AUCTION MODULE ====================================================
		if(message.startsWith(auctionCommands.CREATE_MANY_AUCTIONS)) auctionChatListeners.createManyAuctions(data.message)
		if(message.startsWith(auctionCommands.CREATE_AUCTION)) auctionChatListeners.createAuction(data.message)
		if(message.startsWith(auctionCommands.SET_AUCTION_TIME_LEFT)) auctionChatListeners.setAuctionTimeLeft(data.message)
		if(message.startsWith(auctionCommands.END_ALL_AUCTIONS)) auctionChatListeners.endAllAuctions()
		if(message.startsWith(auctionCommands.PIN_MESSAGE)) auctionChatListeners.pinMessage()
		//
	}
}
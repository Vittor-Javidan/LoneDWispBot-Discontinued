import auctionChatListeners from "../../Modules/Auction/Listeners/chatHandler"
import chatSoulsChatListener from "../../Modules/ChatSouls/Listeners/chatHandler"
import websiteChatListeners from "../../Modules/Website/chatListeners"

/**
 * Listen for messages to identify chat commands
 * 
 * @param {Object} data - The data object passed to the function
 * @returns {void}
 */
export default function chatListeners(data) {

	websiteChatListeners(data)
	auctionChatListeners(data)
	chatSoulsChatListener(data)
}
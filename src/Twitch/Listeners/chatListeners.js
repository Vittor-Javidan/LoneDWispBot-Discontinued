import auctionChatListeners from "../../Modules/Auction/Listeners/chatHandler"
import chatSoulsChatListener from "../../Modules/ChatSouls/Listeners/chatHandler"
import timerChatListeners from "../../Modules/Timers/chatListeners"
import websiteChatListeners from "../../Modules/Website/chatListeners"

/**
 * Listen for messages to identify chat commands
 * 
 * @param {Object} data - The data object passed to the function
 * @returns {void}
 */
export default function chatListeners(data) {

	auctionChatListeners(data)
	chatSoulsChatListener(data)
	timerChatListeners(data)
	websiteChatListeners(data)
}
import env from './env'
import client from './connect'

//Chat Listeners
import websiteChatListeners from './features_modules/Website/chatListeners'
import auctionChatListeners from './features_modules/Auction/chatListeners'

//Reward Listeners
import websiteRewardListeners from './features_modules/Website/rewardListeners'
import musicRewardListeners from './features_modules/Music/rewardListeners'
import auctionRewardListeners from './features_modules/Auction/rewardListeners'

//Chat Listener
client.on('message', (channelName, userstate, message) => {
	
	websiteChatListeners.website(channelName, message)

	//Broadcaster exclusive commands
	if(userstate.username === 'lonedwisp') {
		auctionChatListeners.createAuction(message)
		auctionChatListeners.setAuctionTimeLeft(message)
		auctionChatListeners.endAuction(message)
	}
})

//Redeem Listener
client.on('redeem', (channelName, userName, rewardIdentifier) => {

	try {
		console.log(rewardIdentifier)
		websiteRewardListeners.website(channelName, userName, rewardIdentifier)
		musicRewardListeners.playlistMusicSugestion(channelName, userName, rewardIdentifier)
		auctionRewardListeners.auctionRank(userName, rewardIdentifier)
		auctionRewardListeners.auctionBid100(userName, rewardIdentifier)
		auctionRewardListeners.auctionBid500(userName, rewardIdentifier)
		auctionRewardListeners.auctionBid1000(userName, rewardIdentifier)
		auctionRewardListeners.auctionBid5000(userName, rewardIdentifier)
		auctionRewardListeners.auctionBid10000(userName, rewardIdentifier)
	} catch(err) {
		client.say(channelName, `Ocorreu um erro na recompensa resgatada de @${userName}. Id da recompensa: ${rewardIdentifier} `)
	}
})
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
client.on('message', (channelName, userstate, message, self) => {
	
	websiteChatListeners.website(channelName, userstate, message, client)

	//Broadcaster exclusive commands
	if(userstate.username === env.channelName) {
		auctionChatListeners.createAuction(channelName, message, self, client)
		auctionChatListeners.setAuctionTimeLeft(channelName, message, self, client)
	}
})

//Redeem Listener
client.on('redeem', (channelName, userName, rewardIdentifier) => {

	try {
		console.log(rewardIdentifier)
		websiteRewardListeners.website(channelName, userName, rewardIdentifier, client)
		musicRewardListeners.playlistMusicSugestion(channelName, userName, rewardIdentifier, client)
		auctionRewardListeners.auctionRank(channelName, userName, rewardIdentifier, client)
		auctionRewardListeners.auctionBid100(channelName, userName, rewardIdentifier, client)
		auctionRewardListeners.auctionBid500(channelName, userName, rewardIdentifier, client)
		auctionRewardListeners.auctionBid1000(channelName, userName, rewardIdentifier, client)
		auctionRewardListeners.auctionBid5000(channelName, userName, rewardIdentifier, client)
		auctionRewardListeners.auctionBid10000(channelName, userName, rewardIdentifier, client)
	} catch(err) {
		client.say(channelName, `Ocorreu um erro na recompensa resgatada de @${userName}. Id da recompensa: ${rewardIdentifier} `)
	}
})
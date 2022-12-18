import env from './env'
import client from './connect'

//Chat Listeners
import websiteChatListeners from './features_modules/Website/chatListeners'
import leilaoChatListeners from './features_modules/Leilao/chatListeners'

//Reward Listeners
import websiteRewardListeners from './features_modules/Website/rewardListeners'
import musicaRewardListeners from './features_modules/Musica/rewardListeners'
import leilaoRewardListeners from './features_modules/Leilao/rewardListeners'

//Chat Listener
client.on('message', (channelName, userstate, message, self) => {
	
	websiteChatListeners.website(channelName, userstate, message, client)

	//Broadcaster exclusive commands
	if(userstate.username === env.channelName) {
		leilaoChatListeners.createAuction(channelName, message, self, client)
		leilaoChatListeners.setAuctionTimeLeft(channelName, message, self, client)
	}
})

//Redeem Listener
client.on('redeem', (channelName, userName, rewardIdentifier) => {

	try {
		console.log(rewardIdentifier)
		websiteRewardListeners.website(channelName, userName, rewardIdentifier, client)
		musicaRewardListeners.adicioneMinhaMusica(channelName, userName, rewardIdentifier, client)
		leilaoRewardListeners.leilaoRank(channelName, userName, rewardIdentifier, client)
		leilaoRewardListeners.leilaoBid100(channelName, userName, rewardIdentifier, client)
		leilaoRewardListeners.leilaoBid500(channelName, userName, rewardIdentifier, client)
		leilaoRewardListeners.leilaoBid1000(channelName, userName, rewardIdentifier, client)
		leilaoRewardListeners.leilaoBid5000(channelName, userName, rewardIdentifier, client)
		leilaoRewardListeners.leilaoBid10000(channelName, userName, rewardIdentifier, client)
	} catch(err) {
		client.say(channelName, `Ocorreu um erro na recompensa resgatada de @${userName}. Id da recompensa: ${rewardIdentifier} `)
	}
})
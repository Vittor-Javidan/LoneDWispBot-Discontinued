import env from "../../env"

import musicRewardListeners from "../../Modules/Music/rewardListeners"
import websiteRewardListeners from "../../Modules/Website/rewardListeners"
import auctionRewardListeners from "../../Modules/Auction/rewardListenersHandler"

/*
	If this file gets bigger, that's not a problem. 
	It's the same concept as when you install a game 
	and you have a mod manager to see which modules 
	you have installed.

	In this case, the purpose is to see which rewards 
	are enabled. If you want to disable any, all you 
	have to do is comment out the rewards or modules 
	you want to."
*/

/** ====================================================
 * Listens for reward identifiers and compare with alrady know reward_IDs, to identify which reward the viewer redeemed.
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @param {string} data.rewardIdentifier - The identifier for the reward that was redeemed
 */
export default function rewardListeners(data) {

	//If the reward id is undefined, there is no reason to continue
	const id = data.rewardIdentifier
	if(!id) return

	//REWARD IDs IMPORT
	const modules = env.MODULES
	const websiteRewardIds = modules.WEBSITE.REWARDS_IDs
	const musicRewardIds = modules.MUSIC.REWARDS_IDs
	const auctionRewardIds = modules.AUCTION.REWARDS_IDs

	//switch statement to handle better intensive redeemer events
	switch (id) {

		//WEBSITE MODULE ====================================================
		case websiteRewardIds.GIVE_WEBSITE_URL: websiteRewardListeners.giveURL(); break
		//

		//MUSIC MODULE ======================================================
		case musicRewardIds.PLAYLIST_MUSIC_SUGESTION: musicRewardListeners.viewerMusicSugestion(data); break
		//

		//AUCTION MODULE ====================================================
		case auctionRewardIds.AUCTION_RANKS: auctionRewardListeners.auctionRanks(data); break
		case auctionRewardIds.BID_100: auctionRewardListeners.bid(data, 100); break
		case auctionRewardIds.BID_500: auctionRewardListeners.bid(data, 500); break
		case auctionRewardIds.BID_1000: auctionRewardListeners.bid(data, 1000); break
		case auctionRewardIds.BID_5000: auctionRewardListeners.bid(data, 5000); break
		case auctionRewardIds.BID_10000: auctionRewardListeners.bid(data, 10000); break
		//
	}
}
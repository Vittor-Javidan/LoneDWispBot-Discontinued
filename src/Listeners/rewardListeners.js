import REWARD_IDENTIFIER_LIST from "../secrets/rewards_IDs"

import musicRewardListeners from "../features_modules/Music/rewardListeners"
import websiteRewardListeners from "../features_modules/Website/rewardListeners"
import auctionRewardListeners from "../features_modules/Auction/rewardListenersHandler"

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

	//switch statement to handle better intensive redeemer events
	switch (id) {

		//WEBSITE MODULE ====================================================
		case REWARD_IDENTIFIER_LIST['Website']: websiteRewardListeners.giveURL(); break
		//

		//MUSIC MODULE ======================================================
		case REWARD_IDENTIFIER_LIST['Playlist Music Sugestion']: musicRewardListeners.viewerMusicSugestion(data); break
		//

		//AUCTION MODULE ====================================================
		case REWARD_IDENTIFIER_LIST['Avaible Auctions']: auctionRewardListeners.avaibleAuctions(data); break
		case REWARD_IDENTIFIER_LIST['Auction Item Rank']: auctionRewardListeners.auctionItemRank(data); break
		case REWARD_IDENTIFIER_LIST['Auction bid 100 points']: auctionRewardListeners.auctionBid(data, 100); break
		case REWARD_IDENTIFIER_LIST['Auction bid 500 points']: auctionRewardListeners.auctionBid(data, 500); break
		case REWARD_IDENTIFIER_LIST['Auction bid 1000 points']: auctionRewardListeners.auctionBid(data, 1000); break
		case REWARD_IDENTIFIER_LIST['Auction bid 5000 points']: auctionRewardListeners.auctionBid(data, 5000); break
		case REWARD_IDENTIFIER_LIST['Auction bid 10000 points']: auctionRewardListeners.auctionBid(data, 10000); break
		//
	}
}
import env from '../../../env'
import bid from './rewardListeners/auctionBid'
import auctionRanks from './rewardListeners/auctionRanks'

/**
 * Auction module reward handler
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @param {string} data.rewardIdentifier - The identifier for the reward that was redeemed
 */
export default function auctionRewardListeners(data) {

	const {userName, message, rewardIdentifier} = data
	const auctionRewardIds = env.TWITCH.MODULES.AUCTION.REWARDS_IDs

	switch(rewardIdentifier) {
		case auctionRewardIds.AUCTION_RANKS: auctionRanks(data); break
		case auctionRewardIds.BID_100: bid(data, 100); break
		case auctionRewardIds.BID_500: bid(data, 500); break
		case auctionRewardIds.BID_1000: bid(data, 1000); break
		case auctionRewardIds.BID_5000: bid(data, 5000); break
		case auctionRewardIds.BID_10000: bid(data, 10000); break
	}
}
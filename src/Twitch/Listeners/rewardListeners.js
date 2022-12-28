import auctionRewardListeners from "../../Modules/Auction/Listeners/rewardHandler"
import musicRewardListeners from "../../Modules/Music/rewardListeners"
import websiteRewardListeners from "../../Modules/Website/rewardListeners"

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

	websiteRewardListeners(data)
	musicRewardListeners(data)
	auctionRewardListeners(data)
}
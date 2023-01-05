import env from "../../../env";
import Battle from "../Classes/Battle";

/**
 * Send a message on chat stream containing all actual players on battle
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 */
function checkPvEBattle(data) {
    Battle.sendMessageWithAllPvEBattles()
}

/**
 * ChatSouls module reward handler
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @param {string} data.rewardIdentifier - The identifier for the reward that was redeemed
 */
export default function chatsoulsRewardHandler(data) {

    const {rewardIdentifier} = data
	const chatSoulsRewardIds = env.TWITCH.MODULES.CHATSOULS.REWARDS_IDs

    switch(rewardIdentifier) {
        case chatSoulsRewardIds.CHECK_PVE_BATTLES: checkPvEBattle(data); break
    }
}
import env from "../../../env";

import checkPvEBattle from "./rewardListeners/checkPvEBattle";
import restoreEnemieHpPvE from "./rewardListeners/restoreEnemieHpPvE";
import restorePlayerHpPvE from "./rewardListeners/restorePlayerHpPvE";

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
        case chatSoulsRewardIds.CHECK_PVE_BATTLES:      checkPvEBattle(data);       break
        case chatSoulsRewardIds.RESTORE_PVE_ENEMIE_HP:  restoreEnemieHpPvE(data);   break
        case chatSoulsRewardIds.RESTORE_PVE_PLAYER_HP:  restorePlayerHpPvE(data);   break
    }
}
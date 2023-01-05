import env from "../../../env";
import sendMessage from "../../../Twitch/sendMessageHandler";
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
 * Send a message on chat stream containing all actual players on battle
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 */
function restoreEnemieHP(data){

    const words = data.message.split(' ')
    let targetPlayer = words[0]

    const battleInstance = Battle.getPvEBattle(targetPlayer)
    if(!battleInstance){
        return
    }

    const enemieInstance = battleInstance.getEnemieInstancePvE()
    enemieInstance.recoverHP()
    enemieInstance.addSouls(enemieInstance.getSouls())
    sendMessage(`/w ${targetPlayer} ${data.userName} acabou de restaurar a vida de seu inimigo!!!`)
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
        case chatSoulsRewardIds.RESTORE_PVE_ENEMIE_HP: restoreEnemieHP(data); break
    }
}
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
function restoreEnemieHpPvE(data){

    const words = data.message.split(' ')
    let targetPlayer = words[0]

    const battleInstance = Battle.getPvEBattle(targetPlayer)
    if(!battleInstance){
        //If there is no battle
        sendMessage(
            `Batalha PvE não encotrada ou já concluída: ${userName}`
        )
        console.log(`Erro: Batalha PvE não encotrada: ${userName}`)
        return
    }

    const playerInstance = battleInstance.getPlayerInstancePvE()
    if(playerInstance.getName() === data.userName){
        const playerSouls = playerInstance.getSouls()
        playerInstance.setSouls(Math.floor(playerSouls/2))
        playerInstance.save()
        sendMessage(`@${data.userName} tentou recuperar a vida de seu próprio inimigo! Tamanha audacidade o fez perder metade de suas almas *-*`)
        return
    }

    const enemieInstance = battleInstance.getEnemieInstancePvE()
    enemieInstance.recoverHP()
    enemieInstance.addSouls(enemieInstance.getSouls())
    sendMessage(`/w ${targetPlayer} ${data.userName} acabou de restaurar a vida de seu inimigo!!!`)
}

/**
 * Restore player hp on PvE battles
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 */
function restorePlayerHpPvE(data) {

    const words = data.message.split(' ')
    let targetPlayer = words[0]

    const battleInstance = Battle.getPvEBattle(targetPlayer)
    if(!battleInstance){
        //If there is no battle
        sendMessage(
            `Batalha PvE não encotrada ou já concluída: ${userName}`
        )
        console.log(`Erro: Batalha PvE não encotrada: ${userName}`)
        return
    }

    const playerInstance = battleInstance.getPlayerInstancePvE()
    if(playerInstance.getName() === data.userName){
        const playerSouls = playerInstance.getSouls()
        playerInstance.setSouls(Math.floor(playerSouls/2))
        playerInstance.save()
        sendMessage(`@${data.userName} tentou recuperar sua própria vida! Tamanha audacidade o fez perder metade de suas almas *-*`)
        return
    }
    
    playerInstance.recoverHP()
    sendMessage(`/w ${targetPlayer} ${data.userName} acabou de restaurar sua vida!!!`)
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
        case chatSoulsRewardIds.CHECK_PVE_BATTLES:      checkPvEBattle(data);       break
        case chatSoulsRewardIds.RESTORE_PVE_ENEMIE_HP:  restoreEnemieHpPvE(data);   break
        case chatSoulsRewardIds.RESTORE_PVE_PLAYER_HP:  restorePlayerHpPvE(data);   break
    }
}
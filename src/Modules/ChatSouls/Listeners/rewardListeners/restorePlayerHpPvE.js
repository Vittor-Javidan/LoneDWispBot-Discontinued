import sendMessage from "../../../../Twitch/sendMessageHandler"
import Battle from "../../Classes/Battle"

/**
 * Restore player hp on PvE battles
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 */
export default function restorePlayerHpPvE(data) {

    const words = data.message.split(' ')
    let targetPlayer = words[0]

    const battleInstance = Battle.getBattle(targetPlayer)
    if(!battleInstance){
        //If there is no battle
        sendMessage(
            `Batalha PvE não encotrada ou já concluída: ${data.userName}`
        )
        return
    }

    const playerInstance = battleInstance.playerInstance
    if(playerInstance.name === data.userName){
        const playerSouls = playerInstance.getSouls()
        playerInstance.souls = Math.floor(playerSouls/2)
        playerInstance.save()
        sendMessage(`@${data.userName} tentou recuperar sua própria vida! Tamanha audacidade o fez perder metade de suas almas *-*`)
        return
    }
    
    playerInstance.recoverHP()
    sendMessage(`/w ${targetPlayer} ${data.userName} acabou de restaurar sua vida!!!`)
    sendMessage(`${data.userName} restaurou a vida de ${targetPlayer} durante sua batalha :/`)
}
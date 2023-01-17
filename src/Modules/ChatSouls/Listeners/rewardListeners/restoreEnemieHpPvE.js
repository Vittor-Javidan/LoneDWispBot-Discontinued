import sendMessage from "../../../../Twitch/sendMessageHandler"
import Battle from "../../Classes/Battle"

/**
 * Send a message on chat stream containing all actual players on battle
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 */
export default function restoreEnemieHpPvE(data){

    const words = data.message.split(' ')
    let targetPlayer = words[0]

    const battleInstance = Battle.getBattle(targetPlayer)
    if(!battleInstance){
        //If there is no battle
        sendMessage(
            `Batalha PvE não encotrada ou já concluída: ${data.userName}`
        )
        console.log(`Erro: Batalha PvE não encotrada: ${data.userName}`)
        return
    }

    const playerInstance = battleInstance.playerInstance
    if(playerInstance.getName() === data.userName){
        const playerSouls = playerInstance.getSouls()
        playerInstance.setSouls(Math.floor(playerSouls/2))
        playerInstance.save()
        sendMessage(`@${data.userName} tentou recuperar a vida de seu próprio inimigo! Tamanha audacidade o fez perder metade de suas almas *-*`)
        return
    }

    const enemieInstance = battleInstance.enemieInstance
    enemieInstance.recoverHP()
    enemieInstance.addSouls(enemieInstance.getSouls())
    sendMessage(`/w ${targetPlayer} ${data.userName} acabou de restaurar a vida de seu inimigo!!!`)
    sendMessage(`${data.userName} restaurou a vida do inimigo de ${targetPlayer} durante sua batalha *-*`)
}
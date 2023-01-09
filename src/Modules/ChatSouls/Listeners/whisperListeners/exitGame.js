import sendMessage from "../../../../Twitch/sendMessageHandler"
import Battle from "../../Classes/Battle"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Exit the game
 * 
 * @param {Player} playerInstance 
 */
export default function exitGame(playerInstance){

    const battleinstance = Battle.getBattle(playerInstance.name)
    if(battleinstance) {
        playerInstance.souls = 0
        playerInstance.save()
        sendMessage(
            `/w ${playerInstance.name} Você saiu da batalha de modo forçado e perdeu todas suas almas`
        )
    }
    Player.logoutPlayerInstance(playerInstance)
    sendMessage(
        `/w ${playerInstance.name} Jogo encerrado.`
        , 1000
    )
}
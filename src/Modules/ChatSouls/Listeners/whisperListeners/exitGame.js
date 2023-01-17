import sendMessage from "../../../../Twitch/sendMessageHandler"
import Battle from "../../Classes/Battle"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Exit the game
 * 
 * @param {Player} playerInstance 
 */
export default function exitGame(playerInstance){

    const playerName = playerInstance.getName()
    const battleinstance = Battle.getBattle(playerName)

    if(battleinstance) {
        playerInstance.setSouls(0)
        playerInstance.save()
        sendMessage(
            `/w ${playerName} Você saiu da batalha de modo forçado e perdeu todas suas almas`
        )
    }
    
    Player.logoutPlayerInstance(playerInstance)
    sendMessage(
        `/w ${playerName} Jogo encerrado.`
        , 1000
    )
}
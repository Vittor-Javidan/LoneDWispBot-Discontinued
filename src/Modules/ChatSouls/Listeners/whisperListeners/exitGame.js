import sendMessage from "../../../../Twitch/sendMessageHandler"
import Battle from "../../Classes/Battle"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Exit the game
 * 
 * @param {Player} playerInstance 
 */
export default function exitGame(playerInstance){

    const battleinstance = Battle.getPvEBattle(playerInstance.getName())
    if(battleinstance) {
        playerInstance.setSouls(0)
        playerInstance.save()
        sendMessage(
            `/w ${playerInstance.getName()} Você saiu da batalha de modo forçado e perdeu todas suas almas`
        )
    }
    Player.deletePlayerInstance(playerInstance.getName())
    sendMessage(
        `/w ${playerInstance.getName()} Jogo encerrado.`
        , 1000
    )
}
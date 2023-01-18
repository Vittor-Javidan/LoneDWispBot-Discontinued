import env from "../../../../env"
import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Starts the game by chat or whisper command
 * 
 * @param {string} userName
 */
export default function forceUpdateUsers(userName){

    if(userName !== env.TWITCH.BROADCASTER_NAME) {
        return
    }
    Player.updateUsersDatabaseStructure()
    sendMessage(`Usuários atualizados com sucesso`)
}
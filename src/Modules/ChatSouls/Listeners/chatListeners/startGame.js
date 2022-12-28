import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/Player"

/**
 * Starts the game
 * @param {string} userName
 */
export default function startGame(userName){

    if(Player.getPlayerInstance(userName)) {
        sendMessage(`/w ${userName} você já está jogando`)
        return
    }
    
    Player.init(userName)
    sendMessage(`/w @${userName} você acabou de iniciar ChatSouls, meus pêsames, MUAHAHAHAH *-*`)
    sendMessage(`/w @${userName} escreva "!cs help" para consultar opções sobre sua conta`)
    sendMessage(`/w @${userName} Se lembre, para selecionar o código de cada opção, sempre digite "!cs <código>". Ex: "!cs 2"`)
    sendMessage(`@${userName} acabou de entrar em ChatSouls *-*`)
}
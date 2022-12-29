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
    sendMessage(
        `/w @${userName} você acabou de iniciar ChatSouls, MUAHAHAHAH *-*. Digitar: "!cs help" mostra opções sobre sua conta, "!cs play <opção>" escolhe opções dentro do game`
    )
    sendMessage(`@${userName} acabou de entrar em ChatSouls *-*. Lembre-se sempre de verificar se mensagens privadas com o canal está habilitada!`)
}
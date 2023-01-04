import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Starts the game by chat or whisper command
 * 
 * @param {string} userName
 */
export default function startGame(userName){

    if(Player.getPlayerInstance(userName)) {
        sendMessage(`/w ${userName} você já está jogando`)
        return
    }
    
    Player.init(userName)
    sendMessage(
        `/w @${userName} você acabou de iniciar ChatSouls, MUAHAHAHAH *-*. Digitar: "!cs help" mostra opções sobre sua conta, "!cs <opção>" escolhe opções dentro do game. 
        Você está descansando em uma fogueira. oque deseja fazer?: 
        | 1. Statísticas 
        | 2. Ver Equipamento 
        | 3. Levantar da fogueira
        |`
    )
    sendMessage(`@${userName} acabou de entrar em ChatSouls *-*. Lembre-se sempre de verificar se mensagens privadas com o canal está habilitada!`)
}
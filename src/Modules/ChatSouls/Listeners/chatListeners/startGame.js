import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"
import { sendMessage_UI_FirePit } from "../../UserInteface/sendMessage_Customized/sendMessage_UI_firePit"

/**
 * Starts the game by chat or whisper command
 * 
 * @param {string} userName
 */
export default function startGame(userName){
    
    if(Player.isLogged(userName)) {
        sendMessage(`/w ${userName} você já está jogando`)
        return
    }

    const playerInstance = Player.startGame(userName)
    
    let message = ''
    playerInstance.isNewPlayer
        ? message = `@${userName} acabou de se cadastrar em ChatSouls Muahaha *-*`
        : message = `@${userName} acabou de entrar em ChatSouls *-*`
    //

    sendMessage(`${message}. Lembre-se sempre de verificar se mensagens privadas com o canal está habilitada!`)
    sendMessage_UI_FirePit(playerInstance, (`
        você acabou de iniciar ChatSouls, MUAHAHAHAH *-*. 
        Digitar: "!cs help" mostra opções da sua conta, "!cs" para se situar no game, 
        e apenas digite o número da opção para navegar dentro do jogo. 
        Você está descansando em uma fogueira. oque deseja fazer?
    `))
}
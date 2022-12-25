import sendTwitchChatMessage from "../../../Twitch/sendMessageHandler"
import Auction from "../Auction"

/** ====================================================
 * Sends a message on twitch channels chat already formated and ready to pin o chat
 * @returns {void}
 */
export default function pinMessage(){

    const auctions = Auction.getAuctionList()
    if(auctions.length <= 0){
        sendTwitchChatMessage(`Não há nenhum leilão ocorrendo no momento`)
        return
    }

    let message = `Leilões ativos: |`
    for(let i = 0; i < auctions.length; i++){
        message += `| ${auctions[i].getItemName()} |`
    }
    message += `| Utilize os pontos do canal para fazer lances e consultar ranks e resultados!`

    sendTwitchChatMessage(message)
}
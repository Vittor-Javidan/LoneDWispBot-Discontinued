import sendMessage from "../../../../Twitch/sendMessageHandler"
import Auction from "../../Auction"

/** ====================================================
 * Receives a string text sentence in the format of "!commandName subCommandName minutes itemName1 itemName2 itemName3..." as an argument, and creates many Auctions instances with it.
 *
 * @param {string} message - The text message containing the auction names and times information.
 * @returns {void}
 */
export default function createManyAuctions(message) {

	//Parse the message into words
	const words = message.split(' ')
	
	//Is everything perfect?
	if(isEntryInvalid(words)) return

    //An array to store just items name to send a feedback message later
    let namesString = '|'
    
    //Creates a instace for each item. Starts at the first itemName on index 3
    const minutes = words[2]
    for(let i = 3; i < words.length; i ++) {
        const itemName = words[i]
        Auction.init({
            item: itemName,
            minutes: minutes,
        })
        namesString += `| ${itemName} |`
    }
    namesString += `|`
	
	//Initiate the auction instance and send a feedback message to twitch channel chat

	sendMessage(`OS LEILÕES: ${namesString} COMEÇARAM E ACABA EM ${minutes} MINUTOS!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`)
}

/**
 * @param {string[]} words 
 * @returns 
 */
function isEntryInvalid(words) {

    //Checks if words have at least 1 item
    if(words.length < 4){
        sendMessage(`Voce precisa inicializar pelo menos o leilão de 1 item`)
        return true
    }

    //Checks if minutes is a valid number
    const minutes = Number(words[2])
    if (
        typeof minutes !== 'number' ||
        minutes < 0
    ) {
        sendMessage(`o tempo precisa ser um número, e ser positivo`)
        return true
    }
    
    //Starts at the first itemName on index 3
    for(let i = 3; i < words.length; i ++) {

        //Checks for duplicates 
        if(Auction.isAuctionItemDuplicate(words[i])) {
            sendMessage(`O item de nome ${words[i]} já está sendo leiloado`)
            return true
        }
    }

    return false
}
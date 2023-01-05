import env from "../../env"
import sendMessage from "../../Twitch/sendMessageHandler"
import Timer from "./Timer"

/**
 * Creates a timer with the specified message
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @returns {void}
*/
function createTimer(data) {

    

    const words = data.message.split(' ')
    const intervalTime = Number(words[1])
    const timeLimit = Number(words[2])

    if(
        (
            typeof intervalTime !== 'number' && 
            typeof timeLimit !== 'number'
        ) || words.length < 4
        ){
        sendMessage(`o formato correto é !timer <tempo_intevalo> <tempo_expiração> <mensagem>`)
    }
            
    let message = ''
    for(let i = 3; i < words.length; i++) {
        message += words[i] + ' '
    }

    new Timer(message, intervalTime, timeLimit)
}

/**
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @returns {void}
 */
export default function timerChatListeners(data) {

    const userName = data.userName
    const message = data.message
	const timerCommands = env.TWITCH.MODULES.TIMER.COMMANDS

    //Broadcaster exclusive chat commands area
	if(userName === env.TWITCH.BROADCASTER_NAME) {

        switch (true) {
            case message.startsWith(timerCommands.CREATE_TIMER): createTimer(data); break
        }
    }
}
import startGame from "./chatListeners/startGame";

/**
 * Handles viewer chat messages related to ChatSouls module
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @returns {void}
 */
export default function chatSoulsChatListener(data){

    const userName = data.userName
    const message = data.message.toLowerCase()

    if(message.startsWith('!chatsouls start')) {
        startGame(userName) 
        return
    }
}
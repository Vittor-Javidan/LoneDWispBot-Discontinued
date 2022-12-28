import Player from "../Classes/Player"

import checkSouls from "./whisperListeners/checkSouls"
import help from "./whisperListeners/help"

/**
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @returns {void}
 */
export default function chatSoulsWhisperListeners(data){

    const userName = data.userName
    const message = data.message.toLowerCase()

    //There is no reason to keep reading this block of code if user is not logged.
    const playerInstance = Player.getPlayerInstance(userName)
    if(!playerInstance) return

    if(message.startsWith('!cs help')) help(playerInstance)
    if(message.startsWith('!cs souls')) checkSouls(playerInstance)
}
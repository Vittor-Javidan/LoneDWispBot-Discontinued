import Player from "../Classes/EntityChilds/Player"

import gameUIHandler from "../UserInteface/UI_PrimaryState_Handler"
import checkSouls from "./whisperListeners/checkSouls"
import exitGame from "./whisperListeners/exitGame"
import help from "./whisperListeners/help"

/**
 * Handles viewers whispers related to ChatSouls module
 *  
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @returns {void}
 */
export default function chatSoulsWhisperListeners(data){

    const userName = data.userName
    const message = data.message.toLowerCase()

    //There is no reason to keep reading this block of code if user is not logged.
    if(!Player.isLogged(userName)) return
    
    //Formating a new data input, wich makes more sense with the game
    const playerInstance = Player.getPlayerInstanceByName(userName)
    const newData = {
        playerInstance: playerInstance,
        message: message
    }

    //Game commands
    switch (true) {
        case (message.startsWith('!cs exit')):      exitGame(newData.playerInstance)    ;break
        case (message.startsWith('!cs help')):      help(newData.playerInstance)        ;break
        case (message.startsWith('!cs souls')):     checkSouls(newData.playerInstance)  ;break
        case (
            message.startsWith('!cs') || 
            !isNaN(Number(message))
        ):                                          gameUIHandler(newData)              ;break
    }
}
import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/EntityChilds/Player"

/**
 * Sends a whisper message with some commands to assist players
 * 
 * @param {Player} playerInstance 
 */
export default function help(playerInstance){
    const playerName = playerInstance.getName()
    sendMessage(`/w ${playerName} digite "!cs <commando>". Os commandos disponíveis são: help, souls`)
}
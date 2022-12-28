import sendMessage from "../../../../Twitch/sendMessageHandler"

/**
 * @param {Player} playerInstance 
 */
export default function help(playerInstance){
    const playerName = playerInstance.getPlayerName()
    sendMessage(`/w ${playerName} digite "!cs <commando>". Os commandos disponíveis são: help, souls`)
}
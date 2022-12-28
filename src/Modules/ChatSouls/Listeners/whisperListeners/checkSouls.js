import sendMessage from "../../../../Twitch/sendMessageHandler"

/**
 * @param {Player} playerInstance 
 */
export default function checkSouls(playerInstance){
    const playerName = playerInstance.getPlayerName()
    const souls = playerInstance.getSouls()
    sendMessage(`/w ${playerName} suas almas: ${souls}`)
}
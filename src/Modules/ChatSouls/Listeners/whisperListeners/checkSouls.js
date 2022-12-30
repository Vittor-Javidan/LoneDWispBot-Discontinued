import sendMessage from "../../../../Twitch/sendMessageHandler"

/**
 * Sends a whisper message with the amount of souls player has
 * 
 * @param {Player} playerInstance 
 */
export default function checkSouls(playerInstance){
    const playerName = playerInstance.getPlayerName()
    const souls = playerInstance.getSouls()
    sendMessage(`/w ${playerName} suas almas: ${souls}`)
}
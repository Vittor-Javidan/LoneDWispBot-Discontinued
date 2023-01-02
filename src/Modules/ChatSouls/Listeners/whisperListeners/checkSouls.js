import sendMessage from "../../../../Twitch/sendMessageHandler"
import Player from "../../Classes/Player"

/**
 * Sends a whisper message with the amount of souls player has
 * 
 * @param {Player} playerInstance 
 */
export default function checkSouls(playerInstance){
    const playerName = playerInstance.getName()
    const souls = playerInstance.getSouls()
    sendMessage(`/w ${playerName} suas almas: ${souls}`)
}
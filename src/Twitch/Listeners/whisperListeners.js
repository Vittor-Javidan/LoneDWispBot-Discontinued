import chatSoulsWhisperListeners from "../../Modules/ChatSouls/Listeners/whisperHandler";

/** ====================================================
 * Listens for whispers
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 */
export default function whisperListeners(data) {

    chatSoulsWhisperListeners(data)
}
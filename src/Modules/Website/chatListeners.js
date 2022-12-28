import env from "../../env"
import sendMessage from "../../Twitch/sendMessageHandler"

/** ==================================================== 
 * Sends URL link of the website to twitch channels chat
 * 
 * @returns {void}
*/
function giveURL() {

	sendMessage(
		`--   https://vittor-javidan.github.io/   --  Esse é meu website pessoal, 
		onde além de ser meu portifólio, também é um lugar onde eu guardo 
		link de vídeos e artigos sobre diversos assuntos de programação que já estudei
		e verifiquei que são de ótima qualidade. Se for um assunto que goste, 
		espero ter ajudado.`
	)
}

/**
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @returns {void}
 */
export default function websiteChatListeners(data) {

	const userName = data.userName
	const message = data.message.toLowerCase()
	const websiteCommands = env.TWITCH.MODULES.WEBSITE.COMMANDS

	if(message.startsWith(websiteCommands.GIVE_WEBSITE_URL)) giveURL()
}
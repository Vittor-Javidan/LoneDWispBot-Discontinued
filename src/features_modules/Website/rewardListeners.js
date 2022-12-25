import sendTwitchChatMessage from "../../Twitch/sendMessageHandler"

/** ==================================================== 
 * Sends URL link of the website to twitch channels chat
 * 
 * @returns {void}
 */
function giveURL() {

	sendTwitchChatMessage(
		`--   https://vittor-javidan.github.io/   --  Esse é meu website pessoal, 
		onde além de ser meu portifólio, também é um lugar onde eu guardo 
		link de vídeos e artigos sobre diversos assuntos de programação que já estudei
		e verifiquei que são de ótima qualidade. Se for um assunto que goste, 
		espero ter ajudado.`
	)
}

const websiteRewardListeners = {
	giveURL
}
export default websiteRewardListeners
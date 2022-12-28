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
 * Website module reward Handler
 * 
 * @param {Object} data - The data object passed to the function
 * @param {string} data.userName - The username of the person who sent the message
 * @param {string} data.message - The message that was sent
 * @param {string} data.rewardIdentifier - The identifier for the reward that was redeemed
 */
export default function websiteRewardListeners(data){

	const {userName, message, rewardIdentifier} = data
	const websiteRewardIds = env.TWITCH.MODULES.WEBSITE.REWARDS_IDs

	switch (rewardIdentifier) {
		case websiteRewardIds.GIVE_WEBSITE_URL: giveURL(); break
	}
}
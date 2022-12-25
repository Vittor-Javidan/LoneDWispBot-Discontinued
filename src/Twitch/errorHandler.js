import sendTwitchChatMessage from "./sendMessageHandler"

/**
 * @param {any} err
 * @param {{
 *  	channelName: string,
 *      userName: string,
 *      rewardIdentifier: string,
 *      message: string
 * }} data 
 */
function errorHandler(err, data) {
	console.log(err)
	if(data.rewardIdentifier){
		sendTwitchChatMessage(`Ocorreu um erro na recompensa resgatada de @${data.userName}. Id da recompensa: ${data.rewardIdentifier} `)
		return
	}
	sendTwitchChatMessage(`Ocorreu um erro com o comando "${data.message}"`)
}

export default errorHandler
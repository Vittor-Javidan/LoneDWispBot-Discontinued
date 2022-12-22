import sendChatMessage from "../sendMessageHandler"

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
		sendChatMessage(`Ocorreu um erro na recompensa resgatada de @${data.userName}. Id da recompensa: ${data.rewardIdentifier} `)
		return
	}
	sendChatMessage(`Ocorreu um erro com o comando "${data.message}"`)
}

export default errorHandler
import tmi from 'tmi.js'

/**
 * @param {string} channel 
 * @param {tmi.ChatUserstate} userstate 
 * @param {string} message 
 * @param {tmi.Client} client 
 */
function website(channel, userstate, message, client) {

	if (message.toLowerCase().includes('!website')) {

        client.say(channel, `
            --   https://vittor-javidan.github.io/   --  Esse é meu website pessoal, 
            onde além de ser meu portifólio, também é um lugar onde eu guardo 
            link de vídeos e artigos sobre diversos assuntos de programação que já estudei
            e verifiquei que são de ótima qualidade. Se for um assunto que goste, 
            espero ter ajudado.
        `)

    }
}

const websiteChatListeners = {
    website
}
export default websiteChatListeners
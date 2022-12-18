import client from '../../connect'

/**
 * @param {string} channel 
 * @param {string} message 
 */
function website(channel, message) {

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
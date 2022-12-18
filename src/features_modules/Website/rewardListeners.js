import client from '../../connect'
import rewardIdentifiersList from '../../channelRewards'

/**
 * @param {string} channel 
 * @param {string} userName 
 * @param {string} message 
 */
function website(channel, userName, rewardIdentifier) {

    if(rewardIdentifier === rewardIdentifiersList['Meu Website Pessoal']) {
        client.say(channel, 
            `Aqui @${userName}  --   https://vittor-javidan.github.io/   --  Esse é meu website pessoal, 
            onde além de ser meu portifólio, também é um lugar onde eu guardo 
            link de vídeos e artigos sobre diversos assuntos de programação que já estudei
            e verifiquei que são de ótima qualidade. Se for um assunto que goste, 
            espero ter ajudado.`
        )
    }
}

const websiteRewardListeners = {
    website
}
export default websiteRewardListeners
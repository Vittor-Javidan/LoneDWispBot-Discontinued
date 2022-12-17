import tmi from 'tmi.js'
import env from '../../env'

import rewardIdentifiersList from '../../channelRewards'

/**
 * @param {string} channel 
 * @param {string} username 
 * @param {string} reward_ID 
 * @param {tmi.Client} client
 */
function adicioneMinhaMusica(channelName, username, reward_ID, client) {
    if(reward_ID === rewardIdentifiersList['Adicione Minha Música']) {
        if(username !== env.channelName) {
            client.say(channelName, `/w ${username} Assim que possível eu pessoalmente irei escutar sua música em off.
                Irei adiciona-la caso combine com a playlist do canal.
            `)
        }
    }
}

const musicaRewardListeners = {
    adicioneMinhaMusica
}

export default musicaRewardListeners
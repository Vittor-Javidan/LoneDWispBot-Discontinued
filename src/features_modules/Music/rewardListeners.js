import client from '../../connect'
import env from '../../env'

import rewardIdentifiersList from '../../channelRewards'

/**
 * @param {string} channel 
 * @param {string} username 
 * @param {string} reward_ID 
 */
function playlistMusicSugestion(channelName, username, reward_ID) {
    if(reward_ID === rewardIdentifiersList['Adicione Minha Música']) {
        if(username !== env.channelName) {
            client.say(channelName, `/w ${username} Assim que possível eu pessoalmente irei escutar sua música em off.
                Irei adiciona-la caso combine com a playlist do canal.
            `)
        }
    }
}

const musicRewardListeners = {
    playlistMusicSugestion
}

export default musicRewardListeners
import tmi from 'tmi.js'
import rewardIdentifiersList from "./channelRewards"
import env from './env'
import Leilao from './features_modules/Leilao/Leilao'

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

/**
 * @param {string} channelName 
 * @param {string} username 
 * @param {string} rewardIdentifie 
 * @param {tmi.Client} client
 */
function leilaoBid100(channelName, username, rewardIdentifie, client) {
    if(rewardIdentifie === rewardIdentifiersList['LEILÃO: Lance 100 pontos']) {
        if(Leilao.auctions.length > 0) {
            const points = 100
            Leilao.auctions[0].bid(channelName, username, client, points)
        } else {
            client.say(channelName, `Não há nenhum leilão em aberto no momento @${username}`)
        }
    }
}

/**
 * @param {string} channelName 
 * @param {string} username 
 * @param {string} rewardIdentifie 
 * @param {tmi.Client} client 
 */
function leilaoRank(channelName, username, rewardIdentifie, client) {

    if(rewardIdentifie === rewardIdentifiersList['LEILÃO: Rank Atual']) {

        if(Leilao.auctions.length > 0) {
            
            let totalRank
            let rankText = ''
            totalRank = Leilao.getInstance().getRank()
            console.log(totalRank)
            for(let i = 0; i < 5 && i < totalRank.length; i++) {
                rankText += `<< ${i + 1}. ${totalRank[i].name} : ${totalRank[i].score} >>`
            }
            client.say(channelName, rankText)

        } else {
            client.say(channelName, `Não há nenhum leilão em aberto no momento @${username}`)
        }
    }
}

const features = {
    adicioneMinhaMusica,
    leilaoBid100,
    leilaoRank
}
export default features
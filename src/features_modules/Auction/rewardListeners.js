import tmi from 'tmi.js'
import rewardIdentifiersList from '../../channelRewards'
import Auction from './Auction'


/**
 * @param {string} channelName 
 * @param {string} username 
 * @param {string} rewardIdentifie
 * @param {tmi.Client} client 
 */
function auctionRank(channelName, username, rewardIdentifie, client) {

    if(rewardIdentifie === rewardIdentifiersList['LEILÃO: Rank Atual']) {

        if(Auction.auctions.length <= 0) {
            client.say(channelName, `Não há nenhum leilão em aberto no momento @${username}`)
            return
        }

        let totalRank
        let rankText = ''
        totalRank = Auction.getInstance().getRank()
        for(let i = 0; i < 5 && i < totalRank.length; i++) {
            rankText += `<<  ${i + 1}. ${totalRank[i].name} : ${totalRank[i].score}  >>`
        }

        if(rankText === '') {
            client.say(channelName, `Ainda não há nenhum lance. O seu pode ser o primeiro @${username} ;)`)
            return
        }
        client.say(channelName, rankText)
    }
}

/**
 * @param {string} channelName 
 * @param {string} username 
 * @param {string} rewardIdentifie 
 * @param {tmi.Client} client
 */
function auctionBid100(channelName, username, rewardIdentifie, client) {
    if(rewardIdentifie === rewardIdentifiersList['LEILÃO: Lance 100 pontos']) {
        if(Auction.auctions.length > 0) {
            const points = 100
            Auction.auctions[0].bid(channelName, username, client, points)
        } else {
            client.say(channelName, `Não há nenhum leilão em aberto no momento @${username}`)
        }
    }
}

function auctionBid500(channelName, username, rewardIdentifie, client) {
    if(rewardIdentifie === rewardIdentifiersList['LEILÃO: Lance 500 pontos']) {
        if(Auction.auctions.length > 0) {
            const points = 500
            Auction.auctions[0].bid(channelName, username, client, points)
        } else {
            client.say(channelName, `Não há nenhum leilão em aberto no momento @${username}`)
        }
    }
}

function auctionBid1000(channelName, username, rewardIdentifie, client) {
    if(rewardIdentifie === rewardIdentifiersList['LEILÃO: Lance 1000 pontos']) {
        if(Auction.auctions.length > 0) {
            const points = 1000
            Auction.auctions[0].bid(channelName, username, client, points)
        } else {
            client.say(channelName, `Não há nenhum leilão em aberto no momento @${username}`)
        }
    }
}

function auctionBid5000(channelName, username, rewardIdentifie, client) {
    if(rewardIdentifie === rewardIdentifiersList['LEILÃO: Lance 5000 pontos']) {
        if(Auction.auctions.length > 0) {
            const points = 5000
            Auction.auctions[0].bid(channelName, username, client, points)
        } else {
            client.say(channelName, `Não há nenhum leilão em aberto no momento @${username}`)
        }
    }
}

function auctionBid10000(channelName, username, rewardIdentifie, client) {
    if(rewardIdentifie === rewardIdentifiersList['LEILÃO: Lance 10000 pontos']) {
        if(Auction.auctions.length > 0) {
            const points = 10000
            Auction.auctions[0].bid(channelName, username, client, points)
        } else {
            client.say(channelName, `Não há nenhum leilão em aberto no momento @${username}`)
        }
    }
}


const auctionRewardListeners = {
    auctionRank,
    auctionBid100,
    auctionBid500,
    auctionBid1000,
    auctionBid5000,
    auctionBid10000
}
export default auctionRewardListeners
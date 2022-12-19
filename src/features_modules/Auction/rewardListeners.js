import rewardIdentifiersList from '../../channelRewards'
import Auction from './Auction'
import sendChatMessage from '../../../sendMessageHandler'


/**
 * @param {string} channelName 
 * @param {string} username 
 * @param {string} rewardIdentifier
 */
function auctionRank(username, rewardIdentifier) {

    if(rewardIdentifier !== rewardIdentifiersList['LEILÃO: Rank Atual']) { 
        return 
    }

    if(Auction.auctions.length <= 0) {
        sendChatMessage(`Não há nenhum leilão em aberto no momento @${username}`)
        return
    }

    let totalRank
    let rankText = ''
    totalRank = Auction.getInstance().getRank()
    for(let i = 0; i < 5 && i < totalRank.length; i++) {
        rankText += `<<  ${i + 1}. ${totalRank[i].name} : ${totalRank[i].score}  >>`
    }
    if(rankText === '') {
        sendChatMessage(`Ainda não há nenhum lance. O seu pode ser o primeiro @${username} ;)`)
        return
    }
    sendChatMessage(rankText)

    Auction.getInstance()
}

/**
 * @param {string} channelName 
 * @param {string} username 
 * @param {string} rewardIdentifier 
 */
function auctionBid100(username, rewardIdentifier) {

    if(rewardIdentifier !== rewardIdentifiersList['LEILÃO: Lance 100 pontos']) { 
        return 
    }

    if(Auction.auctions.length <= 0) {
        sendChatMessage(`Não há nenhum leilão em aberto no momento @${username}. Peça para que seus pontos sejam devolvidos caso os queira de volta!`)
        return
    }

    const points = 100
    Auction.auctions[0].bid({
        username: username,
        bidValue: points
    })
}

function auctionBid500(username, rewardIdentifier) {

    if(rewardIdentifier !== rewardIdentifiersList['LEILÃO: Lance 500 pontos']) {
        return
    }

    if(Auction.auctions.length <= 0) {
        sendChatMessage(`Não há nenhum leilão em aberto no momento @${username}. Peça para que seus pontos sejam devolvidos caso os queira de volta!`)
        return
    }

    const points = 500
    Auction.auctions[0].bid({
        username: username,
        bidValue: points
    })
}

function auctionBid1000(username, rewardIdentifier) {

    if(rewardIdentifier !== rewardIdentifiersList['LEILÃO: Lance 1000 pontos']) {
        return
    }

    if(Auction.auctions.length <= 0) {
        sendChatMessage(`Não há nenhum leilão em aberto no momento @${username}. Peça para que seus pontos sejam devolvidos caso os queira de volta!`)
        return
    }

    const points = 1000
    Auction.auctions[0].bid({
        username: username,
        bidValue: points
    })
}

function auctionBid5000(username, rewardIdentifier) {

    if(rewardIdentifier !== rewardIdentifiersList['LEILÃO: Lance 5000 pontos']) {
        return
    }

    if(Auction.auctions.length <= 0) {
        sendChatMessage(`Não há nenhum leilão em aberto no momento @${username}. Peça para que seus pontos sejam devolvidos caso os queira de volta!`)
        return
    }

    const points = 5000
    Auction.auctions[0].bid({
        username: username,
        bidValue: points
    })
}

function auctionBid10000(username, rewardIdentifier) {

    if(rewardIdentifier !== rewardIdentifiersList['LEILÃO: Lance 10000 pontos']) {
        return
    }

    if(Auction.auctions.length <= 0) {
        sendChatMessage(`Não há nenhum leilão em aberto no momento @${username}. Peça para que seus pontos sejam devolvidos caso os queira de volta!`)
        return
    }

    const points = 10000
    Auction.auctions[0].bid({
        username: username,
        bidValue: points
    })
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
import channelRewardIds from "./channelRewards"

function adicioneMinhaMusica(channel, self, client) {
    if(self['custom-reward-id'] === channelRewardIds.adicioneMinhaMusica)
        client.say(channel, 'Sua musica será adicionada em breve!!')
}

const redeemsFunctions = {
    adicioneMinhaMusica
}
export default redeemsFunctions
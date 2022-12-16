/**
 * @param {string} channel
 * @param {tmi.ChatUserstate} userstate
 * @param {string} message 
 * @param {tmi.Client} client
 */
function fockYou(channel, userstate, message, client) {

	if (message.toLowerCase().includes('hello')) client.say(channel, 'Fock you')
}

function website(channel, userstate, message, client) {

	if (message.toLowerCase().includes('!website')) client.say(channel, 'https://vittor-javidan.github.io/')
}

const chatCommand = {
    fockYou,
    website
}
export default chatCommand
import tmi from 'tmi.js'
import env from './enviroment';

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: env.botName,
    password: `oauth:${env.clientSecret}`
  },
  channels: [env.channelName]
};

const client = new tmi.client(options);

client.connect();

client.on('chat', (channel, userstate, message, self) => {
  console.log(`${userstate.username}: ${message}`);
});

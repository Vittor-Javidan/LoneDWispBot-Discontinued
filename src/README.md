# Use this file to complete the information needed to log in to your own account. In this case, I am using a JavaScript file as an .env file, but feel free to use whatever method you prefer. Don't fill the ID's yet.

```
const env = {
	CLIENT_ID: '',
	CLIENT_SECRET: '',
	BOT_NAME: '', 
	
	/**
	 * BROADCASTER_NAME and CHANNEL_NAME could be the same thing inside the source code, since the channel's 
	 * name is the account's name. I keep two variables with the same value just to keep context readable 
	 * within the source code.
	 */
	CHANNEL_NAME: '',
	BROADCASTER_NAME: '',

	MODULES: {
		WEBSITE: {
			COMMANDS: {
				GIVE_WEBSITE_URL: '!website',
			},
			REWARDS_IDs: {
				GIVE_WEBSITE_URL: ''
			}
		},
		MUSIC: {
			REWARDS_IDs: {
				PLAYLIST_MUSIC_SUGESTION: ''
			}
		}
		,
		AUCTION: {
			COMMANDS: {
				CREATE_AUCTION: '!leilão create ',
				CREATE_MANY_AUCTIONS: '!leilão create_many ',
				SET_AUCTION_TIME_LEFT: '!leilão time_left ',
				END_ALL_AUCTIONS: '!leilão end_all',
				PIN_MESSAGE: '!leilão pin'
			},
			REWARDS_IDs: {
				AUCTION_RANKS: '',
				BID_100: '',
				BID_500: '',
				BID_1000: '',
				BID_5000: '',
				BID_10000: ''
			}
		}
	},
	OVERLAY_URL: '',
}

export default env
```

## Now install the dependencies listed in the package.json file. After that, just run the terminal and the ChatBot will start. In this current project, the terminal command is npm run dev, but you can change it if you want.

## To retrieve the IDs, you need to uncomment console.log(data.rewardIdentifier) inside chatBot.js. After that, all you need to do is create a reward and use it to see the log ID, then just copy and paste it into the env file.
 - WARNING: you need to have a text within the reward, otherwise the listener will not detect the redeem. There is better ways to listener for rewards, but for now that will do for the app.

import client from '../../connect'
import env from '../../env'

export default class Auction {
	static auctions = []

	item
	minutes
	channel
	participants = {}
	date = new Date()

	/**
	 * @param {string} item
	 * @param {number} minutes
	 * @param {string} channel
	 */
	constructor(item, minutes, channel) {
		this.item = item
		this.minutes = minutes
		this.channel = channel
	}

	/**
	 * @param {{
	 * 	   item: string,
	 * 	   minutes: number,
	 *     channel: string,
	 * }} object
	 */
	static init({ item, minutes, channel }) {
		if (Auction.auctions.length > 1) {
			client.say(channel, `Já há um leilão em andamento`)
			return
		}

		const auction = new Auction(item, minutes, channel)
		this.auctions.push(auction)
		auction.startAuction()
	}

	startAuction() {
		client.say(
			this.channel,
			`LEILÃO DE UM ${this.item.toUpperCase()} COMEÇOU E ACABA EM ${this.minutes} MINUTOS!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
		)
		this.startTimer()
	}

	startTimer() {
		const timer = setInterval(() => {
			timeAlert(this.item, this.minutes, this.channel)
			//TODO: Convert the logics to seconds
			if (this.minutes > 0) {
				this.minutes--
			} else {
				//Clears the timer
				clearInterval(timer)

				this.announceWinner()

				//Removes instance
				Auction.auctions = []
			}
		}, 60000) // runs every minute
	}

	/**
	 * @param {string} channel
	 * @param {string} username
	 * @param {number} bidValue
	 */
	bid(channel, username, bidValue) {
		// User bid temporary database
		if (this.participants.hasOwnProperty(username)) {
			this.participants[username] += bidValue
		} else {
			this.participants[username] = bidValue
		}

		//Adds 1 minute if it's about to finish
		if (this.minutes === 1) {
			this.minutes++
			client.say(
				channel,
				`Mais 1 minuto adicionado ao Leilão (${this.item})`
			)
		}

		//User feedback
		if (username !== env.channelName) {
			client.whisper(
				username,
				`${this.item} - Lance de ${bidValue} pontos em ${
					this.item
				}, dia: ${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()} ${this.date.getHours()}:${this.date.getMinutes()}`
			)
		}
	}

	getRank() {
		const sortedArray = []
		for (const name in this.participants) {
			sortedArray.push({
				name: name,
				score: this.participants[name],
			})
		}

		sortedArray.sort((a, b) => {
			return b.score - a.score
		})
		return sortedArray
	}

	announceWinner() {
		//Get the winner
		const podium = this.getRank()

		if (podium.length > 0)
			client.say(
				this.channel,
				`O GANHADOR DE UM ${this.item.toUpperCase()} É @${podium[0].name} COM ${podium[0].score} PONTOS!!!`
			)
		else
			client.say(
				this.channel,
				`O leilão se encerrou com nenhum ganhador, já que ninguem participou T-T`
			)
	}

	/**
	 * @returns {Auction}
	 */
	static getInstance() {
		return Auction.auctions[0]
	}
}

/**
 * @param {string} item
 * @param {number} minutes
 * @param {string} channel
 */
function timeAlert(item, minutes, channel) {
	switch (minutes) {
		case 50:
			client.say(
				channel,
				`FALTA 50 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 40:
			client.say(
				channel,
				`FALTA 40 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 30:
			client.say(
				channel,
				`FALTA 30 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 20:
			client.say(
				channel,
				`FALTA 20 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 10:
			client.say(
				channel,
				`FALTA 10 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 5:
			client.say(
				channel,
				`FALTA 5 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 4:
			client.say(
				channel,
				`FALTA 4 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 3:
			client.say(
				channel,
				`FALTA 3 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 2:
			client.say(
				channel,
				`FALTA 2 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break

		case 1:
			client.say(
				channel,
				`FALTA 1 MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`
			)
			break
	}
}

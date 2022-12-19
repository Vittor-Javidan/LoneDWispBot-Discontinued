import sendChatMessage from '../../../sendMessageHandler'

export default class Auction {
	static auctions = []

	item
	minutes
	participants = {}
	date = new Date()
	timer

	/**
	 * @param {{
	 * 	   item: string,
	 * 	   minutes: number,
	 * }} object
	 */
	constructor({ item, minutes }) {
		this.item = item
		this.minutes = minutes
	}

	/**
	 * @param {{
	 * 	   item: string,
	 * 	   minutes: number,
	 * }} object
	 */
	static init({ item, minutes }) {
		
		if (Auction.auctions.length > 1) {
			sendChatMessage(`Já há um leilão em andamento`)
			return
		}

		const auction = new Auction({
			item: item, 
			minutes: minutes, 
		})
		this.auctions.push(auction)
		auction.startTimer()
		sendChatMessage(`LEILÃO DE UM ${auction.item.toUpperCase()} COMEÇOU E ACABA EM ${auction.minutes} MINUTOS!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`)
	}

	/**
	 * @returns {Auction}
	 */
	static getInstance() {
		return Auction.auctions[0]
	}

	startTimer() {

		this.timer = setInterval(() => {
			
			if (this.minutes <= 0) {
				announceWinner()
				this.deleteAuction()
				return
			}

			timeAlertMessage({
				item: this.item, 
				minutes: this.minutes
			})

			this.minutes--

		}, 60000) // runs every minute
	}

	/**
	 * @param {{
	 * 		username: string, 
	 * 		bidValue: number,
	 * }} object 
	 */
	bid({username, bidValue}) {

		if (this.minutes === 1) {
			this.addTimeMinutes(1)
		}

		if (!this.participants.hasOwnProperty(username)) {
			this.participants[username] = bidValue
			return
		}

		this.participants[username] += bidValue
		sendChatMessage(`
			/w @${username} ${this.item} - Lance de ${bidValue} pontos em ${this.item}. 
			Dia: ${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}, 
			Hora: ${this.date.getHours()}:${this.date.getMinutes()}
		`)
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

	/**
	 * @param {number} minutes
	 */
	addTimeMinutes(minutes){
		this.minutes += minutes
		sendChatMessage(`Mais ${minutes} minutos adicionado ao Leilão[${this.item}]`)
	}

	deleteAuction(){
		clearInterval(this.timer)
		Auction.auctions = []
	}
}

function announceWinner() {
	const podium = this.getRank()
	if (podium.length <= 0) {
		sendChatMessage(`O leilão se encerrou com nenhum ganhador, já que ninguem participou T-T`)
		return
	}
	sendChatMessage(`O GANHADOR DE UM ${this.item.toUpperCase()} É @${podium[0].name} COM ${podium[0].score} PONTOS!!!`)
}

/**
 * @param {{
 * 		item: string,
 *		minutes: number, 
 * }} object
 */
function timeAlertMessage({item, minutes}) {

	if(minutes <= 5 || minutes % 10 === 0) {
		sendChatMessage(`FALTA ${minutes} MINUTOS PARA ACABAR O LEILÃO DE UM ${item}!!! Dê lances usando as recompensas do canal (づ｡◕‿‿◕｡)づ ✧.`)
	}
}

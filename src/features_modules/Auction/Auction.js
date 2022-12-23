import sendChatMessage from '../../../sendMessageHandler'


export default class Auction {

	/**
	 * This property stores every instance of the Auction class that has been created. 
	 * @type {Auction[]}
	 * @private
	 */
	static auctionsList = []

	/**
	 * The current date and time, used to provide feedback to users when they make a bid on the auctioned item
	 * @type {Date}
	 * @private
	 */
	static date = new Date();

	/**
	 * The name of the item being auctioned
	 * @type {string}
	 * @private
	 */
	itemName;

	/**
	 * The number of seconds remaining until the auction ends
	 * @type {number}
	 * @private
	 */
	secondsLeft;

	/**
	 * The timer object for the setInterval() function that is running for this auction instance
	 * @type {NodeJS.Timer}
	 * @private
	 */
	regressiveTimer;

	/**
	 * A dictionary that stores participant names as keys and their corresponding total points as values. Example: { "michael": 1000, "maria": 500, ... }
	 * @type {{
	 * 		string: number; 
	 * 		'partipant_1':pointsValue; 
	 * 		'partipant_2':pointsValue; 
	 * 		'partipant_n':pointsValue;
	 * }}
	 * @private
	 */
	participants = {}

	/** ====================================================
	 * Creates a new instance of the Auction class with the given item name and duration.
	 * 
	 * @param {Object} options - The options for the auction.
	 * @param {string} options.itemName - The name of the item being auctioned.
	 * @param {number} options.minutes - The duration of the auction in minutes.
	 * @returns {Auction}
	 * @private
	 */
	constructor(options) {

		this.setItemName(options.itemName) 
		this.setSecondsLeft(options.minutes * 60)
	}





	//=====================================================================================================================================================================================================================================
	//=====================================================================================================================================================================================================================================
	// AUCTIONED ITEMS RELATED METHODS
	//=====================================================================================================================================================================================================================================
	//=====================================================================================================================================================================================================================================





	/** ====================================================
	 * Initializes an auction with the given item and duration.
	 * 
	 * @param {Object} auctionData - The auction data.
	 * @param {string} auctionData.item - The name of the item being auctioned.
	 * @param {number} auctionData.minutes - The duration of the auction in minutes.
	 * @returns {void}
	 */
	static init(auctionData) {
		const auction = new Auction({ 
			itemName: auctionData.item, 
			minutes: auctionData.minutes 
		});
		this.pushToAuctionList(auction);
		auction.startRegressiveTimer();
	}
	/** ====================================================
	 * Return a list of all current auctions instances
	 * 
	 * @returns {Auction[]}
	 */
	static getAuctionList(){
		return this.auctionsList
	}
	/** ====================================================
	 * Push a auction instance into the list of auctions
	 * 
	 * @param {Auction} auction
	 * @returns {void}
	 */
	static pushToAuctionList(auction){
		this.auctionsList.push(auction)
	}
	/** ==================================================== 
	 * 
	 * Retrieves an instance of the class based on the item code. 
	 * @param {number} itemCode - The code of the item to retrieve. Must be a finite positive number less than or equal to the total number of auctions.
	 * @returns {Auction?} - An instance of the class if the itemCode is valid, otherwise null.
	 */
	static getInstanceByCode(itemCode) {

		if(
			typeof itemCode !== 'number' 		||		//True if itemCode is not "number type"
			itemCode > this.getAuctionsAmount() ||		//True if itemCode is greater than auctions Amount
			itemCode < 1								//Prevents auctionListIndex to have negative value
		) return null

		const auctionListIndex = itemCode - 1
		return  this.getAuctionList()[auctionListIndex]
	}
	/** ====================================================
	 * Determines if an auction item with the given name already exists.
	 * @param {string} itemName - The name of the auction item.
	 * @returns {boolean} - True if an auction item with the given name already exists, false otherwise.
	 */
	static isAuctionItemDuplicate(itemName) {
		for(let i = 0; i < this.getAuctionsAmount(); i++){
			if(itemName.toLowerCase() === this.getAuctionList()[i].getItemName()) {
				return true
			}
		}
		return false
	}
	/** ====================================================
	 * Retrieves the number of auctions in the list.
	 * @returns {number} - The number of auctions.
	 */
	static getAuctionsAmount(){
		return this.getAuctionList().length
	}
	/** ====================================================
	 * Deletes all auctions from the list and clears any active timers.
	 */
	static clearAuctionList(){
		for(let i = 0; i < this.getAuctionsAmount(); i++){
			const instance = this.getAuctionList()[i]
			if(instance.getRegressiveTimer()){
				clearInterval(instance.getRegressiveTimer())
			}
		}
		this.auctionsList = []
	}


	/** ====================================================
	 * Returns the instance item name
	 * 
	 * @returns {string} item Name
	 * @returns {void}
	 */
	getItemName(){
		return this.itemName
	}
	/** ====================================================
	 * Set the name of the item being auctioned and format to lowercase.
	 * 
	 * @param {string} itemName Item name
	 * @returns {void}
	 */
	setItemName(itemName){
		this.itemName = itemName.toLowerCase()
	}





	//=====================================================================================================================================================================================================================================
	//=====================================================================================================================================================================================================================================
	//TIME RELATED METHODS
	//=====================================================================================================================================================================================================================================
	//=====================================================================================================================================================================================================================================





	/** ====================================================
	 * Returns a string with the date and time in the format "Dia: DD/MM/YYYY, Hora: HH:MM".
	 * 
	 * @returns {string} The formatted date and time string.
	 */
	static getDateAndTime(){
		return (
			`Dia: ${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}, 
			Hora: ${this.date.getHours()}:${this.date.getMinutes()}`
		)
	}


	/** ====================================================
	 * Returns the amount of seconds left to end the auction
	 * @returns {number} seconds remaining
	*/
	getSecondsLeft(){
		return this.secondsLeft
	}
	/** ====================================================
	 * add the amount of seconds left to end the auction
	 * 
	 * @param {number} seconds how many seconds you want to add
	 * @returns {void}
	*/
	addSecondsLeft(seconds){
		this.seconsdsLeft += seconds
	}
	/** ====================================================
	 * Sets the amount of seconds left to end the auction
	 * 
	 * @param {number} seconds how many seconds you want to set
	 * @returns {void}
	*/
	setSecondsLeft(seconds){
		this.secondsLeft = seconds
	}
	/** ====================================================
	 * Decrease the amount of seconds left to end the auction
	 * 
	 * @param {number} seconds how many seconds you want to decrease
	 * @returns {void}
	*/
	decreaseSecondsLeft(seconds){
		this.secondsLeft -= seconds
	}
	/** ====================================================
	 * Sets the number of minutes left for the auction.
	 * @param {number} minutes - The number of minutes left for the auction.
	 * @returns {void}
	 */
	setMinutes(minutes) {
		this.secondsLeft = minutes * 60
	}
	/** ====================================================
	 * Adds a specified number of minutes to the `timeLeft` property of the auction instance.
	 * @param {number} minutes - The number of minutes to add to the `timeLeft` property.
	 */
	addExtraMinutes(minutes){
		this.secondsLeft += minutes * 60
	}
	/** ====================================================
	 * returns the setInterval instance correlated with the auction instance
	 * 
	 * @returns {NodeJS.Timer}
	*/
	getRegressiveTimer(){
		return this.regressiveTimer
	}
	/** ====================================================
	 * Starts a regressive timer for the auction instance and calls the `announceWinner` function when there is no time left. Additionally, the timer calls the `timeAlertMessage` function at every interval to provide feedback to viewers.
	*/
	startRegressiveTimer() {

		//instantiate a 'setInterval' timer reference inside 'this.regressiveTimer' property
		this.regressiveTimer = setInterval(() => {
			
			if (this.getSecondsLeft() <= 0) {
				this.announceWinner()
				this.clearTimer()
				return
			}
			
			this.timeAlertMessage()
			this.decreaseSecondsLeft(10)
			
		}, 10000) // runs every 10 seconds
	}
	/** ==================================================== 
	 * Clears the timer for the auction instance.
	*/
	clearTimer(){
		clearInterval(this.getRegressiveTimer())
	}
	/** ====================================================
	 *Check if an auction has finished.
	 * @returns {boolean} True if the auction has finished, false if it is still ongoing.
	 */
	isAuctionFinished(){
		if(this.getSecondsLeft() <= 0) return true
		return false
	}
	/** ====================================================
	 * Sends a message to the chat with the remaining time for the auction instance. The message is sent if the remaining time is 5 minutes or less, for each remaining minute, or if the remaining time is a multiple of 10 minutes.
	 */
	timeAlertMessage() {

		const seconds = this.getSecondsLeft()
		const minutes = Math.floor(seconds / 60)
		const itemName = this.getItemName()

		if(
			((
				seconds % (10 * 60) === 0	
			) || (
				seconds % (1 * 60) === 0 	&& 
				seconds <= (5 * 60)
			)) && seconds > 0
		) {
		   sendChatMessage(`${itemName.toUpperCase()}, minutos restantes: ${minutes} .`)
		}
	}
	/** ====================================================
	 * Add extra minutes if there is a new Rank_1, a Draw, or a first bid
	 */
	checkForNewWinner(userName){

		const secondsLeft = this.getSecondsLeft()
		const extraMinutes = 2

		const itemName = this.getItemName()
		const podium = this.getRank()

		if(podium.length > 1) {

			if(isDraw()) {

				if(secondsLeft > 60) return

				this.addExtraMinutes(extraMinutes)
				sendChatMessage(`Leilão[${itemName}] PRORROGAÇÃO: 2 minutos adicionados.`)

			} else if (isNewWinner()) {

				if(secondsLeft > 60) return
					
				this.addExtraMinutes(extraMinutes)
				sendChatMessage(`Leilão[${itemName}] PRORROGAÇÃO: 2 minutos adicionados.`)
			}

		} else if (isFirstBid()) {

			if(secondsLeft > 60) return

			this.addExtraMinutes(extraMinutes)
			sendChatMessage(`Leilão[${itemName}] PRORROGAÇÃO: 2 minutos adicionados.`)
		}

		function isDraw(){
			if(
				podium[0].score === podium[1].score &&
				(
					userName === podium[0].name 	||
					userName === podium[1].name
				)
			){
				sendChatMessage(`Leilão[${itemName}] EMPATE!!: @${podium[0].name} e ${podium[1].name} - ${podium[0].score} pontos. Em caso de item empatado, existe nenhum ganhador! BEM VINDO AO LEILÃO MUAHAHA *-*`)
				return true
			}
			return false
		}

		function isNewWinner(){

			if(userName === podium[0].name) {
				sendChatMessage(`Leilão[${itemName}] Nova Melhor pontuação: @${podium[0].name} - ${podium[0].score} pontos.`)
				return true
			}
			return false
		}

		function isFirstBid(){

			if(userName === podium[0].name) {
				sendChatMessage(`Leilão[${itemName}] Primeiro lance: @${podium[0].name} - ${podium[0].score} pontos.`)
				return true
			}
			return false
		}
	}
	
	
	

	
	//=====================================================================================================================================================================================================================================
	//=====================================================================================================================================================================================================================================
	//PARTICIPANTS TEMPORARY DATA BASE RELATED METHODS
	//=====================================================================================================================================================================================================================================
	//=====================================================================================================================================================================================================================================

	



	/** ====================================================
	 * Registers a bid for the auction instance. Adds extra time for the auctioned item 
	 * in case there is less than 60 seconds left.
	 * 
	 * @param {Object} bid - An object containing the username and bid value.
	 * @param {string} bid.userName - The username of the participant.
	 * @param {number} bid.bidValue - The value of the bid.
	 */
	bid({userName, bidValue}) {
		
		if (!this.isParticipantRegistered(userName)) {

			this.registerParticipant(userName, bidValue)
			this.checkForNewWinner(userName)
			return
		}

		this.addParticipantTotalBid(userName, bidValue)
		this.checkForNewWinner(userName)
	}
	/** ====================================================
	 * Retrieves the instance `key:value` pairs of participants and their points.
	 * 
	 * @returns {{
	* 		string: number; 
	* 		'partipant_1':pointsValue; 
	* 		'partipant_2':pointsValue; 
	* 		'partipant_n':pointsValue;
	* }} The list of participants for the auction item.
	*/
	getParticipants() {
		return this.participants
	}
	/** ====================================================
	 * sum the given bid value with total bid value for a specific participant
	 * 
	 * @param {string} userName 
	 * @param {number} pointsValue 
	 * @returns {void}
	*/
	addParticipantTotalBid(userName, bidValue){
		this.participants[userName] += bidValue
	}
	/** ====================================================
	 * Checks if a specific name already exist inside the Participants list
	 * 
	 * @param {string} userName
	 * @returns {boolean} `True` is useName already exists, `false` otherwise
	 */
	isParticipantRegistered(userName){
		return this.participants.hasOwnProperty(userName)
	}
	/** ====================================================
	 * Register a specific name with the initial bid value provided
	 * 
	 * @param {string} userName 
	 * @param {number} pointsValue 
	 * @returns {void}
	 */
	registerParticipant(userName, bidValue) {
		this.participants[userName] = bidValue
	}
	/** ====================================================
	 * Returns an array of participants object, example: [{name: michael, score: 1200}, ...] descendent ordered by score
	 * 
	 * @returns {{name: string, score: number}[]}
	 */
	getRank(){

		const itemRank = []
		const participants = this.getParticipants()
		
		//Pushes each participant into an array
		for (const name in participants) {
			itemRank.push({
				name: name,
				score: participants[name],
			})
		}

		//Descendent sort the array
		itemRank.sort((a, b) => { return b.score - a.score })

		return itemRank
	}
	/** ====================================================
	 * Announces the winner of the auction instance. If there are no participants, a message is sent to the chat indicating that the auction ended with no winner. Otherwise, a message is sent to the chat announcing the winner and their score.
	 */
	announceWinner() {

		const podium = this.getRank()
		const itemName = this.getItemName()
		
		//Check for no bid result
		if (podium.length <= 0) {
			sendChatMessage(`RESULTADO Leilão[${itemName}], NENHUM LANCE: houve nenhum ganhador`)
			return
		}

		const name = podium[0].name
		const score = podium[0].score

		//Check for only 1 bid result
		if (podium.length === 1) {
			sendChatMessage(`RESULTADO Leilão[${itemName}: @${name} ganhou com ${score} pontos`)
			sendChatMessage(`/w @${name} PARABÉNS!! Voce ganhou um ${itemName}. ${Auction.getDateAndTime()}`)
			return
		}

		//Check for Draw result
		if(score === podium[1].score){
			sendChatMessage(`RESULTADO Leilão[${itemName}, EMPATE: Não houve nenhum ganhador, a casa ganhou *-*`)
			return
		}

		//Check for winner result
		sendChatMessage(`RESULTADO Leilão[${itemName}: @${name} ganhou com ${score} pontos`)	
		sendChatMessage(`/w @${name} PARABÉNS!! Voce ganhou um ${itemName}. ${Auction.getDateAndTime()}`)
	}
}

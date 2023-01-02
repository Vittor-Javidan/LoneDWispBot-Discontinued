import fs from 'fs'
import sendMessage from '../../../Twitch/sendMessageHandler'

/**
 * - keys: `entity name string`
 * @typedef {import('../TypeDefinitions/Types').CS_Database} CS_Database
*/

export default class DbSystem {

	/**
	 * Database path (directory + fileName)
	 * @type {string}
	 * @private
	 */
	static directory = `${__dirname}/playersData.json`

	/**
	 * Retrieves local database information
	 * @returns {CS_Database}
	 */
	static loadDb() {
	
		try {
			const data = fs.readFileSync(this.directory, 'utf-8')
			return JSON.parse(data)
		} catch (err) {
			console.log(err)
			console.log(`dataBase doesn't exist. "playersData.json" not found.`)
			sendMessage(`Banco de dados local não existe. "playersData.json" não encotrado. Por favor, crie ou importe um novo arquivo "database.json" no diretório ${__dirname}.`)
		}
	}

	/**
	 * Write local database information
	 * @param {CS_Database}
	 */
	static writeDb(object) {

		try {
			fs.writeFileSync(this.directory, JSON.stringify(object, null, 4))
		} catch (err) {
			console.log(err)
			console.log('there is not information to be saved')
			sendMessage('Não há nenhuma informação a ser salva')
		}
	}
}

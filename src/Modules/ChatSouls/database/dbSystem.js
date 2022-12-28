import fs from 'fs'
import sendMessage from '../../../Twitch/sendMessageHandler'

/**
 * Database path (directory + fileName)
 */
const directory = `${__dirname}/database.json`

/**
 * Retrieves local database information
 * @returns {import('../Classes/Player').CS_Database}
 */
function loadDb() {
	
	try {
		const data = fs.readFileSync(directory, 'utf-8')
		return JSON.parse(data)
	} catch (err) {
		console.log(err)
		console.log(`dataBase doesn't exist. "database.json" not found.`)
		sendMessage(`Banco de dados local não existe. "database.json" não encotrado. Por favor, crie ou importe um novo arquivo "database.json" no diretório ${__dirname}.`)
	}
}

/**
 * Write local database information
 * @param {import('../Classes/Player').CS_Database}
 */
function writeDb(object) {

	try {
		fs.writeFileSync(directory, JSON.stringify(object, null, 4))
	} catch (err) {
		console.log(err)
		console.log('there is not information to be saved')
		sendMessage('Não há nenhuma informação a ser salva')
	}
}

const dbSystem = {
	loadDb,
	writeDb,
}

export default dbSystem

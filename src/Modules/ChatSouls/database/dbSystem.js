import fs from 'fs'

/** See `Types.js` to understand the types
 * @typedef {import('../TypeDefinitions/Types').CS_Database} CS_Database
*/

export const playerDataBasePath = `${__dirname}/playersData.json`
export const errorContentDataBasePath = `${__dirname}/errorContentDataBase.md`
export const errorLogDataBasePath = `${__dirname}/errorLogDataBase.md`

export default class DbSystem {

	static safetyKeys = {
		playerDataBase: 52965926
	}

	/**
	 * Retrieves local database information
	 * @returns {CS_Database}
	 */
	static loadDb(directory) {

		const data = fs.readFileSync(directory, 'utf-8')

		try {
			return JSON.parse(data)
		} catch (error) {
			fs.writeFileSync(errorContentDataBasePath, data)
			fs.writeFileSync(errorLogDataBasePath, JSON.stringify(error))
		}
	}

	/**
	 * Write local database information
	 * @param {CS_Database} object
	 * @param {string} directory
	 */
	static writeDb(object, directory) {

		if(
			!object.Authorization 					||
			object.Authorization.key === undefined  ||
			Object.keys(object).length === 0
		) throw Error(`ERROR: Player class, "database" setter. You probably sending wrong data to data base.`)

		fs.writeFileSync(directory, JSON.stringify(object, null, 4))
	}
}

import fs from 'fs'

/**
 * - keys: `entity name string`
 * @typedef {import('../TypeDefinitions/Types').CS_Database} CS_Database
*/

/**
 * Database path (directory + fileName)
 * @type {string}
 * @private
 */
export const playerDataBasePath = `${__dirname}/playersData.json`

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
		return JSON.parse(data)
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

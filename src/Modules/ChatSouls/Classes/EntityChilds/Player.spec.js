import { describe, expect, it } from 'vitest'
import deepCopy from '../../../../Utils/deepCopy'
import DbSystem, { playerDataBasePath } from '../../database/DbSystem'
import { ENTITY_DEFAULT } from '../../Globals/ENTITY_DEFAULT'
import { PLAYER_DEFAULT } from '../../Globals/PLAYER_DEFAULT'
import { TYPE_DEFINITIONS_KEYS } from '../../Globals/TYPE_DEFINITIONS_KEYS'
import { CS_DevTools } from '../../TestTools/CS_DevTools'
import Player from './Player'

/** See `Types.js` to understand the types
 * @typedef {import('../../TypeDefinitions/Types').CS_Database} CS_Database
 * @typedef {import("../../TypeDefinitions/Types").CS_Stats} CS_Stats
 * @typedef {import("../../TypeDefinitions/Types").CS_Inventory_Equipments} CS_Inventory_Equipments
 * @typedef {import("../../TypeDefinitions/Types").CS_Entity_Inventory} CS_Entity_Inventory
 * @typedef {import("../../TypeDefinitions/Types").CS_Entity_Equipment} CS_Entity_Equipment
 * @typedef {import("../../TypeDefinitions/Types").CS_Attributes} CS_Attributes
 * @typedef {import("../../TypeDefinitions/Types").CS_Inventory_Resources} CS_Inventory_Resources
 * @typedef {import("../../TypeDefinitions/Types").CS_Equipment_WeaponData} CS_Equipment_WeaponData
 * @typedef {import("../../TypeDefinitions/Types").CS_Equipment_ArmorData} CS_Equipment_ArmorData
 * @typedef {import("../../TypeDefinitions/Types").CS_ResourceData} CS_ResourceData
 * @typedef {import('../../TypeDefinitions/Types').CS_EntityData} CS_EntityData
 * @typedef {import('../../TypeDefinitions/Types').CS_PlayerState} CS_PlayerState
*/

const attributeTypes = TYPE_DEFINITIONS_KEYS.CS_ATTRIBUTES

describe('Player class', () => {
	
	describe('Player initialization', 	() => initialization())
	describe('Setters and getters', 	() => settersAndGetters())
	describe('Class Methods', 			() => classMethods())
	describe('Player utils methods', 	() => instanceMethods())
})

function initialization() {

	describe('constructor', () => {

		it(`Should instantiate with default properties`, () => {
			
			//Instantiation
			const name = "Dummy Player: constructor()"
			
			//Run
			const dummyPlayer = new Player(name)

			//Tests
			expect(dummyPlayer.getName()).toBe(name)
			expect(dummyPlayer.getAttributes()).toStrictEqual(PLAYER_DEFAULT.ATTRIBUTES)
			expect(dummyPlayer.getCurrentEquipment()).toStrictEqual(PLAYER_DEFAULT.EQUIPMENTS)
			expect(dummyPlayer.getCurrentState()).toStrictEqual(PLAYER_DEFAULT.STATES)
			expect(dummyPlayer.getCurrentLocation()).toBe(PLAYER_DEFAULT.CURRENT_LOCATION)
		})
	})
	
	describe('startGame', () => {

		/*INTENTION
			to handle the start game process, until the player
			instance is ready to be used.
		*/
		
		/*FUNCTIONALITY
			It returns a player instance that had passed through
			all needed procedure. 
		*/

		it(`Should initialize the player instance`, () => {

			const references = CS_DevTools.importantReferences()
			
			//Run
			const newPlayer = Player.startGame("New dummy Player: startGame")
			const oldPlayer = Player.startGame(DummyGuy.name)
			
			//Test
			expect(oldPlayer).toBeInstanceOf(Player)
			expect(newPlayer).toBeInstanceOf(Player)

			// Sanitizers
			Player.logoutPlayerInstance(oldPlayer)
			Player.logoutPlayerInstance(newPlayer)
			Player.deletePlayer(newPlayer.getName(), true)
		})
	})
}

function settersAndGetters() {

	describe('getDatabase / setDatabase', ()=> {

		/* INTENTION
			to set and get "#database" private propertie
		*/

		it(`Should set and get "static #database"`, () => {
			
			// Instantiation
			/**@type {CS_Database} */
			const newDatabase = deepCopy(Player.getDatabase())
			const playerData = DummyData.herobrineData

			//Setup
			newDatabase[playerData.name] = playerData

			//Run
			Player.setDatabase(newDatabase)

			//Test
			expect(Player.getPlayerData(DummyData.herobrineData.name)).toBeDefined()

			//Sanitizers
			Player.deletePlayer(DummyData.herobrineData.name, true)
			Player.forceSaveDataBase()
		})
		
		it(`Throws Error: 
			1. When try to save wrong type data
			2. When authorizantion key is not defined
		`, () => {

			//Instantiation
			const wrongTypes = [0, "Test", true, null, undefined, NaN]
			
			//Test 1
			wrongTypes.forEach(wrongType => {
				expect(() => Player.setDatabase(wrongType)).toThrow(
					Error(`ERROR: Player class, "database" setter: Wrong type`)
				)
			})

			//Test 2
			expect(() => Player.setDatabase(DummyData.wrongDataBase)).toThrow(
				Error(`ERROR: Player class, "database" setter: Authorizantion key not found.`)
			)
		})
	})

	describe("getPlayerData / setPlayerData", () => {

		/* INTENTION
			to set and get player data.
			Inside "#database[playerName]" propertie
		*/

		it(`Should set "static #database[playerName]"`, () => {

			//Instantiation
			const playerData = DummyData.herobrineData
			
			//Run
			Player.setPlayerData(playerData) 

			//Test
			expect(Player.getPlayerData(playerData.name)).toStrictEqual(playerData)

			//Sanitizers
			Player.deletePlayer(playerData.name, true)
			Player.forceSaveDataBase()
		})
		
		it(`Throws Error: 
			1. When data has a wrong type
			2. When player data has no name
		`, () => {

			//Instantiation
			const wrongTypes = [0, "Test", true, null, undefined, NaN]

			//Test 1
			wrongTypes.forEach(wrongType => {
				expect(() => Player.setPlayerData(wrongType)).toThrow(
					Error(`ERROR: Player class, "playerData" setter: Wrong type`)
				)
			})

			//Test 2
			expect(() => Player.setPlayerData(DummyData.playerWithNoName)).toThrow(
				Error(`ERROR: Player class, "playerData" setter: playerData must have at least a name.`)
			)
		})
	})

	describe(`getOnlinePlayers / setOnlinePlayers`, () => {

		/* INTENTION
			to set and get "#onlinePlayers" propertie,
			wich represent all players instances.
		*/

		it(`Should set "static #onlinePlayers"`, () => {
			
			//Instantiation
			const player_1 = new Player("Dummy Player 1: onlinePlayers setter/getter")
			const player_2 = new Player("Dummy Player 1: onlinePlayers setter/getter")
			const player_3 = new Player("Dummy Player 1: onlinePlayers setter/getter")
			const instancesArray = []

			//Setup
			instancesArray.push(player_1)
			instancesArray.push(player_2)
			instancesArray.push(player_3)

			//Run
			Player.setOnlinePlayers(instancesArray)
			
			//Tests
			Player.getOnlinePlayers().forEach(player => {
				expect(player).toBeInstanceOf(Player)
			})

			//Sanitizer
			instancesArray.forEach(player => {
				Player.logoutPlayerInstance(player)
			})
		})

		it(`Throws Error:
			1. When array is not a array of Players
			2. When type is wrong
		`, () => {

			//Instantiation
			const wrongObject_1 = ["We", "will", "we", "will", "rock you!"]
			const wrongTypes = [0, "Test", true, null, undefined, NaN]
			
			//Test 1 
			expect(() => Player.setOnlinePlayers(wrongObject_1)).toThrow(
				Error(`ERROR, Player class, "onlinePlayer" setter: only array of players are allowed`)
			)

			//Test 2
			wrongTypes.forEach(wrongType => {
				expect(() => Player.setOnlinePlayers(wrongType)).toThrow(
					Error(`ERROR, Player class, "onlinePlayer" setter: wrong type`)
				)
			})
		})
	})

	describe(`getCurrentState / setCurrentState`, () => {

		/* INTENTION
			to set and get "#currentState" propertie.
		*/

		it(`Should set "#currentState"`, () => {
			
			//Instantiation
			const player = new Player("Dummy Player: currentState setter/getter")
			const fakeState = {
				primary: "Fake Primary State",
				secondary: "Fake Secondary State"
			}
			
			//Run
			player.setCurrentState(fakeState)
			
			//Test
			expect(player.getCurrentState()).toStrictEqual(fakeState)
		})

		it(`Thows Error:
			1. When wrong type is set
			2. When properties are not defined
		`, () => {

			//Instantiation
			const player = new Player("Dummy Player: currentState setter/getter")
			const wrongTypes = [0, "Test", true, null, undefined, NaN]

			//Test 1
			wrongTypes.forEach(wrongType => {
				expect(() => player.setCurrentState(wrongType)).toThrow(
					Error(`ERROR, Player class, "currentState" setter: wrong type`)
				)
			})

			//Test 2
			expect(() => player.setCurrentState({})).toThrow(
				Error(`ERROR, Player class, "currentState" setter: propertie not defined`)
			)
		})
	})

	describe(`getPrimaryState / setPrimaryState`, () => {

		/* INTENTION
			to set and get "#currentState.primary" propertie.
		*/
		
		it(`Should set "#currentState.primary"`, () => {
			
			//Instantiation
			const fakeState = "Fake Primary State"
			const name = "Dummy Player: primaryState setter/getter"
			const player = new Player(name)
			
			//Run
			player.setPrimaryState(fakeState)
			
			//Test
			expect(player.getPrimaryState()).toEqual(fakeState)
		})

		it(`Thows Error:
			1 - When wrong type is set
		`, () => {

			//Instantiation
			const name = "Dummy Player: primaryState setter/getter"
			const player = new Player(name)
			const wrongTypes = [0, null, true, undefined, NaN, {}]

			//Test
			wrongTypes.forEach(wrongType => {
				expect(() => player.setPrimaryState(wrongType)).toThrow(
					Error(`ERROR, Player class, "primaryState" setter: wrong type`)
				)
			})
		})
	})

	describe(`secondaryState`, () => {

		/* INTENTION
			to set and get "#currentState.secondary" propertie.
		*/

		it(`Should set "#currentState.secondary"`, () => {
			
			//Instantiation
			const fakeState = "Fake Secondary State"
			const name = "Dummy Player: primaryState setter/getter"
			const player = new Player(name)

			//Run
			player.setSecondaryState(fakeState)
			
			//Test
			expect(player.getSecondaryState()).toEqual(fakeState)
		})

		it(`Thows Error:
			1 - When wrong type is set
		`, () => {

			//Instantiation
			const name = "Dummy Player: primaryState setter/getter"
			const player = new Player(name)
			const wrongTypes = [0, null, true, undefined, NaN, {}]

			//Test
			wrongTypes.forEach(wrongType => {
				expect(() => player.setSecondaryState(wrongType)).toThrow(
					Error(`ERROR, Player class, "secondaryState" setter: wrong type`)
				)
			})
		})
	})

	describe(`currentLocation`, () => {

		/* INTENTION
			to set and get "#currentLocation" propertie.
		*/

		it(`Should set "#currentLocation"`, () => {
			
			//Instantiation
			const name = "Dummy Player: currentLocation setter/getter"
			const dummyPlayer = new Player(name)
			const location = "Fake Location"

			//Run
			dummyPlayer.setCurrentLocation(location)

			//Test
			expect(dummyPlayer.getCurrentLocation()).toEqual(location)
		})

		it(`Should:
			1 - When wrong type is set
		`, () => {

			//Instantiation
			const name = "Dummy Player: primaryState setter/getter"
			const player = new Player(name)
			const wrongTypes = [0, null, true, undefined, NaN, {}]

			//Test
			wrongTypes.forEach(wrongType => {
				expect(() => player.setCurrentLocation(wrongType)).toThrow(
					Error(`ERROR, Player class, "currentLocation" setter: wrong type`)
				)
			})
		})
	})

	describe(`canPlay`, () => {

		/* INTENTION
			to set and get "#canPlay" propertie.
		*/

		it(`Should set "#canPlay"`, () => {
			
			//Instantiation
			const name = "Dummy Player: canPlay setter/getter"
			const dummyPlayer = new Player(name)
			
			//Run
			dummyPlayer.setCanPlay(true)
			
			//Test
			expect(dummyPlayer.getCanPlay()).toEqual(true)
		})

		it(`Throws Error:
			1. when wrond data type
		`, () => {
			
			//Instantiation
			const name = "Dummy Player: canPlay setter/getter"
			const player = new Player(name)
			const wrongTypes = [0, null, "Wrong", undefined, NaN, {}]

			//Test
			wrongTypes.forEach(wrongType => {
				expect(() => player.setCanPlay(wrongType)).toThrow(
					Error(`ERROR: Player class, "canPlay" setter: you can only set booleans`)
				)
			})
		})
	})
}

function classMethods() {

	describe(`forceUpdateDataBase`, () => {

		/* INTENTION
		
			The intend of this method is to be used when you need to update all users,
			including the one don't play the game too often. The reasons can be for
			test purposes, or to really force update the user data structure.
		*/

		/* FUNCTIONALITY

			- Players auto update by just login into the game. 

			What the methods must achieve is: login all database users into the game, 
			and then logout in sequence.
		*/

		it(`Should force update users info inside database`, () => {
			
			/* DETAILS
			
				All users must have their structure updated. The many
				cenarios is treated on updateDataBaseMissingInfo() class
				method.
			*/
			
			//Instantiation
			const player = DummyData.outdatedPlayerData_1
			const expectedData = {
				souls: ENTITY_DEFAULT.SOULS,
				level: ENTITY_DEFAULT.LEVEL,
				attributes: PLAYER_DEFAULT.ATTRIBUTES,
				equipment: PLAYER_DEFAULT.EQUIPMENTS,
				inventory: ENTITY_DEFAULT.INVENTORY
			}

			//Setup
			Player.setPlayerData(player)

			//Run
			Player.forceUpdateDatabase()

			//Tests
			expect(Player.getPlayerData(player.name)).toStrictEqual({
				name: player.name, ...expectedData
			})

			//Sanitizers
			Player.deletePlayer(player.name, true)
			Player.forceSaveDataBase()
		})
	})

	describe(`forEachUser`, () => {

		/*INTENTION
			Loop through all users on local loaded database
		*/

		/*FUNCTIONALITY
			It must iterate through all users and ignore the
			Autorization propertie that allow the data to be saved
			on DbSystem Class
		*/

		it(`Should iterate through all users`, () => {
			
			//Instantiation
			const copiedDataBase = deepCopy(Player.getDatabase())
			let retrievedNames = []
			
			//Setup
			delete copiedDataBase["Authorization"]
			const copiedDataBaseUserNames = Object.keys(copiedDataBase)

			//Run
			Player.forEachUser(userName => retrievedNames.push(userName))

			//Test
			retrievedNames.forEach(name => {
				expect(copiedDataBaseUserNames.includes(name)).toBe(true)
			})
		})
	})

	describe(`forceSaveDataBase`, () => {

		/*INTENTION
			To force save the current database inside "#database"
		*/

		it(`Should force save current information on database`, () => {

			//Instantiation
			const playerData = {
				name: "Dummy Guy: forceSaveDataBase"
			}

			//Setup
			Player.setPlayerData(playerData)

			//Run
			Player.forceSaveDataBase()

			//Test
			const newDatabase = DbSystem.loadDb(playerDataBasePath)
			expect(newDatabase[playerData.name]).toBeDefined()

			//Sanitizer
			Player.deletePlayer(playerData.name, true)
			Player.forceSaveDataBase()
		})
	})

	describe(`deletePlayer`, () => {

		/*INTENTION
			To delete any playerData and his own propertie inside "#database".
		*/

		it(`Should:
			1. Delete Player From Local Database
		`, () => {

			//Instanttiation
			const name = `Dummy Player: deletePlayer`
			const player = Player.startGame(name)

			//Run
			Player.deletePlayer(name, true)

			//Test
			expect(Player.getPlayerData(name)).toBeUndefined()

			//Sanitizer
			Player.logoutPlayerInstance(player)
		})
	})

	describe('register', () => {

		/*INTENTION
			To add playerData and his own propertie inside "#database".
		*/

		it(`Should:
			1. Change isNewPlayer propertie to true when a new player is register.
			2. send False response when register is not necessary
		`, () => {

			//Instantiation
			const playerData = DummyData.herobrineData
			const name = DummyData.herobrineData.name
			const dummyPlayer = new Player(name)
			
			//1
			Player.register(dummyPlayer)
			expect(dummyPlayer.isNewPlayer).toBe(true)
			expect(Player.getPlayerData(name)).toStrictEqual(playerData)

			//2
			Player.register(dummyPlayer)
			expect(dummyPlayer.isNewPlayer).toBe(false)

			//Sanitizer
			Player.deletePlayer(name, true)
		})
	})

	describe('updateDataBaseMissingInfo', () => {

		/*INTENTION
			To update any missing data structure of the 
			playersData inside "#database" when players starts the game.
		*/

		it(`Should Update every data structure that is missing`, () => {

			/*Details:
				Should be capable to update when:
				1 - Every information is missing
				2 - There is opnly "inventory" information missing
				3 - There is only "inventory equipments" information missing
				4 - There is only "resources" information missing
			*/

			//Instantiation
			const playerArray = []
			const playerDataArray = [
				DummyData.outdatedPlayerData_1, //1
				DummyData.outdatedPlayerData_2, //2
				DummyData.outdatedPlayerData_3, //3
				DummyData.outdatedPlayerData_4	//4
			]
			
			//Setup
			playerDataArray.forEach(playerData => {
				//Setting outdated data on "#database"
				Player.setPlayerData(playerData)
			})
			playerDataArray.forEach(playerData => {
				playerArray.push(new Player(playerData.name))
			})

			//Run
			playerArray.forEach(player => {
				Player.updateDataBaseMissingInfo(player)
			})
			
			//Tests
			playerArray.forEach(player => {
				expect(Player.getPlayerData(player.getName()).name).toEqual(player.getName())
				expect(Player.getPlayerData(player.getName()).souls).toEqual(0)
				expect(Player.getPlayerData(player.getName()).attributes).toStrictEqual(Default.attributes)
				expect(Player.getPlayerData(player.getName()).equipment).toStrictEqual(Default.equipments)
				expect(Player.getPlayerData(player.getName()).inventory).toStrictEqual(Default.inventory)
			})

			//Sanitizer
			playerArray.forEach(player => {
				Player.deletePlayer(player.getName(), true)
			})
			Player.forceSaveDataBase()
		})
	})

	describe(`isLogged`, () => {

		it(`Should:
			1. Return True when player is logged,
			2. Return Fase otherwise
		`, () => {
			
			//1
			const dummyPlayer = new Player("Dummy Player: isLogged()")
			Player.getOnlinePlayers().push(dummyPlayer)
			expect(Player.isLogged("Dummy Player: isLogged()")).toBe(true)
			
			//2
			Player.setOnlinePlayers([]) 
			expect(Player.isLogged("Dummy Player: isLogged()")).toBe(false)
		})
	})

	describe('loginPlayerInstance', () => {

		it(`Should: 
			1. login when player is not online
		`, () => {

			//Instantiation
			const name = "Dummy Player: loginPlayerInstance()"
			const playerInstance = new Player(name)

			//Run
			Player.loginPlayerInstance(playerInstance)

			//Test
			expect(Player.getOnlinePlayers()[0].getName()).toBe(name)

			//Sanitizer
			Player.setOnlinePlayers([])
		})

		it(`Throw Error: 
			1. When a player is already logged
		`, () => {

			//1
			const dummyInstance = new Player("Dummy Player: loginPlayerInstance()")

			//Setup
			Player.getOnlinePlayers().push(dummyInstance)

			//Test
			expect(() => Player.loginPlayerInstance(dummyInstance)).toThrow(
				Error('ERROR: Player is already logged. Use this method only when a player is not logged in the game')
			)

			//Sanitizer
			Player.setOnlinePlayers([])
		})
	})

	describe(`logoutPlayerInstance`, () => {

		/* INTENTION
			to logout the player, by removing the instance
			from `online players` list property
		*/

		it(`Should logout player using the instance
		`, () => {

			//Instantiation
			const dummyPlayer = new Player("Dummy Player: logoutPlayerInstance()")
			
			//Setup
			Player.getOnlinePlayers().push(dummyPlayer)
			
			//Run
			Player.logoutPlayerInstance(dummyPlayer)
			
			//Test
			expect(Player.getOnlinePlayers().length).toBe(0)
		})

		it(`Throws Error:
			1. when a player instance is not found
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player: logoutPlayerInstance()")
			expect(() => Player.logoutPlayerInstance(dummyPlayer)).toThrow(
				Error(`ERROR: Player class, "logoutPlayerInstance" method: player instance is not logged`)
			)
		})
	})

	describe(`logoutPlayerInstanceByName`, () => {

		/*INTENTION
			to just be an extension of logoutPlayerInstance() class method
			by passing just a name instead the whole player instance object,
			to give more flexibility and less code typing in some situations.
		*/

		it(`Should logout player instance by using the instance name properties`, () => {
		
			//Instantiation
			const dummyPlayer = new Player("Dummy Player: logoutPlayerInstance()")

			//Setup
			Player.getOnlinePlayers().push(dummyPlayer)

			//Run
			Player.logoutPlayerInstanceByName(dummyPlayer.getName())

			//Test
			expect(Player.getOnlinePlayers().length).toBe(0)
		})
	})

	describe(`getPlayerInstanceByName`, () => {

		it(`Should:
			1. return player instance by giving a name
		`, () => {
			
			//1
			const dummyPlayer = new Player("Dummy Player: getPlayerInstanceByName()")
			Player.getOnlinePlayers().push(dummyPlayer)
			expect(Player.getPlayerInstanceByName(dummyPlayer.getName()).getName()).toEqual("Dummy Player: getPlayerInstanceByName()")
			
			//Sanitizer
			Player.setOnlinePlayers([])
		})

		it(`Throws Error:
			1. when player instance is not found
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player: getPlayerInstanceByName()")
			expect(() => Player.getPlayerInstanceByName(dummyPlayer.getName())).toThrow(
				Error(`ERROR: Player class, "getPlayerInstanceByName" method: cannot get a instance that is not inside onlinePlayers array`)
			)
		})
	})
}

function instanceMethods() {

	describe('load', () => {

		it(`Should:
			1. load info from player data base
		`, () => {
			
			const dummyPlayer = new Player(DummyGuy.name)
			dummyPlayer.load()
			expect(dummyPlayer.getSouls()).toEqual(DummyGuy.souls)
			expect(dummyPlayer.getlevel()).toEqual(DummyGuy.level)
			expect(dummyPlayer.getAttributes()).toStrictEqual(DummyGuy.attributes)
			expect(dummyPlayer.getCurrentEquipment()).toStrictEqual(DummyGuy.equipment)
			expect(dummyPlayer.getInventoryEquipments()).toStrictEqual(DummyGuy.inventoryEquipments)
			expect(dummyPlayer.getInventoryResources()).toStrictEqual(DummyGuy.inventoryResources)
		})
	})

	describe('save', () => {
		
		it(`Should:
			1. save information on player database
		`, () => {

			//Instantiation
			const dinamicDummy = new Player("Dummy Player: save()")

			//Setup
			dinamicDummy.setSouls(RandomData.souls())
			dinamicDummy.setlevel(RandomData.level())
			dinamicDummy.setAttributes(RandomData.attributes())
			dinamicDummy.setCurrentEquipment(RandomData.equipment())
			dinamicDummy.setInventory(RandomData.inventory())

			//Run
			dinamicDummy.save()

			//Tests
			const newDataBase = DbSystem.loadDb(playerDataBasePath)[dinamicDummy.getName()] //pre-requisite, to get new data from database file
			expect(newDataBase.name).toBe(dinamicDummy.getName())
			expect(newDataBase.souls).toBe(dinamicDummy.getSouls())
			expect(newDataBase.level).toBe(dinamicDummy.getlevel())
			expect(newDataBase.equipment).toStrictEqual(dinamicDummy.getCurrentEquipment())
			expect(newDataBase.attributes).toStrictEqual(dinamicDummy.getAttributes())
			expect(newDataBase.inventory).toStrictEqual(dinamicDummy.getInventory())

			//Sanitizer
			Player.deletePlayer(dinamicDummy.getName(), true)
			Player.forceSaveDataBase()
		}) 
	})

	describe('getUpgradeCost', () => {
		
		it(`Should:
			1. return the cost to upgrade
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player: getUpgradeCost()")
			dummyPlayer.setlevel(1)
			expect(dummyPlayer.getUpgradeCost()).toEqual(550)
		})
	})

	describe(`upgradeAttributeProcessHandler`, () => {

		/* Pre-requisites
			- player instance
		*/
		
		it(`Should:
			1. handle upgrade process for the choosen attribute, and save on database
		`, () => {

			//Instantiation
			const name = "Dummy Player: upgradeAttributeProcessHandler()"
			const dinamicDummy = new Player(name)

			//Setup
			const initalAttributes = RandomData.attributes()
			dinamicDummy.setAttributes(initalAttributes)
			
			//Run
			dinamicDummy.upgradeAttributeProcessHandler(attributeTypes.VITALITY)
			dinamicDummy.upgradeAttributeProcessHandler(attributeTypes.AGILITY)
			dinamicDummy.upgradeAttributeProcessHandler(attributeTypes.STRENGHT)
			dinamicDummy.upgradeAttributeProcessHandler(attributeTypes.INTELLLIGENCE)

			//Test
			const newSavedData_DinamicDummy = DbSystem.loadDb(playerDataBasePath)[name] //pre-requisite, to get new data from database file
			expect(newSavedData_DinamicDummy.attributes).toStrictEqual({
				vitality: 		initalAttributes.vitality		+ 1,
				agility: 		initalAttributes.agility		+ 1,
				strenght: 		initalAttributes.strenght		+ 1,
				intelligence: 	initalAttributes.intelligence	+ 1,
			})

			//Sanitizer
			Player.deletePlayer(name, true)
			Player.forceSaveDataBase()
		})
	})

	describe(`delayPlayerAction`, () => {

		it(`Should:
			1. set "can.play" to false, and back to true after timeout
		`, async () => {

			//Instantiation
			const asyncGuy = new Player("Async Guy: delayPlayerAction()")
			
			//Run
			asyncGuy.delayPlayerAction(1)
			
			//Test
			expect(asyncGuy.getCanPlay()).toBe(false)
			await new Promise(resolve => setTimeout(resolve, 10))
			expect(asyncGuy.getCanPlay()).toBe(true)
		})
	})
}

class Default {

	/**@type {CS_Attributes} */
	static attributes = {
		vitality:      	10,
		agility:       	10,
		strenght:      	10,
		intelligence:	10,
	}

	/**@type {CS_Entity_Equipment} */
	static equipments = {
		longRangeWeapon: { name: "Arco de madeira" },
		meleeWeapon:     { name: "Adaga" },
		helmet:          { name: "Chapéu de caçador" },
		bodyArmor:       { name: "Roupa de caçador" },
		gloves:          { name: "Luvas de caçador" },
		boots:           { name: "Botas de caçador" }
	}

	/**@type {CS_Entity_Inventory} */
	static inventory = {
		equipments: {
			longRangeWeapon:	[],
			meleeWeapon:      	[],
			helmet:            	[],
			bodyArmor:        	[],
			gloves:            	[],
			boots:             	[]
		},
		resources: {}
	}
}

class DummyGuy {

	/*
		"Dummy Guy" is a real data inside database, copied and paste here, to simulate some database behavior.
		All information is hard coded on purpose, to give flexibility on tests
	*/

	static name = "Dummy Guy"
	static souls = 9800
	static level = 51

	/**@type {CS_Attributes} */
	static attributes = {
		vitality: 		21,
		agility: 		21,
		strenght: 		21,
		intelligence: 	21,
	}

	/**@type {CS_Entity_Equipment} */
	static equipment = {
		longRangeWeapon: 	{ name: "Dummy Equipment" },
		meleeWeapon:        { name: "Dummy Equipment" },
		helmet:             { name: "Dummy Equipment" },
		bodyArmor:          { name: "Dummy Equipment" },
		gloves:             { name: "Dummy Equipment" },
		boots:              { name: "Dummy Equipment" }
	}

	/**@type {CS_Inventory_Equipments} */
	static inventoryEquipments = {
		longRangeWeapon: [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }],
		meleeWeapon:     [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }],
		helmet:          [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }],
		bodyArmor:       [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }],
		gloves:          [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }],
		boots:           [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }]
	}

	/**@type {CS_Inventory_Resources} */
	static inventoryResources = {
		"Dummy Resource": {
			name: "Dummy Resource",
			amount: 2,
			type: "test"
		},
		"Dummy Resource 2": {
			name: "Dummy Resource 2",
			amount: 2,
			type: "test"
		}
	}

	/**@type {CS_Entity_Inventory} */
	static inventory = {
		equipments: {
			longRangeWeapon: [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }],
			meleeWeapon:     [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }],
			helmet:          [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }],
			bodyArmor:       [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }],
			gloves:          [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }],
			boots:           [{ name: "Dummy Equipment" }, { name: "Dummy Equipment" }]
		},
		resources: {
			"Dummy Resource": {
				name: "Dummy Resource",
				amount: 2,
				type: "test"
			},
			"Dummy Resource 2": {
				name: "Dummy Resource 2",
				amount: 2,
				type: "test"
			}
		}
	}
}

class DummyData {

	static herobrineData = { name: "Herobrine" }
	static playerWithNoName = { noName: "I Have no name" }

	static wrongDataBase = {
		nonsensePropertie: "jfdkhsaklfdaf",
		anotherThing: "it's time to stop!",
		someArray: ["Hey", "its you!", "Yeah", "You!!"]
	}

	static playerState = {
		primary: "primary state",
		secondary: "secondaty state"
	}

	static dummyLocation = "dummy location"

	static outdatedPlayerData_1 = {
		name: "outdated Dummy Guy"
	}

	static outdatedPlayerData_2 = {
		name: "outdated Dummy Guy 2",
		inventory: {}
	}
	
	static outdatedPlayerData_3 = {
		name: "outdated Dummy Guy 3",
		inventory: {
			equipments: {}
		}
	}

	static outdatedPlayerData_4 = {
		name: "outdated Dummy Guy 3",
		inventory: {
			resources: {}
		}
	}
}

class RandomData {

	/**@returns {number} */
	static souls() {
		return Math.abs(Math.random()) * 9999
	}

	/**@returns {number} */
	static level() {
		return Math.floor(Math.abs(Math.random() * 50))
	}

	/**@returns {CS_Attributes} */
	static attributes() {
		return {
			vitality: 		Math.floor(Math.abs(Math.random() * 50)) + 1,
			agility: 		Math.floor(Math.abs(Math.random() * 50)) + 1,
			strenght: 		Math.floor(Math.abs(Math.random() * 50)) + 1,
			intelligence:	Math.floor(Math.abs(Math.random() * 50)) + 1,
		}
	}

	/**@returns {CS_Entity_Equipment} */
	static equipment() {
		return {
			longRangeWeapon: 	{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`},
			meleeWeapon: 		{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`},
			helmet: 			{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`},
			bodyArmor: 			{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`},
			gloves: 			{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`},
			boots: 				{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`}
			
		}
	}

	/**@returns {string} */
	static resourceName() {
		return `Dummy Resource ${Math.floor(Math.abs(Math.random() * 50))}`
	}

	/**@returns {string} */
	static resourceType() {
		return `Test ${Math.floor(Math.abs(Math.random() * 50))}`
	}

	/**@returns {CS_Entity_Inventory} */
	static inventory() {

		const resourceName = this.resourceName()
		const resourceName_2 = this.resourceName()

		return {
			equipments: {
				longRangeWeapon: 	[{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`}],
				meleeWeapon: 		[{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`}],
				helmet: 			[{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`}],
				bodyArmor: 			[{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`}],
				gloves: 			[{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`}],
				boots: 				[{ name: `Dummy Equipment ${Math.floor(Math.abs(Math.random() * 50))}`}]
			},
			resources: {
				[resourceName]: {
					name: resourceName,
					amount: Math.floor(Math.abs(Math.random() * 50)),
					type: this.resourceType()
				},
				[resourceName_2]: {
					name: resourceName_2,
					amount: Math.floor(Math.abs(Math.random() * 50)),
					type: this.resourceType()
				}
			}
		}
	}

}
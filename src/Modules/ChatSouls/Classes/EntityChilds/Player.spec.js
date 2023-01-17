import { describe, expect, it } from 'vitest'
import deepCopy from '../../../../Utils/deepCopy'
import DbSystem, { playerDataBasePath } from '../../database/DbSystem'
import CS_ENUM from '../ENUM'
import Player from './Player'

/**
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
*/

const attributeTypes = CS_ENUM.KEYS.CS_ATTRIBUTES

describe('Player class', () => {
	
	describe('Player initialization', 	() => initialization())
	describe('Setters and getters', 	() => settersAndGetters())
	describe('Class Methods', 			() => classMethods())
	describe('Player utils methods', 	() => instanceMethods())
})

function initialization() {

	describe('constructor', () => {

		it(`Should:
			1. define default properties correctly
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player: constructor()")
			expect(dummyPlayer.getName()).toBe("Dummy Player: constructor()")
			expect(dummyPlayer.getAttributes()).toStrictEqual(deepCopy(Default.attributes))
			expect(dummyPlayer.getCurrentEquipment()).toStrictEqual(deepCopy(Default.equipments))
		})
	})
	
	describe('startGame', () => {
		
		it(`Should: 
			1. Return a player instance
			2. handle initialization,
		`, () => {
			
			//1
			const returnedPlayer = Player.startGame(DummyGuy.name)
			expect(returnedPlayer).instanceOf(Player)
			
			//2
			const playerInstance = Player.getPlayerInstanceByName(DummyGuy.name)
			expect(playerInstance).toBeInstanceOf(Player)
			expect(playerInstance.getSouls()).toBe(DummyGuy.souls)
			expect(playerInstance.getlevel()).toBe(DummyGuy.level)
			expect(playerInstance.getAttributes()).toStrictEqual(DummyGuy.attributes)
			expect(playerInstance.getCurrentEquipment()).toStrictEqual(DummyGuy.equipment)
			expect(playerInstance.inventoryEquipments).toStrictEqual(DummyGuy.inventoryEquipments)
			expect(playerInstance.inventoryResources).toStrictEqual(DummyGuy.inventoryResources)

			// Sanitizer
			Player.onlinePlayers = []
		})
	})
}

function settersAndGetters() {

	describe('database', ()=> {

		it(`Should: 
			1. set normaly
		`, () => {
			
			//1
			const database = Player.database
			database[DummyData.herobrineData.name] = DummyData.herobrineData
			Player.database = database
			expect(Player.database[DummyData.herobrineData.name]).toBeDefined()

			//Sanitizer
			delete Player.database[DummyData.herobrineData.name]
			Player.forceSaveDataBase()
		})
		
		it(`Throws Error: 
			1. when tring to save wrong data base
		`, () => {
			
			expect(() => Player.database = DummyData.wrongDataBase).toThrow(
				Error(`ERROR: Player class, "database" setter. You probably sending wrong data to replace the actual data base.`)
			)
		})
	})

	describe("send To DataBase", () => {

		it(`Should:
			1. set normaly
		`, () => {
			//1
			Player.sendToDataBase = DummyData.herobrineData
			expect(Player.database[DummyData.herobrineData.name]).toBeDefined()

			//Sanitizer
			delete Player.database[DummyData.herobrineData.name]
			Player.forceSaveDataBase()
		})
		
		it(`Throws Error: 
			1. when player data has no name
		`, () => {
			
			expect(() => Player.sendToDataBase = DummyData.playerWithNoName).toThrow(
				Error(`ERROR: Player class, "sendToDataBase" setter: playerData must have at least a name.`)
			)
		})
	})

	describe(`onlinePlayers`, () => {

		it(`Should:
			1. Set normally
		`, () => {
			
			//1
			const dummyPlayer_1 = new Player("Dummy Player 1: onlinePlayers setter/getter")
			const dummyPlayer_2 = new Player("Dummy Player 1: onlinePlayers setter/getter")
			const dummyPlayer_3 = new Player("Dummy Player 1: onlinePlayers setter/getter")
			const instancesArray = []
			instancesArray.push(dummyPlayer_1)
			instancesArray.push(dummyPlayer_2)
			instancesArray.push(dummyPlayer_3)
			Player.onlinePlayers = instancesArray
			expect(Player.onlinePlayers[0] instanceof Player).toEqual(true)
			expect(Player.onlinePlayers[1] instanceof Player).toEqual(true)
			expect(Player.onlinePlayers[2] instanceof Player).toEqual(true)

			//Sanitizer
			Player.onlinePlayers = []
		})

		it(`Throws Error:
			1. when array is not a array of Players
		`, () => {
			
			expect(() => Player.onlinePlayers = ["We", "will", "we", "will", "rock you!"]).toThrow(
				Error(`ERROR, Player class, "onlinePlayer" setter: only array of players are allowed`)
			)
		})
	})

	describe(`currentState`, () => {

		it(`Should:
			1. be set normally
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player: currentState setter/getter")
			dummyPlayer.currentState = DummyData.playerState
			expect(dummyPlayer.currentState).toStrictEqual(DummyData.playerState)
		})
	})

	describe(`primaryState`, () => {
		
		it(`Should:
			1. be set normally
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player: primaryState setter/getter")
			dummyPlayer.primaryState = DummyData.playerState.primary
			expect(dummyPlayer.primaryState).toEqual(DummyData.playerState.primary)
		})
	})

	describe(`secondaryState`, () => {

		it(`Should:
			1. be set normally
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player: secondaryState setter/getter")
			dummyPlayer.secondaryState = DummyData.playerState.secondary
			expect(dummyPlayer.secondaryState).toEqual(DummyData.playerState.secondary)
		})
	})

	describe(`currentLocation`, () => {

		it(`Should:
			1. be set normally
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player")
			dummyPlayer.currentLocation = DummyData.dummyLocation
			expect(dummyPlayer.currentLocation).toEqual(DummyData.dummyLocation)
		})
	})

	describe(`canPlay`, () => {

		it(`Should:
			1. be set normally
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player: canPlay setter/getter")
			dummyPlayer.canPlay = true
			expect(dummyPlayer.canPlay).toEqual(true)
		})

		it(`Throws Error:
			1. when wrond data type
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player: canPlay setter/getter")
			expect(() => dummyPlayer.canPlay = `Wrong Type`).toThrow(Error(`ERROR: Player class, "canPlay" setter: you can only set booleans`))
			expect(() => dummyPlayer.canPlay = 0).toThrow(Error(`ERROR: Player class, "canPlay" setter: you can only set booleans`))
			expect(() => dummyPlayer.canPlay = {}).toThrow(Error(`ERROR: Player class, "canPlay" setter: you can only set booleans`))
		})
	})
}

function classMethods() {

	describe(`forceSaveDataBase`, () => {

		it(`Should
			1. Force save current information on database
		`, () => {

			//Data creation
			const name = "Dummy Guy"
			/**@type {CS_EntityData} */
			const playerData = deepCopy(Player.database[name])
			playerData.name = "Dummy Guy: forceSaveDataBase"
			Player.sendToDataBase = playerData

			//Run
			Player.forceSaveDataBase()

			//Test
			const newDatabase = DbSystem.loadDb(playerDataBasePath)
			expect(newDatabase[playerData.name]).toBeDefined()

			//Sanitizer
			delete Player.database[playerData.name]
			Player.forceSaveDataBase()
		})
	})

	describe('register', () => {

		it(`Should:
			1. Change isNewPlayer propertie to true when a new player is register.
			2. send False response when register is not necessary
		`, () => {

			const dummyPlayer = new Player(DummyData.herobrineData.name)
			
			//1
			Player.register(dummyPlayer)
			expect(dummyPlayer.isNewPlayer).toBe(true)
			expect(Player.database[DummyData.herobrineData.name]).toStrictEqual(DummyData.herobrineData)

			//2
			Player.register(dummyPlayer)
			expect(dummyPlayer.isNewPlayer).toBe(false)

			//Sanitizer
			delete Player.database[DummyData.herobrineData.name]
		})
	})

	describe('updateDataBaseMissingInfo', () => {

		it(`Should:
			1. Update every information is missing,
			2. Update when there is inventory information missing,
			3. Update when there is only inventory equipments information missing
		`, () => {
			
			//1
			const dummyPlayer_1 = new Player(DummyData.outdatedPlayerData_1.name)
			Player.sendToDataBase = DummyData.outdatedPlayerData_1
			Player.updateDataBaseMissingInfo(dummyPlayer_1)
			expect(Player.database[DummyData.outdatedPlayerData_1.name].name).toEqual(DummyData.outdatedPlayerData_1.name)
			expect(Player.database[DummyData.outdatedPlayerData_1.name].souls).toEqual(0)
			expect(Player.database[DummyData.outdatedPlayerData_1.name].attributes).toStrictEqual(Default.attributes)
			expect(Player.database[DummyData.outdatedPlayerData_1.name].equipment).toStrictEqual(Default.equipments)
			expect(Player.database[DummyData.outdatedPlayerData_1.name].inventory).toStrictEqual(Default.inventory)
			
			//2
			const dummyPlayer_2 = new Player(DummyData.outdatedPlayerData_2.name)
			Player.sendToDataBase = DummyData.outdatedPlayerData_2
			Player.updateDataBaseMissingInfo(dummyPlayer_2)
			expect(Player.database[DummyData.outdatedPlayerData_2.name].name).toEqual(DummyData.outdatedPlayerData_2.name)
			expect(Player.database[DummyData.outdatedPlayerData_2.name].souls).toEqual(0)
			expect(Player.database[DummyData.outdatedPlayerData_2.name].attributes).toStrictEqual(Default.attributes)
			expect(Player.database[DummyData.outdatedPlayerData_2.name].equipment).toStrictEqual(Default.equipments)
			expect(Player.database[DummyData.outdatedPlayerData_2.name].inventory).toStrictEqual(Default.inventory)
			
			//3
			const dummyPlayer_3 = new Player(DummyData.outdatedPlayerData_3.name)
			Player.sendToDataBase = DummyData.outdatedPlayerData_3
			Player.updateDataBaseMissingInfo(dummyPlayer_3)
			expect(Player.database[DummyData.outdatedPlayerData_3.name].name).toEqual(DummyData.outdatedPlayerData_3.name)
			expect(Player.database[DummyData.outdatedPlayerData_3.name].souls).toEqual(0)
			expect(Player.database[DummyData.outdatedPlayerData_3.name].attributes).toStrictEqual(Default.attributes)
			expect(Player.database[DummyData.outdatedPlayerData_3.name].equipment).toStrictEqual(Default.equipments)
			expect(Player.database[DummyData.outdatedPlayerData_3.name].inventory).toStrictEqual(Default.inventory)

			//Sanitizer
			delete Player.database[DummyData.outdatedPlayerData_1.name]
			delete Player.database[DummyData.outdatedPlayerData_2.name]
			delete Player.database[DummyData.outdatedPlayerData_3.name]
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
			Player.onlinePlayers.push(dummyPlayer)
			expect(Player.isLogged("Dummy Player: isLogged()")).toBe(true)
			
			//2
			Player.onlinePlayers = []
			expect(Player.isLogged("Dummy Player: isLogged()")).toBe(false)
		})
	})

	describe('loginPlayerInstance', () => {

		it(`Should: 
			1. login when player is not online
		`, () => {

			//1
			const playerInstance = new Player("Dummy Player: loginPlayerInstance()")
			Player.loginPlayerInstance(playerInstance)
			expect(Player.onlinePlayers[0].getName()).toBe("Dummy Player: loginPlayerInstance()")

			//Sanitizer
			Player.onlinePlayers = []
		})

		it(`Throw Error: 
			1. When a player is already logged
		`, () => {

			//1
			const dummyInstance = new Player("Dummy Player: loginPlayerInstance()")
			const dummyInstance2 = new Player("Dummy Player: loginPlayerInstance()")
			Player.onlinePlayers.push(dummyInstance)
			expect(() => Player.loginPlayerInstance(dummyInstance2)).toThrow(
				Error('ERROR: Player is already logged. Use this method only when a player is not logged in the game')
			)

			//Sanitizer
			Player.onlinePlayers = []
		})
	})

	describe(`logoutPlayerInstance`, () => {

		it(`Should:
			1. logout player instance
		`, () => {
			
			//1
			const dummyPlayer = new Player("Dummy Player: logoutPlayerInstance()")
			Player.onlinePlayers.push(dummyPlayer)
			Player.logoutPlayerInstance(dummyPlayer)
			expect(Player.onlinePlayers.length).toBe(0)
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

	describe(`getPlayerInstanceByName`, () => {

		it(`Should:
			1. return player instance by giving a name
		`, () => {
			
			//1
			const dummyPlayer = new Player("Dummy Player: getPlayerInstanceByName()")
			Player.onlinePlayers.push(dummyPlayer)
			expect(Player.getPlayerInstanceByName(dummyPlayer.getName()).getName()).toEqual("Dummy Player: getPlayerInstanceByName()")
			
			//Sanitizer
			Player.onlinePlayers = []
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
			expect(dummyPlayer.inventoryEquipments).toStrictEqual(DummyGuy.inventoryEquipments)
			expect(dummyPlayer.inventoryResources).toStrictEqual(DummyGuy.inventoryResources)
		})
	})

	describe('save', () => {
		
		it(`Should:
			1. save information on player database
		`, () => {
			
			//1
			const dinamicDummy = new Player("Dummy Player: save()")
			dinamicDummy.setSouls(RandomData.souls())
			dinamicDummy.setlevel(RandomData.level())
			dinamicDummy.setAttributes(RandomData.attributes())
			dinamicDummy.setCurrentEquipment(RandomData.equipment())
			dinamicDummy.setInventory(RandomData.inventory())
			dinamicDummy.save()
			const newDataBase = DbSystem.loadDb(playerDataBasePath)[dinamicDummy.getName()] //pre-requisite, to get new data from database file
			expect(newDataBase.name).toBe(dinamicDummy.getName())
			expect(newDataBase.souls).toBe(dinamicDummy.getSouls())
			expect(newDataBase.level).toBe(dinamicDummy.getlevel())
			expect(newDataBase.equipment).toStrictEqual(dinamicDummy.getCurrentEquipment())
			expect(newDataBase.attributes).toStrictEqual(dinamicDummy.getAttributes())
			expect(newDataBase.inventory).toStrictEqual(dinamicDummy.getInventory())

			//Sanitizer
			delete Player.database[dinamicDummy.getName()]
			Player.forceSaveDataBase()
		}) 
	})

	describe('getUpgradeCost', () => {
		
		it(`Should:
			1. return the cost to upgrade
		`, () => {
			
			const dummyPlayer = new Player("Dummy Player: getUpgradeCost()")
			dummyPlayer.setlevel(50)
			expect(dummyPlayer.getUpgradeCost()).toEqual(50 * 100)
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
			const dinamicDummy = new Player("Dummy Player: upgradeAttributeProcessHandler()")

			//Setup
			const initalAttributes = RandomData.attributes()
			dinamicDummy.setAttributes(initalAttributes)
			
			//Run
			dinamicDummy.upgradeAttributeProcessHandler(attributeTypes.VITALITY)
			dinamicDummy.upgradeAttributeProcessHandler(attributeTypes.AGILITY)
			dinamicDummy.upgradeAttributeProcessHandler(attributeTypes.STRENGHT)
			dinamicDummy.upgradeAttributeProcessHandler(attributeTypes.INTELLLIGENCE)

			//Test
			const newSavedData_DinamicDummy = DbSystem.loadDb(playerDataBasePath)["Dummy Player: upgradeAttributeProcessHandler()"] //pre-requisite, to get new data from database file
			expect(newSavedData_DinamicDummy.attributes).toStrictEqual({
				vitality: 		initalAttributes.vitality		+ 1,
				agility: 		initalAttributes.agility		+ 1,
				strenght: 		initalAttributes.strenght		+ 1,
				intelligence: 	initalAttributes.intelligence	+ 1,
			})

			//Sanitizer
			delete Player.database[dinamicDummy.getName()]
			Player.forceSaveDataBase()
		})
	})

	describe(`delayPlayerAction`, () => {

		it(`Should:
			1. set "can.play" to false, and back to true after timeout
		`, async () => {

			const asyncGuy = new Player("Async Guy: delayPlayerAction()")
			asyncGuy.delayPlayerAction(1)
			expect(asyncGuy.canPlay).toBe(false)
			await new Promise(resolve => setTimeout(resolve, 10))
			expect(asyncGuy.canPlay).toBe(true)
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
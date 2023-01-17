import { describe, expect, it } from "vitest"
import deepCopy from "../../../Utils/deepCopy"
import { enemieEntries, getEnemie } from "../database/enemiesData"
import Battle from "./Battle"
import Enemie from "./EntityChilds/Enemie"
import Player from "./EntityChilds/Player"
import CS_ENUM from "./ENUM"

/**
 * @typedef {import("../TypeDefinitions/Types").CS_EntityData} CS_EntityData
 * @typedef {import("../TypeDefinitions/Types").CS_Attributes} CS_Attributes
 * @typedef {import("../TypeDefinitions/Types").CS_Stats} CS_Stats
 * @typedef {import("../TypeDefinitions/Types").CS_ResourceData} CS_ResourceData
 * @typedef {import("../TypeDefinitions/Types").CS_Entity_Equipment} CS_Entity_Equipment
*/

const mapAreas = CS_ENUM.MAP_AREAS
const statsWeight = CS_ENUM.BALANCE_VALUES.STATS_WEIGHT

describe(`Battle Class`, () => {

    describe(`Constructor`,         () => constructor())
    describe(`Class Methods`,       () => classMethods())
    describe(`Instance Methods`,    () => instanceMethods())
})

function constructor() {
    
    it(`Should
        1. set default propeties correctly
    `, () => {
        
        const dummyPlayer = new Player("Dummy Player: constructor()")
        const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
        const battleInstance = new Battle(dummyPlayer, dummyEnemie)
        expect(battleInstance.playerInstance).toBeInstanceOf(Player)
        expect(battleInstance.enemieInstance).toBeInstanceOf(Enemie)
        expect(battleInstance.turn).toBeUndefined()
    })
}

function classMethods() {

    describe(`determineFirstTurn`, () => {

        const givenAttributes = {
            hp: 0,
            evasion: 0,
            fisicalDamage: 0,
            magicalDamage: 0,
            fisicalDefense: 0,
            magicalDefense: 0
        }
        
        it(`Should:
            1. set turn to 1 when player is first,
            2. set turn to 2 when enemies is first
        `, () => {
            
            const dummyEnemieAttributes = deepCopy(givenAttributes)
            const dummyPlayerAttributes = deepCopy(givenAttributes)
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const dummyPlayer = new Player("Dummy Player: determineFirstTurn()")
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)

            //1
            dummyPlayerAttributes.evasion = 1000
            dummyEnemieAttributes.evasion = 0
            dummyPlayer.currentLocation = mapAreas.THE_WOODS
            dummyEnemie.totalStats = dummyEnemieAttributes
            dummyPlayer.totalStats = dummyPlayerAttributes
            Battle.determineFirstTurn(battleInstance)
            expect(battleInstance.turn).toBe(1)

            //2
            battleInstance.turn = undefined
            dummyEnemieAttributes.evasion = 1000
            dummyPlayerAttributes.evasion = 0
            dummyPlayer.currentLocation = mapAreas.THE_WOODS
            dummyPlayer.totalStats = dummyPlayerAttributes
            dummyEnemie.totalStats = dummyEnemieAttributes
            Battle.determineFirstTurn(battleInstance)
            expect(battleInstance.turn).toBe(2)
        })
    })

    describe(`startBattle`, () => {
        
        it(`Should:
            1. start the battle and push it to battle static list
        `, () => {
            
            //1
            const player = new Player("Dummy Player: startBattle()")
            const enemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            player.currentLocation = mapAreas.THE_WOODS
            player.level = 1
            Battle.startBattle(player, enemie)
            expect(Battle.battlesList.length).toBe(1)
            expect(Battle.battlesList[0].playerInstance.getName()).toBe(player.getName())

            //Sanitizer
            Battle.deleteBattle(player.getName())
        })
    })

    describe(`getBattle`, () => {

        it(`Should: 
            1. get a battle using the players name
        `, () => {
            
            //1
            const dummyPlayer = new Player("Dummy Player: getBattle()")
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)
            Battle.battlesList = []
            Battle.battlesList.push(battleInstance)
            const retrivedBattleInstance = Battle.getBattle("Dummy Player: getBattle()")
            expect(retrivedBattleInstance.playerInstance.getName()).toBe("Dummy Player: getBattle()")

            //Sanitizer
            Battle.deleteBattle(dummyPlayer.getName())
        })

        it(`Throw Error:
            1. when battle is not found
        `, () => {
            
            const dummyPlayer = new Player("Dummy Player: getBattle()")
            expect(() => Battle.getBattle(dummyPlayer.getName())).toThrow(
                Error(`ERROR: Battle class, "getBattle": Battle doesn't exist`
            ))
        })

    })

    describe(`deleteBattle`, () => {

        it(`Should:
            1. delete the battle instance
        `, () => {
            
            const dummyPlayer = new Player("Dummy Player: deleteBattle()")
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)
            Battle.battlesList.push(battleInstance)
            Battle.deleteBattle(dummyPlayer.getName())
            expect(Battle.battlesList.length).toBe(0)
        })

        it(`Throw Error:
            1. when battle is not found to delete
        `, () => {
            
            const dummyPlayer = new Player("Dummy Player: deleteBattle()")
            expect(() => Battle.deleteBattle(dummyPlayer.getName())).toThrow(
                Error(`ERROR: Battle class, "deleteBattle" method: impossible to delete a Battle that doesn't exist`)
            )
        })
    })

    describe(`doesPvEBattleExist`, () => {
        
        it(`Should:
            1. return true when it does
            2. return false when does not
        `, () => {
            
            const dummyPlayer = new Player("Dummy Player: doesBattleExist()")
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)
            
            //1
            Battle.battlesList.push(battleInstance)
            expect(Battle.doesBattleExist(dummyPlayer.getName())).toBe(true)

            //2
            Battle.battlesList = []
            expect(Battle.doesBattleExist(dummyPlayer.getName())).toBe(false)
        })
    })

    describe(`returnStringWithAllBattles`, () => {
        
        it(`Should:
            1. return a string when there is a battle happening
        `, () => {
                
            const dummyPlayer = new Player("Dummy Player: returnStringWithAllBattles()")
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)
            let message = ''

            //1
            Battle.battlesList.push(battleInstance)
            message = Battle.returnStringWithAllBattles()
            expect(message).toBe(`Jogadores em batalha nesse momento: | ${dummyPlayer.getName()}: 1/0 HP vs ${dummyEnemie.getName()}: 1/0 HP |`)

            //2
            Battle.battlesList = []
            message = Battle.returnStringWithAllBattles()
            expect(message).toBe("Jogadores em batalha nesse momento: | Nenhum |")
        })
    })
}

function instanceMethods() {

    describe(`isBothAlive`, () => {

        it(`Should:
            1. return true when both player and enemie is alive
            2. Should return false when player is dead
            3. Should return false when enemie is dead
        `, () => {
            
            const dummyPlayer = new Player("Dummy Player: isBothAlive()")
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)

            //1
            dummyPlayer.isAlive = true
            dummyEnemie.isAlive = true
            expect(battleInstance.isBothAlive()).toBe(true)

            //2
            dummyPlayer.isAlive = false
            dummyEnemie.isAlive = true
            expect(battleInstance.isBothAlive()).toBe(false)

            //3
            dummyPlayer.isAlive = true
            dummyEnemie.isAlive = false
            expect(battleInstance.isBothAlive()).toBe(false)
        })
    })

    describe(`fleePvE`, () => {

        /**@type {CS_Stats} */
        const givenStats = {
            hp:             1,
            evasion:        0,
            fisicalDamage:  0,
            fisicalDefense: 0,
            magicalDamage:  0,
            magicalDefense: 0
        }

        it(`Should:
            1. return true when flee action succed,
            2. return false when flee action failed,
        `, () => {
            
            const dummyPlayer = new Player("Dummy Guy")
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)
            const buffedStats = deepCopy(givenStats)
            const nerfedStats = deepCopy(givenStats)
            buffedStats.evasion = 1000 // this make sure to aways won on evasion event
            nerfedStats.evasion = 0 // this make sure to aways lose on evasion event

            //1
            dummyPlayer.totalStats = buffedStats
            dummyEnemie.totalStats = nerfedStats
            expect(battleInstance.fleePvE()).toBe(true)

            //2
            dummyPlayer.totalStats = nerfedStats
            dummyEnemie.totalStats = buffedStats
            expect(battleInstance.fleePvE()).toBe(false)
        })
    })

    describe(`calculateRawDamage`, () => {

        /**@type {CS_Stats} */
        const givenStats = {
            hp:             1,
            evasion:        0,
            fisicalDamage:  0,
            fisicalDefense: 0,
            magicalDamage:  0,
            magicalDefense: 0
        }
        
        const buffedAttack = deepCopy(givenStats)
        const nerfedAttack = deepCopy(givenStats)
        const buffedDefense = deepCopy(givenStats)
        const nerfedDefense = deepCopy(givenStats)
        buffedAttack.fisicalDamage = 100
        buffedDefense.fisicalDefense = 100
        nerfedAttack.fisicalDamage = 50
        nerfedDefense.fisicalDefense = 50

        it(`Should:
            1. return the damage calculated
            1. return 1 when fisical defense is higher than fisical damage
        `,() => {
            
            const dummyPlayer = new Player("Dummy Player: calculateRawDamage()")
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)
            
            //1
            dummyPlayer.totalStats = buffedAttack
            dummyEnemie.totalStats = nerfedDefense
            expect(battleInstance.calculateRawDamage({
                attacker: battleInstance.playerInstance,
                defender: battleInstance.enemieInstance
            })).toBe(50)

            //2
            dummyPlayer.totalStats = nerfedAttack
            dummyEnemie.totalStats = buffedDefense
            buffedAttack.fisicalDamage = 1
            expect(battleInstance.calculateRawDamage({
                attacker: battleInstance.playerInstance,
                defender: battleInstance.enemieInstance
            })).toBe(1)
        })
    })

    describe(`giveLootHandler`, () => {

        /**@type {CS_ResourceData} */
        const givenResource = {
            name: "Dummy Resource",
            amount: 1,
            type: "Test",
            dropChance: 0.5
        }

        it(`Should:
            1. Give resource when the random number is lower than dropchance item,
            2. Give resource when the random number is equal dropchance item
            3. Not give resource when the random number is greater than dropchance item
        `, () => {
            
            const dummyPlayer = new Player("Dummy Player: giveLootHandler()")
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)

            //1
            dummyPlayer.inventoryResources = {}
            battleInstance.giveLootHandler(givenResource, 0)
            expect(dummyPlayer.inventoryResources[givenResource.name]).toStrictEqual({
                name: "Dummy Resource",
                amount: 1,
                type: "Test"
            })

            //2
            dummyPlayer.inventoryResources = {}
            battleInstance.giveLootHandler(givenResource, 0.5)
            expect(dummyPlayer.inventoryResources[givenResource.name]).toStrictEqual({
                name: "Dummy Resource",
                amount: 1,
                type: "Test"
            })

            //3
            dummyPlayer.inventoryResources = {}
            battleInstance.giveLootHandler(givenResource, 1)
            expect(dummyPlayer.inventoryResources[givenResource.name]).toBeUndefined()
        })
    })

    describe(`calculateRewards`, () => {
        
        it(`Should
            1. give resources and souls
        `, () => {
            
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const dummyPlayer = new Player("Dummy Player: calculateRewards()")
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)
            battleInstance.calculateRewards()    
            expect(dummyPlayer.souls).toBe(dummyEnemie.souls)
            expect(dummyPlayer.inventoryResources).toStrictEqual({
                "Dummy Resource": {
                    name: "Dummy Resource",
                    amount: 1,
                    type: "Test",
                }
            })
        })
    })

    describe(`evasionEvent`, ()=> {

        /**@type {CS_Stats} */
        const nerfedStats = {
            hp:             1,
            evasion:        0, //Makes sure evasion event aways fails
            fisicalDamage:  1,
            fisicalDefense: 1,
            magicalDamage:  1,
            magicalDefense: 1
        }
        /**@type {CS_Stats} */
        const buffedStats = {
            hp:             1,
            evasion:        1000, //Makes sure, evasion event ways succed
            fisicalDamage:  1,
            fisicalDefense: 1,
            magicalDamage:  1,
            magicalDefense: 1
        }

        it(`Should:
            1. return True When evasion event succed
            2.  return False if it fails
        `, () => {
            
            const dummyPlayer = new Player("Dummy Player: evasionEvent()")
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)

            //1
            dummyEnemie.totalStats = nerfedStats
            dummyPlayer.totalStats = buffedStats
            expect(battleInstance.evasionEvent({
                from: dummyPlayer,
                against: dummyEnemie,
                evasionWeight: 1
            })).toBe(true)

            //2
            dummyEnemie.totalStats = buffedStats
            dummyPlayer.totalStats = nerfedStats
            expect(battleInstance.evasionEvent({
                from: dummyPlayer,
                against: dummyEnemie,
                evasionWeight: 1
            })).toBe(false)
        })
    })

    describe(`getPlayerStatus`, () => {
        
        it(`Should:
            1. return a formated string containing Player battle infor
        `, () => {
            
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const dummyPlayer = new Player("Dummy Player: getPlayerStatus()")
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)
            dummyPlayer.calculateStats()
            expect(battleInstance.getPlayerStatus()
            ).toEqual(`${dummyPlayer.getName()}: ${dummyPlayer.currentHP}/${dummyPlayer.totalStats.hp} HP`)
        })
    })

    describe(`getEnemieStatus`, () => {

        it(`Should:
            1. return a formated string containing Enemie battle info
        `, () => {
            
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const dummyPlayer = new Player("Dummy Player: getEnemieStatus()")
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)
            dummyEnemie.calculateStats()
            expect(battleInstance.getEnemieStatus()
            ).toEqual(`${dummyEnemie.getName()}: ${dummyEnemie.currentHP}/${dummyEnemie.totalStats.hp} HP`) // Is higher like that because dummy equipments are too op!
        })
    })

    describe(`getBattleStatus`, () => {
        
        it(`Should:
            1. return a formated string containing battle info
        `, () => {
            
            const dummyEnemie = new Enemie(getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, mapAreas.TEST_AREA))
            const dummyPlayer = new Player("Dummy Player: getBattleStatus")
            const battleInstance = new Battle(dummyPlayer, dummyEnemie)

            dummyEnemie.calculateStats()
            dummyPlayer.calculateStats()
            
            const playerName = dummyPlayer.getName()
            const playerHP = dummyPlayer.currentHP
            const playerMaxHP = dummyPlayer.totalStats.hp

            const enemyName = dummyEnemie.getName()
            const enemyHP = dummyEnemie.currentHP
            const enemyMaxHP = dummyEnemie.totalStats.hp

            expect(battleInstance.getBattleStatus()
            ).toEqual(`| ${playerName}: ${playerHP}/${playerMaxHP} HP | ${enemyName}: ${enemyHP}/${enemyMaxHP} HP`) // Is higher like that because dummy equipments are too op!
        })
    })
}
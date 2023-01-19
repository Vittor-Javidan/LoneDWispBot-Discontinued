import { describe, expect, it } from "vitest"
import { enemieEntries, getEnemie } from "../../database/enemiesData"
import CS_ENUM from "../../Global/ENUM"
import Enemie from "./Enemie"
import Player from "./Player"

/**
 * @typedef {import("../../TypeDefinitions/Types").CS_EntityData} CS_EntityData
*/

const mapAreas = CS_ENUM.MAP_AREAS
const statsWeight = CS_ENUM.BALANCE_VALUES.STATS_WEIGHT

describe(`Enemie class`, () => {

    describe(`constructor`,             () => constructor())
    describe(`initialize`,              () => initialize())
    describe(`getPossibleEnemies`,      () => getPossibleEnemies())
    describe(`instantiateRandomEnemie`, () => instantiateRandomEnemie())
})

function constructor() {

    const enemieData = getEnemie("Javali", mapAreas.THE_WOODS)
        
    it(`Should:
        1. instantiate with default values
    `, () => {
        
        const enemieInstance = new Enemie(enemieData)

        expect(enemieInstance.getlevel()).toEqual(enemieData.level)
        expect(enemieInstance.getSouls()).toEqual(enemieData.souls)
        expect(enemieInstance.getAttributes()).toStrictEqual(enemieData.attributes)
        expect(enemieInstance.getCurrentEquipment()).toStrictEqual(enemieData.equipment)
        expect(enemieInstance.getInventory()).toStrictEqual(enemieData.inventory)
    })
}

function initialize() {

    const enemieData = getEnemie("Javali", mapAreas.THE_WOODS)

    it(`Should: 
        1. initialize the enemie
    `, () => {

        /*
            No complex thinking here. Init is just a handle.

            static init(enemieData){
                const enemie = new Enemie(enemieData)   // constructor was just tested above
                enemie.calculateStats()                 // tested on Entity.spec.js
                enemie.recoverHP()                      // tested on Entity.spec.js
                return enemie
            }
        */

        const enemieInstance = Enemie.initialize(enemieData)
        expect(enemieInstance instanceof Enemie).toEqual(true)
    })
}

function getPossibleEnemies() {

    const theWoodsEnemiesEntries = enemieEntries.theWoods
    const unexpectedEnemie_L10 = theWoodsEnemiesEntries.LOBO

    const expectedEnemies_L5 = [
        theWoodsEnemiesEntries.JAVALI,
        theWoodsEnemiesEntries.BANDIDO
    ]
    
    it(`Should:
        1. get enemies by given level
    `, () => {
        
        const dummyPlayer = new Player("Dummy Player: getPossibleEnemies()")
        dummyPlayer.currentLocation = mapAreas.THE_WOODS
        dummyPlayer.setlevel(5)
        
        const enemiesDataArray_L5 = Enemie.getPossibleEnemies(dummyPlayer)
        const enemiesNamesArray = []
        for(let i = 0; i < enemiesDataArray_L5.length; i++){
            enemiesNamesArray.push(enemiesDataArray_L5[i].name)
        }

        expect(enemiesNamesArray.includes(expectedEnemies_L5[0])).toBe(true)
        expect(enemiesNamesArray.includes(expectedEnemies_L5[1])).toBe(true)
        expect(enemiesNamesArray.includes(unexpectedEnemie_L10)).toBe(false)
    })
}

function instantiateRandomEnemie() {

    it(`Should:
        1. retrieve a enemie instance
        2. retrieve just enemies from player current map area
        3. retrive a enemie with all stats calculated
    `, () => {

        const dummyPlayer = new Player("Dummy Player: instantiateRandomEnemie()")
        
        //1
        dummyPlayer.currentLocation = mapAreas.THE_WOODS
        dummyPlayer.setlevel(10)
        const randomEnemieInstance = Enemie.instantiateRandomEnemie(dummyPlayer)
        expect(randomEnemieInstance).toBeInstanceOf(Enemie)

        //2
        const theWoodsEnemiesNamesArray = Object.values(enemieEntries.theWoods )
        expect(theWoodsEnemiesNamesArray.includes(randomEnemieInstance.getName())).toBe(true)

        //3
        const enemieData = getEnemie(enemieEntries.testArea.DUMMY_ENEMIE, CS_ENUM.MAP_AREAS.TEST_AREA)
        const expectedTotalStats = {
            hp:             (statsWeight.HP          * enemieData.attributes.vitality    ) + statsWeight.HP          * 100 * 6,
            evasion:        (statsWeight.EVASION     * enemieData.attributes.agility     ) + statsWeight.EVASION     * 100 * 6,
            fisicalDamage:  (statsWeight.FISICAL_DMG * enemieData.attributes.strenght    ) + statsWeight.FISICAL_DMG * 100 * 2, 
            fisicalDefense: (statsWeight.FISICAL_DEF * enemieData.attributes.strenght    ) + statsWeight.FISICAL_DEF * 100 * 4,
            magicalDamage:  (statsWeight.MAGICAL_DMG * enemieData.attributes.intelligence) + statsWeight.MAGICAL_DMG * 100 * 2,
            magicalDefense: (statsWeight.MAGICAL_DEF * enemieData.attributes.intelligence) + statsWeight.MAGICAL_DEF * 100 * 4
        }

        dummyPlayer.currentLocation = mapAreas.TEST_AREA
        dummyPlayer.setlevel(1)
        const randomEnemieInstance_2 = Enemie.instantiateRandomEnemie(dummyPlayer)
        expect(randomEnemieInstance_2.getTotalStats()).toStrictEqual(expectedTotalStats)
        expect(randomEnemieInstance_2.getCurrentHP()).toBe(expectedTotalStats.hp)
    })
}


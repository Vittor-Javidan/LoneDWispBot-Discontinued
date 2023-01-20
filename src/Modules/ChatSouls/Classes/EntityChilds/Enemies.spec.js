import { describe, expect, it } from "vitest"
import { ENEMIES_CATALOG } from "../../database/enemies/ENEMIES_CATALOG"
import { get_DUMMY_ENEMIE } from "../../database/enemies/TEST_AREA/TEST_AREA_ENEMIES"
import { GAME_BALANCE } from "../../Globals/GAME_BALANCE"
import { MAP_AREAS } from "../../Globals/MAP_AREAS"
import Enemie from "./Enemie"
import Player from "./Player"

/** See `Types.js` to understand the types
 * @typedef {import("../../TypeDefinitions/Types").CS_EntityData} CS_EntityData
*/

const statsWeight = GAME_BALANCE.STATS_WEIGHT

describe(`Enemie class`, () => {

    describe(`constructor`,             () => constructor())
    describe(`initialize`,              () => initialize())
    describe(`getPossibleEnemies`,      () => getPossibleEnemies())
    describe(`instantiateRandomEnemie`, () => instantiateRandomEnemie())
})

function constructor() {

    it(`Should instantiate with enemie data
    `, () => {
        
        //Instantiation
        const enemieData = get_DUMMY_ENEMIE()
        const enemieInstance = new Enemie(enemieData)

        //Tests
        expect(enemieInstance.getlevel()).toEqual(enemieData.level)
        expect(enemieInstance.getSouls()).toEqual(enemieData.souls)
        expect(enemieInstance.getAttributes()).toStrictEqual(enemieData.attributes)
        expect(enemieInstance.getCurrentEquipment()).toStrictEqual(enemieData.equipment)
        expect(enemieInstance.getInventory()).toStrictEqual(enemieData.inventory)
    })
}

function initialize() {

    
    it(`Should initialize the enemie`, () => {

        /* Enemies must:
            1 - Have all stats calculated
            2 - Have current HP fully recovered
            3 - Be alive 
        */
        
        //Instatiation
        const enemieData = get_DUMMY_ENEMIE()
        const expectedTotalStats = {
            //    Stats     //                         Base Stats                          //      Stats From Equipments       
            hp:             (statsWeight.HP          * enemieData.attributes.vitality    ) + (statsWeight.HP          * 100 * 6),
            evasion:        (statsWeight.EVASION     * enemieData.attributes.agility     ) + (statsWeight.EVASION     * 100 * 6),
            fisicalDamage:  (statsWeight.FISICAL_DMG * enemieData.attributes.strenght    ) + (statsWeight.FISICAL_DMG * 100 * 2), 
            fisicalDefense: (statsWeight.FISICAL_DEF * enemieData.attributes.strenght    ) + (statsWeight.FISICAL_DEF * 100 * 4),
            magicalDamage:  (statsWeight.MAGICAL_DMG * enemieData.attributes.intelligence) + (statsWeight.MAGICAL_DMG * 100 * 2),
            magicalDefense: (statsWeight.MAGICAL_DEF * enemieData.attributes.intelligence) + (statsWeight.MAGICAL_DEF * 100 * 4)
        }
        
        //Run
        const enemieInstance = Enemie.initialize(enemieData)
        
        //Test
        expect(enemieInstance.getTotalStats()).toStrictEqual(expectedTotalStats) //1
        expect(enemieInstance.getCurrentHP()).toBe(expectedTotalStats.hp) //2
        expect(enemieInstance.getIsAlive()).toBe(true) //3
    })
}

function getPossibleEnemies() {

    const theWoodsEnemiesNames = ENEMIES_CATALOG.theWoods
    const unexpectedEnemie_L10 = theWoodsEnemiesNames.LOBO
    const expectedEnemies_L5 = [
        theWoodsEnemiesNames.JAVALI,
        theWoodsEnemiesNames.BANDIDO
    ]
    
    it(`Should get possible enemies for the current player level`, () => {
        
        //Instantiation
        const dummyPlayer = new Player("Dummy Player: getPossibleEnemies()")

        //Setup
        dummyPlayer.setCurrentLocation(MAP_AREAS.THE_WOODS)
        dummyPlayer.setlevel(5)

        //Run
        const enemiesDataArray_L5 = Enemie.getPossibleEnemies(dummyPlayer)
        const enemiesNamesArray = enemiesDataArray_L5.map((entityData) => entityData.name)

        //Test
        expect(enemiesNamesArray.includes(expectedEnemies_L5[0])).toBe(true)
        expect(enemiesNamesArray.includes(expectedEnemies_L5[1])).toBe(true)
        expect(enemiesNamesArray.includes(unexpectedEnemie_L10)).toBe(false)
    })
}

function instantiateRandomEnemie() {

    it(`Should retrieve a enemie instance from player current map area `, () => {

        /* Returned enemie must:
            1 - Be from player current map
        */

        //Instantiation
        const name = "Dummy Player: instantiateRandomEnemie()"
        const dummyPlayer = new Player(name)
        const enemiesNamesArray = Object.values(ENEMIES_CATALOG.testArea)
        
        //Setup
        dummyPlayer.setCurrentLocation(MAP_AREAS.TEST_AREA)
        dummyPlayer.setlevel(1)
        
        //Run
        const randomEnemie = Enemie.instantiateRandomEnemie(dummyPlayer)
        
        //Test
        expect(enemiesNamesArray.includes(randomEnemie.getName())).toBe(true) //1
    })
}


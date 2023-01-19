import { describe, expect, it } from "vitest";
import Battle from "../../Classes/Battle";
import Enemie from "../../Classes/EntityChilds/Enemie";
import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Globals/PLAYER_STATES";
import UI_Battle from "./UI_Battle";

/**
 * @typedef {import("../../TypeDefinitions/Types").CS_Stats} CS_Stats
*/

describe(`UI_Battle`, () => {

    /* Pre-requisites
        - Player must be instantiated already
        - Enemie must be instantiated already
        - Battle must be instantiated already
    */

    describe(`flee option`, () => fleeOption())
    describe(`attack option`, () => attackOption())
})

function fleeOption() {

    describe(`The context where player is trying to flee from a battle`, () => {

        /* POSSIBLE CENARIOS
            - Player Could flee
            - flee fails, but player survive
            - flee fails, but player died 
        */
       
        /**@type {CS_Stats} */
        const buffedStats = {
            hp: 1000,
            evasion: 100,
            fisicalDamage: 100,
            fisicalDefense: 0,
            magicalDamage: 0,
            magicalDefense: 0
        }

        /**@type {CS_Stats} */
        const nerfedStats = {
            hp: 1000,
            evasion: 0, //Make sure dodge became impossible
            fisicalDamage: 0,
            fisicalDefense: 0,
            magicalDamage: 0,
            magicalDefense: 0
        }

        it(`Should:
            1. flee the battle
        `, () => {

            /* Details expected:
                - When you flee the battle, the battle must end,
                and the player must be send to IDLE state.
            */

            //Instantiation
            const name = `UI_Battle: Should flee the battle`
            const player = Player.startGame(name)
            const enemie = Enemie.instantiateRandomEnemie(player)
            Battle.startBattle(player, enemie)

            //Setup
            player.setTotalStats(buffedStats)
            enemie.setTotalStats(nerfedStats)

            //Run
            UI_Battle({
                playerInstance: player,
                message: "0"
            },{
                dodgeWeight: 1,
                fleeWeight: 1
            })

            //Test
            expect(player.getIsAlive()).toBe(true)
            expect(player.primaryState).toBe(PLAYER_STATES.EXPLORING.PRIMARY)
            expect(player.secondaryState).toBe(PLAYER_STATES.EXPLORING.SECONDARY.IDLE)
            expect(Battle.battlesList.length).toBe(0)
            
            //Sanitizers
            Player.logoutPlayerInstance(player)
            Player.deletePlayer(name, true)
            Player.forceSaveDataBase()
        })

        it(`Should:
            1. Flee and survival the battle.
            2. Enemy Perform an attack attemp with it
        `, () => {

            /* Details expected:
                - When a player fails the flee, an attack attemp must be done.
                buffed attack has 100 fisical damage. That means the player 
                current HP must be less than what was setted.
            */

            //Instantiation
            const name = `UI_Battle: Should flee and survival the battle`
            const player = Player.startGame(name)
            const enemie = Enemie.instantiateRandomEnemie(player)
            Battle.startBattle(player, enemie)

            //Setup
            player.setTotalStats(nerfedStats)
            enemie.setTotalStats(buffedStats)
            player.setCurrentHP(1000)

            //Run
            UI_Battle({
                playerInstance: player,
                message: "0"
            },{
                dodgeWeight: 1,
                fleeWeight: 1
            })

            //1
            expect(player.getIsAlive()).toBe(true)
            
            //2
            expect(player.getCurrentHP()).toBeLessThan(1000)
            expect(Battle.battlesList.length).toBe(1)

            //Sanitizers
            Battle.deleteBattle(name)
            Player.logoutPlayerInstance(player)
            Player.deletePlayer(name, true)
            Player.forceSaveDataBase()
        })

        it(`Should:
            1. Flee and died during the battle.
        `, () => {

            /* Details expected:
                - When a player died on battle, he is send to firepit
                and is revived and recovered during the process.
                So, it's to expect the is alive after the "Run" phase.

                - When a player died, he must lose all the current souls
            */

            //Instantiation
            const name = `UI_Battle: Should flee and survival the battle`
            const player = Player.startGame(name)
            const enemie = Enemie.instantiateRandomEnemie(player)
            Battle.startBattle(player, enemie)

            //Setup
            player.setTotalStats(nerfedStats)
            enemie.setTotalStats(buffedStats)
            player.setCurrentHP(1)
            player.setSouls(100)

            //Run
            UI_Battle({
                playerInstance: player,
                message: "0"
            },{
                dodgeWeight: 1,
                fleeWeight: 1
            })

            //Test 1
            expect(player.getIsAlive()).toBe(true)
            expect(player.getSouls()).toBe(0)
            expect(player.primaryState).toBe(PLAYER_STATES.FIRE_PIT.PRIMARY)
            expect(player.secondaryState).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT)
            expect(Battle.battlesList.length).toBe(0)

            //Sanitizers
            Player.logoutPlayerInstance(player)
            Player.deletePlayer(name, true)
            Player.forceSaveDataBase()
        })
    })
}

function attackOption() {

    describe(`The context where a player is trying to attack an enemy`, () => {

        /* POSSIBLE CENARIOS
            - Player advantage
                - Player attack and kill the enemie
                - Player attack and hurt the enemie
                - Both attack miss
                - Player miss, and get hurt
                - Player miss, and get kill right after

            - Enemie advantage
                - Enemie is the same as Player Advantage
        */

        describe(`Player Advantage`, () => playerAdvantageContext())
    })
}

function playerAdvantageContext() {

    /* Pre-requisites
        - battleInstance turn must be set to 1
    */

    /**@type {CS_Stats} */
    const buffedStats = {
        hp: 1000,
        evasion: 100,
        fisicalDamage: 100,
        fisicalDefense: 0,
        magicalDamage: 0,
        magicalDefense: 0
    }

    /**@type {CS_Stats} */
    const nerfedStats = {
        hp: 1000,
        evasion: 0, //Make sure dodge became impossible
        fisicalDamage: 0,
        fisicalDefense: 0,
        magicalDamage: 0,
        magicalDefense: 0
    }

    it(`Player attack and kill the enemie`, () => {

        /* Details:
            - Player must be alive
            - Player must receive souls from the dead enemie
            - Battle must finish
            - Enemie must be dead
        */
        
        //Instantiation
        const name = `UI_Battle: Player attack and kill the enemie`
        const player = Player.startGame(name)
        const enemie = Enemie.instantiateRandomEnemie(player)
        const battleInstance = Battle.startBattle(player, enemie)

        //Setup
        battleInstance.turn = 1
        player.setTotalStats(buffedStats)
        enemie.setTotalStats(nerfedStats)
        enemie.setCurrentHP(1)
        player.setSouls(0)

        //Run
        UI_Battle({
            playerInstance: player,
            message: "1" 
        }, {
            dodgeWeight: 1,
        })

        //Test
        expect(player.getIsAlive()).toBe(true)
        expect(enemie.getIsAlive()).toBe(false)
        expect(player.getSouls()).greaterThan(0)
        expect(Battle.battlesList.length).toBe(0)

        //Sanitazing
        Player.logoutPlayerInstance(player)
        Player.deletePlayer(name, true)
        Player.forceSaveDataBase()
    })

    it(`Player attack and just hurt the enemie`, () => {

        /* Details:
            - Player must be alive
            - Player must earn no souls
            - Enemie must be alive
            - Enemie must get hurt
            - Battle must be happening
        */
        
        //Instantiation
        const name = `UI_Battle: Player attack and just hurt the enemie`
        const player = Player.startGame(name)
        const enemie = Enemie.instantiateRandomEnemie(player)
        const battleInstance = Battle.startBattle(player, enemie)

        //Setup
        battleInstance.turn = 1
        player.setTotalStats(buffedStats)
        enemie.setTotalStats(nerfedStats)
        enemie.setCurrentHP(9999)
        player.setSouls(0)

        //Run
        UI_Battle({
            playerInstance: player,
            message: "1" 
        }, {
            dodgeWeight: 1,
        })

        //Test
        expect(player.getIsAlive()).toBe(true)
        expect(player.getSouls()).toBe(0)
        expect(enemie.getIsAlive()).toBe(true)
        expect(enemie.getCurrentHP()).toBeLessThan(9999)
        expect(Battle.battlesList.length).toBe(1)

        //Sanitazing
        Battle.deleteBattle(name)
        Player.logoutPlayerInstance(player)
        Player.deletePlayer(name, true)
        Player.forceSaveDataBase()
    })

    it(`Both attack miss`, () => {

        /* Details:
            - Player must be alive
            - Player must earn no souls
            - Enemie must be alive
            - Enemie must be receive no damage
            - Enemie must receive an attack attempt against the player
            - Battle must be happening
        */
        
        //Instantiation
        const name = `UI_Battle: Both attack miss`
        const player = Player.startGame(name)
        const enemie = Enemie.instantiateRandomEnemie(player)
        const battleInstance = Battle.startBattle(player, enemie)

        //Setup
        battleInstance.turn = 1
        player.setTotalStats(buffedStats)
        enemie.setTotalStats(buffedStats)
        enemie.setCurrentHP(9999)
        player.setCurrentHP(9999)
        player.setSouls(0)

        //Run
        UI_Battle({
            playerInstance: player,
            message: "1" 
        }, {
            /*
                2 mean 100% evasion chance if both has the same evasion amount.
                Consult evasionEvent() method on Battle class to check the calculation.
            */
            dodgeWeight: 2, 
        })

        //Test
        expect(player.getIsAlive()).toBe(true)
        expect(player.getSouls()).toBe(0)
        expect(enemie.getIsAlive()).toBe(true)
        expect(enemie.getCurrentHP()).toBe(9999)
        expect(player.getCurrentHP()).toBe(9999)
        expect(Battle.battlesList.length).toBe(1)

        //Sanitazing
        Battle.deleteBattle(name)
        Player.logoutPlayerInstance(player)
        Player.deletePlayer(name, true)
        Player.forceSaveDataBase()
    })

    it(`Player miss, and get hurt`, () => {

        /* Details:
            - Player must be alive
            - Player must earn no souls
            - Enemie must be alive
            - Enemie must be receive no damage
            - Enemie must receive an attack attempt against the player
            - Battle must be happening
        */
        
        //Instantiation
        const name = `UI_Battle: Player miss, and get hurt`
        const player = Player.startGame(name)
        const enemie = Enemie.instantiateRandomEnemie(player)
        const battleInstance = Battle.startBattle(player, enemie)

        //Setup
        battleInstance.turn = 1
        player.setTotalStats(nerfedStats)
        enemie.setTotalStats(buffedStats)
        enemie.setCurrentHP(9999)
        player.setCurrentHP(9999)
        player.setSouls(0)

        //Run
        UI_Battle({
            playerInstance: player,
            message: "1" 
        }, {
            dodgeWeight: 1,
        })

        //Test
        expect(player.getIsAlive()).toBe(true)
        expect(player.getSouls()).toBe(0)
        expect(enemie.getIsAlive()).toBe(true)
        expect(enemie.getCurrentHP()).toBe(9999)
        expect(player.getCurrentHP()).toBeLessThan(9999)
        expect(Battle.battlesList.length).toBe(1)

        //Sanitazing
        Battle.deleteBattle(name)
        Player.logoutPlayerInstance(player)
        Player.deletePlayer(name, true)
        Player.forceSaveDataBase()
    })

    it(`Player miss, and get kill right after`, () => {

        /* Details:
            - Player after die
                - Must have primary state set to FIRE_PIT
                - Must have secondary state set to RESTING_ON_FIRE_PIT
                - Player must lose all souls
                - PLayer must recover current hp
                - Player must be alive after change state
            - Enemie must be alive
            - Enemie must be receive no damage
            - Battle must end
        */
        
        //Instantiation
        const name = `UI_Battle: Player miss, and get kill right after`
        const player = Player.startGame(name)
        const enemie = Enemie.instantiateRandomEnemie(player)
        const battleInstance = Battle.startBattle(player, enemie)

        //Setup
        battleInstance.turn = 1
        player.setTotalStats(nerfedStats)
        enemie.setTotalStats(buffedStats)
        enemie.setCurrentHP(9999)
        player.setCurrentHP(1)
        player.setSouls(1000)

        //Run
        UI_Battle({
            playerInstance: player,
            message: "1" 
        }, {
            dodgeWeight: 1,
        })

        //Test
        expect(player.getSouls()).toBe(0)
        expect(player.getIsAlive()).toBe(true)
        expect(enemie.getIsAlive()).toBe(true)
        expect(enemie.getCurrentHP()).toBe(9999)
        expect(player.getCurrentHP()).toBe(1000) //hp from "nerfedStats"
        expect(player.primaryState).toBe(PLAYER_STATES.FIRE_PIT.PRIMARY)
        expect(player.secondaryState).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT)
        expect(Battle.battlesList.length).toBe(0)

        //Sanitazing
        Player.logoutPlayerInstance(player)
        Player.deletePlayer(name, true)
        Player.forceSaveDataBase()
    })
}
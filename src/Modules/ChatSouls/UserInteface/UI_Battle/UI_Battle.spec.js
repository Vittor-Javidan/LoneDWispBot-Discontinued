import { describe, expect, it } from "vitest";
import Battle from "../../Classes/Battle";
import Enemie from "../../Classes/EntityChilds/Enemie";
import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Classes/EntityChilds/PLAYER_STATES";
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
            expect(Battle.battlesList.length).toBe(0)
            expect(player.getIsAlive()).toBe(true)
            expect(player.primaryState).toBe(PLAYER_STATES.EXPLORING.PRIMARY)
            expect(player.secondaryState).toBe(PLAYER_STATES.EXPLORING.SECONDARY.IDLE)

            //Sanitizers
            Player.logoutPlayerInstance(player)
            delete Player.database[name]
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

            //Test 1
            expect(Battle.battlesList.length).toBe(1)
            expect(player.getIsAlive()).toBe(true)

            //Test 2
            expect(player.getCurrentHP()).toBeLessThan(1000)

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
            player.setCurrentHP(100)
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
            expect(Battle.battlesList.length).toBe(0)
            expect(player.getIsAlive()).toBe(true)
            expect(player.getSouls()).toBe(0)
            expect(player.primaryState).toBe(PLAYER_STATES.FIRE_PIT.PRIMARY)
            expect(player.secondaryState).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT)

            //Sanitizers
            Player.logoutPlayerInstance(player)
            Player.deletePlayer(name, true)
            Player.forceSaveDataBase()
        })
    })
}
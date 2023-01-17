import { describe, expect, it } from "vitest";
import Battle from "../../Classes/Battle";
import Player from "../../Classes/EntityChilds/Player";
import UI_Battle from "./UI_Battle";

/**
 * @typedef {import("../../TypeDefinitions/Types").CS_Stats} CS_Stats
*/

describe(`UI_Battle`, () => {

    /* Pre-requisites
        - Player must be instantiated already
        - Battle must be instantiated already
            - that means an enemie is instantiate together 
            //TODO: Transfer the enemie instantiation to Enemie Class, and add enemie as an argument to start the battle
    */

    /**@type {CS_Stats} */
    const buffedStats = {
        hp: 1000,
        evasion: 100,
        fisicalDamage: 0,
        fisicalDefense: 0,
        magicalDamage: 0,
        magicalDefense: 0
    }

    /**@type {CS_Stats} */
    const nerfedStats = {
        hp: 1000,
        evasion: 0,
        fisicalDamage: 0,
        fisicalDefense: 0,
        magicalDamage: 0,
        magicalDefense: 0
    }

    it(`Should flee the battle`, () => {

        //Instantiation
        const name = `UI_Battle: Should flee the battle`
        Player.startGame(name)
        const player = Player.getPlayerInstanceByName(name)
        Battle.startBattle(player)
        const battle = Battle.getBattle(name)
        const enemie = battle.enemieInstance

        //Setup
        player.totalStats = buffedStats
        enemie.totalStats = nerfedStats

        //Run
        UI_Battle({
            playerInstance: player,
            message: "0"
        })

        //Test
        expect(Battle.battlesList.length).toBe(0)
        expect(player.isAlive).toBe(true)

        //Sanitizers
        Player.logoutPlayerInstance(player)
        delete Player.database[name]
        Player.forceSaveDataBase()
    })
})
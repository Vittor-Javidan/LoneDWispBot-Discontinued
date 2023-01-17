import { describe, expect, it } from "vitest";
import Battle from "../../Classes/Battle";
import Enemie from "../../Classes/EntityChilds/Enemie";
import Player from "../../Classes/EntityChilds/Player";
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
        })

        //Test
        expect(Battle.battlesList.length).toBe(0)
        expect(player.getIsAlive()).toBe(true)

        //Sanitizers
        Player.logoutPlayerInstance(player)
        delete Player.database[name]
        Player.forceSaveDataBase()
    })
})
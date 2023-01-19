import { describe, expect, it } from "vitest"
import Player from "../../Classes/EntityChilds/Player"
import PLAYER_STATES from "../../Global/PLAYER_STATES"
import to_StatisticsMenu from "./to_StatisticsMenu"

describe(`to_StatsMenu`, () => {

    it(`Should:
        1. Set secondary state to STATS_MENU
    `, () => {
        
        const dummyPlayer = new Player(`Dummy Player: to_StatsMenu`)
        dummyPlayer.secondaryState = `Fake secondary state`

        to_StatisticsMenu(dummyPlayer ,"menu message")
        expect(dummyPlayer.secondaryState).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.STATS_MENU)
    })
})
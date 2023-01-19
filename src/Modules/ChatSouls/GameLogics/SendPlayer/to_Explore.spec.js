import { describe, expect, it } from "vitest"
import Player from "../../Classes/EntityChilds/Player"
import PLAYER_STATES from "../../Globals/PLAYER_STATES"
import to_Explore from "./to_Explore"

describe(`to_Explore`, () => {

    it(`Should:
        1. Set Player primary state to EXPLORING
        2. Set Player secondary state to IDLE
    `, () => {

        const dummyPlayer = new Player(`Dummy player: to_Explore`)
        dummyPlayer.currentState = {
            primary: `Fake Primary State`,
            secondary: `Fake Secondary State`
        }
        to_Explore(dummyPlayer, "Menu Message")

        //1
        expect(dummyPlayer.primaryState).toBe(PLAYER_STATES.EXPLORING.PRIMARY)

        //2
        expect(dummyPlayer.secondaryState).toBe(PLAYER_STATES.EXPLORING.SECONDARY.IDLE)
    })
})
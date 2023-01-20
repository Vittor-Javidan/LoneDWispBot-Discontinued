import { describe, expect, it } from "vitest"
import Player from "../../Classes/EntityChilds/Player"
import PLAYER_STATES from "../../Globals/PLAYER_STATES"
import to_Explore from "./to_Explore"

describe(`to_Explore`, () => {

    it(`Should:
        1. Set Player primary state to EXPLORING
        2. Set Player secondary state to IDLE
    `, () => {

        //Instantiation
        const dummyPlayer = new Player(`Dummy player: to_Explore`)
        
        //Setup
        dummyPlayer.setCurrentState({
            primary: `Fake Primary State`,
            secondary: `Fake Secondary State`
        })

        //Run
        to_Explore(dummyPlayer, "Menu Message")

        //Tests
        expect(dummyPlayer.getPrimaryState()).toBe(PLAYER_STATES.EXPLORING.PRIMARY) //1        
        expect(dummyPlayer.getSecondaryState()).toBe(PLAYER_STATES.EXPLORING.SECONDARY.IDLE) //2
    })
})
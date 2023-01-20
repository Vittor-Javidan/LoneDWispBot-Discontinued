import { describe, expect, it } from "vitest"
import Player from "../../Classes/EntityChilds/Player"
import PLAYER_STATES from "../../Globals/PLAYER_STATES"
import to_FirePit from "./to_FirePit"

describe(`to_FirePit`, () => {

    it(`Should:
        1. Set Player primary state to FIRE_PIT,
        2. Set Player secondary state to RESTING_ON_FIRE_PIT
    `, () => {

        //Instantiation
        const dummyPlayer = new Player(`Dummy Player: to_FirePit`)
        
        //Setup
        dummyPlayer.setCurrentState({
            primary: `Fake Primary State`,
            secondary: `Fake Secondary State`
        })
        
        //Run
        to_FirePit(dummyPlayer, `Menu Message`)

        //Tests
        expect(dummyPlayer.getPrimaryState()).toBe(PLAYER_STATES.FIRE_PIT.PRIMARY) //1
        expect(dummyPlayer.getSecondaryState()).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT) //2
    })
})
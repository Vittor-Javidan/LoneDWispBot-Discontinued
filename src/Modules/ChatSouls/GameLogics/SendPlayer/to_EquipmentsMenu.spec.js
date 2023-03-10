import { describe, expect, it } from "vitest"
import Player from "../../Classes/EntityChilds/Player"
import PLAYER_STATES from "../../Classes/EntityChilds/PLAYER_STATES"
import to_EquipmentsMenu from "./to_EquipmentsMenu"

describe(`to_EquipmentsMenu`, () => {

    it(`Should:
        1. Set Player secondary state to EQUIPMENT
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: to_EquipmentsMenu`)
        dummyPlayer.secondaryState = `Fake Secondary State`
        to_EquipmentsMenu(dummyPlayer, "Menu Message")
        expect(dummyPlayer.secondaryState).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.EQUIPMENT)
    })
})

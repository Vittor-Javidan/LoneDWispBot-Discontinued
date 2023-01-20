import { describe, expect, it } from "vitest"
import Player from "../../Classes/EntityChilds/Player"
import PLAYER_STATES from "../../Globals/PLAYER_STATES"
import to_AttributeUpgradeMenu from "./to_AttributeUpgradeMenu"

describe(`to_AttributeUpgradeMenu`, () => {

    it(`Should:
        1. Set Player secondary state to ATRIBUTE_UPGRADE
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: to_AttributeUpgradeMenu`)
        dummyPlayer.setSecondaryState(`Fake Secondary State`)
        to_AttributeUpgradeMenu(dummyPlayer, `Menu Message`)
        expect(dummyPlayer.getSecondaryState()).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.ATRIBUTE_UPGRADE)
    })
})

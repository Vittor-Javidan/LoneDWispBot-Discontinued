import { describe, expect, it } from "vitest"
import Player from "../Classes/EntityChilds/Player"
import upgradeAttributeByType from "./upgradeAttributeByType"

describe(`upgradeAttributeByType`, () => {

    it(`Throws Error:
        1. When attribute type is not recognized
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: upgradeAttributeByType`)
        dummyPlayer.setSouls(99999) // To Pass souls balance checking
        dummyPlayer.setlevel(1)

        expect(() => upgradeAttributeByType({
            playerInstance: dummyPlayer,
            attributePicked: `Wrong Type`,
            menuMessage: `Menu Message`
        })).toThrow(
            Error(`ERROR: upgradeAttributeByType(): Attribute type not recognized`)
        )  
    })
})
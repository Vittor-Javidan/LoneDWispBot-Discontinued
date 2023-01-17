import { describe, expect, it } from "vitest"
import Player from "../Classes/EntityChilds/Player"
import doHaveEnoughSoulsBalance from "./doHaveEnoughSoulsBalance"

describe(`doHaveEnoughSoulsBalance`, () => {

    it(`Should:
        1. Return False when balance is negative
        2. Return True when balance is positive or zero
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: doHaveEnoughSoulsBalance()`)

        //1
        dummyPlayer.setSouls(0)
        dummyPlayer.setlevel(1)
        expect(doHaveEnoughSoulsBalance(dummyPlayer)).toBe(false)

        //2
        dummyPlayer.setSouls(9999)
        dummyPlayer.setlevel(1)
        expect(doHaveEnoughSoulsBalance(dummyPlayer)).toBe(true)
    })
})
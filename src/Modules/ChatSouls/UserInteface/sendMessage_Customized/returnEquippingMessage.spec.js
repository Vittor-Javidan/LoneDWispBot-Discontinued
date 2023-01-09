import { describe, expect, it } from "vitest";
import Player from "../../Classes/EntityChilds/Player";
import returnEquippingMessage from "./returnEquippingMessage";

describe(`returnEquippingMessageByType`, () => {

    it(`Should:
        1. Return a formatted message
    `, () => {

        const dummyMelee = new Player(`Dummy Player: returnMenuMessageByType`)
        const message = returnEquippingMessage(dummyMelee)
        expect(message).toBe(`Você equipou ${dummyMelee.name}`)
    })
})
import { describe, expect, it } from "vitest";
import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Globals/PLAYER_STATES";
import {
    to_BodyArmorMenu, to_BootsMenu, to_GlovesMenu, to_HelmetMenu, to_LongRangeMenu, to_MeleeMenu
} from "./to_EquipmentTypeMenu";

describe(`to_MeleeMenu`, () => {

    it(`Should:
        1. Set Player secondary state to MELEE_MENU
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: to_MeleeMenu`)
        dummyPlayer.setSecondaryState(`Fake State`) 
        to_MeleeMenu(dummyPlayer, `Menu Message`)
        expect(dummyPlayer.getSecondaryState()).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.MELEE_MENU)
    })
})

describe(`to_LongRangeMenu`, () => {

    it(`Should:
        1. Set Player secondary state to LONG_RANGE_MENU
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: to_LongRangeMenu`)
        dummyPlayer.setSecondaryState(`Fake State`)
        to_LongRangeMenu(dummyPlayer, `Menu Message`)
        expect(dummyPlayer.getSecondaryState()).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.LONG_RANGE_MENU)
    })
})

describe(`to_HelmetMenu`, () => {

    it(`Should:
        1. Set Player secondary state to HELMET_MENU
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: to_HelmetMenu`)
        dummyPlayer.setSecondaryState(`Fake State`) 
        to_HelmetMenu(dummyPlayer, `Menu Message`)
        expect(dummyPlayer.getSecondaryState()).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.HELMET_MENU)
    })
})

describe(`to_BodyArmorMenu`, () => {

    it(`Should:
        1. Set Player secondary state to BODY_ARMOR_MENU
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: to_BodyArmorMenu`)
        dummyPlayer.setSecondaryState(`Fake State`)
        to_BodyArmorMenu(dummyPlayer, `Menu Message`)
        expect(dummyPlayer.getSecondaryState()).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.BODY_ARMOR_MENU)
    })
})

describe(`to_GlovesMenu`, () => {

    it(`Should:
        1. Set Player secondary state to GLOVES_MENU
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: to_GlovesMenu`)
        dummyPlayer.setSecondaryState(`Fake State`)
        to_GlovesMenu(dummyPlayer, `Menu Message`)
        expect(dummyPlayer.getSecondaryState()).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.GLOVES_MENU)
    })
})

describe(`to_BootsMenu`, () => {

    it(`Should:
        1. Set Player secondary state to BOOTS_MENU
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: to_BootsMenu`)
        dummyPlayer.setSecondaryState(`Fake State`)
        to_BootsMenu(dummyPlayer, `Menu Message`)
        expect(dummyPlayer.getSecondaryState()).toBe(PLAYER_STATES.FIRE_PIT.SECONDARY.BOOTS_MENU)
    })
})
import { describe, expect, it } from "vitest";
import EQUIPMENT_TYPES from "../EquipmentChilds/EQUIPMENT_TYPES";
import Player from "./Player";
import PLAYER_STATES, { getEquipmentTypeByPlayerState, returnEquipmentMenuInventoryStateByType, returnEquipmentMenuStateByType } from "./PLAYER_STATES";

describe(`returnEquipmentMenuStateByType`, () => {

    it(`Should:
        1. Return the correct string state
    `, () => {

        expect(returnEquipmentMenuStateByType(EQUIPMENT_TYPES.MELEE_WEAPON)).toBe(
            `${EQUIPMENT_TYPES.MELEE_WEAPON} menu`
        )
    })
})

describe(`returnEquipmentMenuInventoryStateByType`, () => {

    it(`Should:
        1. Return the correct string state
    `, () => {

        expect(returnEquipmentMenuInventoryStateByType(EQUIPMENT_TYPES.MELEE_WEAPON)).toBe(
            `${EQUIPMENT_TYPES.MELEE_WEAPON} inventory`
        )
    })
})

describe(`getEquipmentTypeByPlayerState`, () => {

    it(`Should return a string with the equipment type:
        1. When player is on the type specific equipment menu
        2. When the player is on the type specific inventory menu
    `, () => {
        const dummyPlayer = new Player(`Dummy Player: getEquipmentTypeByPlayerState`)
        let equipmentType = undefined

        //1
        dummyPlayer.secondaryState = PLAYER_STATES.FIRE_PIT.SECONDARY.BOOTS_MENU
        equipmentType = getEquipmentTypeByPlayerState(dummyPlayer)
        expect(equipmentType).toBe(EQUIPMENT_TYPES.BOOTS)

        //2
        dummyPlayer.secondaryState = PLAYER_STATES.FIRE_PIT.SECONDARY.BOOTS_INVENTORY
        equipmentType = getEquipmentTypeByPlayerState(dummyPlayer)
        expect(equipmentType).toBe(EQUIPMENT_TYPES.BOOTS)
    })

    it(`Throws Error:
        1. When the string retrived by user state is not a valid equipment type
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: getEquipmentTypeByPlayerState`)
        dummyPlayer.secondaryState = `Invalid State`
        expect(() => getEquipmentTypeByPlayerState(dummyPlayer)).toThrow(
            Error(`ERROR: getEquipmentTypeByPlayerState: equipment type is not recognized`)
        )
    })
})
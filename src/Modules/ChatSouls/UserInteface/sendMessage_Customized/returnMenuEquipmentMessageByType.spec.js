import { describe, expect, it } from "vitest";
import { equipmentEntries, getEquipment } from "../../database/equipmentData";
import EQUIPMENT_TYPES from "../../Global/EQUIPMENT_TYPES";
import returnMenuEquipmentMessageByType from "./returnMenuEquipmentMessageByType";

describe(`returnMenuMessageByType`, () => {

    it(`Should:
        1. Return a formatted message
    `, () => {

        const message = returnMenuEquipmentMessageByType(EQUIPMENT_TYPES.MELEE_WEAPON)
        expect(message).toBe(`Você voltou ao menu de armas corpo a corpo`)
    })

    it(`Throws Error:
        2. When equipmentType is not recognized
    `, () => {

        const dummyMelee = getEquipment(equipmentEntries.WEAPONS.MELEE.DUMMY_EQUIPMENT, EQUIPMENT_TYPES.MELEE_WEAPON)

        //2
        expect(() => returnMenuEquipmentMessageByType(`Wrong Type`, dummyMelee)).toThrow(
            Error(`ERROR: returnMenuMessageByType(): equipmentType not recognized`)
        )
    })
})
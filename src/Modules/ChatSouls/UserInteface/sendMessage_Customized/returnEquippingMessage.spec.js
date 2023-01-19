import { describe, expect, it } from "vitest";
import { equipmentEntries, getEquipment } from "../../database/equipmentData";
import EQUIPMENT_TYPES from "../../Global/EQUIPMENT_TYPES";
import returnEquippingMessage from "./returnEquippingMessage";

describe(`returnEquippingMessageByType`, () => {

    it(`Should:
        1. Return a formatted message
    `, () => {

        //Instantiation
        const equipmentName = equipmentEntries.WEAPONS.MELEE.DUMMY_EQUIPMENT
        const dummyMelee = getEquipment(equipmentName, EQUIPMENT_TYPES.MELEE_WEAPON)

        //Run
        const message = returnEquippingMessage(dummyMelee)

        //Test
        expect(message).toBe(`Você equipou ${dummyMelee.name}`)
    })
})
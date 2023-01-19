import { describe, expect, it } from "vitest"
import EQUIPMENT_TYPES from "../Globals/EQUIPMENT_TYPES"
import { choseMessageByEquipmentType } from "./unequip"

describe(`choseMessageByEquipmentType`, () => {
    
    it(`Should:
        1. Return an object with 2 string.
    `, () => {

        expect(choseMessageByEquipmentType(EQUIPMENT_TYPES.BOOTS).noEquipment).toBeTypeOf("string")
        expect(choseMessageByEquipmentType(EQUIPMENT_TYPES.BOOTS).withEquipment).toBeTypeOf("string")
    })

    it(`Throws Error:
        1. When type is not recognized
    `, () => {

        expect(() => choseMessageByEquipmentType(`Wrong Type`).withEquipment).toThrow(
            Error(`ERROR: choseMessageByEquipmentType(): equipment type not recognized`)
        )
    })
})
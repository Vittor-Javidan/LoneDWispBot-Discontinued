import { describe, expect, it } from "vitest"
import EQUIPMENT_TYPES from "../../Classes/EquipmentChilds/EQUIPMENT_TYPES"
import { equipmentEntries } from "../../database/equipmentData"
import returnEquipmentDetailByType from "./returnEquipmentDetailByType"

describe(`returnEquipmentDetailByType`, () => {

    const boots = { name: equipmentEntries.ARMORS.BOOTS.DUMMY_EQUIPMENT }

    it(`Should:
        1. Return a string
    `, () => {

        expect(
            returnEquipmentDetailByType(boots, EQUIPMENT_TYPES.BOOTS)
        ).toBeTypeOf("string")
    })

    it(`Throws Error:
        1. When equipment type is not recognized
    `, () => {

        expect(
            () => returnEquipmentDetailByType(boots, `Wrong Type`)
        ).toThrow(
            Error(`ERROR: returnEquipmentDetailByType(): equipmentType not recognized`)
        )
    })
})
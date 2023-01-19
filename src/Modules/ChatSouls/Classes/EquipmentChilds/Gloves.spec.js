import { describe, expect, it } from "vitest"
import { equipmentEntries, getEquipment } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "../../Global/EQUIPMENT_TYPES"
import Gloves from "./Gloves"

const dummyGloves = equipmentEntries.ARMORS.GLOVES.DUMMY_EQUIPMENT

describe(`Gloves Class`, () => [

    describe(`constructor`, () => {

        const armorData = getEquipment(dummyGloves, EQUIPMENT_TYPES.GLOVES)
        
        it(`Should:
            1. set default properties
        `, () => {

            const armorInstance = new Gloves(armorData)
            expect(armorInstance.name).toEqual(armorData.name)
            expect(armorInstance.multipliers).toStrictEqual(armorData.defense_multipliers)
            expect(armorInstance.description).toBeTypeOf("string")
        })
        
        it(`Throws Error:
            1 when objec has no name defined
        `, () => {

            const fakeArmorData = {}
            expect(() => new Gloves(fakeArmorData)).toThrowError()
        })
    })
])
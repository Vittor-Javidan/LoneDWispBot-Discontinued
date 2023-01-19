import { describe, expect, it } from "vitest"
import { equipmentEntries, getEquipment } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES"
import Boots from "./Boots"

const dummyBoots = equipmentEntries.ARMORS.BOOTS.DUMMY_EQUIPMENT

describe(`Boots Class`, () => [

    describe(`constructor`, () => {

        const armorData = getEquipment(dummyBoots, EQUIPMENT_TYPES.BOOTS)
        
        it(`Should:
            1. set default properties
        `, () => {

            const armorInstance = new Boots(armorData)

            expect(armorInstance.name).toEqual(armorData.name)
            expect(armorInstance.multipliers).toStrictEqual(armorData.defense_multipliers)
            expect(armorInstance.description).toBeTypeOf("string")
        })

        it(`Throws Error:
            1. when objec has no name defined
        `, () => {

            const fakeArmorData = {}
            expect(() => new Boots(fakeArmorData)).toThrowError()
        })
    })
])
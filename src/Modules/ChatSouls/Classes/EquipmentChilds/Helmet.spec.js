import { describe, expect, it } from "vitest"
import { equipmentEntries, getEquipment } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES"
import Helmet from "./Helmet"

const dummyArmor = equipmentEntries.ARMORS.HELMETS.DUMMY_EQUIPMENT

describe(`Helmet Class`, () => [

    describe(`constructor`, () => {

        const armorData = getEquipment(dummyArmor, EQUIPMENT_TYPES.HELMET)
        
        it(`Should:
            1. set default properties
        `, () => {

            const armorInstance = new Helmet(armorData)
            expect(armorInstance.name).toEqual(armorData.name)
            expect(armorInstance.multipliers).toStrictEqual(armorData.defense_multipliers)
            expect(armorInstance.description).toBeTypeOf("string")
        })

        it(`Throw Error:
            1. when objec has no name defined
        `, () => {

            const fakeArmorData = {}
            expect(() => new Helmet(fakeArmorData)).toThrowError()
        })
    })
])
import { describe, expect, it } from "vitest"
import { equipmentEntries, getEquipment } from "../../database/equipmentData"
import BodyArmor from "./BodyArmor"
import EQUIPMENT_TYPES from "./EQUIPMENT_TYPES"

const dummyArmor = equipmentEntries.ARMORS.BODY_ARMOR.DUMMY_EQUIPMENT

describe(`Body Armor Class`, () => {

    describe(`constructor`, () => {

        const armorData = getEquipment(dummyArmor, EQUIPMENT_TYPES.BODY_ARMOR)
        
        it(`Should:
            1. set default properties
        `, () => {

            const armorInstance = new BodyArmor(armorData)
            expect(armorInstance.name).toEqual(armorData.name)
            expect(armorInstance.multipliers).toStrictEqual(armorData.defense_multipliers)
            expect(armorInstance.description).toBeTypeOf("string")
        })

        it(`Throws Error:
            1. when objec has no name defined
        `, () => {

            const fakeArmorData = {}
            expect(() => new BodyArmor(fakeArmorData)).toThrowError()
            
        })
    })
})
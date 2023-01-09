import { describe, expect, it } from "vitest"
import { equipmentEntries, getEquipment } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "./EQUIPMENT_TYPES"
import LongRangeWeapon from "./LongRangeWeapon"

const armorEntries = equipmentEntries.WEAPONS.LONG_RANGE

describe(`Helmet Class`, () => [

    describe(`constructor`, () => {

        const weaponData = getEquipment(armorEntries.DUMMY_EQUIPMENT, EQUIPMENT_TYPES.LONG_RANGE_WEAPON)
        
        it(`Should:
            1. Set default properties
        `, () => {

            const weaponInstance = new LongRangeWeapon(weaponData)
            expect(weaponInstance.name).toEqual(weaponData.name)
            expect(weaponInstance.multipliers).toStrictEqual(weaponData.damage_multipliers)
            expect(weaponInstance.description).toBeTypeOf("string")
        })

        it(`Throws Error:
            1. when object has no name defined
        `, () => {

            const fakeWeaponData = {}
            expect(() => new LongRangeWeapon(fakeWeaponData)).toThrowError()
        })
    })
])
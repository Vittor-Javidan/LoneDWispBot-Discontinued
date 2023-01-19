import { describe, expect, it } from "vitest"
import { equipmentEntries, getEquipment } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES"
import MeleeWeapon from "./MeleeWeapon"

const armorEntries = equipmentEntries.WEAPONS.MELEE

describe(`Helmet Class`, () => [

    describe(`constructor`, () => {

        const weaponData = getEquipment(armorEntries.DUMMY_EQUIPMENT, EQUIPMENT_TYPES.MELEE_WEAPON)
        
        it(`Should:
            1. set default properties
        `, () => {

            const weaponInstance = new MeleeWeapon(weaponData)

            expect(weaponInstance.name).toEqual(weaponData.name)
            expect(weaponInstance.multipliers).toStrictEqual(weaponData.damage_multipliers)
            expect(weaponInstance.description).toBeTypeOf("string")
        })

        it(`Throws Error:
            1 when object has no name defined
        `, () => {

            const fakeWeaponData = {}
            expect(() => new MeleeWeapon(fakeWeaponData)).toThrowError()
        })
    })
])
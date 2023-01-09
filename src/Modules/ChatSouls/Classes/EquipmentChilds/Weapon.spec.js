import { describe, expect, it } from "vitest"
import { equipmentEntries, getEquipment } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "./EQUIPMENT_TYPES"
import Weapon from "./Weapon"

const meleeEntries = equipmentEntries.WEAPONS.MELEE 

describe(`Weapon class`, () => {

    describe(`constructor`, () => {

        const equipmentData = getEquipment(meleeEntries.DUMMY_EQUIPMENT, EQUIPMENT_TYPES.MELEE_WEAPON)

        it(`Should:
			1. set default properties
		`, () => {

            const equipmentInstance = new Weapon(true, equipmentData)
            expect(equipmentInstance.name).toEqual(equipmentData.name) 
        })

        it(`Throws Error: 
			1. if boolean is not given,
			2. if boolean is false
		`, () => {

			//1
			expect(() => new Weapon("dummy", equipmentData)).toThrowError()
			
			//2
			expect(() => new Weapon(false, equipmentData)).toThrowError()
		})
    })

    describe(`detailsString`, () => {

		const equipmentData = getEquipment(meleeEntries.DUMMY_EQUIPMENT, EQUIPMENT_TYPES.MELEE_WEAPON)
		
		it(`Should:
			1. return a string
		`, () => {
			
			const equipmentInstance = new Weapon(true, equipmentData)
			expect(equipmentInstance.detailsString()).toBeTypeOf("string")
		})
	})
})
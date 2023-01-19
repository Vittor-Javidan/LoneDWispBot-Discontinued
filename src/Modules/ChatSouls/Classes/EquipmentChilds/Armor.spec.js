import { describe, expect, it } from "vitest"
import { equipmentEntries, getEquipment } from "../../database/equipmentData"
import EQUIPMENT_TYPES from "../../Globals/EQUIPMENT_TYPES"
import Armor from "./Armor"

const dummyHelmet = equipmentEntries.ARMORS.HELMETS.DUMMY_EQUIPMENT

describe(`Armor class`, () => {

	describe(`constructor`, () => {

		const equipmentData = getEquipment(dummyHelmet, EQUIPMENT_TYPES.HELMET)
		
		it(`Should:
			1. set default properties
		`, () => {

			const equipmentInstance = new Armor(true, equipmentData)
			expect(equipmentInstance.name).toEqual(equipmentData.name)
		})

		it(`Throws Error: 
			1. if boolean is not given
			2. if boolean is false
		`, () => {

			//1
			expect(() => new Armor("dummy", equipmentData)).toThrowError()
			
			//2
			expect(() => new Armor(false, equipmentData)).toThrowError()
		})
	})

	describe(`detailsString`, () => {

		const equipmentData = getEquipment(dummyHelmet, EQUIPMENT_TYPES.HELMET)
		
		it(`Should:
			1. return a string
		`, () => {

			const equipmentInstance = new Armor(true, equipmentData)
			expect(equipmentInstance.detailsString()).toBeTypeOf("string")
		})
	})
}) 
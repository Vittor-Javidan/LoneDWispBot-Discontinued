import { describe, expect, it } from "vitest"
import { equipmentEntries, getEquipment } from "../database/equipmentData"
import EQUIPMENT_TYPES from "../Global/EQUIPMENT_TYPES"
import Equipment from "./Equipment"

const meleeEntries = equipmentEntries.WEAPONS.MELEE

describe(`Equipment class`, () => {

    describe(`Constructor`, () => {

        const equipmentData = getEquipment(meleeEntries.DUMMY_EQUIPMENT, EQUIPMENT_TYPES.MELEE_WEAPON)
        
        it(`Should:
            1. set default properties
        `, () => {

            const equipmentInstance = new Equipment(true, equipmentData)
            expect(equipmentInstance.name).toEqual("Dummy Equipment")
        })

        it(`Throws Error:
            1. if boolean is not given
            2. if boolean is false
        `, () => {

            //1
            expect(() => new Equipment("dummy", equipmentData)).toThrow(
                Error('Cannot instantiate "Equipment" class directly')
            )

            //2
            expect(() => new Equipment(false, equipmentData)).toThrow(
                Error('Cannot instantiate "Equipment" class directly')
            )
        })
    })
})
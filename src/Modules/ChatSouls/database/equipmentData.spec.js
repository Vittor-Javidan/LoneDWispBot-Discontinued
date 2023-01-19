import { describe, expect, it } from "vitest"
import EQUIPMENT_TYPES from "../Globals/EQUIPMENT_TYPES"
import { equipmentEntries, getAllEquipmentByType, getEquipment } from "./equipmentData"

const equipmentKeys = Object.values(EQUIPMENT_TYPES)

describe(`getEquipment`, () => {

    it(`Should:
        1. return a deepcopy equipment data with all properties defined
    `, () => {

        for(let i = 0; i < equipmentKeys.length; i++) {

            const equipmentData = getEquipment(equipmentEntries.WEAPONS.MELEE.DUMMY_EQUIPMENT, equipmentKeys[i])
            expect(equipmentData.name).toBeDefined()
            expect(equipmentData.damage_multipliers || equipmentData.defense_multipliers).toBeDefined()
            expect(equipmentData.description).toBeDefined()
        }
    })

    it(`Throws Error:
        1. Case type is not recognized
        2. Case equipment is not found
    `, () => {

        //1
        expect(() => getEquipment(equipmentEntries.WEAPONS.MELEE.DUMMY_EQUIPMENT, "Wrong Type")).toThrow(
            Error('ERROR: "getEquipment" function: Equipment type not found')
        )

        expect(() => getEquipment("Wrong Equipment", EQUIPMENT_TYPES.MELEE_WEAPON)).toThrow(
            Error('ERROR: "getEquipment" function: Equipment not found')
        )
    })
})

describe(`getAllEquipmentByType`, () => {

    it(`Should:
        1. Return a deepcopy of the equipment database type
    `, () => {

        const equipmentTypeDataBase = getAllEquipmentByType(EQUIPMENT_TYPES.MELEE_WEAPON)
        const equipmentName = Object.keys(equipmentTypeDataBase)[0]

        expect(equipmentTypeDataBase[equipmentName].name).toBeDefined()
        expect(equipmentTypeDataBase[equipmentName].damage_multipliers || equipmentTypeDataBase[equipmentName].defense_multipliers).toBeDefined()
        expect(equipmentTypeDataBase[equipmentName].description).toBeDefined()
    })

    it(`Throws Error:
        1. Case type is not recognized
    `, () => {

        expect(() => getAllEquipmentByType("Wrong type")).toThrow(
            Error('ERROR: "getEquipment" function: Equipment type not found')
        )
    })
})
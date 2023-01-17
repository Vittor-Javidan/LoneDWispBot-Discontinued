import { describe, expect, it } from "vitest"
import Player from "../Classes/EntityChilds/Player"
import { equipmentEntries } from "../database/equipmentData"
import { buildMessage } from "./checkCurrentEquipments"

/**@typedef {import("../TypeDefinitions/Types").CS_Entity_Equipment} CS_Entity_Equipment*/

describe(`buildMessage`, () => {

    /**@type {CS_Entity_Equipment} */
    const emptyEquipments = {
        longRangeWeapon:    {},
        meleeWeapon:        {},
        helmet:             {},
        bodyArmor:          {},
        gloves:             {},
        boots:              {}
    } 

    /**@type {CS_Entity_Equipment} */
    const equipments = {
        longRangeWeapon:    { name: equipmentEntries.WEAPONS.LONG_RANGE.DUMMY_EQUIPMENT },
        meleeWeapon:        { name: equipmentEntries.WEAPONS.MELEE.DUMMY_EQUIPMENT },
        helmet:             { name: equipmentEntries.ARMORS.HELMETS.DUMMY_EQUIPMENT },
        bodyArmor:          { name: equipmentEntries.ARMORS.BODY_ARMOR.DUMMY_EQUIPMENT },
        gloves:             { name: equipmentEntries.ARMORS.GLOVES.DUMMY_EQUIPMENT },
        boots:              { name: equipmentEntries.ARMORS.BOOTS.DUMMY_EQUIPMENT },
    } 

    it(`Should:
        1. Return a special string when no equipment is found,
        2. Return a string with all equipments equipped when there are some
    `, () => {

        const dummyPlayer = new Player(`Dummy Player: checkCurrentEquipments`)
        let returnedString = ''

        //1
        dummyPlayer.setCurrentEquipment(emptyEquipments)
        returnedString = buildMessage(dummyPlayer)
        expect(returnedString).toBe(`Você está completamente nu!! Shame on you`)

        //2
        dummyPlayer.setCurrentEquipment(equipments)
        returnedString = buildMessage(dummyPlayer)
        expect(returnedString).toBe(`Atualmente você está equipando: Dummy Equipment, Dummy Equipment, Dummy Equipment, Dummy Equipment, Dummy Equipment, Dummy Equipment`)
    })
})
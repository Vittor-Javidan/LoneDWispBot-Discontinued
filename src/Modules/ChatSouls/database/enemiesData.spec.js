import { describe, expect, it } from "vitest"
import CS_ENUM from "../Global/ENUM"
import { enemieEntries, getEnemie } from "./enemiesData"

const enemieName = enemieEntries.theWoods.JAVALI
const mapAreas = CS_ENUM.MAP_AREAS

describe(`getEnemie`, () => {

    it(`Should:
        1. Return a deepcopy enemie data with all properties defined
    `, () => {

        const enemieData = getEnemie(enemieName, mapAreas.THE_WOODS)
        expect(enemieData.level).toBeDefined()
        expect(enemieData.name).toBeDefined()
        expect(enemieData.souls).toBeDefined()
        expect(enemieData.attributes).toBeDefined()
        expect(enemieData.equipment).toBeDefined()
        expect(enemieData.inventory).toBeDefined()
    })

    it(`Throws Error:
        1. When map area doesn't exist,
        2. When enemie doesn't exist
    `, () => {

        //1
        expect(() => getEnemie(enemieName, "Wrong Map")).toThrow(
            Error(`ERROR: getEnemie function: Map Area doesn't exist`)
        )

        //2
        expect(() => getEnemie("Wrong Enemie", mapAreas.TEST_AREA)).toThrow(
            Error(`ERROR: getEnemie function: Enemie doesn't exist`)
        )
    })
})
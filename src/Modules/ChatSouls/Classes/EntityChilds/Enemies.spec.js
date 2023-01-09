import { describe, expect, it } from "vitest"
import { getEnemie } from "../../database/enemiesData"
import CS_ENUM from "../ENUM"
import Enemie from "./Enemie"

/**
 * @typedef {import("../../TypeDefinitions/Types").CS_EntityData} CS_EntityData
*/

const mapAreas = CS_ENUM.MAP_AREAS

describe(`Enemie class`, () => {

    describe(`constructor`, () => {

        const enemieData = getEnemie("Javali", mapAreas.THE_WOODS)
        
        it(`Should:
            1. instantiate with default values
        `, () => {
            
            const enemieInstance = new Enemie(enemieData)

            expect(enemieInstance.level).toEqual(enemieData.level)
            expect(enemieInstance.souls).toEqual(enemieData.souls)
            expect(enemieInstance.attributes).toStrictEqual(enemieData.attributes)
            expect(enemieInstance.currentEquipment).toStrictEqual(enemieData.equipment)
            expect(enemieInstance.inventory).toStrictEqual(enemieData.inventory)
        })
    })

    describe(`initialize`, () => {

        const enemieData = getEnemie("Javali", mapAreas.THE_WOODS)

        it(`Should: 
            1. initialize the enemie
        `, () => {

            /*
                No complex thinking here. Init is just a handle.

                static init(enemieData){
                    const enemie = new Enemie(enemieData)   // constructor was just tested above
                    enemie.calculateStats()                 // tested on Entity.spec.js
                    enemie.recoverHP()                      // tested on Entity.spec.js
                    return enemie
                }
            */

            const enemieInstance = Enemie.initialize(enemieData)
            expect(enemieInstance instanceof Enemie).toEqual(true)
        })
    })
})


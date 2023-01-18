import { describe, expect, it } from "vitest"
import DbSystem, { playerDataBasePath } from "./DbSystem"

describe(`Db System Class`, () => {

    describe(`loadDb`, () => {

        it(`Should:
            1. load data base
        `, () => {
            
            const dataBaseInfo = DbSystem.loadDb(playerDataBasePath).Authorization
            expect(dataBaseInfo.Description).toEqual("if this section does't exist, the data can't be save. This is a safety measure in case of wrong data being sent.")
        })
        
    })

    describe(`writeDb`, () => {

        const randomNumber = Math.abs(Math.floor(Math.random() * 100))

        it(`Should:
            1. save normaly, when data has the safet key
        `, () => {
            
            const dataBaseInfo = DbSystem.loadDb(playerDataBasePath)
            dataBaseInfo.Authorization.dinamicKey = randomNumber  
            DbSystem.writeDb(dataBaseInfo, playerDataBasePath)
            expect(DbSystem.loadDb(playerDataBasePath).Authorization.dinamicKey).toEqual(randomNumber)
        })

        it(`Throws Error:
            1. when object doens't have safety key
        `, () => {
            
            expect(() => DbSystem.writeDb({}, playerDataBasePath)).toThrow(
                Error(`ERROR: Player class, "database" setter. You probably sending wrong data to data base.`)
            )
            expect(() => DbSystem.writeDb({
                "random key 1": "random value",
                "random key 2": "random value",
                "random key 3": "random value",
                "random key 4": "random value",
                0: "random value",
                1: "random value",
                2: "random value"
            }, playerDataBasePath)).toThrow(
                Error(`ERROR: Player class, "database" setter. You probably sending wrong data to data base.`)
            )
        })
    })
})
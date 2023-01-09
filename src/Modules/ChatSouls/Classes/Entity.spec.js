import { describe, expect, it } from "vitest"
import deepCopy from "../../../Utils/deepCopy"
import Entity from "./Entity"
import CS_ENUM from "./ENUM"
import EQUIPMENT_TYPES from "./EquipmentChilds/EQUIPMENT_TYPES"

/**
 * @typedef {import("../TypeDefinitions/Types").CS_Stats} CS_Stats
 * @typedef {import("../TypeDefinitions/Types").CS_Inventory_Equipments} CS_Inventory_Equipments
 * @typedef {import("../TypeDefinitions/Types").CS_Entity_Inventory} CS_Entity_Inventory
 * @typedef {import("../TypeDefinitions/Types").CS_Entity_Equipment} CS_Entity_Equipment
 * @typedef {import("../TypeDefinitions/Types").CS_Attributes} CS_Attributes
 * @typedef {import("../TypeDefinitions/Types").CS_Inventory_Resources} CS_Inventory_Resources
 * @typedef {import("../TypeDefinitions/Types").CS_Equipment_WeaponData} CS_Equipment_WeaponData
 * @typedef {import("../TypeDefinitions/Types").CS_Equipment_ArmorData} CS_Equipment_ArmorData
*/

describe('Entity class', () => {
    
    describe('Entity Instantiation',                () => instantiation())
    describe('Entity setters',                      () => settersAndGetters())
    describe('Equipment and Inventory equipment',   () => equipmentAndInventoryEquipment())
    describe('Inventory Resources',                 () => inventoryResources())
    describe('HP and Damage related methods',       () => lifeAndDamage())
    describe('Utility methods Methods',             () => utilMethods())
    describe('Stats Calculation',                   () => statsCalculation())
})

function instantiation() {

    describe(`Instance Default Properties`, () => {
        
        it(`Should:
            1. Sets properties correctly
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: Instance Default Properties")
            expect(dummyEntity.currentEquipment).toBeTypeOf("object")
            expect(dummyEntity.statsFromEquips).toBeTypeOf("object")
            expect(dummyEntity.totalStats).toBeTypeOf("object")
            expect(dummyEntity.attributes).toBeTypeOf("object")
            expect(dummyEntity.inventory).toBeTypeOf("object")
            expect(dummyEntity.baseStats).toBeTypeOf("object")
            expect(dummyEntity.isAlive).toBeTypeOf("boolean")
            expect(dummyEntity.level).toBeTypeOf("number")
            expect(dummyEntity.isAlive).toBe(true)
            expect(dummyEntity.level).toBe(1)
            expect(dummyEntity.attributes).toStrictEqual(Default.attributes)
            expect(dummyEntity.currentEquipment).toStrictEqual(Default.equipments)
            expect(dummyEntity.inventory).toStrictEqual(Default.inventoryEquipments)
            expect(dummyEntity.totalStats).toStrictEqual(deepCopy(Default.stats))
            expect(dummyEntity.baseStats).toStrictEqual(deepCopy(Default.stats))
            expect(dummyEntity.statsFromEquips).toStrictEqual(deepCopy(Default.stats))
        })
    })

    describe(`constructor`, () => {

        it(`Should:
            1. Sets name properties correctly
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: constructor()")
            expect(dummyEntity.name).toBeTypeOf("string")
            expect(dummyEntity.name).toBe("Dummy Entity: constructor()")
        })
        
        it(`Throws Error:
            1. When a boolean is not given
            2. when the boolean is false
        `, () => {
            
            //1
            expect(() => new Entity("dummy")).toThrow(Error('Cannot instantiate "Entity" class directly'))
            
            //2
            expect(() => new Entity(false, "dummy")).toThrow(Error('Cannot instantiate "Entity" class directly'))
        })
    })

}

function settersAndGetters() {

    describe('Name', () => {

        it('Can set', () => {

            const dummyEntity = new Entity(true, "Dummy Entity: name setter/getter")
            dummyEntity.name = "noob"
            expect(dummyEntity.name).toBeTypeOf("string")
            expect(dummyEntity.name).toBe("noob")
        })

        it(`Throws Error: 
            1. when wrong type
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: name setter/getter")
            expect(() => dummyEntity.name = false).toThrow(Error('ERROR: Entity class, name must be a string'))
            expect(() => dummyEntity.name = 10).toThrow(Error('ERROR: Entity class, name must be a string'))
            expect(() => dummyEntity.name = {}).toThrow(Error('ERROR: Entity class, name must be a string'))
        })
    })
    
    describe('isAlive', () => {

        it('Can set', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: isAlive setter/getter")
            dummyEntity.isAlive = false
            expect(dummyEntity.isAlive).toBeTypeOf("boolean")
            expect(dummyEntity.isAlive).toBe(false)
        })

        it(`Throws Error: 
            1. when wrong type
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: isAlive setter/getter")
            expect(() => dummyEntity.isAlive = 'wrong type').toThrow(Error('ERROR: Entity class, isAlive must be a boolean'))
            expect(() => dummyEntity.isAlive = {}).toThrow(Error('ERROR: Entity class, isAlive must be a boolean'))
            expect(() => dummyEntity.isAlive = 0).toThrow(Error('ERROR: Entity class, isAlive must be a boolean'))
        })
    })

    describe('currentHP', () => {

        it('Can set', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: currentHP setter/getter")
            dummyEntity.currentHP = 143
            expect(dummyEntity.currentHP).toBeTypeOf("number")
            expect(dummyEntity.currentHP).toBe(143)
        })

        it(`Throws Error: 
            1. when wrong type
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: currentHP setter/getter")
            expect(() => dummyEntity.currentHP = 'wrong type').toThrow(Error('ERROR: Entity class, currentHP must be a number'))
            expect(() => dummyEntity.currentHP = false).toThrow(Error('ERROR: Entity class, currentHP must be a number'))
            expect(() => dummyEntity.currentHP = NaN).toThrow(Error('ERROR: Entity class, currentHP must be a number'))
            expect(() => dummyEntity.currentHP = {}).toThrow(Error('ERROR: Entity class, currentHP must be a number'))
        })
    })

    describe('souls', () => {

        it('Can set', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: souls setter/getter")
            dummyEntity.souls = 1000
            expect(dummyEntity.souls).toBeTypeOf("number")
            expect(dummyEntity.souls).toBe(1000)
        })

        it(`Throws error:
            1. when wrong type,
            2. when set negative
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: souls setter/getter")

            //1
            expect(() => dummyEntity.souls = 'wrong type').toThrow(Error('ERROR: Entity class, souls must be a number'))
            expect(() => dummyEntity.souls = false).toThrow(Error('ERROR: Entity class, souls must be a number'))
            expect(() => dummyEntity.souls = NaN).toThrow(Error('ERROR: Entity class, souls must be a number'))
            expect(() => dummyEntity.souls = {}).toThrow(Error('ERROR: Entity class, souls must be a number'))

            //2
            expect(() => dummyEntity.souls = -1000).toThrow(Error('Error: Entity class, souls cannot be negative'))
        })
    })

    describe('level', () => {

        it('Can set', () => {

            const dummyEntity = new Entity(true, "Dummy Entity: level setter/getter")
            dummyEntity.level = 64
            expect(dummyEntity.level).toBeTypeOf("number")
            expect(dummyEntity.level).toBe(64)
        })

        it(`Throws error:
            1. when wrong type,
            2. when set negative
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: level setter/getter")

            //1
            expect(() => dummyEntity.level = 'wrong type').toThrow(Error('ERROR: Entity class, level must be a number'))
            expect(() => dummyEntity.level = false).toThrow(Error('ERROR: Entity class, level must be a number'))
            expect(() => dummyEntity.level = NaN).toThrow(Error('ERROR: Entity class, level must be a number'))
            expect(() => dummyEntity.level = {}).toThrow(Error('ERROR: Entity class, level must be a number'))

            //2
            expect(() => dummyEntity.level = -10).toThrow(Error('Error: Entity class, level cannot be negative'))
        })
    })

    describe('attributes', () => {

        it('Can set', () => {

            const dummyEntity = new Entity(true, "Dummy Entity: attributes setter/getter")
            dummyEntity.attributes = Dummy.attributes
            expect(dummyEntity.attributes).toStrictEqual(Dummy.attributes)
        })

        it(`Throws error:
            1. when wrong type,
            2. when any attribute is undefined
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: Attributes setter/getter")

            //1
            expect(() => dummyEntity.attributes = 'wrong type').toThrow(Error(`ERROR: Entity class, attribute must be an object`))
            expect(() => dummyEntity.attributes = false).toThrow(Error(`ERROR: Entity class, attribute must be an object`))
            expect(() => dummyEntity.attributes = 0).toThrow(Error(`ERROR: Entity class, attribute must be an object`))

            //2
            expect(() => { 
                for(let i = 0; i < Utils.attributeTypesKeys.length; i++){
                    dummyEntity.attributes = { [Utils.attributeTypesKeys[i]]: 10 }
                }
            }).toThrow(Error(`ERROR: Entity class, all attributes must be defined`))
        })
    })

    describe('currentEquipment', () => {

        it('Can set', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: currentEquipment setter/getter")
            dummyEntity.currentEquipment = Dummy.equipments
            expect(dummyEntity.currentEquipment).toStrictEqual(deepCopy(Dummy.equipments))
        })

        it(`Throws error: 
            1. when wrong type,
            2. when detects a wrong equipment type
            3. when equipment type is undefined,
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: currentEquipment setter/getter")

            //1
            expect(() => dummyEntity.currentEquipment = 'wrong type').toThrow(Error('ERROR: Entity class, "currentEquipment": argument must be an object'))    
            expect(() => dummyEntity.currentEquipment = false).toThrow(Error('ERROR: Entity class, "currentEquipment": argument must be an object'))
            expect(() => dummyEntity.currentEquipment = 0).toThrow(Error('ERROR: Entity class, "currentEquipment": argument must be an object'))

            //2
            expect(() => dummyEntity.currentEquipment = Dummy.wrongEquipment).toThrow(
                Error(`ERROR: Entity class, "currentEquipment" setter: Equipment type must be valid`)
            )

            //3
            expect(() => { for(let i = 0; i < Utils.equipTypeskeys.length; i++){               
                dummyEntity.currentEquipment = { [Utils.equipTypeskeys[i]]: 10 }
            }}).toThrow(Error(`ERROR: Entity class, "currentEquipment": All properties must be defined`))

        })
    })

    describe('Inventory', () => {

        it('Can be set normaly', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: inventory setter/getter")
            dummyEntity.inventory = Dummy.inventory
            expect(dummyEntity.inventory).toStrictEqual(deepCopy(Dummy.inventory))
        })

        it(`throws error: 
            1. when wrong type,
            2. when inventory properties are undefined,
            3. when detects a wrong inventory equipment type
            4. when equipments properties are undefined,
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: inventory setter/getter")
            
            //1
            expect(() => dummyEntity.inventory = 'wrong type').toThrow(Error('ERROR: Entity class, "inventory" setter: inventory must be a object'))
            expect(() => dummyEntity.inventory = false).toThrow(Error('ERROR: Entity class, "inventory" setter: inventory must be a object'))
            expect(() => dummyEntity.inventory = 0).toThrow(Error('ERROR: Entity class, "inventory" setter: inventory must be a object'))

            //2
            expect(() => dummyEntity.inventory = {}).toThrow(
                Error('ERROR: Entity class, "inventory" setter: object property "resources" and "equipments" must be defined')
            )

            //3
            expect(() => dummyEntity.inventory = Dummy.wrongInventory).toThrow(
                Error(`ERROR: Entity class, "inventory" setter: inventory equipments type must be valid`)
            )
            
            //4
            expect(() => dummyEntity.inventory = {
                equipments: {},
                resources: {}
            }).toThrow(Error(`ERROR: Entity class, "inventory setter": all inventory equipments properties must be defined`))
        })
    })

    describe('inventoryEquipments', () => {
        
        it('Can be set normaly', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: inventoryEquipments setter/getter")
            dummyEntity.inventoryEquipments = Dummy.inventory.equipments
            expect(dummyEntity.inventoryEquipments).toStrictEqual(deepCopy(Dummy.inventory.equipments))
        })

        it(`Throws Error: 
            1. when wrong type
            2. when detects a wrong equipment type
            3. when equipment properties are undefined
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: inventoryEquipments setter/getter")
            
            //1
            expect(() => dummyEntity.inventoryEquipments = 'wrong type').toThrow(Error('ERROR: Entity class, "inventoryEquipments" setter: argument must be an object'))
            expect(() => dummyEntity.inventoryEquipments = false).toThrow(Error('ERROR: Entity class, "inventoryEquipments" setter: argument must be an object'))
            expect(() => dummyEntity.inventoryEquipments = 0).toThrow(Error('ERROR: Entity class, "inventoryEquipments" setter: argument must be an object'))

            //2
            expect(() => dummyEntity.inventoryEquipments = Dummy.wrongInventory).toThrow(
                Error(`ERROR: Entity class, "inventoryEquipments" setter: given type must be valid`)
            )
            
            //3
            expect(() => dummyEntity.inventoryEquipments = {}).toThrow(Error(`ERROR: Entity class, "inventoryEquipments" setter: all properties must be defined`))
        })
    })

    describe('inventoryResources', () => {

        it('Can be set normaly', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: inventoryResources setter/getter")
            dummyEntity.inventoryResources = Dummy.inventory.resources
            expect(dummyEntity.inventoryResources).toStrictEqual(deepCopy(Dummy.inventory.resources))
        })

        it(`Throws Error: 
            1. when wrong type
            2. when a resource dosen't have required properties defined
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: inventoryResources setter/getter")
            
            //1
            expect(() => dummyEntity.inventoryResources = 'wrong type').toThrow(Error('ERROR: Entity class, "inventoryResources" setter: argument must be an object'))
            expect(() => dummyEntity.inventoryResources = false).toThrow(Error('ERROR: Entity class, "inventoryResources" setter: argument must be an object'))
            expect(() => dummyEntity.inventoryResources = 0).toThrow(Error('ERROR: Entity class, "inventoryResources" setter: argument must be an object'))
            
            //2
            expect(() => dummyEntity.inventoryResources = { "Dummy resource 1": {} }).toThrow(
                Error('ERROR: Entity class, "inventoryResources" setter: all properties must be defined')
            )
        })
    })

    describe(`
        totalStats, 
        baseStats,
        statsFromEquips
    `, () => {
        
        it('Can be set normaly', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: stats (total/base/fromEquips) setter/getter")
            dummyEntity.totalStats = Dummy.stats
            dummyEntity.baseStats = Dummy.stats
            dummyEntity.statsFromEquips = Dummy.stats
            expect(dummyEntity.totalStats).toStrictEqual(Dummy.stats)
            expect(dummyEntity.baseStats).toStrictEqual(Dummy.stats)
            expect(dummyEntity.statsFromEquips).toStrictEqual(Dummy.stats)
        })

        it(`Throws Error: 
            1. when wrong type,
            2. when a stats are not defined
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: stats (total/base/fromEquips) setter/getter")
            
            //1
            expect(() => dummyEntity.totalStats         = 'wrong type').toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.statsFromEquips    = 'wrong type').toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.baseStats          = 'wrong type').toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.statsFromEquips    = false).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.totalStats         = false).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.baseStats          = false).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.statsFromEquips    = 0).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.totalStats         = 0).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.baseStats          = 0).toThrow(Error('ERROR: Entity class, stats must be objects'))

            //2
            expect(() => dummyEntity.statsFromEquips = {}).toThrow(Error(`ERROR: Entity class, stats obejcts must have all properties defined`))
            expect(() => dummyEntity.totalStats = {}).toThrow(Error(`ERROR: Entity class, stats obejcts must have all properties defined`))
            expect(() => dummyEntity.baseStats = {}).toThrow(Error(`ERROR: Entity class, stats obejcts must have all properties defined`))
        })
    })
}

function utilMethods(){
    
	describe('addSouls', () => {

        it(`Should:
            1. add souls
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: addSouls()")
            dummyEntity.souls = 0
            dummyEntity.addSouls(5000)
            expect(dummyEntity.souls).toBe(5000)
        })
	})

    describe('decreaseSouls', () => {
        
        it(`Should: 
            1. decrease souls
            2. set souls to 0 when balances become negative
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: decreaseSouls()")

            //1
            dummyEntity.souls = 5000
            dummyEntity.decreaseSouls(2000)
            expect(dummyEntity.souls).toBe(3000)

            //2
            dummyEntity.souls = 2000
            dummyEntity.decreaseSouls(5000)
            expect(dummyEntity.souls).toBe(0)
        })
	})

    describe('addLevel', () => {
        
        it(`Should:
            1. Add Level by 1
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: addLevel()")
            dummyEntity.level = 1
            dummyEntity.addLevel()
            expect(dummyEntity.level).toBe(2)
        })
	})

	describe('addAttributes', () => {

        it(`Should:
            1. add attribute by 1 for the specified type
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: addAttributes()")            
            dummyEntity.attributes = Dummy.attributes
            dummyEntity.addAttributes(Utils.attributeTypes.VITALITY)
            dummyEntity.addAttributes(Utils.attributeTypes.AGILITY)
            dummyEntity.addAttributes(Utils.attributeTypes.STRENGHT)
            dummyEntity.addAttributes(Utils.attributeTypes.INTELLLIGENCE)
            expect(dummyEntity.attributes).toStrictEqual({
                vitality:           11,
                agility:            11,
                intelligence:       11,
                strenght:           11
            })
        })
	})
}

function equipmentAndInventoryEquipment(){

    describe('sortInventoryEquipments', () => {

        it(`Should:
            1. sort the specified equipment alphabeticaly
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: sortInventoryEquipments()')
            dummyEntity.inventoryEquipments = Dummy.inventoryEquipmentsUnsorted
            dummyEntity.sortInventoryEquipments(EQUIPMENT_TYPES.MELEE_WEAPON)
            expect(dummyEntity.inventoryEquipments.meleeWeapon).toStrictEqual([
                { name: 'A dummy equipment' },
                { name: 'A dummy equipment' },
                { name: 'B dummy equipment' },
                { name: 'B dummy equipment' },
                { name: 'C dummy equipment' },
                { name: 'D dummy equipment' },
                { name: 'E dummy equipment' },
                { name: 'F dummy equipment' },
                { name: 'F dummy equipment' },
            ])
        })
    })

    describe(`isInventoryEquipmentsTypeEmpty`, () => {

        it(`Should: 
            1. return false if equipments inventory has something,
            2. return true if equipments inventory is empty
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: isInventoryEquipmentsTypeEmpty()')
            
            //1
            dummyEntity.inventoryEquipments = Dummy.inventory.equipments
            for(let i = 0; i < Utils.equipTypeskeys.length; i++) {
                expect(dummyEntity.isInventoryEquipmentsTypeEmpty(Utils.equipTypeskeys[i])).toBe(false)
            }

            //2
            dummyEntity.inventoryEquipments = Dummy.emptyInventoryEquipments
            for(let i = 0; i < Utils.equipTypeskeys.length; i++) {
                expect(dummyEntity.isInventoryEquipmentsTypeEmpty(Utils.equipTypeskeys[i])).toBe(true)
            }
        })

        it(`Throw Error: 
            1. if equipment type is not recognized
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: isInventoryEquipmentsTypeEmpty()')
            expect(() => dummyEntity.isInventoryEquipmentsTypeEmpty("Wrong Equipment type")).toThrow(
                Error(`ERROR: Entity class, "isInventoryEquipmentsTypeEmpty": Equipment type must be valid`)
            )
        })
    })

    describe(`getEquipmentInventoryAmount`, () => {

        it(`Should:
            1. Return the amount of gear inside equipmentsInventory correctly
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: getEquipmentInventoryAmount()")
            dummyEntity.inventoryEquipments = Dummy.inventory.equipments

            expect(dummyEntity.getEquipmentInventoryAmount(EQUIPMENT_TYPES.MELEE_WEAPON)).toBe(2)
        })

        it(`Throws Error:
            1. When equipment type is not recognized
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: getEquipmentInventoryAmount()")
            expect(() => dummyEntity.getEquipmentInventoryAmount("Wrong type")).toThrow(
                Error(`ERROR: Entity class, "getEquipmentInventoryAmount" method: equipment type not recognized`)
            )
        })
    })

    describe('equip', () => {

        it(`Should:
            1. Equip given item
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: equip()')

            for (let i = 0; i < Utils.equipTypeskeys.length; i++){
                dummyEntity.equip(Utils.equipTypeskeys[i], deepCopy(Dummy.equipmentObject))
            }
            
            expect(dummyEntity.currentEquipment).toStrictEqual(Dummy.equipments)
        })
    })

    describe('unequip', () => {

        it(`Should:
            1. unequip
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: unequip()')
            dummyEntity.currentEquipment = Dummy.equipments
            
            for (let i = 0; i < Utils.equipTypeskeys.length; i++){
                dummyEntity.unequip(Utils.equipTypeskeys[i])
            }
            
            expect(dummyEntity.inventoryEquipments).toStrictEqual(Dummy.inventoryEquipments)
            expect(dummyEntity.currentEquipment).toStrictEqual(Dummy.emptyEquipments)
        })
    })

    describe('equipFromInventory', () => {
                
        it(`Should:
            1. Equip from inventory When there is no current equipment,
            2. And When there is current equipment, swap current equipment with inventory equipment
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: equipFromInventory()')
            
            //1
            dummyEntity.inventoryEquipments = Dummy.inventoryEquipments
            for (let i = 0; i < Utils.equipTypeskeys.length; i++){
                dummyEntity.equipFromInventory(0, Utils.equipTypeskeys[i])
            }
            expect(dummyEntity.currentEquipment).toStrictEqual(deepCopy(Dummy.equipments))
            expect(dummyEntity.inventoryEquipments).toStrictEqual(Dummy.emptyInventoryEquipments)

            //2
            dummyEntity.currentEquipment = Dummy.equipments_2
            dummyEntity.inventoryEquipments = Dummy.inventoryEquipments
            for (let i = 0; i < Utils.equipTypeskeys.length; i++){
                dummyEntity.equipFromInventory(0, Utils.equipTypeskeys[i])
            }
            expect(dummyEntity.currentEquipment).toStrictEqual(deepCopy(Dummy.equipments))
            expect(dummyEntity.inventoryEquipments).toStrictEqual(deepCopy(Dummy.inventoryEquipments_2))
        })

        it(`Throws Error:
            1. when index is out of boundaries
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: equipFromInventory()')
            dummyEntity.inventoryEquipments = Dummy.emptyInventoryEquipments
            
            for (let i = 0; i < Utils.equipTypeskeys.length; i++){
                expect(() => dummyEntity.equipFromInventory(1, Utils.equipTypeskeys[i])).toThrow(
                    Error(`ERROR: Entity class, "equipFromInventory": itemIndex out of boundaries`)
                )
                expect(() => dummyEntity.equipFromInventory(-1, Utils.equipTypeskeys[i])).toThrow(
                    Error(`ERROR: Entity class, "equipFromInventory": itemIndex out of boundaries`)
                )
            }
        })
    })

    describe('getAllEquipmentInventoryString', ()=> {

        it(`Should:
            1. Return the string When there is equipment on inventory
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: getAllEquipmentInventoryString()')
            dummyEntity.inventoryEquipments = Dummy.inventory.equipments
            
            expect(dummyEntity.getAllEquipmentInventoryString(EQUIPMENT_TYPES.LONG_RANGE_WEAPON)
            ).toBe(`| 1. dummy equip 1 | 2. dummy equip 2 `)
        })

        it(`Throws Error: 
            1. if inventory type is empty
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: getAllEquipmentInventoryString()')
            dummyEntity.inventoryEquipments = Dummy.emptyInventoryEquipments

            expect(() => dummyEntity.getAllEquipmentInventoryString(EQUIPMENT_TYPES.HELMET)
            ).toThrow(Error(`ERROR: Entity class, "getAllEquipmentInventoryString" method: there is no equipment to format string from`))
        })
    })
}

function inventoryResources() {
    
    const dummyEntity = new Entity(true, "dummy")

    describe('addResources', ()=> {

        it(`Should:
            1. Define resource object resource type is not defined
            2. Add the amount when resource type is defined
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: addResources()')
            
            //1
            dummyEntity.inventoryResources = {}
            dummyEntity.addResources(Dummy.resource["Dummy resource 1"])
            expect(dummyEntity.inventoryResources).toStrictEqual(deepCopy(Dummy.resource))

            //2
            dummyEntity.inventoryResources = Dummy.resource
            dummyEntity.addResources(Dummy.resource["Dummy resource 1"])
            expect(dummyEntity.inventoryResources["Dummy resource 1"].amount).toBe(40)
        })
    })

    describe('removeResources', () => {

        it(`Should:
            1. Eemove the resource by specified amount
            2. Delete the object when amount reachs 0
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: removeResources()')

            //1
            dummyEntity.inventoryResources = Dummy.resource
            dummyEntity.removeResources("Dummy resource 1", 10)
            expect(dummyEntity.inventoryResources["Dummy resource 1"].amount).toBe(10)

            //2
            dummyEntity.inventoryResources = Dummy.resource
            dummyEntity.removeResources("Dummy resource 1", 20)
            expect(dummyEntity.inventoryResources["Dummy resource 1"]).toBeUndefined()
        })

        it(`Throws Error: 
            1. When resource doesn't exist,
            2. When you try to remove more resources than what invetory has
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: removeResources()')
            
            //1
            dummyEntity.inventoryResources = {}
            expect(() => dummyEntity.removeResources("unexisted resource", 23)
            ).toThrow(Error(`ERROR: Entity class, "removeResources": resource doesn't exist`))
            
            //2
            dummyEntity.inventoryResources = Dummy.resource
            expect(() => dummyEntity.removeResources("Dummy resource 1", 21)
            ).toThrow(Error(`ERROR: Entity class, "removeResources": trying to remove more resource than what is stored`))
        })
    })
}

function lifeAndDamage() {
    
    describe('recoverHP', () => {

        it(`Should:
            1. recover entity HP
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: recoverHP()')

            dummyEntity.attributes = Dummy.attributes
            dummyEntity.totalStats = Dummy.buffedStats
            dummyEntity.currentHP = 1
            dummyEntity.recoverHP()
            expect(dummyEntity.currentHP).toBe(1000)
        })
    })

    describe('inflictDamage', ()=> {

        it(`should:
            1. Reduce current hp damage,
            2. Kill when damage is more than current hp
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: inflictDamage()')
            
            //1
            dummyEntity.currentHP = 1000
            dummyEntity.inflictDamage(400)
            expect(dummyEntity.currentHP).toBe(600)

            //2
            dummyEntity.currentHP = 100
            dummyEntity.inflictDamage(400)
            expect(dummyEntity.isAlive).toBe(false)
        })
    })

    describe('ressurrect', () => {

        it(`Should:
            1. revive entity
        `, () => {
          
            const dummyEntity = new Entity(true, 'Dummy Entity: ressurrect()')
            dummyEntity.isAlive = false
            dummyEntity.ressurrect()
            expect(dummyEntity.isAlive).toBe(true)
        })
    })

    describe('kill', () => {

        it(`Should:
            1. kill entity
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: kill()')
            dummyEntity.isAlive = true
            dummyEntity.kill()
            expect(dummyEntity.isAlive).toBe(false)
        })
    })
}

function statsCalculation() {

    describe('initializeStats', () => {

        it(`Should:
            1. Initialize each stat type with 0 value
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: initializeStats()')
            dummyEntity.initializeStats()
            expect(dummyEntity.totalStats).toStrictEqual(Dummy.stats)
            expect(dummyEntity.baseStats).toStrictEqual(Dummy.stats)
            expect(dummyEntity.statsFromEquips).toStrictEqual(Dummy.stats)
        })
    })

    describe("calculateBaseStats", () => {

        it(`Should:
            1. calculate from attributes
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: calculateBaseStats()')            
            dummyEntity.attributes = Dummy.attributes 
            dummyEntity.initializeStats()
            dummyEntity.calculateBaseStats()
            expect(dummyEntity.baseStats).toStrictEqual({
                hp:             10 * Utils.statsWeight.HP,
                evasion:        10 * Utils.statsWeight.EVASION,
                fisicalDamage:  10 * Utils.statsWeight.FISICAL_DMG,
                fisicalDefense: 10 * Utils.statsWeight.FISICAL_DEF,
                magicalDamage:  10 * Utils.statsWeight.MAGICAL_DMG,
                magicalDefense: 10 * Utils.statsWeight.MAGICAL_DEF,
            })
        })
    })

    describe("calculateStatsFromEquips", () => {
        
        it(`Should:
            1. calculate stats from equipments
        `, () => {
               
            const dummyEntity = new Entity(true, 'Dummy Entity: calculateStatsFromEquips()')  
            dummyEntity.attributes = Dummy.attributes 
            dummyEntity.currentEquipment = Dummy.dummyEquipments 
            dummyEntity.initializeStats()
            dummyEntity.calculateStatsFromEquips()
            expect(dummyEntity.statsFromEquips).toStrictEqual({                   // Each "Dummy Equipment" give 100 for each multiplier
                hp:             Utils.statsWeight.HP           * Dummy.attributes.vitality      * 100 * 6, // 6 "Dummy Equipment" amount
                evasion:        Utils.statsWeight.EVASION      * Dummy.attributes.agility       * 100 * 6, // 6 "Dummy Equipment" amount
                fisicalDamage:  Utils.statsWeight.FISICAL_DMG  * Dummy.attributes.strenght      * 100 * 2, // 2 "Dummy Equipment" amount
                fisicalDefense: Utils.statsWeight.FISICAL_DEF  * Dummy.attributes.strenght      * 100 * 4, // 4 "Dummy Equipment" amount
                magicalDamage:  Utils.statsWeight.MAGICAL_DMG  * Dummy.attributes.intelligence  * 100 * 2, // 2 "Dummy Equipment" amount
                magicalDefense: Utils.statsWeight.MAGICAL_DEF  * Dummy.attributes.intelligence  * 100 * 4, // 4 "Dummy Equipment" amount
            })
        })
    })

    describe('calculateStats', () => {
        
        it(`Should
            1. Should calculate total entity stats
            2. it should reduce current hp in case max hp is reduced
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: calculateStats()') 
            
            //1
            dummyEntity.attributes = Dummy.attributes
            dummyEntity.currentEquipment = Dummy.dummyEquipments
            dummyEntity.calculateStats()
            expect(dummyEntity.totalStats).toStrictEqual({           
                hp:             (Dummy.attributes.vitality     * Utils.statsWeight.HP         ) + (Utils.statsWeight.HP           * Dummy.attributes.vitality     * 100 * 6),          
                evasion:        (Dummy.attributes.agility      * Utils.statsWeight.EVASION    ) + (Utils.statsWeight.EVASION      * Dummy.attributes.agility      * 100 * 6),
                fisicalDamage:  (Dummy.attributes.strenght     * Utils.statsWeight.FISICAL_DMG) + (Utils.statsWeight.FISICAL_DMG  * Dummy.attributes.strenght     * 100 * 2),
                fisicalDefense: (Dummy.attributes.strenght     * Utils.statsWeight.FISICAL_DEF) + (Utils.statsWeight.FISICAL_DEF  * Dummy.attributes.strenght     * 100 * 4),
                magicalDamage:  (Dummy.attributes.intelligence * Utils.statsWeight.MAGICAL_DMG) + (Utils.statsWeight.MAGICAL_DMG  * Dummy.attributes.intelligence * 100 * 2),
                magicalDefense: (Dummy.attributes.intelligence * Utils.statsWeight.MAGICAL_DEF) + (Utils.statsWeight.MAGICAL_DEF  * Dummy.attributes.intelligence * 100 * 4),
            })

            //2
            dummyEntity.attributes = Dummy.attributes
            dummyEntity.currentHP = 1000
            dummyEntity.currentEquipment = {
                longRangeWeapon:    {},
                meleeWeapon:        {},
                helmet:             {},
                bodyArmor:          {},
                gloves:             {},
                boots:              {}
            }
            dummyEntity.calculateStats()
            expect(dummyEntity.currentHP).toBe(Dummy.attributes.vitality * Utils.statsWeight.HP)
        })
    })
}

class Utils {

    static keys =  CS_ENUM.KEYS
    static attributeTypes = this.keys.CS_ATTRIBUTES
    static attributeTypesKeys = Object.values(this.attributeTypes)
    static equipTypeskeys = Object.values(EQUIPMENT_TYPES)
    static statsWeight = CS_ENUM.BALANCE_VALUES.STATS_WEIGHT
}

class Default {

    /**@type {CS_Attributes} */
    static attributes = {
        vitality: 0,
        agility: 0,
        strenght: 0,
        intelligence: 0
    }

    /**@type {CS_Entity_Equipment} */
    static equipments = {
        longRangeWeapon: {},
        meleeWeapon: {},
        helmet: {},
        bodyArmor: {},
        gloves: {},
        boots: {},
    }

    /**@type {CS_Entity_Inventory} */
    static inventoryEquipments = {
        equipments: {
            longRangeWeapon: [],
            meleeWeapon: [],
            helmet: [],
            bodyArmor: [],
            gloves: [],
            boots: [],
        },
        resources: {},
    }

    /**@type {CS_Stats} */
    static stats = {
        hp: 0,
        evasion: 0,
        fisicalDamage: 0,
        fisicalDefense: 0,
        magicalDamage: 0,
        magicalDefense: 0
    }
}

class Dummy {

    /**@type {CS_Attributes} */
    static attributes = {
        vitality:       10,
        agility:        10,
        strenght:       10,
        intelligence:   10,
    }

    /**@type {CS_Stats} */
    static stats = {
        hp:                 0,
        evasion:            0,
        fisicalDamage:      0,
        fisicalDefense:     0,
        magicalDamage:      0,
        magicalDefense:     0,
    }

    /**@type {CS_Stats} */
    static buffedStats = {
        hp:             1000,
        evasion:        1000,
        fisicalDamage:  1000,
        fisicalDefense: 1000,
        magicalDamage:  1000,
        magicalDefense: 1000,
    }

    /**@type {CS_Equipment_WeaponData | CS_Equipment_ArmorData} */
    static equipmentObject = { name: 'dummy equipment' }

    /**@type {CS_Entity_Equipment} */
    static equipments = {
        longRangeWeapon:    { name: `dummy equipment` },
        meleeWeapon:        { name: `dummy equipment` },
        helmet:             { name: `dummy equipment` },
        bodyArmor:          { name: `dummy equipment` },
        gloves:             { name: `dummy equipment` },
        boots:              { name: `dummy equipment` }
    }

    /**@type {CS_Entity_Equipment} */
    static equipments_2 = {
        longRangeWeapon:    { name: `dummy equipment 2` },
        meleeWeapon:        { name: `dummy equipment 2` },
        helmet:             { name: `dummy equipment 2` },
        bodyArmor:          { name: `dummy equipment 2` },
        gloves:             { name: `dummy equipment 2` },
        boots:              { name: `dummy equipment 2` }
    }

    /**@type {CS_Entity_Inventory} */
    static inventory = {
        equipments: {
            meleeWeapon:        [ { name: `dummy equip 1` }, { name: `dummy equip 2` } ],
            longRangeWeapon:    [ { name: `dummy equip 1` }, { name: `dummy equip 2` } ],
            helmet:             [ { name: `dummy equip 1` }, { name: `dummy equip 2` } ],
            bodyArmor:          [ { name: `dummy equip 1` }, { name: `dummy equip 2` } ],
            gloves:             [ { name: `dummy equip 1` }, { name: `dummy equip 2` } ],
            boots:              [ { name: `dummy equip 1` }, { name: `dummy equip 2` } ]
        },
        resources: {
            "Dummy resource 1": { 
                name: "Dummy resource 1" , amount: 1, type: "test"
            }, 
            "Dummy resource 2": { 
                name: "Dummy resource 2" , amount: 1, type: "test"
            }
        }
    }

    /**@type {CS_Inventory_Resources} */
    static resource = {
        "Dummy resource 1": {
            name: "Dummy resource 1" , 
            amount: 20, 
            type: "test"
        }
    }

    /**@type {CS_Inventory_Equipments} */
    static inventoryEquipments = {
        longRangeWeapon:    [{ name: 'dummy equipment' }],
        meleeWeapon:        [{ name: 'dummy equipment' }],
        helmet:             [{ name: 'dummy equipment' }],
        bodyArmor:          [{ name: 'dummy equipment' }],
        gloves:             [{ name: 'dummy equipment' }],
        boots:              [{ name: 'dummy equipment' }]
    }

    /**@type {CS_Inventory_Equipments} */
    static inventoryEquipments_2 = {
        longRangeWeapon:    [{ name: 'dummy equipment 2' }],
        meleeWeapon:        [{ name: 'dummy equipment 2' }],
        helmet:             [{ name: 'dummy equipment 2' }],
        bodyArmor:          [{ name: 'dummy equipment 2' }],
        gloves:             [{ name: 'dummy equipment 2' }],
        boots:              [{ name: 'dummy equipment 2' }]
    }

    /**@type {CS_Entity_Equipment} */
    static emptyEquipments = {
        longRangeWeapon:    {},
        meleeWeapon:        {},
        helmet:             {},
        bodyArmor:          {},
        gloves:             {},
        boots:              {}
    }

    /**@type {CS_Inventory_Equipments} */
    static inventoryEquipmentsUnsorted = {
        meleeWeapon: [
            { name: 'E dummy equipment' },
            { name: 'B dummy equipment' },
            { name: 'D dummy equipment' },
            { name: 'F dummy equipment' },
            { name: 'F dummy equipment' },
            { name: 'B dummy equipment' },
            { name: 'A dummy equipment' },
            { name: 'C dummy equipment' },
            { name: 'A dummy equipment' },
        ],
        longRangeWeapon: {},
        helmet: {},
        bodyArmor: {},
        gloves: {},
        boots: {}
    }

    /**@type {CS_Inventory_Equipments} */
    static emptyInventoryEquipments = {
        longRangeWeapon:    [],
        meleeWeapon:        [],
        helmet:             [],
        bodyArmor:          [],
        gloves:             [],
        boots:              []
    }

    /**@type {CS_Entity_Equipment} */
    static wrongEquipment = {    
        longRangeWeapon:            { name: `dummy equipment` },          
        meleeWeapon:                { name: `dummy equipment` },
        helmet:                     { name: `dummy equipment` },
        bodyArmor:                  { name: `dummy equipment` },
        gloves:                     { name: `dummy equipment` },
        boots:                      { name: `dummy equipment` },
        wrongType:                  { name: `dummy equipment` }
    }

    /**@type {CS_Entity_Inventory} */
    static wrongInventory = {
        equipments: {
            meleeWeapon:            [{ name: `dummy equipment` }],
            longRangeWeapon:        [{ name: `dummy equipment` }],
            helmet:                 [{ name: `dummy equipment` }],
            bodyArmor:              [{ name: `dummy equipment` }],
            gloves:                 [{ name: `dummy equipment` }],
            boots:                  [{ name: `dummy equipment` }],
            wrongType:              [{ name: `dummy equipment` }]
        },
        resources: {}
    }

    /**@type {CS_Entity_Equipment} */
    static dummyEquipments = {
        longRangeWeapon:    { name: "Dummy Equipment" },
        meleeWeapon:        { name: "Dummy Equipment" },
        helmet:             { name: "Dummy Equipment" },
        bodyArmor:          { name: "Dummy Equipment" },
        gloves:             { name: "Dummy Equipment" },
        boots:              { name: "Dummy Equipment" }
    }
}
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
            expect(dummyEntity.getCurrentEquipment()).toBeTypeOf("object")
            expect(dummyEntity.getEquipmentStats()).toBeTypeOf("object")
            expect(dummyEntity.getTotalStats()).toBeTypeOf("object")
            expect(dummyEntity.getAttributes()).toBeTypeOf("object")
            expect(dummyEntity.getInventory()).toBeTypeOf("object")
            expect(dummyEntity.getBaseStats()).toBeTypeOf("object")
            expect(dummyEntity.getIsAlive()).toBeTypeOf("boolean")
            expect(dummyEntity.getlevel()).toBeTypeOf("number")
            expect(dummyEntity.getIsAlive()).toBe(true)
            expect(dummyEntity.getlevel()).toBe(1)
            expect(dummyEntity.getAttributes()).toStrictEqual(Default.attributes)
            expect(dummyEntity.getCurrentEquipment()).toStrictEqual(Default.equipments)
            expect(dummyEntity.getInventory()).toStrictEqual(Default.intentory)
            expect(dummyEntity.getTotalStats()).toStrictEqual(deepCopy(Default.stats))
            expect(dummyEntity.getBaseStats()).toStrictEqual(deepCopy(Default.stats))
            expect(dummyEntity.getEquipmentStats()).toStrictEqual(deepCopy(Default.stats))
        })
    })

    describe(`constructor`, () => {

        it(`Should:
            1. Sets name properties correctly
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: constructor()")
            expect(dummyEntity.getName()).toBeTypeOf("string")
            expect(dummyEntity.getName()).toBe("Dummy Entity: constructor()")
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
            dummyEntity.setName("noob")
            expect(dummyEntity.getName()).toBeTypeOf("string")
            expect(dummyEntity.getName()).toBe("noob")
        })

        it(`Throws Error: 
            1. when wrong type
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: name setter/getter")
            expect(() => dummyEntity.setName(false)).toThrow(Error('ERROR: Entity class, name must be a string'))
            expect(() => dummyEntity.setName(10)).toThrow(Error('ERROR: Entity class, name must be a string'))
            expect(() => dummyEntity.setName({})).toThrow(Error('ERROR: Entity class, name must be a string'))
        })
    })
    
    describe('isAlive', () => {

        it('Can set', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: isAlive setter/getter")
            dummyEntity.setIsAlive(false)
            expect(dummyEntity.getIsAlive()).toBeTypeOf("boolean")
            expect(dummyEntity.getIsAlive()).toBe(false)
        })

        it(`Throws Error: 
            1. when wrong type
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: isAlive setter/getter")
            expect(() => dummyEntity.setIsAlive('wrong type')).toThrow(Error('ERROR: Entity class, isAlive must be a boolean'))
            expect(() => dummyEntity.setIsAlive({})).toThrow(Error('ERROR: Entity class, isAlive must be a boolean'))
            expect(() => dummyEntity.setIsAlive(0)).toThrow(Error('ERROR: Entity class, isAlive must be a boolean'))
        })
    })

    describe('currentHP', () => {

        it('Can set', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: currentHP setter/getter")
            dummyEntity.setCurrentHP(143)
            expect(dummyEntity.getCurrentHP()).toBeTypeOf("number")
            expect(dummyEntity.getCurrentHP()).toBe(143)
        })

        it(`Throws Error: 
            1. when wrong type
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: currentHP setter/getter")
            expect(() => dummyEntity.setCurrentHP('wrong type')).toThrow(Error('ERROR: Entity class, currentHP must be a number'))
            expect(() => dummyEntity.setCurrentHP(false)).toThrow(Error('ERROR: Entity class, currentHP must be a number'))
            expect(() => dummyEntity.setCurrentHP(NaN)).toThrow(Error('ERROR: Entity class, currentHP must be a number'))
            expect(() => dummyEntity.setCurrentHP({})).toThrow(Error('ERROR: Entity class, currentHP must be a number'))
        })
    })

    describe('souls', () => {

        it('Can set', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: souls setter/getter")
            dummyEntity.setSouls(1000)
            expect(dummyEntity.getSouls()).toBeTypeOf("number")
            expect(dummyEntity.getSouls()).toBe(1000)
        })

        it(`Throws error:
            1. when wrong type,
            2. when set negative
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: souls setter/getter")

            //1
            expect(() => dummyEntity.setSouls('wrong type')).toThrow(Error('ERROR: Entity class, souls must be a number'))
            expect(() => dummyEntity.setSouls(false)).toThrow(Error('ERROR: Entity class, souls must be a number'))
            expect(() => dummyEntity.setSouls(NaN)).toThrow(Error('ERROR: Entity class, souls must be a number'))
            expect(() => dummyEntity.setSouls({})).toThrow(Error('ERROR: Entity class, souls must be a number'))

            //2
            expect(() => dummyEntity.setSouls(-1000)).toThrow(Error('Error: Entity class, souls cannot be negative'))
        })
    })

    describe('level', () => {

        it('Can set', () => {

            const dummyEntity = new Entity(true, "Dummy Entity: level setter/getter")
            dummyEntity.setlevel(64)
            expect(dummyEntity.getlevel()).toBeTypeOf("number")
            expect(dummyEntity.getlevel()).toBe(64)
        })

        it(`Throws error:
            1. when wrong type,
            2. when set negative
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: level setter/getter")

            //1
            expect(() => dummyEntity.setlevel('wrong type')).toThrow(Error('ERROR: Entity class, level must be a number'))
            expect(() => dummyEntity.setlevel(false)).toThrow(Error('ERROR: Entity class, level must be a number'))
            expect(() => dummyEntity.setlevel(NaN)).toThrow(Error('ERROR: Entity class, level must be a number'))
            expect(() => dummyEntity.setlevel({})).toThrow(Error('ERROR: Entity class, level must be a number'))

            //2
            expect(() => dummyEntity.setlevel(-10)).toThrow(Error('Error: Entity class, level cannot be negative'))
        })
    })

    describe('attributes', () => {

        it('Can set', () => {

            const dummyEntity = new Entity(true, "Dummy Entity: attributes setter/getter")
            dummyEntity.setAttributes(Dummy.attributes)
            expect(dummyEntity.getAttributes()).toStrictEqual(Dummy.attributes)
        })

        it(`Throws error:
            1. when wrong type,
            2. when any attribute is undefined
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: Attributes setter/getter")

            //1
            expect(() => dummyEntity.setAttributes('wrong type')).toThrow(Error(`ERROR: Entity class, attribute must be an object`))
            expect(() => dummyEntity.setAttributes(false)).toThrow(Error(`ERROR: Entity class, attribute must be an object`))
            expect(() => dummyEntity.setAttributes(0)).toThrow(Error(`ERROR: Entity class, attribute must be an object`))

            //2
            expect(() => { 
                for(let i = 0; i < Utils.attributeTypesKeys.length; i++){
                    dummyEntity.setAttributes({ [Utils.attributeTypesKeys[i]]: 10 })
                }
            }).toThrow(Error(`ERROR: Entity class, all attributes must be defined`))
        })
    })

    describe('currentEquipment', () => {

        it('Can set', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: currentEquipment setter/getter")
            dummyEntity.setCurrentEquipment(Dummy.equipments)
            expect(dummyEntity.getCurrentEquipment()).toStrictEqual(deepCopy(Dummy.equipments))
        })

        it(`Throws error: 
            1. when wrong type,
            2. when detects a wrong equipment type
            3. when equipment type is undefined,
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: currentEquipment setter/getter")

            //1
            expect(() => dummyEntity.setCurrentEquipment('wrong type')).toThrow(Error('ERROR: Entity class, "currentEquipment": argument must be an object'))    
            expect(() => dummyEntity.setCurrentEquipment(false)).toThrow(Error('ERROR: Entity class, "currentEquipment": argument must be an object'))
            expect(() => dummyEntity.setCurrentEquipment(0)).toThrow(Error('ERROR: Entity class, "currentEquipment": argument must be an object'))

            //2
            expect(() => dummyEntity.setCurrentEquipment(Dummy.wrongEquipment)).toThrow(
                Error(`ERROR: Entity class, "currentEquipment" setter: Equipment type must be valid`)
            )

            //3
            expect(() => { for(let i = 0; i < Utils.equipTypeskeys.length; i++){               
                dummyEntity.setCurrentEquipment({ [Utils.equipTypeskeys[i]]: 10 })
            }}).toThrow(
                Error(`ERROR: Entity class, "currentEquipment": All properties must be defined`)
            )

        })
    })

    describe('Inventory', () => {

        it('Can be set normaly', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: inventory setter/getter")
            dummyEntity.setInventory(Dummy.inventory)
            expect(dummyEntity.getInventory()).toStrictEqual(deepCopy(Dummy.inventory))
        })

        it(`throws error: 
            1. when wrong type,
            2. when inventory properties are undefined,
            3. when detects a wrong inventory equipment type
            4. when equipments properties are undefined,
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: inventory setter/getter")
            
            //1
            expect(() => dummyEntity.setInventory('wrong type')).toThrow(Error('ERROR: Entity class, "inventory" setter: inventory must be a object'))
            expect(() => dummyEntity.setInventory(false)).toThrow(Error('ERROR: Entity class, "inventory" setter: inventory must be a object'))
            expect(() => dummyEntity.setInventory(0)).toThrow(Error('ERROR: Entity class, "inventory" setter: inventory must be a object'))

            //2
            expect(() => dummyEntity.setInventory({})).toThrow(
                Error('ERROR: Entity class, "inventory" setter: object property "resources" and "equipments" must be defined')
            )

            //3
            expect(() => dummyEntity.setInventory(Dummy.wrongInventory)).toThrow(
                Error(`ERROR: Entity class, "inventory" setter: inventory equipments type must be valid`)
            )
            
            //4
            expect(() => dummyEntity.setInventory({
                equipments: {},
                resources: {}
            })).toThrow(
                Error(`ERROR: Entity class, "inventory setter": all inventory equipments properties must be defined`)
            )
        })
    })

    describe('inventoryEquipments', () => {
        
        it('Can be set normaly', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: inventoryEquipments setter/getter")
            dummyEntity.setInventoryEquipments(Dummy.inventory.equipments)
            expect(dummyEntity.getInventoryEquipments()).toStrictEqual(deepCopy(Dummy.inventory.equipments))
        })

        it(`Throws Error: 
            1. when wrong type
            2. when detects a wrong equipment type
            3. when equipment properties are undefined
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: inventoryEquipments setter/getter")
            
            //1
            expect(() => dummyEntity.setInventoryEquipments('wrong type')).toThrow(Error('ERROR: Entity class, "inventoryEquipments" setter: argument must be an object'))
            expect(() => dummyEntity.setInventoryEquipments(false)).toThrow(Error('ERROR: Entity class, "inventoryEquipments" setter: argument must be an object'))
            expect(() => dummyEntity.setInventoryEquipments(0)).toThrow(Error('ERROR: Entity class, "inventoryEquipments" setter: argument must be an object'))

            //2
            expect(() => dummyEntity.setInventoryEquipments(Dummy.wrongInventory)).toThrow(
                Error(`ERROR: Entity class, "inventoryEquipments" setter: given type must be valid`)
            )
            
            //3
            expect(() => dummyEntity.setInventoryEquipments({})).toThrow(Error(`ERROR: Entity class, "inventoryEquipments" setter: all properties must be defined`))
        })
    })

    describe('inventoryResources', () => {

        it('Can be set normaly', () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: inventoryResources setter/getter")
            dummyEntity.setInventoryResources(Dummy.inventory.resources)
            expect(dummyEntity.getInventoryResources()).toStrictEqual(deepCopy(Dummy.inventory.resources))
        })

        it(`Throws Error: 
            1. when wrong type
            2. when a resource dosen't have required properties defined
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: inventoryResources setter/getter")
            
            //1
            expect(() => dummyEntity.setInventoryResources('wrong type')).toThrow(Error('ERROR: Entity class, "inventoryResources" setter: argument must be an object'))
            expect(() => dummyEntity.setInventoryResources(false)).toThrow(Error('ERROR: Entity class, "inventoryResources" setter: argument must be an object'))
            expect(() => dummyEntity.setInventoryResources(0)).toThrow(Error('ERROR: Entity class, "inventoryResources" setter: argument must be an object'))
            
            //2
            expect(() => dummyEntity.setInventoryResources({ "Dummy resource 1": {} })).toThrow(
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
            dummyEntity.setTotalStats(Dummy.stats)
            dummyEntity.setBaseStats(Dummy.stats)
            dummyEntity.setEquipmentStats(Dummy.stats)
            expect(dummyEntity.getTotalStats()).toStrictEqual(Dummy.stats)
            expect(dummyEntity.getBaseStats()).toStrictEqual(Dummy.stats)
            expect(dummyEntity.getEquipmentStats()).toStrictEqual(Dummy.stats)
        })

        it(`Throws Error: 
            1. when wrong type,
            2. when a stats are not defined
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: stats (total/base/fromEquips) setter/getter")
            
            //1
            expect(() => dummyEntity.setTotalStats('wrong type')).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.setBaseStats('wrong type')).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.setEquipmentStats('wrong type')).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.setTotalStats(false)).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.setBaseStats(false)).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.setEquipmentStats(false)).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.setTotalStats(0)).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.setBaseStats(0)).toThrow(Error('ERROR: Entity class, stats must be objects'))
            expect(() => dummyEntity.setEquipmentStats(0)).toThrow(Error('ERROR: Entity class, stats must be objects'))

            //2
            expect(() => dummyEntity.setTotalStats({})).toThrow(Error(`ERROR: Entity class, stats obejcts must have all properties defined`))
            expect(() => dummyEntity.setBaseStats({})).toThrow(Error(`ERROR: Entity class, stats obejcts must have all properties defined`))
            expect(() => dummyEntity.setEquipmentStats({})).toThrow(Error(`ERROR: Entity class, stats obejcts must have all properties defined`))
        })
    })
}

function utilMethods(){
    
	describe('addSouls', () => {

        it(`Should:
            1. add souls
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: addSouls()")
            dummyEntity.setSouls(0)
            dummyEntity.addSouls(5000)
            expect(dummyEntity.getSouls()).toBe(5000)
        })
	})

    describe('decreaseSouls', () => {
        
        it(`Should: 
            1. decrease souls
            2. set souls to 0 when balances become negative
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: decreaseSouls()")

            //1
            dummyEntity.setSouls(5000)
            dummyEntity.decreaseSouls(2000)
            expect(dummyEntity.getSouls()).toBe(3000)

            //2
            dummyEntity.setSouls(2000)
            dummyEntity.decreaseSouls(5000)
            expect(dummyEntity.getSouls()).toBe(0)
        })
	})

    describe('addLevel', () => {
        
        it(`Should:
            1. Add Level by 1
        `, () => {
            
            const dummyEntity = new Entity(true, "Dummy Entity: addLevel()")
            dummyEntity.setlevel(1)
            dummyEntity.addLevel()
            expect(dummyEntity.getlevel()).toBe(2)
        })
	})

	describe('addAttributes', () => {

        it(`Should:
            1. add attribute by 1 for the specified type
        `, () => {

            const dummyEntity = new Entity(true, "Dummy Entity: addAttributes()")            
            dummyEntity.setAttributes(Dummy.attributes)
            dummyEntity.addAttributes(Utils.attributeTypes.VITALITY)
            dummyEntity.addAttributes(Utils.attributeTypes.AGILITY)
            dummyEntity.addAttributes(Utils.attributeTypes.STRENGHT)
            dummyEntity.addAttributes(Utils.attributeTypes.INTELLLIGENCE)
            expect(dummyEntity.getAttributes()).toStrictEqual({
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
            dummyEntity.setInventoryEquipments(Dummy.inventoryEquipmentsUnsorted)
            dummyEntity.sortInventoryEquipments(EQUIPMENT_TYPES.MELEE_WEAPON)
            expect(dummyEntity.getInventoryEquipments().meleeWeapon).toStrictEqual([
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
            dummyEntity.setInventoryEquipments(Dummy.inventory.equipments)
            for(let i = 0; i < Utils.equipTypeskeys.length; i++) {
                expect(dummyEntity.isInventoryEquipmentsTypeEmpty(Utils.equipTypeskeys[i])).toBe(false)
            }

            //2
            dummyEntity.setInventoryEquipments(Dummy.emptyInventoryEquipments)
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
            dummyEntity.setInventoryEquipments(Dummy.inventory.equipments)

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
            
            expect(dummyEntity.getCurrentEquipment()).toStrictEqual(Dummy.equipments)
        })
    })

    describe('unequip', () => {

        it(`Should:
            1. unequip
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: unequip()')
            dummyEntity.setCurrentEquipment(Dummy.equipments)
            
            for (let i = 0; i < Utils.equipTypeskeys.length; i++){
                dummyEntity.unequip(Utils.equipTypeskeys[i])
            }
            
            expect(dummyEntity.getInventoryEquipments()).toStrictEqual(Dummy.inventoryEquipments)
            expect(dummyEntity.getCurrentEquipment()).toStrictEqual(Dummy.emptyEquipments)
        })
    })

    describe('equipFromInventory', () => {
                
        it(`Should:
            1. Equip from inventory When there is no current equipment,
            2. And When there is current equipment, swap current equipment with inventory equipment
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: equipFromInventory()')
            
            //1
            dummyEntity.setInventoryEquipments(Dummy.inventoryEquipments)
            for (let i = 0; i < Utils.equipTypeskeys.length; i++){
                dummyEntity.equipFromInventory(0, Utils.equipTypeskeys[i])
            }
            expect(dummyEntity.getCurrentEquipment()).toStrictEqual(deepCopy(Dummy.equipments))
            expect(dummyEntity.getInventoryEquipments()).toStrictEqual(Dummy.emptyInventoryEquipments)

            //2
            dummyEntity.setCurrentEquipment(Dummy.equipments_2)
            dummyEntity.setInventoryEquipments(Dummy.inventoryEquipments)
            for (let i = 0; i < Utils.equipTypeskeys.length; i++){
                dummyEntity.equipFromInventory(0, Utils.equipTypeskeys[i])
            }
            expect(dummyEntity.getCurrentEquipment()).toStrictEqual(deepCopy(Dummy.equipments))
            expect(dummyEntity.getInventoryEquipments()).toStrictEqual(deepCopy(Dummy.inventoryEquipments_2))
        })

        it(`Throws Error:
            1. when index is out of boundaries
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: equipFromInventory()')
            dummyEntity.setInventoryEquipments(Dummy.emptyInventoryEquipments)
            
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
            dummyEntity.setInventoryEquipments(Dummy.inventory.equipments)
            
            expect(dummyEntity.getAllEquipmentInventoryString(EQUIPMENT_TYPES.LONG_RANGE_WEAPON)
            ).toBe(`| 1. dummy equip 1 | 2. dummy equip 2 `)
        })

        it(`Throws Error: 
            1. if inventory type is empty
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: getAllEquipmentInventoryString()')
            dummyEntity.setInventoryEquipments(Dummy.emptyInventoryEquipments)

            expect(() => dummyEntity.getAllEquipmentInventoryString(EQUIPMENT_TYPES.HELMET)
            ).toThrow(Error(`ERROR: Entity class, "getAllEquipmentInventoryString" method: there is no equipment to format string from`))
        })
    })
}

function inventoryResources() {

    describe('addResources', ()=> {

        it(`Should:
            1. Define resource object resource type is not defined
            2. Add the amount when resource type is defined
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: addResources()')
            
            //1
            dummyEntity.setInventoryResources({})
            dummyEntity.addResources(Dummy.resource["Dummy resource 1"])
            expect(dummyEntity.getInventoryResources()).toStrictEqual(deepCopy(Dummy.resource))

            //2
            dummyEntity.setInventoryResources(Dummy.resource)
            dummyEntity.addResources(Dummy.resource["Dummy resource 1"])
            expect(dummyEntity.getInventoryResources()["Dummy resource 1"].amount).toBe(40)
        })
    })

    describe('removeResources', () => {

        it(`Should:
            1. Eemove the resource by specified amount
            2. Delete the object when amount reachs 0
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: removeResources()')

            //1
            dummyEntity.setInventoryResources(Dummy.resource)
            dummyEntity.removeResources("Dummy resource 1", 10)
            expect(dummyEntity.getInventoryResources()["Dummy resource 1"].amount).toBe(10)

            //2
            dummyEntity.setInventoryResources(Dummy.resource)
            dummyEntity.removeResources("Dummy resource 1", 20)
            expect(dummyEntity.getInventoryResources()["Dummy resource 1"]).toBeUndefined()
        })

        it(`Throws Error: 
            1. When resource doesn't exist,
            2. When you try to remove more resources than what invetory has
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: removeResources()')
            
            //1
            dummyEntity.setInventoryResources({})
            expect(() => dummyEntity.removeResources("unexisted resource", 23)
            ).toThrow(Error(`ERROR: Entity class, "removeResources": resource doesn't exist`))
            
            //2
            dummyEntity.setInventoryResources(Dummy.resource)
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

            dummyEntity.setAttributes(Dummy.attributes)
            dummyEntity.setTotalStats(Dummy.buffedStats)
            dummyEntity.setCurrentHP(1)
            dummyEntity.recoverHP()
            expect(dummyEntity.getCurrentHP()).toBe(1000)
        })
    })

    describe('inflictDamage', ()=> {

        it(`should:
            1. Reduce current hp damage,
            2. Kill when damage is more than current hp
        `, () => {

            const entity = new Entity(true, 'Dummy Entity: inflictDamage()')
            
            //1
            entity.setCurrentHP(1000)
            entity.inflictDamage(400)
            expect(entity.getCurrentHP()).toBe(600)

            //2
            entity.setCurrentHP(100)
            entity.inflictDamage(400)
            expect(entity.getIsAlive()).toBe(false)
        })
    })

    describe('ressurrect', () => {

        it(`Should:
            1. revive entity
        `, () => {
          
            const dummyEntity = new Entity(true, 'Dummy Entity: ressurrect()')
            dummyEntity.setIsAlive(false)
            dummyEntity.ressurrect()
            expect(dummyEntity.getIsAlive()).toBe(true)
        })
    })

    describe('kill', () => {

        it(`Should:
            1. kill entity
        `, () => {
            
            const dummyEntity = new Entity(true, 'Dummy Entity: kill()')
            dummyEntity.setIsAlive(true)
            dummyEntity.kill()
            expect(dummyEntity.getIsAlive()).toBe(false)
        })
    })
}

function statsCalculation() {

    const referenceStats = {
        hp: 1000,
        evasion: 1000,
        fisicalDamage: 1000,
        fisicalDefense: 1000,
        magicalDamage: 1000,
        magicalDefense: 1000
    }

    describe("calculateBaseStats", () => {

        it(`Should:
            1. calculate from attributes
        `, () => {

            const dummyEntity = new Entity(true, 'Dummy Entity: calculateBaseStats()')            
            dummyEntity.setAttributes(Dummy.attributes)
            dummyEntity.calculateBaseStats()
            expect(dummyEntity.getBaseStats()).toStrictEqual({
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
            dummyEntity.setAttributes(Dummy.attributes)
            dummyEntity.setCurrentEquipment(Dummy.dummyEquipments) 
            dummyEntity.calculateStatsFromEquips()
            expect(dummyEntity.getEquipmentStats()).toStrictEqual({                   // Each "Dummy Equipment" give 100 for each multiplier
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

            const entity = new Entity(true, 'Dummy Entity: calculateStats()') 
            
            //1
            entity.setAttributes(Dummy.attributes)
            entity.setCurrentEquipment(Dummy.dummyEquipments)
            entity.calculateStats()
            expect(entity.getTotalStats()).toStrictEqual({           
                hp:             (Dummy.attributes.vitality     * Utils.statsWeight.HP         ) + (Utils.statsWeight.HP           * Dummy.attributes.vitality     * 100 * 6),          
                evasion:        (Dummy.attributes.agility      * Utils.statsWeight.EVASION    ) + (Utils.statsWeight.EVASION      * Dummy.attributes.agility      * 100 * 6),
                fisicalDamage:  (Dummy.attributes.strenght     * Utils.statsWeight.FISICAL_DMG) + (Utils.statsWeight.FISICAL_DMG  * Dummy.attributes.strenght     * 100 * 2),
                fisicalDefense: (Dummy.attributes.strenght     * Utils.statsWeight.FISICAL_DEF) + (Utils.statsWeight.FISICAL_DEF  * Dummy.attributes.strenght     * 100 * 4),
                magicalDamage:  (Dummy.attributes.intelligence * Utils.statsWeight.MAGICAL_DMG) + (Utils.statsWeight.MAGICAL_DMG  * Dummy.attributes.intelligence * 100 * 2),
                magicalDefense: (Dummy.attributes.intelligence * Utils.statsWeight.MAGICAL_DEF) + (Utils.statsWeight.MAGICAL_DEF  * Dummy.attributes.intelligence * 100 * 4),
            })

            //2
            entity.setAttributes(Dummy.attributes)
            entity.setCurrentHP(1000)
            entity.setCurrentEquipment({
                longRangeWeapon:    {},
                meleeWeapon:        {},
                helmet:             {},
                bodyArmor:          {},
                gloves:             {},
                boots:              {}
            })
            entity.calculateStats()
            expect(entity.getCurrentHP()).toBe(Dummy.attributes.vitality * Utils.statsWeight.HP)
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
    static intentory = {
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
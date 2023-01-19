/**
 * @typedef {import('../../../TypeDefinitions/Types').CS_Database} CS_Database
 * @typedef {import('../../../TypeDefinitions/Types').CS_EntityData} CS_EntityData
*/

/**
 * @returns {CS_Database}
 */
export default function get_TEST_AREA_ENEMIES_DATA() {
    return {
        "Dummy Enemie": get_DUMMY_ENEMIE()
    }
}

/**
 * @returns {CS_EntityData}
*/
export function get_DUMMY_ENEMIE() {
    return {
        level: 1,
        name: "Dummy Enemie",
        souls: 1000,
        attributes: {
            vitality: 1,
            agility: 1,
            strenght: 1,
            intelligence: 1
        },
        equipment: {
            longRangeWeapon: {name: "Dummy Equipment"},
            meleeWeapon: {name: "Dummy Equipment"},
            helmet: {name: "Dummy Equipment"},
            bodyArmor: {name: "Dummy Equipment"},
            gloves: {name: "Dummy Equipment"},
            boots: {name: "Dummy Equipment"}
        },
        inventory: {
            equipments: {
                longRangeWeapon: [{name: "Dummy Equipment"}, {name: "Dummy Equipment"}],
                meleeWeapon: [{name: "Dummy Equipment"}, {name: "Dummy Equipment"}],
                helmet: [{name: "Dummy Equipment"}, {name: "Dummy Equipment"}],
                bodyArmor: [{name: "Dummy Equipment"}, {name: "Dummy Equipment"}],
                gloves: [{name: "Dummy Equipment"}, {name: "Dummy Equipment"}],
                boots: [{name: "Dummy Equipment"}, {name: "Dummy Equipment"}]
            },
            resources: {
                "Dummy Resource": {
                    name: "Dummy Resource",
                    amount: 1,
                    type: "Test",
                    dropChance: 1,
                    description: "This is just a item for tests",
                }
            }
        }
    }
}
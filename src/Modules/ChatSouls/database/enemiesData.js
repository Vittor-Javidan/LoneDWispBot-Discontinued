import deepCopy from '../../../Utils/deepCopy';

/**
 * @typedef {import('../TypeDefinitions/Types').CS_Database} CS_Database - Keys: `enemie name string`
 * @typedef {import('../TypeDefinitions/Types').CS_EntityData} CS_EntityData
*/

/**
 * - Keys: `MAP_AREA ENUM` 
 * @type {Object<string, CS_Database>}
 */
const enemiesDataBase = {
    testArea: {
        "Dummy Enemie": {
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
        },
    },
    theWoods: {
        "Javali": {
            level: 1,
            name: "Javali",
            souls: 100,
            attributes: {
                vitality: 15,
                agility: 10,
                strenght: 10,
                intelligence: 5
            },
            equipment: {
                longRangeWeapon: {},
                meleeWeapon: {},
                helmet: {},
                bodyArmor: {},
                gloves: {},
                boots: {}
            },
            inventory: {
                equipments: {
                    longRangeWeapon: [],
                    meleeWeapon: [],
                    helmet: [],
                    bodyArmor: [],
                    gloves: [],
                    boots: []
                },
                resources: {
                    "Couro de Javali": {
                        name: "Couro de Javali",
                        amount: 1,
                        type: "couro",
                        dropChance: 0.5,
                        description: "Couro de um javali. Forte e resistente, porém nada nobre.",
                    },
                    "Carne de Javali": {
                        name: "Carne de Javali",
                        amount: 1,
                        type: "comida",
                        dropChance: 0.5,
                        description: "Carne de um javali. Cheio de proteínas e delicioso se preparado do jeito correto.",
                    },
                    "Dente de Javali": {
                        name: "Dente de Javali",
                        amount: 2,
                        type: "recurso",
                        dropChance: 0.1,
                        description: "Dentes de javali. Bastante usado para confecção de acessórios.",
                    }
                }
            }
        },
        "Bandido": {
            level: 5,
            name: "Bandido",
            souls: 500,
            attributes: {
                vitality: 10,
                agility: 15,
                strenght: 10,
                intelligence: 10
            },
            equipment: {
                longRangeWeapon: {},
                meleeWeapon: { name: "Adaga" },
                helmet: {},
                bodyArmor: { name: "Roupa de caçador" },
                gloves: {},
                boots: {}
            },
            inventory: {
                equipments: {
                    longRangeWeapon: [],
                    meleeWeapon: [],
                    helmet: [],
                    bodyArmor: [],
                    gloves: [],
                    boots: []
                },
                resources: {
                    "Dados viciados": {
                        name: "Dados viciados",
                        amount: 1,
                        type: "recurso",
                        dropChance: 0.5,
                        description: "Usados para apostar e roubar dinheiro de tolos. Alguns caçadores de recompensas costumam colecioná-los para se que se lembrem de todos os bandidos já levados a justiça."
                    },
                    "Bolsa de Água": {
                        name: "Bolsa de Água",
                        type: "comida",
                        amount: 1,
                        dropChance: 0.5,
                        description: "Água potável."
                    }
                }
            },
        },
        "Lobo": {
            level: 10,
            name: "Lobo",
            souls: 1000,
            attributes: {
                vitality: 13,
                agility: 13,
                strenght: 14,
                intelligence: 10
            },
            equipment: {
                longRangeWeapon: {},
                meleeWeapon: {},
                helmet: {},
                bodyArmor: {},
                gloves: {},
                boots: {}
            },
            inventory: {
                equipments: {
                    longRangeWeapon: [],
                    meleeWeapon: [],
                    helmet: [],
                    bodyArmor: [],
                    gloves: [],
                    boots: []
                },
                resources: {
                    "Couro de Lobo": {
                        name: "Couro de Lobo",
                        amount: 1,
                        type: "couro",
                        dropChance: 0.5,
                        description: "Couro de um lobo. Essencial para confecção de agasalhos no inverno."
                    },
                    "Carne de Lobo": {
                        name: "Carne de Lobo",
                        amount: 1,
                        type: "comida",
                        dropChance: 0.3,
                        description: "Carne de Lobo. Dura igual pedra! Mas no desespero da fome, tudo vale."
                    },
                    "Dente de Lobo": {
                        name: "Dente de Lobo",
                        amount: 2,
                        dropChance: 0.2,
                        type: "recurso",
                        description: "Dentes de javali. Tão afiado que algumas tribos os utilizam com o propósito de se fazer incisões na pele."
                    }
                }
            }
        },
        "Esqueleto": {
            level: 20,
            name: "Esqueleto",
            souls: 2000,
            attributes: {
                vitality: 10,
                agility: 20,
                strenght: 20,
                intelligence: 10
            },
            equipment: {
                longRangeWeapon: {},
                meleeWeapon: { name: "Espada enferrujada" },
                helmet: { name: "Elmo enferrujado" },
                bodyArmor: { name: "Armadura enferrujada" },
                gloves: { name: "Luvas enferrujadas" },
                boots: { name: "Botas enferrujadas" }
            },
            inventory: {
                equipments: {
                    longRangeWeapon: [],
                    meleeWeapon: [],
                    helmet: [],
                    bodyArmor: [],
                    gloves: [],
                    boots: []
                },
                resources: {
                    "Ossos": {
                        name: "Ossos",
                        amount: 1,
                        type: "recurso",
                        dropChance: 1,
                        description: "Ossos apodrecidos. Uma aura sinistra é sentida."
                    },
                    "Metal Enferrujado": {
                        name: "Metal Enferrujado",
                        amount: 1,
                        type: "recurso",
                        dropChance: 0.3,
                        description: "Metal com muita ferrugem. Apesar de forte, possui um peso muito grande."
                    },
                    "Dente de ouro": {
                        name: "Dente de ouro",
                        amount: 1,
                        dropChance: 0.05,
                        type: "recurso",
                        description: "Dentes de ouro! talvez encontrará algum uso a eles."
                    }
                }
            }
        }
    }
}
export default enemiesDataBase

export const enemieEntries = {
    testArea: {
        DUMMY_ENEMIE: "Dummy Enemie"
    },
    theWoods: {
        JAVALI: "Javali",
        BANDIDO: "Bandido",
        LOBO: "Lobo",
        ESQUELETO: "Esqueleto"
    }
}

const mapNameKeys = Object.keys(enemiesDataBase)

/**
 * @param {string} enemieName 
 * @param {string} mapArea
 * @returns {CS_EntityData}
 */
export function getEnemie(enemieName, mapArea) {

    if(!mapNameKeys.includes(mapArea)) {
        throw Error(`ERROR: getEnemie function: Map Area doesn't exist`)
    }

    const emiesAreaMapDataBase = enemiesDataBase[mapArea]

    const enemiesNameKeys = Object.keys(emiesAreaMapDataBase)
    if(!enemiesNameKeys.includes(enemieName)) {
        throw Error(`ERROR: getEnemie function: Enemie doesn't exist`)
    }


    const enemie = emiesAreaMapDataBase[enemieName]
    return deepCopy(enemie)
}
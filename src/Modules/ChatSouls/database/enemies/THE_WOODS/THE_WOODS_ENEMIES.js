export default function get_THE_WOODS_ENEMIES_DATA() {
    return {
        "Javali": get_JAVALI(),
        "Bandido": get_BANDIDO(),
        "Lobo": get_LOBO(),
        "Esqueleto": get_ESQUELETO()
    }
}

export function get_JAVALI() {
    return {
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
    }
}

export function get_BANDIDO() {
    return {
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
        }
    }
} 

export function get_LOBO() {
    return {
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
    }
}

export function get_ESQUELETO() {
    return {
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
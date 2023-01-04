import ENUM from '../Classes/ENUM';

/**
 * @typedef {import('../TypeDefinitions/Types').CS_Database} CS_Database - Keys: `enemie name string`
*/

/**
 * - Keys: `MAP_AREA ENUM` 
 * @type {Object<string, CS_Database>}
 */
const enemiesDataBase = {
    [ENUM.MAP_AREAS.THE_WOODS]: {
        "Javali": {
            level: 1,
            name: "Javali",
            souls: 100,
            attributes: {
                [ENUM.ATTRIBUTES.VITALITY]: 15,
                [ENUM.ATTRIBUTES.AGILITY]: 10,
                [ENUM.ATTRIBUTES.STRENGHT]: 10,
                [ENUM.ATTRIBUTES.INTELLLIGENCE]: 5
            },
            inventory: {
                resources: {
                    "Couro de Javali": {
                        name: "Couro de Javali",
                        amount: 1,
                        type: "couro",
                        description: "Couro de um javali. Forte e resistente, porém nada nobre."
                    },
                    "Carne de Javali": {
                        name: "Carne de Javali",
                        amount: 1,
                        type: "comida",
                        description: "Carne de um javali. Cheio de proteínas e delicioso se preparado do jeito correto."
                    },
                    "Dente de Javali": {
                        name: "Dente de Javali",
                        amount: 2,
                        type: "recurso",
                        description: "Dentes de javali. Bastante usado para confecção de acessórios."
                    }
                }
            }
        },
        "Bandido": {
            level: 5,
            name: "Bandido",
            souls: 500,
            attributes: {
                [ENUM.ATTRIBUTES.VITALITY]: 10,
                [ENUM.ATTRIBUTES.AGILITY]: 15,
                [ENUM.ATTRIBUTES.STRENGHT]: 10,
                [ENUM.ATTRIBUTES.INTELLLIGENCE]: 10
            },
            equipment: {
                [ENUM.EQUIPMENT_TYPES.MELEE_WEAPON]: { 
                    name: "Adaga"
                },
                [ENUM.EQUIPMENT_TYPES.BODY_ARMOR]: {
                    name: "Roupa de caçador"
                }
            },
            inventory: {
                resources: {
                    "Dados viciados": {
                        name: "Dados viciados",
                        amount: 1,
                        type: "recurso",
                        description: "Usados para apostar e roubar dinheiro de tolos. Alguns caçadores de recompensas costumam colecioná-los para se que se lembrem de todos os bandidos já levados a justiça."
                    },
                    "Bolsa de Água": {
                        name: "Bolsa de Água",
                        type: "comida",
                        amount: 1,
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
                [ENUM.ATTRIBUTES.VITALITY]: 13,
                [ENUM.ATTRIBUTES.AGILITY]: 13,
                [ENUM.ATTRIBUTES.STRENGHT]: 14,
                [ENUM.ATTRIBUTES.INTELLLIGENCE]: 10
            },
            inventory: {
                resources: {
                    "Couro de Lobo": {
                        name: "Couro de Lobo",
                        amount: 1,
                        type: "couro",
                        description: "Couro de um lobo. Essencial para confecção de agasalhos no inverno."
                    },
                    "Carne de Lobo": {
                        name: "Carne de Lobo",
                        amount: 1,
                        type: "comida",
                        description: "Carne de Lobo. Dura igual pedra! Mas no desespero da fome, tudo vale."
                    },
                    "Dente de Lobo": {
                        name: "Dente de Lobo",
                        amount: 2,
                        type: "recurso",
                        description: "Dentes de javali. Tão afiado que algumas tribos os utilizam com o propósito de se fazer incisões na pele."
                    }
                }
            }
        }
    }
}
export default enemiesDataBase
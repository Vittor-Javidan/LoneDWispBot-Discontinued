
const CS_ENUM = {
    BALANCE_VALUES: {
        STATS_WEIGHT: {
            HP:             10,
            EVASION:        1,
            FISICAL_DMG:    5,
            FISICAL_DEF:    1,
            MAGICAL_DMG:    5,
            MAGICAL_DEF:    1
        },
        PLAYER_START: {
            ATTRIBUTES: {
                VITALITY:       10,
                AGILITY:        10,
                STRENGHT:       10,
                INTELLLIGENCE:  10
            },
            EQUIPMENTS: {
                LONG_RANGE_WEAPON:  {name: 'Arco de madeira'},
                MELEE_WEAPON:       {name: 'Adaga'},
                HELMET:             {name: 'Chapéu de caçador'},
                BODY_ARMOR:         {name: 'Roupa de caçador'},
                GLOVES:             {name: 'Luvas de caçador'},
                BOOTS:              {name: 'Botas de caçador'}
            }
        },
        ENTITY_INIT_VALUES: {
            SOULS: 0,
            LEVEL: 1,
            ATTRIBUTES: {},
            EQUIPMENT: {},
            INVENTORY: {
                equipments: {},
                resources: {},
            },
            BASE_STATS: {},
            STATS_FROM_EQUIPS: {},
            TOTAL_STATS: {},
            CURRENT_HP: 1,
            IS_ALIVE: true
        }
    },
    /*
        Modify any values bellow, and probably you will need 
        to make sure databases structures are modified as well
    */
    MAP_AREAS: {
        TEST_AREA: "testArea",
        THE_WOODS: "theWoods"
    },
    KEYS: {//Keys of many Object<string, value> types definitions
        CS_ATTRIBUTES: { //Keys of CS_Attributes
            VITALITY: "vitality",
            AGILITY: "agility",
            STRENGHT: "strenght",
            INTELLLIGENCE: "intelligence",
        },
        CS_STATS: { //Keys of CS_Stats
            HP: "hp",
            EVASION: "evasion",
            FISICAL_DMG: "fisicalDamage",
            FISICAL_DEF: "fisicalDefense",
            MAGICAL_DMG: "magicalDamage",
            MAGICAL_DEF: "magicalDefense"
        }
    }
}

export default CS_ENUM
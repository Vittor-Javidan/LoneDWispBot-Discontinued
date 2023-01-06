
const CHATSOULS_ENUM = {
    BALANCE: {
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
        }
    },
    STATES:{
        RESTING: {
            PRIMARY: "RESTING",
            SECONDARY: {
                JUST_RESTING : "RESTING_0",
                STATS_MENU: "RESTING_1",
                ATRIBUTE_UPGRADE: "RESTING_2",
                EQUIPMENT: "RESTING_3",
                EQUIPMENT_MELEE: "RESTING_4",
                EQUIPMENT_MELEE_INVENTORY: "RESTING_5",
                EQUIPMENT_LONG_RANGE: "RESTING_6",
                EQUIPMENT_LONG_RANGE_INVENTORY: "RESTING_7",
                EQUIPMENT_HELMET: "RESTING_8",
                EQUIPMENT_HELMET_INVENTORY: "RESTING_9",
                EQUIPMENT_BODY_ARMOR: "RESTING_10",
                EQUIPMENT_BODY_ARMOR_INVENTORY: "RESTING_11",
                EQUIPMENT_GLOVES: "RESTING_12",
                EQUIPMENT_GLOVES_INVENTORY: "RESTING_13",
                EQUIPMENT_BOOTS: "RESTING_14",
                EQUIPMENT_BOOTS_INVENTORY: "RESTING_15"
            }
        },
        EXPLORING: {
            PRIMARY: "EXPLORING",
            SECONDARY: {
                IDLE: "EXPLORING_0",
                HUNTING: "EXPLORING_1",
                FORAGING: "EXPLORING_2",
                TRAVEL: "EXPLORING_3"
            }
        }
    },
    /*
        Modify any values bellow, and probably you will need 
        to make sure databases structures are modified as well
    */
    MAP_AREAS: {
        THE_WOODS: "theWoods"
    },
    TYPES: {
        ATTRIBUTE_TYPES: {
            VITALITY: "vitality",
            AGILITY: "agility",
            STRENGHT: "strenght",
            INTELLLIGENCE: "intelligence",
        },
        STATS_TYPES: {
            HP: "hp",
            EVASION: "evasion",
            FISICAL_DMG: "fisicalDmg",
            FISICAL_DEF: "fisicalDef",
            MAGICAL_DMG: "magicalDmg",
            MAGICAL_DEF: "magicalDef"
        },
        EQUIPMENT_TYPES: {
            LONG_RANGE_WEAPON: "longRangeWeapon",
            MELEE_WEAPON: "meleeWeapon",
            HELMET: "helmet",
            BODY_ARMOR: "bodyArmor",
            GLOVES: "gloves",
            BOOTS: "boots"
        },
    }
}

export default CHATSOULS_ENUM
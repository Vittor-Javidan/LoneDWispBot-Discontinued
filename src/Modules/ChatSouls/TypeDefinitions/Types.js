//ENTITY DATABASE DEFINITION
/**
 * - keys: `entity name string`.
 * - values: `entity data`
 * 
 * @typedef {Object<string, CS_EntityData>} CS_Database
*/

/**AREA MAPS DATABASE DEFINITION
 * - Keys: `Area Map name string`.
 * - Values: `Area database`
 * 
 * @typedef {Object<string, CS_Database>} CS_AreaMaps_Database
*/

//EQUIPMENT DATABASE DEFINITION
/**
 * @typedef {Object} CS_EquipmentDataBase
 * @property {Object<string, CS_Equipment_WeaponData>} longRangeWeapon
 * @property {Object<string, CS_Equipment_WeaponData>} meleeWeapon
 * @property {Object<string, CS_Equipment_ArmorData>} helmet
 * @property {Object<string, CS_Equipment_ArmorData>} bodyArmor
 * @property {Object<string, CS_Equipment_ArmorData>} gloves
 * @property {Object<string, CS_Equipment_ArmorData>} boots
*/ 

//EQUIPMENT KV DATABASE DEFINITION
/**
 * - keys: `CS_EquipmentDataBase` properties
 * - values `CS_Equipment_WeaponData` or `CS_Equipment_ArmorData` data types
 * 
 * @typedef {Object<string, Object<
*      string, CS_Equipment_WeaponData> | Object<string, CS_Equipment_ArmorData>
* >} CS_EquipmentDataBase_KV
*/

// PLAYER STATE DEFINITION
/** 
 * @typedef {Object} CS_PlayerState
 * @property {string} primary
 * @property {string} secondary
*/

//ENTITY DATA DEFINITION
/**
 * @typedef {Object} CS_EntityData
 * @property {string} name
 * @property {number} souls
 * @property {number} level
 * @property {CS_Attributes} attributes
 * @property {CS_Entity_Equipment} equipment
 * @property {CS_Entity_Inventory} inventory
 * 
 * @typedef {Object} CS_Entity_Inventory
 * @property {CS_Inventory_Equipments} equipments
 * @property {CS_Inventory_Resources} resources
 * 
 * @typedef {Object} CS_Entity_Inventory_KV
 * @property {CS_Inventory_Equipments_KV} equipments
 * @property {CS_Inventory_Resources} resources
*/

//ENTITY DATA SUBTYPES DEFINITION - ENTITY EQUIPMENT
/**
 * @typedef {Object} CS_Entity_Equipment
 * @property {CS_Equipment_WeaponData} longRangeWeapon
 * @property {CS_Equipment_WeaponData} meleeWeapon
 * @property {CS_Equipment_ArmorData} helmet
 * @property {CS_Equipment_ArmorData} bodyArmor
 * @property {CS_Equipment_ArmorData} gloves
 * @property {CS_Equipment_ArmorData} boots
*/

//ENTITY DATA SUBTYPES DEFINITION - ENTITY EQUIPMENT KV
/**
 * - keys: `CS_Entity_Equipment` properties
 * - values: `CS_Equipment_WeaponData` or `CS_Equipment_ArmorData` data types
 * 
 * @typedef {Object<string, CS_Equipment_WeaponData | CS_Equipment_ArmorData>} CS_Entity_Equipment_KV
*/

//ENITTY DATA SUBTYPES DEFINITION - ENTITY INVENTORY EQUIPMENT
/**
 * @typedef {Object} CS_Inventory_Equipments
 * @property {CS_Equipment_WeaponData[]} longRangeWeapon
 * @property {CS_Equipment_WeaponData[]} meleeWeapon
 * @property {CS_Equipment_ArmorData[]} helmet
 * @property {CS_Equipment_ArmorData[]} bodyArmor
 * @property {CS_Equipment_ArmorData[]} gloves
 * @property {CS_Equipment_ArmorData[]} boots
*/

//ENITTY DATA SUBTYPES DEFINITION - ENTITY INVENTORY EQUIPMENT KV
/**
 * - keys: `CS_Inventory_Equipments` properties
 * - values: `CS_Equipment_WeaponData[]` or `CS_Equipment_ArmorData[]` data types
 * 
 * @typedef {Object<string, CS_Equipment_WeaponData[] | CS_Equipment_ArmorData[]>} CS_Inventory_Equipments_KV
*/

//WEAPON DATA DEFINITION
/**
 * @typedef {Object} CS_Equipment_WeaponData
 * @property {string} name
 * @property {CS_Attributes} damage_multipliers
 * @property {string} description
*/

//ARMOR DATA DEFINITION
/** 
 * @typedef {Object} CS_Equipment_ArmorData
 * @property {string} name
 * @property {CS_Attributes} defense_multipliers
 * @property {string} description
*/

//RESOURCES DATA DEFINITION
/**
 * - keys: `resource name string`
 * - values: `CS_ResourceData` data type
 * 
 * @typedef {Object<string, CS_ResourceData>} CS_Inventory_Resources
 * @typedef {Object} CS_ResourceData
 * @property {string} name
 * @property {number} amount
 * @property {string} type
 * @property {string} description
 * @property {number} dropChance
*/

//ATRIBUTE DEFINTION
/** 
 * @typedef {Object} CS_Attributes 
 * @property {number} vitality
 * @property {number} agility
 * @property {number} strenght
 * @property {number} intelligence
*/

//ATRIBUTE DEFINTION KV
/**
 * - keys: `CS_Attributes` properties
 * - values: `number`
 * 
 * @typedef {Object<string, number>} CS_Attributes_KV
*/

//STATS DEFINITION
/**
 * @typedef {Object} CS_Stats
 * @property {number} hp
 * @property {number} evasion
 * @property {number} fisicalDamage
 * @property {number} fisicalDefense
 * @property {number} magicalDamage
 * @property {number} magicalDefense
*/

//STATS DEFINITION
/**
 * - keys: `CS_Stats` properties
 * - values: `number`
 * 
 * @typedef {Object<string, number>} CS_Stats_KV
*/

//Player Payload
/**
 * @typedef {Object} CS_PlayerPayload
 * @property {boolean} registered
*/

//This empty export is just to expose these definitons to other files
const empty = {}
export default empty
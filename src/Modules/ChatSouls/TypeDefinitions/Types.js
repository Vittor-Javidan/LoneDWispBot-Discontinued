//ENITITY DATABASE DEFINITION
/**
 * keys: `entity name string`. Can be a viewer name, in the case of 
 * player database, or an enemy name, in the case of enemies database
 * 
 * WARNING: If you refactor properties of this type, keep in mind 
 * you have to change the already saved database structure for each entity. 
 * If you don't, you may get a `cannot read properties of undefined` error.
 * That's because the already saved database info will not have the same
 * data structure as the one being used in the source code.
 * 
 * @typedef {Object<string, CS_EntityData>} CS_Database
*/

//EQUIPMENT DATABASE DEFINITION
/**
 * - Keys: `database item name string`
 * 
 * @typedef {Object} CS_EquipmentDataBase
 * @property {Object<string, CS_Equipment_WeaponData>} longRangeWeapon
 * @property {Object<string, CS_Equipment_WeaponData>} meleeWeapon
 * @property {Object<string, CS_Equipment_ArmorData>} helmet
 * @property {Object<string, CS_Equipment_ArmorData>} bodyArmor
 * @property {Object<string, CS_Equipment_ArmorData>} gloves
 * @property {Object<string, CS_Equipment_ArmorData>} boots
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
*/

//ENITTY DATA SUBTYPES DEFINITION - ENTITY EQUIPMENT
/**
 * @typedef {Object} CS_Entity_Equipment
 * @property {CS_Equipment_WeaponData} longRangeWeapon
 * @property {CS_Equipment_WeaponData} meleeWeapon
 * @property {CS_Equipment_ArmorData} helmet
 * @property {CS_Equipment_ArmorData} bodyArmor
 * @property {CS_Equipment_ArmorData} gloves
 * @property {CS_Equipment_ArmorData} boots
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
 * - Keys: `resource name string`
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
 * - Keys: `ATTRIBUTE_TYPE ENUM`
 * @typedef {Object} CS_Attributes 
 * @property {number} vitality
 * @property {number} agility
 * @property {number} strenght
 * @property {number} intelligence
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

//Player Payload
/**
 * @typedef {Object} CS_PlayerPayload
 * @property {boolean} registered
*/

//This empty export is just to expose these definitons to other files
const empty = {}
export default empty
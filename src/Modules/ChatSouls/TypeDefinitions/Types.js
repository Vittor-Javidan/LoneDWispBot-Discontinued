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
 * @property {Object} WEAPONS
 * @property {Object<string, CS_Equipment_WeaponData>} WEAPONS.LONG_RANGE
 * @property {Object<string, CS_Equipment_WeaponData>} WEAPONS.MELEE
 * @property {Object} ARMORS
 * @property {Object<string, CS_Equipment_ArmorData>} ARMORS.HELMETS
 * @property {Object<string, CS_Equipment_ArmorData>} ARMORS.BODY
 * @property {Object<string, CS_Equipment_ArmorData>} ARMORS.GLOVES
 * @property {Object<string, CS_Equipment_ArmorData>} ARMORS.BOOTS
*/ 

// PLAYER STATE DEFINITION
/** 
 * @typedef {Object} playerState
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
*/

//ENITTY DATA SUBTYPES DEFINITION - ENTITY EQUIPMENT
/**
 * - keys: `EQUIPMENT_TYPE ENUM`
 * @typedef {Object<string, CS_Equipment_WeaponData | CS_Equipment_ArmorData >} CS_Entity_Equipment
*/

//ENITTY DATA SUBTYPES DEFINITION - ENTITY INVENTORY EQUIPMENT
/**
 * - keys: `EQUIPMENT_TYPE ENUM`
 * @typedef {Object<string, CS_Equipment_WeaponData[] | CS_Equipment_ArmorData[]>} CS_Inventory_Equipments
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

//ATRIBUTE DEFINTION
/** 
 * - Keys: `ATTRIBUTE_TYPE ENUM`
 * @typedef {Object<string, number>} CS_Attributes 
*/

//This empty export is just to expose these definitons to other files
const empty = {}
export default empty
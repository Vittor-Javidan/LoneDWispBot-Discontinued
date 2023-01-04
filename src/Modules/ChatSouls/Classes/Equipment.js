
/** @typedef {import('../TypeDefinitions/Types').CS_Attributes} CS_Attributes */
/** @typedef {import('../TypeDefinitions/Types').CS_Equipment_WeaponData} CS_Equipment_WeaponData */
/** @typedef {import('../TypeDefinitions/Types').CS_Equipment_ArmorData} CS_Equipment_ArmorData */

export default class Equipment {

    /**
     * @type {string}
     */
    name

    /**
     * - Keys: `ATTRIBUTE_TYPE ENUM`
     * @type {CS_Attributes}
     */
    multipliers
    
    /**
     * @type {string}
     */
    description

    /**
     * @param {CS_Equipment_WeaponData | CS_Equipment_ArmorData} Object 
     * @constructor
    */
    constructor(Object){
        this.name = Object.name
    }
}
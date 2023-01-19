
/** See `Types.js` to understand the types
 * @typedef {import("../../TypeDefinitions/Types").CS_Equipment_WeaponData} CS_Equipment_WeaponData
 * @typedef {import("../../TypeDefinitions/Types").CS_Equipment_ArmorData} CS_Equipment_ArmorData
*/

/**
 * @param {CS_Equipment_WeaponData | CS_Equipment_ArmorData} equipmentObject
 * @returns 
 */
export default function returnEquippingMessage(equipmentObject) {

    if(!equipmentObject.name) {
        throw Error(`ERROR: returnMenuMessageByType(): Equipmentd doens't have a name.`)
    }
    
    return `Você equipou ${equipmentObject.name}`
}

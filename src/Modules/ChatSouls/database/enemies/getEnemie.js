import deepCopy from '../../../../Utils/deepCopy'
import enemiesDataBase from './enemiesData'

/** See `Types.js` to understand the types
 * @typedef {import('../../TypeDefinitions/Types').CS_EntityData} CS_EntityData
*/

/**
 * @param {string} enemieName 
 * @param {string} mapArea
 * @returns {CS_EntityData}
*/
export default function getEnemie(enemieName, mapArea) {
    
    const mapNameKeys = Object.keys(enemiesDataBase)

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
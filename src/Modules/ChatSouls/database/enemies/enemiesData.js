import get_TEST_AREA_ENEMIES_DATA from './TEST_AREA/TEST_AREA_ENEMIES';
import get_THE_WOODS_ENEMIES_DATA from './THE_WOODS/THE_WOODS_ENEMIES';

/** See `Types.js` to understand the types
 * @typedef {import('../../TypeDefinitions/Types').CS_AreaMaps_Database} CS_AreaMaps_Database
*/

/**
 * @type {CS_AreaMaps_Database}
 */
const enemiesDataBase = {
    "testArea": get_TEST_AREA_ENEMIES_DATA(),
    "theWoods": get_THE_WOODS_ENEMIES_DATA()
}
export default enemiesDataBase

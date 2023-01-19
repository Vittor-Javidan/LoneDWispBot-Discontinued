import get_TEST_AREA_ENEMIES_DATA from './TEST_AREA/TEST_AREA_ENEMIES';
import get_THE_WOODS_ENEMIES_DATA from './THE_WOODS/THE_WOODS_ENEMIES';

/** Keys: `enemie name string`
 * @typedef {import('../../TypeDefinitions/Types').CS_AreaMaps_Database} CS_AreaMaps_Database
*/

/**
 * - Keys: `MAP_AREA ENUM` 
 * @type {CS_AreaMaps_Database}
 */
const enemiesDataBase = {
    "testArea": get_TEST_AREA_ENEMIES_DATA(),
    "theWoods": get_THE_WOODS_ENEMIES_DATA()
}
export default enemiesDataBase

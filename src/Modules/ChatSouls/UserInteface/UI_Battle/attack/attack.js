import Battle from "../../../Classes/Battle";
import enemieAdvantage from "./enemieAdvantage";
import playerAdvantage from "./playerAdvantage";

/**
 * @param {Battle} battleInstance
 * @param {Object} options
 * @param {number} options.dodgeWeight
*/
export default function attack(battleInstance, options) {

    options = checkOptions(options)
    
    const turnPreference = battleInstance.turn
    turnPreference === 1
        ? playerAdvantage(battleInstance, options)
        : enemieAdvantage(battleInstance, options)
}

/**
 * @param {Object} options
 * @param {number} options.dodgeWeight
 * @returns {{
 *      dodgeWeight: number
 * }}
 */
function checkOptions(options) {

    if(!options) {
        options = {
            dodgeWeight: 1
        }
    }

    if(!options.dodgeWeight) {
        options.dodgeWeight = 1
    }

    return options
}
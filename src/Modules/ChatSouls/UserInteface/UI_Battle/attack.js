import Battle from "../../Classes/Battle";
import enemieAdvantage from "./enemieAdvantage";
import playerAdvantage from "./playerAdvantage";

/**
 * @param {Battle} battleInstance
*/
export default function attack(battleInstance) {
    
    const turnPreference = battleInstance.turn
    turnPreference === 1
        ? playerAdvantage(battleInstance)
        : enemieAdvantage(battleInstance)
}

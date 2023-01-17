import Battle from "../../../Classes/Battle"
import Enemie from "../../../Classes/EntityChilds/Enemie"
import Player from "../../../Classes/EntityChilds/Player"
import didDodge from "./didDogge"

/**
 * @param {Battle} battleInstance
 * @param {object} o
 * @param {Player | Enemie} o.attacker
 * @param {Player | Enemie} o.defensor
 * @param {number} o.evasionWeight
 * @returns {string} action feedback message
 */
export default function attackAttempt(battleInstance, o) {

    const { attacker, defensor, evasionWeight } = o
    let message = ''
    
    //Dodge Phase =========================================================
    if(didDodge(battleInstance, {
        attacker: attacker,
        defensor: defensor,
        evasionWeight: evasionWeight
    })) {

        attacker instanceof Player
            ? message = `${message} Você errou o ataque. `
            : message = `${message} ${attacker.getName()} errou o ataque. `
        //

        return message
    }

    //Damage Phase ========================================================
    const rawDamage = battleInstance.calculateRawDamage({
        attacker: attacker,
        defender: defensor
    })

    defensor.inflictDamage(rawDamage)

    attacker instanceof Player
        ? message = `${message} ${defensor.getName()} sofreu ${rawDamage} de dano. `
        : message = `${message} você sofreu ${rawDamage} de dano. `
    //
    
    return message
}
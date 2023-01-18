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

        const emoji = `SirMad`
        const emoji_2 = `SirPrise`

        attacker instanceof Player
            ? message = `${message} ${emoji} Você errou o ataque `
            : message = `${message} ${emoji_2} ${attacker.getName()} errou o ataque `
        //

        return message
    }

    //Damage Phase ========================================================
    const rawDamage = battleInstance.calculateRawDamage({
        attacker: attacker,
        defender: defensor
    })

    const luck = Math.floor((Math.random() * 6) + 1)
    const effectiveDamage = Battle.returnEffectiveDamage(rawDamage, luck)

    defensor.inflictDamage(effectiveDamage)

    const emoji = `SirSword`
    const emoji_2 = `BibleThump`

    attacker instanceof Player
        ? message = `${message} ${emoji} ${defensor.getName()} sofreu ${effectiveDamage} de dano `
        : message = `${message} ${emoji_2} você sofreu ${effectiveDamage} de dano `
    //
    
    return message
}
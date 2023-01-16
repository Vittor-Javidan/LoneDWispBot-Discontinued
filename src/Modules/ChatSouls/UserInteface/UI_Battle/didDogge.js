import Battle from "../../Classes/Battle"
import Enemie from "../../Classes/EntityChilds/Enemie"
import Player from "../../Classes/EntityChilds/Player"

/**
 * @param {Battle} battleInstance
 * @param {object} o
 * @param {Player | Enemie} o.attacker
 * @param {Player | Enemie} o.defensor
 */
export default function didDodge(battleInstance, o) {

    const { attacker, defensor } = o

    return battleInstance.evasionEvent({
        from: defensor,
        against: attacker,
        evasionWeight: 1
    })
}
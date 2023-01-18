import Player from "../../Classes/EntityChilds/Player";
import startBattle from "../randomEvents/startBattle";

/**
 * @param {Player} playerInstance 
 */
export function explorationEvent(playerInstance) {

    startBattle(playerInstance)
}
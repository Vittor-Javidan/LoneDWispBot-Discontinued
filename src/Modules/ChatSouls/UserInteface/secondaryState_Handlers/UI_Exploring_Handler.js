import Player from "../../Classes/EntityChilds/Player";
import PLAYER_STATES from "../../Globals/PLAYER_STATES";
import UI_Battle from "../UI_Battle/UI_Battle";

import UI_Idle from "../UI_Idle/UI_Idle";

/**
 * Handle !cs play commands when the player has a primary state of "RESTING_ON_FIRE_PIT"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function UI_Exploring_Handler(data){

    const secondaryState = data.playerInstance.getSecondaryState()
    const exploringStates = PLAYER_STATES.EXPLORING.SECONDARY
    
    switch(secondaryState) {

        case exploringStates.IDLE: UI_Idle(data);break
        case exploringStates.HUNTING: UI_Battle(data, {
            fleeWeight: 1.25, 
            dodgeWeight: 0.5}
        );break
    }
}
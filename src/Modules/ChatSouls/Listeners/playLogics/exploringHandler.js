import Player from "../../Classes/EntityChilds/Player";
import CS_ENUM from "../../Classes/ENUM";

import hunting from "./Exploring/hunting";
import idle from "./Exploring/idle";

/**
 * Handle !cs play commands when the player has a primary state of "EXPLORING"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function exploring(data){

    const playerState = data.playerInstance.getCurrentState()

    switch (playerState.secondary) {
        
        case CS_ENUM.STATES.EXPLORING.SECONDARY.IDLE: idle(data); break
        case CS_ENUM.STATES.EXPLORING.SECONDARY.HUNTING: hunting(data); break
        case CS_ENUM.STATES.EXPLORING.SECONDARY.FORAGING: break
        case CS_ENUM.STATES.EXPLORING.SECONDARY.TRAVEL: break
    }
}
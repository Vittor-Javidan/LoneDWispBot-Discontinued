import ENUM from "../../Classes/ENUM";
import Player from "../../Classes/Player";
import idle from "./Exploring/idle";

/**
 * Handle !cs play commands when the player has a primary state of "EXPLORING"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function exploring(data){

    const playerState = data.playerInstance.getPlayerState()

    switch (playerState.secondary) {
        
        case ENUM.EXPLORING.SECONDARY.IDLE: idle(data); break
        case ENUM.EXPLORING.SECONDARY.HUNTING: break
        case ENUM.EXPLORING.SECONDARY.FORAGING: break
        case ENUM.EXPLORING.SECONDARY.TRAVEL: break
    }
}
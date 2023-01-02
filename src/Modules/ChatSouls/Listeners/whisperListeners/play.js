import ENUM from "../../Classes/ENUM";
import Player from "../../Classes/Player";
import exploring from "../playLogics/exploringHandler";
import resting from "../playLogics/restingHandler";

/**
 * Handle !cs play commands accoding to players primary state
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function play(data){

    const playerState = data.playerInstance.getCurrentState()
    
    switch (playerState.primary){
        case ENUM.RESTING.PRIMARY: resting(data); break
        case ENUM.EXPLORING.PRIMARY: exploring(data); break
    }
}
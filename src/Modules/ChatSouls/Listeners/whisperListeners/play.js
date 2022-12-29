import ENUM from "../../Classes/ENUM";
import Player from "../../Classes/Player";
import resting from "../playLogics/restingHandler";

/**
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function play(data){

    const playerState = data.playerInstance.getPlayerState()
    
    switch (playerState.primary){
        case ENUM.RESTING.PRIMARY: resting(data); break
    }
}
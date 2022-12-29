import ENUM from "../../Classes/ENUM";
import Player from "../../Classes/Player";
import resting from "../gameLogics/restingHandler";

/**
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function play(data){

    const playerState = data.playerInstance.getPlayerState()
    const playerName = data.playerInstance.getPlayerName()
    
    switch (playerState.primary){
        case ENUM.RESTING.PRIMARY: resting(data); break
    }
}
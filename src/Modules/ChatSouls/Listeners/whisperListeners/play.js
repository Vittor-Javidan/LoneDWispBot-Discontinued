import Player from "../../Classes/EntityChilds/Player"
import CHATSOULS_ENUM from "../../Classes/ENUM"
import exploring from "../playLogics/exploringHandler"
import resting from "../playLogics/restingHandler"

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
        case CHATSOULS_ENUM.STATES.RESTING.PRIMARY: resting(data); break
        case CHATSOULS_ENUM.STATES.EXPLORING.PRIMARY: exploring(data); break
    }
}
import Player from "../../Classes/EntityChilds/Player"
import PLAYER_STATES from "../../Globals/PLAYER_STATES"
import exploring from "../UI_Components/exploringHandler"
import firePit_UI_Handler from "../UI_Components/firePit_UI_Handler"

/**
 * Handle !cs play commands accoding to players primary state
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function gameUIHandler(data){

    const playerState = data.playerInstance.currentState
    
    switch (playerState.primary){
        case PLAYER_STATES.FIRE_PIT.PRIMARY: firePit_UI_Handler(data); break
        case PLAYER_STATES.EXPLORING.PRIMARY: exploring(data); break
    }
}
import Player from "../Classes/EntityChilds/Player";
import PLAYER_STATES from "../Classes/EntityChilds/PLAYER_STATES";
import UI_Exploring_Handler from "./secondaryState_Handlers/UI_Exploring_Handler";
import UI_FirePit_Handler from "./secondaryState_Handlers/UI_FirePit_Handler";
import { sendMessage_UI_FirePit } from "./sendMessage_Customized/sendMessage_UI_firePit";

/**
 * Handle !cs play commands accoding to players primary state
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function gameUIHandler(data){

    const playerState = data.playerInstance.currentState

    try {
        
        switch (playerState.primary){
            case PLAYER_STATES.FIRE_PIT.PRIMARY:   UI_FirePit_Handler(data)     ;break
            case PLAYER_STATES.EXPLORING.PRIMARY:  UI_Exploring_Handler(data)   ;break
        }

    } catch (error) {
        
        console.log(error)
        sendMessage_UI_FirePit(
            data.playerInstance,
            `Ocorreu um erro no jogo e você foi mandado de volta a fogueira.`
        )

        data.playerInstance.ressurrect()
        data.playerInstance.recoverHP()
        data.playerInstance.currentState = {
            primary: PLAYER_STATES.FIRE_PIT.PRIMARY,
            secondary: PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT
        }
    }
}
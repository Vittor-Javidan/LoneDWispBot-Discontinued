import sendMessage from "../../../../../Twitch/sendMessageHandler";
import Battle from "../../../Classes/Battle";
import PLAYER_STATES from "../../../Classes/EntityChilds/PLAYER_STATES";
import { sendMessage_UI_FirePit } from "../../sendMessage_Customized/sendMessage_UI_firePit";

/**
 * @param {Battle} battleInstance
 * @param {string} FINAL_MESSAGE
 */
export default function playerDied(battleInstance, FINAL_MESSAGE) {

    //TODO: Refactor this function

    const playerInstance = battleInstance.playerInstance
    
    //Feedback message
    const playerName = playerInstance.getName()
    const souls = playerInstance.getSouls()
    FINAL_MESSAGE = `
    VOCÊ MORREU!! e ${souls} almas foram perdidas. 
    últimos momentos: ${FINAL_MESSAGE}.
    Você voltou a fogueira
    `
    
    sendMessage_UI_FirePit(playerInstance, FINAL_MESSAGE)
    sendMessage(`@${playerName} morreu!!! ${souls} almas foram perdidas *-*`)

    playerInstance.setSouls(0)
    playerInstance.recoverHP()
    playerInstance.ressurrect()
    playerInstance.save()
    playerInstance.currentState = {
        primary: PLAYER_STATES.FIRE_PIT.PRIMARY,
        secondary: PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT
    }
    Battle.deleteBattle(playerInstance.getName())
}
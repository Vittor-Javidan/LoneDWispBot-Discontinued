import Battle from "../../Classes/Battle";
import PLAYER_STATES from "../../Classes/EntityChilds/PLAYER_STATES";
import { sendMessage_UI_FirePit } from "../sendMessage_Customized/sendMessage_UI_firePit";

/**
 * @param {Battle} battleInstance
 * @param {string} FINAL_MESSAGE
 */
export default function playerDied(battleInstance, FINAL_MESSAGE) {

    const playerInstance = battleInstance.playerInstance
    playerInstance.currentState = {
        primary: PLAYER_STATES.FIRE_PIT.PRIMARY,
        secondary: PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT
    }

    FINAL_MESSAGE = `
        VOCÊ MORREU!! e ${playerInstance.souls} almas foram perdidas. 
        últimos momentos: ${FINAL_MESSAGE}.
        Você voltou a fogueira
    `

    sendMessage_UI_FirePit(playerInstance, FINAL_MESSAGE)

    playerInstance.souls = 0
    playerInstance.recoverHP()
    playerInstance.ressurrect()
    playerInstance.save()
    Battle.deleteBattle(playerInstance.name)
}
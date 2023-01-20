import sendMessage from "../../../../../Twitch/sendMessageHandler";
import Battle from "../../../Classes/Battle";
import PLAYER_STATES from "../../../Globals/PLAYER_STATES";
import { sendMessage_UI_FirePit } from "../../sendMessage_Customized/sendMessage_UI_firePit";

/**
 * @param {Battle} battleInstance
 * @param {string} FINAL_MESSAGE
 */
export default function playerDied(battleInstance, FINAL_MESSAGE) {

    const playerInstance = battleInstance.playerInstance
    const playerName = playerInstance.getName()
    const souls = playerInstance.getSouls()

    const emoji = `PowerUpL`
    const emoji_2 = `PowerUpR`

    FINAL_MESSAGE = `
        ${emoji} VOCÊ MORREU!! ${emoji_2} e ${souls} almas foram perdidas. 
        últimos momentos: ${FINAL_MESSAGE}.
        Você voltou a fogueira
    `
    sendMessage_UI_FirePit(playerInstance, FINAL_MESSAGE)
    sendMessage(`${emoji} @${playerName} morreu!!! ${emoji_2} ${souls} almas foram perdidas *-*`)

    playerInstance.setSouls(0)
    playerInstance.recoverHP()
    playerInstance.ressurrect()
    playerInstance.save()
    playerInstance.setCurrentState({
        primary: PLAYER_STATES.FIRE_PIT.PRIMARY,
        secondary: PLAYER_STATES.FIRE_PIT.SECONDARY.RESTING_ON_FIRE_PIT
    })
    Battle.deleteBattle(playerInstance.getName())
}
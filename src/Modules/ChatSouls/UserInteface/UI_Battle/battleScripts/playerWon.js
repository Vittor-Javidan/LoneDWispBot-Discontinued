import Battle from "../../../Classes/Battle"
import PLAYER_STATES from "../../../Globals/PLAYER_STATES"
import { sendMessage_UI_Idle } from "../../sendMessage_Customized/sendMessage_UI_Idle"

/**
 * @param {Battle} battleInstance
 * @param {string} FINAL_MESSAGE
 */
export default function playerWon(battleInstance, FINAL_MESSAGE) {

    const playerInstance = battleInstance.playerInstance
    const enemieInstance = battleInstance.enemieInstance
    const souls = enemieInstance.getSouls()
    
    playerInstance.secondaryState = PLAYER_STATES.EXPLORING.SECONDARY.IDLE
    battleInstance.calculateRewards()
    const resourcesEarner = battleInstance.returnResourcesRewardsString()

    const emoji = `SirUwU`

    FINAL_MESSAGE = `${emoji} VOCÊ GANHOU!! e recebeu ${souls} almas. ${resourcesEarner} . últimos momentos: ${FINAL_MESSAGE}`
    sendMessage_UI_Idle(playerInstance, FINAL_MESSAGE)

    playerInstance.save()
    Battle.deleteBattle(playerInstance.getName())
}
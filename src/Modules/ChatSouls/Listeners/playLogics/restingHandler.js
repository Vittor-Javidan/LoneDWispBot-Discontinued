import ENUM from "../../Classes/ENUM"
import Player from "../../Classes/Player"

import attributeUpgrade from "./Resting/attributeUpgrade"
import equipament from "./Resting/equipment"
import justResting from "./Resting/justResting"
import statsMenu from "./Resting/statsMenu"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function resting(data){

    const playerState = data.playerInstance.getPlayerState()
    
    switch(playerState.secondary) {
        
        case ENUM.RESTING.SECONDARY.JUST_RESTING: justResting(data); break
        case ENUM.RESTING.SECONDARY.STATS_MENU: statsMenu(data); break    
        case ENUM.RESTING.SECONDARY.ATRIBUTE_UPGRADE: attributeUpgrade(data); break
        case ENUM.RESTING.SECONDARY.EQUIPMENT: equipament(data); break
    }
}
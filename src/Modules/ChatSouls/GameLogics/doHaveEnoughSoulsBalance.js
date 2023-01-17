import Player from "../Classes/EntityChilds/Player";


/**
 * Handles the command === "!cs" inside UI_AttributeUpgrade function
 * 
 * @param {Player} playerInstance
 * @returns {boolean} `True` If player has enough souls to upgrade an attribute, `False` otherwise
 */
export default function doHaveEnoughSoulsBalance(playerInstance) {

    const souls = playerInstance.getSouls()
	const upgradeCost = playerInstance.getUpgradeCost()
	const soulsBalance_AfterUpgrade = souls - upgradeCost

    if(soulsBalance_AfterUpgrade < 0 ) 
        return false
    return true
}
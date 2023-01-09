import CS_ENUM from "../../Classes/ENUM"
import consultAttributesDescription from "../../GameLogics/consultAttributesDescription"
import to_StatisticsMenu from "../../GameLogics/SendPlayer/to_StatisticsMenu"
import upgradeAttributeByType from "../../GameLogics/upgradeAttributeByType"
import { sendMessage_UI_AttributeUpgradeMenu } from "../sendMessage_Customized/sendMessage_UI_AttributeUpgradeMenu"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "ATRIBUTE_UPGRADE"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function UI_AttributeUpgradeMenu(data) {

    const commandWord = data.message.split(" ")[0]
    const playerInstance = data.playerInstance
    
	if (commandWord === '!cs') {
        sendMessage_UI_AttributeUpgradeMenu(data.playerInstance, `Você está no menu de attributos`)
		return
	}
    
    const attributeTypes = CS_ENUM.KEYS.CS_ATTRIBUTES

	const commandCode = Number(commandWord)
	switch(commandCode){
				
		case 0: to_StatisticsMenu(playerInstance, `Você voltou ao menu de estatísticas`);break

		case 1: upgradeAttributeByType({
            playerInstance: playerInstance,
            attributePicked: attributeTypes.VITALITY,
            menuMessage: `VITALIDADE AUMENTADA!`
        });break
        
		case 2: upgradeAttributeByType({
            playerInstance: playerInstance,
            attributePicked: attributeTypes.AGILITY,
            menuMessage: `AGILIDADE AUMENTADA!`
        });break

        case 3: upgradeAttributeByType({
            playerInstance: playerInstance,
            attributePicked: attributeTypes.STRENGHT,
            menuMessage: `FORÇA AUMENTADA!`
        });break

        case 4: upgradeAttributeByType({
            playerInstance: playerInstance,
            attributePicked: attributeTypes.INTELLLIGENCE,
            menuMessage: `INTELIGÊNCIA AUMENTADA!`
        });break

		case 5: consultAttributesDescription(data, `O bônus de cada um dos atributos são:`); break

		default: sendMessage_UI_AttributeUpgradeMenu(data.playerInstance, `Código inválido`)
	}
}
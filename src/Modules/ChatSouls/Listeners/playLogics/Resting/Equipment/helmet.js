import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import ENUM from "../../../../Classes/ENUM"
import Helmet from "../../../../Classes/EquipmentChilds/Helmet"
import Player from "../../../../Classes/Player"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_HELMET"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_Helmet(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getPlayerName()
	const equippedArmor = playerInstance.getPlayerEquipment().helmet

	// HELMET EQUIPMENT MENU =======================================================================
	// If "!cs play"
	if (words.length === 2) {
		sendMessage(
			`/w ${userName} Você está no menu de capacetes
			| 0. Voltar
			| 1. Equipar outro capacete
			| 2. Ver detalhes do capacete
			| 3. Desequipar capacete
			|`
		)
    }

	// if "!cs play <itemCode>"
	if (words.length === 3) {

		let itemCode = Number(words[2])

		switch (itemCode) {

            //GO BACK TO EQUIPMENT MENU ================================================================
			case 0:
				playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT)
				sendMessage (
					`/w ${userName} Você voltou a olhar seus equipamento. 
                    | 0. Voltar
                    | 1. Arma Corpo a Corpo
                    | 2. Arma Longo alcance
                    | 3. Capacetes 
                    | 4. Armaduras 
                    | 5. Luvas 
                    | 6. Botas 
                    | 7. Summário Geral (EM progresso)
                    |`
				)
				break
			//

            // EQUIP ANOTHER HELMET ====================================================================
			case 1:

				const inventory_Helmets = playerInstance.getPlayerInvetoryEquipment().helmet
				if (!inventory_Helmets) {
					sendMessage(`/w @${userName} Seu inventário está vazio.`)
                    return
				}

				playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT_HELMET_INVENTORY)
                sendMessage(
                    `/w @${userName} Qual capacete deseja equipar?: | 0. Voltar ${playerInstance.getInventoryEquipmentByType_StringFormat(ENUM.EQUIPMENT_TYPES.HELMET)}`
                )
				break
			//

            // CHECK WEAPON DETAILS ====================================================================
			case 2:

				if(!equippedArmor) {
					sendMessage(`/w @${userName} você está sem capacete equipado`)
					return
				}
				new Helmet(equippedArmor).printDetailsTo(userName)
				break
			//

            // UNEQUIP HELMET ======================================================================
            case 3:
                if(!equippedArmor){
                    sendMessage(`/w @${userName} você não possui nenhum capacete equipado`)
                    return
                }
                playerInstance.unequip(ENUM.EQUIPMENT_TYPES.HELMET)
				break
			//

            default:
                sendMessage(`/w ${userName} Código inválido`)
                break
            //
        }
    }
}
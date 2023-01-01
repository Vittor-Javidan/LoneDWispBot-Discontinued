import sendMessage from "../../../../../../Twitch/sendMessageHandler"
import ENUM from "../../../../Classes/ENUM"
import MeleeWeapon from "../../../../Classes/EquipmentChilds/MeleeWeapon"
import Player from "../../../../Classes/Player"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "EQUIPMENT_MELEE"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function equipment_Melee(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
	const userName = playerInstance.getPlayerName()
    const equippedWeapon = playerInstance.getPlayerEquipment().meleeWeapon

    // MELEE EQUIPMENT MENU ============================================================================
    // If "!cs play"
	if (words.length === 2) {
        sendMessage(
            `/w ${userName} Você está no menu de armas corpo a corpo
            | 0. Voltar
            | 1. Equipar outra arma
            | 2. Ver detalhes da arma
            | 3. Desequipar Arma
            |`
        )
    }

	// if "!cs play <itemCode>"
	if (words.length === 3) {
		
		let itemCode = Number(words[2])
    
        switch (itemCode) {

            //GO BACK EQUIPMENT MENU ===================================================================
            case 0:
                playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT)
                sendMessage(
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

            // EQUIP ANOTHER MELEE WEAPON ==============================================================
            case 1:
                
                const inventoryWeapons_Melee = playerInstance.getPlayerInvetoryEquipment().meleeWeapon
                if (!inventoryWeapons_Melee) {
                    sendMessage(`/w @${userName} Seu inventário está vazio.`)
                    return
                }
                    
                playerInstance.setPlayerState_Secondary(ENUM.RESTING.SECONDARY.EQUIPMENT_MELEE_INVENTORY)
                sendMessage(
                    `/w @${userName} Qual arma deseja equipar?: | 0. Voltar ${playerInstance.getInventoryEquipmentByType_StringFormat(ENUM.EQUIPMENT_TYPES.MELEE_WEAPON)}`
                )
                break
            //

            // CHECK WEAPON DETAILS ====================================================================
            case 2:
                
                if(!equippedWeapon) {
                    sendMessage(`/w @${userName} você está sem arma equipada`)
                    return
                }
                new MeleeWeapon(equippedWeapon).printDetailsTo(userName)
                break
            //
                
            // UNEQUIP MELEE WEAPON ===============================================================
            case 3:
                
                if(!equippedWeapon){
                    sendMessage(`/w @${userName} você não possui nenhuma arma equipada`)
                    return
                }
                playerInstance.unequip(ENUM.EQUIPMENT_TYPES.MELEE_WEAPON)
                break
            //

            default:
                sendMessage(`/w ${userName} código inválido`)
                break
            // 
        }
    }
}
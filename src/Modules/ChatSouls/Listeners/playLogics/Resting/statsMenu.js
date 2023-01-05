import sendMessage from "../../../../../Twitch/sendMessageHandler"
import Player from "../../../Classes/EntityChilds/Player"
import ENUM from "../../../Classes/ENUM"

/**
 * Handle !cs play commands when the player has a primary state of "RESTING" and secondary state of "STATS_MENU"
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function statsMenu(data) {

    const words = data.message.split(" ")
	const playerInstance = data.playerInstance
    
	const userName = playerInstance.getName()
	const level = playerInstance.getLevel()
	const souls = playerInstance.getSouls()
	const upgradeCost = playerInstance.getUpgradeCost()
    const playerAttributes = playerInstance.getAttributes()

    // If "!cs"
	if (words.length === 1) {
        sendMessage(
            `/w ${userName} Você está no menu de estatísticas: 
            | 0. Voltar 
            | 1. Ver Atributos 
            | 2. Upar Atributos 
            |`
        )
        return
    }

	// if "!cs <itemCode>"
	if (words.length === 2) {

        const itemCode = Number(words[1])

        switch (itemCode) {

            case 0:
                playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.JUST_RESTING)
                sendMessage(
                    `/w ${userName} Você está descansando em uma fogueira. oque deseja fazer?: 
                    | 1. Statísticas 
                    | 2. Ver Equipamento 
                    | 3. Levantar da fogueira 
                    |`
                )
                break
            //

            case 1:
                sendMessage(
                    `/w ${userName} seus atributos são: 
                    | Vitalidade: ${playerAttributes.vitality} 
                    | Agilidade: ${playerAttributes.agility} 
                    | Força: ${playerAttributes.strenght} 
                    | Inteligência: ${playerAttributes.intelligence} |`
                )
                break
            //

            case 2:
				playerInstance.setSecondaryState(ENUM.RESTING.SECONDARY.ATRIBUTE_UPGRADE)
				sendMessage(
                    `/w ${userName} Você está no menu de atributos: 
                    | Level: ${level} 
                    | Almas: ${souls} 
                    | Custo Upgrade: ${upgradeCost} almas 
                    | 0. Voltar 
                    | 1. UP Vitalidade 
                    | 2. UP Agilidade 
                    | 3. UP Força 
                    | 4. UP Inteligência 
                    | 5. Descrições Atributos 
                    |`)
				break                
            //

			default:
				sendMessage(`/w ${userName} opção inválida`)
				break
			//            
        }
    }
}
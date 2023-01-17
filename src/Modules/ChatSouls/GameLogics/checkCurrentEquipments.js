import Player from "../Classes/EntityChilds/Player";
import { sendMessage_UI_EquipmentsMenu } from "../UserInteface/sendMessage_Customized/sendMessage_UI_EquipmentsMenu";

/**
 * Handles the commandCode === 7 inside UI_Equipments_Menu function
 * 
 * @param {Object} data
 * @param {Player} data.playerInstance
 * @param {string} data.message
 */
export default function checkCurrentEquipments(data, menuMessage) {  
    const message = buildMessage(data.playerInstance)
    sendMessage_UI_EquipmentsMenu(data.playerInstance, `${menuMessage} - ${message} `)
}

/**
 * @param {Player} playerInstance 
 * @returns 
 */
export function buildMessage(playerInstance) {
    
    const playerEquipments = playerInstance.getCurrentEquipment()
    const playerEquipmentProperties = Object.keys(playerEquipments)
    const playerEquipmentArray = Object.values(playerEquipments)
    
    let naked = true
    
    for(let i = 0; i < playerEquipmentArray.length; i++) {
        if(playerEquipmentArray[i].name){
            naked = false
        }
    }
    
    if(naked) {
        return `Você está completamente nu!! Shame on you`
    }
    
    let equipmentString = 'Atualmente você está equipando: '
    for (let i = 0; i < playerEquipmentProperties.length; i++) {

        if(playerEquipments[playerEquipmentProperties[i]].name) {
            equipmentString += `${playerEquipments[playerEquipmentProperties[i]].name}, `
        }
    }
    equipmentString = equipmentString.slice(0, -2)

    return equipmentString
}
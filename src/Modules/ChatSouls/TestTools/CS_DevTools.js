import Battle from "../Classes/Battle";
import Player from "../Classes/EntityChilds/Player";

export class CS_DevTools {

    static importantReferences(){

        return {
            __PlayerDataBase__: Player.getDatabase(),
            __OnlinePlayers__: Player.getOnlinePlayers(),
            __Battle__: Battle.battlesList
        }
    }
}
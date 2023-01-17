import Battle from "../Classes/Battle";
import Player from "../Classes/EntityChilds/Player";

export class CS_DevTools {

    static importantReferences(){

        return {
            __PlayerDataBase__: Player.database,
            __OnlinePlayers__: Player.onlinePlayers,
            __Battle__: Battle.battlesList
        }
    }
} 
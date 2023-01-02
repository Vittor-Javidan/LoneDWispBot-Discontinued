import theWoodsHuntEvent from "../Events/theWoodsHuntEvent";
import Player from "./EntityChilds/Player";
import ENUM from "./ENUM";

export default class Exploring {

    /**
     * start a hunt event according to the current player map area
     * @param {Player} playerInstance
     * @returns {void}
     */
    static huntSomething(playerInstance){

        const mapArea = playerInstance.getCurrentLocation()
        
        switch (mapArea) {
            case ENUM.MAP_AREAS.THE_WOODS: theWoodsHuntEvent(playerInstance); break
        } 
    }
}
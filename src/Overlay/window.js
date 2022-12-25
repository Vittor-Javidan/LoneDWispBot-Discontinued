import env from '../env'
import { app, BrowserWindow } from 'electron'

//OVERLAY ==========================================================================
/* 
    to make this overlay worth it, you need the "see through windows" open source application, by MOBZystem: https://www.mobzystems.com/tools/seethroughwindows.aspx
    this application makes every windows that you want an actuall overlay, just by having the window selected and pressing a shortcut of your desire.

    You can control transparent through the app, but the idea is to have actuall transparent html, like the one streamelements provide, or if you want to make your own
    overlay by just using HTML and CSS. Whatever you prefer.

    My personal preference will be to make my own html and css file, since i know how to make things draggable in html. So i can ajust in real time in any game.
*/

/** ====================================================
 * createWindow creates a new browser window with specified dimensions and transparency.
 * 
 * @returns {void}
 */
export default function createWindow() {

    let myWindow

    app.on('ready', () => {

        myWindow = new BrowserWindow({
            width: 1920,
            height: 1040,
            frame: false,
            transparent: true
        })
    
        /**
         * Use your html url here, it can be a overlay link from streamelements
         * for example, or a local directory.
         */
        myWindow.loadURL(env.OVERLAY_URL) 
    })
}


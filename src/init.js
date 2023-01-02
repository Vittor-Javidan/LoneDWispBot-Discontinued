import createWindow from "./Overlay/window"
import twitchClient from "./Twitch/twitchClient"

// Initialize the twitch client.
twitchClient()

// Create the overlay window.
createWindow()
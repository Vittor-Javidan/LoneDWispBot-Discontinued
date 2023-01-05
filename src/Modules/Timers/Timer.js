import sendMessage from "../../Twitch/sendMessageHandler";

export default class Timer {

    timer

    constructor(message, interval_Minutes, timeLimit_Minutes) {

        console.log('entrou aqui')

        this.timer = setInterval(() => {
            console.log(`timer iniciado com ${interval_Minutes} minutos`)
            sendMessage(message)
        }, interval_Minutes * 60 * 1000)

        setTimeout(()=>{
            console.log(`timer expira com ${timeLimit_Minutes} minutos`)
            clearInterval(this.timer)
        }, timeLimit_Minutes * 60 * 1000)
    }
}
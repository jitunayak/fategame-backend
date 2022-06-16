import { WebSocketServer, WebSocket } from 'ws'
import Express from 'express'
import { acceptBetting, startGame } from './functions_coin'
import cors from 'cors'
import bodyParser from 'body-parser'
import expressWs from 'express-ws'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
dotenv.config({
    path: resolve(__dirname, `./../env/${process.env.NODE_ENV}.env`),
})

const { app } = expressWs(Express())
let webscocket: any = null

app.use(bodyParser.json())
app.use(cors())

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        webscocket = ws
        console.log(msg)
        startGame()
    })
    console.log('socket created')
})

export function sendWSMessage(input: string) {
    try {
        webscocket.send(JSON.stringify(input))
    } catch (err) {
        console.log(err)
    }
}
app.get('/', (req, res) => {
    res.status(200).json('Welcome to fatagame !!')
})

app.post('/api/v1/coin', (req, res) => {
    // webscocket.send("helllo " + new Date().toISOString());
    try {
        const betting = acceptBetting(req.body)
        res.status(200).json({
            time: new Date().toISOString(),
            received: betting,
        })
    } catch (err) {
        console.log('Error in ws-new / api/v1/coin -POST method', err)
        res.status(500).json(err)
    }
})

app.listen(3000, () => {
    console.log(`App Server started 3000`)
})

// WEBSOCKET CLIENT
//const ws = new WebSocket("ws://13.126.249.51:8080");
const ws = new WebSocket('ws://localhost:3000', 'protocol')
ws.on('open', function open() {
    ws.send('client something')
})

ws.on('message', function message(data) {
    console.log('client received: %s', data)
})

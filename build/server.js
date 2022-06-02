'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.sendWSMessage = void 0
const ws_1 = require('ws')
const express_1 = __importDefault(require('express'))
const functionsCoin_1 = require('./functionsCoin')
const cors_1 = __importDefault(require('cors'))
const body_parser_1 = __importDefault(require('body-parser'))
const app = (0, express_1.default)()
app.use(body_parser_1.default.json())
app.use((0, cors_1.default)())
const wss = new ws_1.WebSocketServer({ port: 8080 })
let webscocket = null
wss.on('connection', (wslocal) => {
    webscocket = wslocal
    console.log('WebSocket started 8080')
    ;(0, functionsCoin_1.startGame)()
})
function sendWSMessage(input) {
    try {
        webscocket.send(JSON.stringify(input))
    } catch (err) {
        console.log(err)
    }
}
exports.sendWSMessage = sendWSMessage
app.post('/api/v1/coin', (req, res) => {
    // webscocket.send("helllo " + new Date().toISOString());
    try {
        const betting = (0, functionsCoin_1.acceptBetting)(req.body)
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
const ws = new ws_1.WebSocket('ws://localhost:8080', 'protocol')
ws.on('open', function open() {
    ws.send('client something')
})
ws.on('message', function message(data) {
    console.log('client received: %s', data)
})
//# sourceMappingURL=server.js.map

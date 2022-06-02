'use strict'
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value)
                  })
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
Object.defineProperty(exports, '__esModule', { value: true })
exports.acceptBetting = exports.startGame = void 0
const uuid_1 = require('uuid')
const server_js_1 = require('./server.js')
let totalBetHead
let totalBetTail
let priceOnHead
let priceOnTail
let winner
let gameId
let stage = 0
const jsonn = {}
const START_TIMEOUT = 5000
const BET_TIMEOUT = 15000
const CALCULATE_TIMEOUT = 1000
const RESULT_TIMEOUT = 5000
// startGame();
function startGame() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Coin Game Started ${new Date().toISOString()}`)
        setTimeout(() => {
            stage = 1
            console.log('Initialization completed')
            bettingTime()
        }, START_TIMEOUT)
        gameId = (0, uuid_1.v4)()
        stage = 0
        totalBetHead = 0
        totalBetTail = 0
        priceOnHead = getRndInteger(20000, 47801)
        priceOnTail = getRndInteger(20000, 47801)
        console.log(`Game : ${gameId} started `)
    })
}
exports.startGame = startGame
/**
 localhost:8000/api/v1/coin
 Header: Bearer Token
 {
    "amt" : "2000",
    "side": "H",
    "userId": "121244"
}

LOGIC
if stage = 0 reject
if stage = 1 call accept betting

RETURN
{
    "stage" : "1",
    "msg":"",
    "time" : "time",
    
}
*/
function bettingTime() {
    setTimeout(() => {
        console.log(`Betting is closed ${new Date().toISOString()} `)
        winnerCalculation()
    }, BET_TIMEOUT)
    //  acceptBetting(getRndInteger(100, 10000), "T", "123");
    //  acceptBetting(getRndInteger(100, 10000), "H", "124");
    //  acceptBetting(getRndInteger(100, 10000), "T", "1223");
    //  acceptBetting(getRndInteger(1000, 5000), "H", "1243");
    //  acceptBetting(getRndInteger(100, 10000), "H", "122344");
    //  acceptBetting(getRndInteger(1200, 2000), "T", "122233");
}
function acceptBetting(bettingDetails) {
    // store request in database;
    //deduct amt from userid wallet
    if (stage != 1) {
        return false
    }
    try {
        const { amt, side, userId } = bettingDetails
        side === 'H'
            ? ((priceOnHead = priceOnHead + amt),
              (totalBetHead = totalBetHead + amt))
            : ((priceOnTail = priceOnTail + amt),
              (totalBetTail = totalBetTail + amt))
        //Push data update {priceOnHead,priceOnTail} to clients
        console.log(`Betting Accepted for ${userId} with ${amt} for ${side}`)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
exports.acceptBetting = acceptBetting
function winnerCalculation() {
    stage = 2
    //10sec total===
    winner = totalBetHead > totalBetTail ? 'T' : 'H'
    setTimeout(() => {
        console.log(`Winner calculation started ${new Date().toISOString()}`)
        showResult()
    }, CALCULATE_TIMEOUT)
}
function showResult() {
    //Push winner
    stage = 3
    jsonn.data = { winner: winner }
    //socket.sendMessage(JSON.stringify(jsonn));
    ;(0, server_js_1.sendWSMessage)(jsonn)
    console.log(`\n\nWINNER ${winner === 'T' ? 'Tail' : 'Head'} 🥳`)
    console.log(`\n\n 🪙 Total Bet On \nHEAD ${priceOnHead}, REAL_HEAD ${totalBetHead} 🪙🪙 \n
    TAIl ${priceOnTail}, REAL_TAIL ${totalBetTail} 🪙🪙 \n\n
    `)
    updateStreak()
    rewardWinners()
    setTimeout(() => {
        startGame()
    }, RESULT_TIMEOUT)
}
function updateStreak() {
    //update streak;
    //push new ui update
}
function rewardWinners() {
    //get amt,userId from trans_table where gameid=gameId && side=winner;
    //update wallet_balance = amt*2, where userid = userId;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function setData() {}
//# sourceMappingURL=functionsCoin.js.map

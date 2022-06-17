import * as dotenv from 'dotenv'
import { resolve } from 'path'

let path: any
//dotenv.config()

const env = process.env.NODE_ENV
switch (env) {
    case 'dev': {
        path = resolve(__dirname, `./../env/${process.env.NODE_ENV}.env`)
        break
    }
    case 'prod': {
        break
    }
    default:
        throw new Error('No Envrionemt is specified')
}
dotenv.config({ path })
export const CONFIG = {
    MONGO_URI: process.env.MONGO_URI || 'No_MONGO_URI',
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    WS_URL: process.env.WS_URL || 'No_WS_URL',
}

console.log(CONFIG.MONGO_URI, CONFIG.ENV, CONFIG.PORT)

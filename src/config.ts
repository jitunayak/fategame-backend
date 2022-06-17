import * as dotenv from 'dotenv'
import { resolve } from 'path'

let path: string
dotenv.config()

export async function loadConfiguration() {
    const env = process.env.NODE_ENV
    switch (env) {
        case 'dev': {
            path = resolve(__dirname, `./../env/${process.env.NODE_ENV}.env`)
            console.log(process.env.MONGO_URI)
            break
        }
        case 'prod': {
            break
        }
        default:
            throw new Error('No Envrionemt is specified')
    }
    dotenv.config({ path: path })
}

export const CONFIG = {
    MONGO_URI: process.env.MONGO_URI ?? '',
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ?? 3000,
}

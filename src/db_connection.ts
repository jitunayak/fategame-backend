import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
dotenv.config({
    path: resolve(__dirname, `./../env/${process.env.NODE_ENV}.env`),
})
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = process.env.MONGO_URI ?? ''
const client = new MongoClient(uri)

async function getConnection() {
    try {
        await client.connect()
        console.log('Connected to Mongo DB server')
        const dbconnection = await client.db('gin')
        return dbconnection
    } catch (e) {
        console.error(e)
    }
}

export default getConnection

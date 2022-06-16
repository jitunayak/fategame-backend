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

export class DbConnection {
    private URI = process.env.MONGO_URI ?? ''
    private client = new MongoClient(this.URI)

    constructor() {
        this.client.connect((err) => {
            if (err) {
                console.error(err)
            }
            console.log('Connected to MongoDB')
        })
    }

    getClient() {
        return this.client.db('fategame')
    }

    saveToCollection(collectionName: string, payload: any) {
        this.client
            .db('fategame')
            .collection(collectionName)
            .insertOne(payload)
            .catch((err) => {
                console.error(err)
                throw new Error(err.message)
            })
    }
}

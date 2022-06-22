import { MongoClient } from 'mongodb'
import { CONFIG } from './config'

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */

export class DbConnection {
    private URI = CONFIG.MONGO_URI as string
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

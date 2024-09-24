import { MongoClient, Db, Collection, WithId } from 'mongodb'
import { Cart } from '../models/carts.js'
const con: string | undefined = process.env.CONNECTION_STRING

async function getAllCart(): Promise<WithId<Cart>[]> {
  if (!con) {
    console.log('No connection string')
    throw new Error('No connection string')
  }
  const client: MongoClient = await MongoClient.connect(con)
  const db: Db = await client.db('CSSkinsDB')
  const col: Collection<Cart> = db.collection<Cart>('cart')

  const result: WithId<Cart>[] = await col.find({}).toArray()
  return result
}

export { getAllCart }

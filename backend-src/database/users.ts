import { MongoClient, Db, Collection, WithId } from 'mongodb'
import { User } from '../models/users.js'
const con: string | undefined = process.env.CONNECTION_STRING

async function getAllUser(): Promise<WithId<User>[]> {
  if (!con) {
    console.log('No connection string')
    throw new Error('No connection string')
  }
  const client: MongoClient = await MongoClient.connect(con)
  const db: Db = await client.db('CSSkinsDB')
  const col: Collection<User> = db.collection<User>('users')

  const result: WithId<User>[] = await col.find({}).toArray()
  return result
}

export { getAllUser }

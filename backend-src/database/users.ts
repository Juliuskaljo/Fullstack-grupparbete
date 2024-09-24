import { MongoClient, Db, Collection, WithId } from 'mongodb'
import { User } from '../models/users.js'
import { connectToDatabase } from './db.js'

async function getAllUser(): Promise<WithId<User>[]> {
  const db: Db = await connectToDatabase()
  const col: Collection<User> = db.collection<User>('users')

  const result: WithId<User>[] = await col.find({}).toArray()
  return result
}

export { getAllUser }

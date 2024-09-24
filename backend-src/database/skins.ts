import { Collection, WithId, Db } from 'mongodb'
import { Skin } from '../models/skin.js'
import { connectToDatabase } from './db.js'

async function getAllSkins(): Promise<WithId<Skin>[]> {
  const db: Db = await connectToDatabase()
  const col: Collection<Skin> = db.collection<Skin>('csskins')

  const result: WithId<Skin>[] = await col.find({}).toArray()
  return result
}

export { getAllSkins }

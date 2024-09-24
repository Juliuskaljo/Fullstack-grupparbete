import { MongoClient, Db, Collection, WithId } from 'mongodb'
import { Skin } from '../models/skin.js'

const con: string | undefined = process.env.CONNECTION_STRING

async function getAllSkins(): Promise<WithId<Skin>[]> {
  if (!con) {
    console.log('No connection string')
    throw new Error('No connection string')
  }
  const client: MongoClient = await MongoClient.connect(con)
  const db: Db = await client.db('CSSkinsDB')
  const col: Collection<Skin> = db.collection<Skin>('csskins')

  const result: WithId<Skin>[] = await col.find({}).toArray()
  return result
}

export { getAllSkins }

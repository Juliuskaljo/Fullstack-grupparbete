import { Collection, WithId, Db, ObjectId, InsertOneResult } from 'mongodb'
import { Skin } from '../models/skin.js'
import { connectToDatabase } from './db.js'

const db: Db = await connectToDatabase()
const col: Collection<Skin> = db.collection<Skin>('csskins')

async function getAllSkins(): Promise<WithId<Skin>[]> {
  const result: WithId<Skin>[] = await col.find({}).toArray()
  return result
}

async function insertSkin(skin: Skin): Promise<ObjectId | null> {
  try {
    const result: InsertOneResult<Skin> = await col.insertOne(skin)
    return result.insertedId
  } catch (error) {
    console.log('Error inserting skin: ', error)
    return null
  }
}

export { getAllSkins, insertSkin }

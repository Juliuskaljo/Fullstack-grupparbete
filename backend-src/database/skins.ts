import {
  Collection,
  WithId,
  Db,
  ObjectId,
  InsertOneResult,
  DeleteResult,
  UpdateResult,
} from 'mongodb'
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

async function deleteSkin(id: string): Promise<boolean> {
  try {
    const result: DeleteResult = await col.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  } catch (error) {
    console.log('Error deleting skin: ', error)
    return false
  }
}

async function updateSkin(
  id: string,
  updatedSkin: Partial<Skin>
): Promise<boolean> {
  try {
    const result: UpdateResult = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedSkin }
    )
    return result.matchedCount === 1
  } catch (error) {
    console.error('Error updating skin: ', error)
    return false
  }
}

export { getAllSkins, insertSkin, deleteSkin, updateSkin }

import {
  MongoClient,
  Db,
  Collection,
  WithId,
  ObjectId,
  InsertOneResult,
  DeleteResult,
  UpdateResult,
} from 'mongodb'
import { User } from '../models/users.js'
import { connectToDatabase } from './db.js'

const db: Db = await connectToDatabase()
const col: Collection<User> = db.collection<User>('users')

async function getAllUser(): Promise<WithId<User>[]> {
  const result: WithId<User>[] = await col.find({}).toArray()
  return result
}

async function insertUser(user: User): Promise<ObjectId | null> {
  try {
    const result: InsertOneResult<User> = await col.insertOne(user)
    return result.insertedId
  } catch (error) {
    console.log('Error inserting user: ', error)
    return null
  }
}

async function deleteUser(id: string): Promise<boolean> {
  try {
    const result: DeleteResult = await col.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  } catch (error) {
    console.log('Error deleting user: ', error)
    return false
  }
}

async function updateUser(
  id: string,
  updatedUser: Partial<User>
): Promise<boolean> {
  try {
    const result: UpdateResult = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedUser }
    )
    return result.matchedCount === 1
  } catch (error) {
    console.log('Error updating user: ', error)
    return false
  }
}

export { getAllUser, insertUser, deleteUser, updateUser }

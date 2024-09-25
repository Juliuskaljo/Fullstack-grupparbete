import { MongoClient, Db, Collection, WithId, DeleteResult, InsertOneResult, ObjectId, UpdateResult } from 'mongodb'
import { Cart } from '../models/carts.js'
import { connectToDatabase } from './db.js'


const db: Db = await connectToDatabase()
const col: Collection<Cart> = db.collection<Cart>('cart')


async function getAllCart(): Promise<WithId<Cart>[]> {
  
  const result: WithId<Cart>[] = await col.find({}).toArray()
  return result
}

async function insertCart(cart: Cart): Promise<ObjectId | null> {
  try {
    const result: InsertOneResult<Cart> = await col.insertOne(cart)
    return result.insertedId
  } catch (error) {
    console.log('Error inserting skin: ', error)
    return null
  }
}

async function deleteCart(id: string): Promise<boolean> {
  try {
    const result: DeleteResult = await col.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  } catch (error) {
    console.log('Error deleting skin: ', error)
    return false
  }
}

async function updateCart(
	id: string, updatedCart: Partial<Cart>
): Promise<boolean> {
	try {
		const result: UpdateResult = await col.updateOne({ _id: new ObjectId(id)}, {
			$set: updatedCart
		}) 
		return result.matchedCount === 1
	}
	catch (error) {
		console.log('Error updating cart', error);
		return false
	}
}


export { getAllCart, deleteCart, insertCart, updateCart }

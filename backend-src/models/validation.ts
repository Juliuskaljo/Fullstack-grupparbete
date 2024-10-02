import Joi from 'joi'
import { Cart } from './carts.js'
import { Skin } from './skin.js'
import { User } from './users.js'

const skinsSchema = Joi.object({
  weapon: Joi.string().min(1),
  skinName: Joi.string().min(1),
  pattern: Joi.number().min(0).strict(),
  float: Joi.string().min(1),
  price: Joi.number().min(1).strict(),
  image: Joi.string().min(1),
  amountInStock: Joi.number().min(1),
}).required()

const userSchema = Joi.object({
  name: Joi.string().min(1).required(),
  isAdmin: Joi.boolean().required(),
}).required()

const cartSchema = Joi.object({
  userId: Joi.string().min(1),
  productId: Joi.string().min(1),
  amount: Joi.number().min(0).strict(),
}).required()

export function isValidSkin(data: Skin) {
  let result = skinsSchema.validate(data)
  return !result.error
}

export function isValidCart(data: Cart) {
  let result = cartSchema.validate(data)
  return !result.error
}

export function isValidUser(data: User) {
  let result = userSchema.validate(data)
  return !result.error
}

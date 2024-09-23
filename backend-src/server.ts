import express, { Express, NextFunction, Request, Response } from 'express'
import { router as skinRouter } from './routes/skins.js'

const app: Express = express()
const port = 1227

// middleware
// route handlers
app.use('/', (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method}  ${req.url}`, req.body)
	next()
})

app.use('/skins', skinRouter)

app.listen(port, () => {
	console.log('Server is listening on port ' + port)
})
import express, { Express, NextFunction, Request, Response } from 'express'

const app: Express = express()
const port = 4884

// middleware
// route handlers


app.listen(port, () => {
	console.log('Server is listening on port ' + port)
})
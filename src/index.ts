import express, { Application, Request, Response } from "express"
import { EventEmitter } from "events"

// Set up events
export const eventEmitter = new EventEmitter()
eventEmitter.on("test", (args) => console.log("test recieved", args))

eventEmitter.emit("test", { hi: "wat" })

// Boot express
export const app = async () => {
	const app: Application = express()
	const port = 5001

	// Application routing
	app.use("/", (req: Request, res: Response) => {
		res.status(200).send({ data: "Hello from Ornio AS" })
	})

	// Start server
	app.listen(port, () => console.log(`Server is listening on port ${port}!`))
}

app().then()

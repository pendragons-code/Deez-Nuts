const express = require("express")
const helmet = require("helmet")
const env = require("dotenv").config()
const { join } = require("path")
const apiRoute = require("./apiRoutes.js")
const frontEnd = require("./frontEnd.js")
const app = express()
const port = process.env.port

if(!port) return console.log("Port is empty!")

//I am aware that there is a way to do this with just one app.use, but i was advised against using it because it would be unreadable!
app.use(function(req, res, next) {
	res.setHeader("Content-Security-Policy", "frame-ancestors 'self';")
	next()
})
app.use("/api/", apiRoute)
app.use("/", frontEnd)
app.set("view engine", "ejs")
app.set("views", join(__dirname, "../frontEnd/views"))
app.use(express.static(join(__dirname, "../frontEnd/public")))
app.use(function(req, res) {
	res.status(404).json({
		404: "🍌, 404",
		error: 404
	})
})
app.use(helmet())
app.listen((port), async () => {
	console.log(`Hanging onto dear life at ${process.pid}\nCurrently listening at http://localhost:${port}!`)
})

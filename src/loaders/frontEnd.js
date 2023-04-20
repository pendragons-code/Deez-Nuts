const { readdirSync } = require("fs")
const express = require("express")
const routerFrontEnd = express.Router()
const { rateLimit } = require("express-rate-limit")
const { frontEndRateLimit } = require("../../configuration/rateLimit.json")

const limiter = rateLimit({
	windowMs: frontEndRateLimit.windowMinutes * 60000,
	max: frontEndRateLimit.maxWindowRequest,
	standardHeaders: frontEndRateLimit.standardHeaders,
	legacyHeaders: frontEndRateLimit.legacyHeaders,
	message: frontEndRateLimit.message
})

routerFrontEnd.use(limiter)

const loadFrontEndFile = readdirSync("./src/frontEnd/PageLoader").filter(files => files.endsWith(".js"))
for(const file of loadFrontEndFile) {
	const { execute, name } = require(`../frontEnd/PageLoader/${file}`)
	routerFrontEnd.get(`/${name}`, async (req, res) => {
		execute(req, res)
	})
}

module.exports = routerFrontEnd

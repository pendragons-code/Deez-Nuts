const { readdirSync } = require("fs")
const { db } = require("./dataBase.js")
const { apiRoutesRateLimit } = require("../../configuration/rateLimit.json")
const { rateLimit } = require("express-rate-limit")
const express = require("express")
const routerAPI = express.Router()

const limiter = rateLimit({
	windowMs: apiRoutesRateLimit.windowMinutes * 60000,
	max: apiRoutesRateLimit.maxWindowRequest,
	standardHeaders: apiRoutesRateLimit.standardHeaders,
	legacyHeaders: apiRoutesRateLimit.legacyHeaders,
	message: apiRoutesRateLimit.message
})

routerAPI.use(limiter)

// Will figure more stuff out later.

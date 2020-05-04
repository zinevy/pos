const dotenv = require("dotenv")
const env = dotenv.config()

const shell = require("shelljs")
const path = require("path")
const fs = require("fs")

const file = path.resolve("./config.json")

const data = JSON.parse(fs.readFileSync(file))
const channel = env.parsed.CHANNEL

data[channel] = data[channel] + 1

fs.writeFileSync(file, JSON.stringify(data, null, 4))

shell.exec(`expo build:android -t apk --release-channel ${channel}`)

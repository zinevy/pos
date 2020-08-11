#!/bin/node
const { program } = require("commander")
const fs = require("fs")
const shell = require("shelljs")

program.option("-rc, --release-channel <data>", "release channel")
program.parse(process.argv)

const channel = program.releaseChannel

if (channel) {
    //read the content of the json file
    const defaultContent = require(`../channels/default.json`)
    const packageVersion = require(`../package.json`)
    const envFileContent = require(`../channels/${channel}.json`)

    const data = {
        NAME: packageVersion.name,
        VERSION: packageVersion.version,
        ...defaultContent,
        ...envFileContent,
    }

    shell.exec(`react-native-version --target android --set-build ${packageVersion.version}`)
    //copy the json inside the env.json file
    fs.writeFileSync("env.json", JSON.stringify(data, undefined, 4))
}

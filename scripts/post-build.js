const shell = require("shelljs")
const packageVersion = require(`../package.json`)

shell.exec(`react-native-version --target android --set-build ${packageVersion.version}`)

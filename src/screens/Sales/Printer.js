// const escpos = require("escpos")

// const config = {
//   portName: "BLE:STAR L300-00038",
//   emulation: "StarPRNT",
//   hasBarcodeReader: false,
//   mode: "Bluetooth"
// }

export default class AddToPrintQueue {
    constructor(options = {}) {
        const { name } = options
        // console.log("ecspos", escpos)

        // this.print()
        const result = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    success: true,
                })
            }, 3000)
        })

        return result
    }

    // async portDiscovery() {
    //   const { mode } = config

    //   try {
    //     let printers = await StarPRNT.portDiscovery(mode)

    //     console.log("printers", printers)
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }

    // async checkStatus() {
    //   const { portName, emulation } = config

    //   try {
    //     const status = await StarPRNT.checkStatus(portName, emulation)

    //     console.log("status", status)
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }

    // async connect() {
    //   const { portName, emulation, hasBarcodeReader } = config

    //   try {
    //     const connect = await StarPRNT.connect(
    //       portName,
    //       emulation,
    //       hasBarcodeReader
    //     )

    //     console.log(connect)
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }

    // async print() {
    //   const { portName, emulation, hasBarcodeReader } = config

    //   let commands = []
    //   commands.push({
    //     append:
    //       "YANG - FORTRESS\n" + "123 Star Road\n" + "City, State 12345\n" + "\n"
    //   })
    //   commands.push({
    //     appendCutPaper: StarPRNT.CutPaperAction.PartialCutWithFeed
    //   })

    //   try {
    //     var printResult = await StarPRNT.print(emulation, commands, portName)
    //     console.log(printResult) // Success!
    //   } catch (e) {
    //     console.error(e)
    //   }
    // }
}

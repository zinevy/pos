import { BluetoothEscposPrinter } from "react-native-bluetooth-escpos-printer"
import { getSelectedAttributesOption } from "../Sales/utils"

export default class Printer {
    async send(options) {
        let { name, data } = options

        if (data && data.length) {
            let response = {}

            let values = data.map((item) => {
                let data = {
                    name: item.name,
                }
                let attributes, product

                if (item.attributes) {
                    attributes = getSelectedAttributesOption(item.attributes, {
                        attributes: item.product.attributes,
                    })
                }

                if (item[item.type]) {
                    product = item[item.type]
                }

                if (attributes) {
                    data = {
                        ...data,
                        attributes,
                    }
                }

                data = {
                    ...data,
                    product,
                    quantity: item.quantity,
                    add_ons: item.add_ons.filter((i) => i.quantity > 0),
                    type: item.type,
                }

                return data
            })

            for (let i in values) {
                response = await this.print({
                    name,
                    item: values[i],
                    index: i,
                    isLast: +i === values.length - 1,
                })
            }

            return response
        }
    }

    testPrint({ name, item, index, isLast }) {
        const MAX = 30
        return new Promise(async (resolve, reject) => {
            try {
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
                await BluetoothEscposPrinter.setBlob(0)
                await BluetoothEscposPrinter.printText("Kakai-Vape\n\r", {
                    encoding: "GBK",
                    codepage: 0,
                    widthtimes: 1,
                    heigthtimes: 1,
                    fonttype: 1,
                })
                await BluetoothEscposPrinter.setBlob(0)
                await BluetoothEscposPrinter.printText(`\n\r`, {})
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, {})
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, {})
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, {})
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, {})
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, {})
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, {})
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, {})
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, {})
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, {})
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, {})
                await BluetoothEscposPrinter.printText("\n\r", {})
                await BluetoothEscposPrinter.printText("\n\r", {})

                if (isLast) {
                    await BluetoothEscposPrinter.printText("\n\r", {})
                    // await BluetoothEscposPrinter.printText("\n\r", {})
                }

                resolve({ success: true })
            } catch (error) {
                reject(error)
            }
        })
    }

    print({ name, item, index, isLast }) {
        const MAX = 30
        const options = {
            fonttype: 3,
        }
        return new Promise(async (resolve, reject) => {
            try {
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
                await BluetoothEscposPrinter.printText(`Name：${name}\n\r`, { ...options })

                if (item.type === "simple") {
                    await BluetoothEscposPrinter.printText(`${item.name.substring(0, MAX)} (${item.quantity})\n\r`, {})
                } else {
                    await BluetoothEscposPrinter.printText(`${item.name.substring(0, MAX)} (${item.quantity})\n\r`, {})
                    await BluetoothEscposPrinter.printText(`${item.product.name.substring(0, MAX)}\n\r`, {})
                }

                if (item.attributes) {
                    for (let i in item.attributes) {
                        const attribute = item.attributes[i]
                        await BluetoothEscposPrinter.printText(
                            `${attribute.name}: ${attribute.selected_option.name}\n\r`,
                            { ...options }
                        )
                    }
                }

                if (item.add_ons && item.add_ons.length) {
                    let add_ons = item.add_ons.map((a) => `${a.name}(${a.quantity})`)
                    await BluetoothEscposPrinter.printText(`${add_ons.join(",")}\n\r`, { ...options })
                }

                await BluetoothEscposPrinter.printText("\n\r", {})

                if (isLast) {
                    await BluetoothEscposPrinter.printText("\n\r", {})
                    await BluetoothEscposPrinter.printText("\n\r", {})
                }
                resolve({ success: true })
            } catch (error) {
                reject(error)
            }
        })
    }
}

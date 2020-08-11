import React, { useState, useEffect, useCallback } from "react"
import { Platform, View, DeviceEventEmitter, Switch, TouchableOpacity, ToastAndroid } from "react-native"
import { BluetoothEscposPrinter, BluetoothManager } from "react-native-bluetooth-escpos-printer"
import { ListItem } from "react-native-elements"

import { Text } from "../../components"

const BluetoothSettings = ({ printer, setPrinterSettings }) => {
    const [availableDevices, setAvailableDevices] = useState([])
    const [pairedDevices, setPairedDevices] = useState([])
    const [bluetoothStatus, setBluetoothStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isSupported, setSupport] = useState(true)

    useEffect(() => {
        let listeners = []

        BluetoothManager.isBluetoothEnabled().then(
            (enabled) => {
                setBluetoothStatus(Boolean(enabled))
                setLoading(false)
            },
            (err) => {
                console.log("IS_BLUETOOTH_ENABLED", err)
            }
        )

        if (Platform.OS === "android") {
            listeners.push(
                DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) =>
                    getPairedDevices(rsp)
                )
            )

            listeners.push(
                DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => getAvailableDevices(rsp))
            )

            listeners.push(
                DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
                    setPrinterSettings({
                        name: "",
                        address: "",
                        status: false,
                    })
                })
            )

            listeners.push(
                DeviceEventEmitter.addListener(BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
                    ToastAndroid.show("Device is not supported", ToastAndroid.LONG)
                    setSupport(false)
                })
            )
        }

        onScan()

        return () => {
            for (let ls in listeners) {
                listeners[ls].remove()
            }
        }
    }, [])

    const getAvailableDevices = (rsp) => {
        let r = null
        try {
            if (typeof rsp.device === "object") {
                r = rsp.device
            } else {
                r = JSON.parse(rsp.device)
            }
        } catch (e) {
            console.log("AVAILABLE_DEVICES", e)
        }

        if (r) {
            let found = availableDevices || []
            if (found.findIndex) {
                let duplicated = found.findIndex((x) => x.address === r.address)
                if (duplicated === -1) {
                    found = [...found, r]
                    setAvailableDevices(found)
                }
            }
        }
    }

    const getPairedDevices = (rsp) => {
        let devices = null
        if (typeof rsp.devices === "object") {
            devices = rsp.devices
        } else {
            try {
                devices = JSON.parse(rsp.devices)
            } catch (e) {
                console.log("PAIRED_DEVICES", e)
            }
        }

        if (devices && devices.length) {
            setPairedDevices(devices)
        }
    }

    const onSwitchToggle = useCallback(
        (value) => {
            console.log(isSupported)
            if (!isSupported) return false
            setLoading(true)
            if (!value) {
                BluetoothManager.disableBluetooth().then(
                    () => {
                        setBluetoothStatus(false)
                        setLoading(false)
                        setPairedDevices([])
                    },
                    (err) => {
                        console.log("DISABLE_BLUETOOTH", err)
                    }
                )
            } else {
                BluetoothManager.enableBluetooth().then(
                    (r) => {
                        let paired = []
                        if (r && r.length > 0) {
                            for (let i = 0; i < r.length; i++) {
                                try {
                                    paired.push(JSON.parse(r[i]))
                                } catch (e) {
                                    console.log("ENABLE_BLUETOOTH", e)
                                }
                            }
                        }
                        setBluetoothStatus(true)
                        setLoading(false)
                        setPairedDevices(paired)
                        onScan()
                    },
                    (err) => setLoading(false)
                )
            }
        },
        [isSupported]
    )

    const onScan = () => {
        setLoading(true)
        BluetoothManager.scanDevices().then(
            (device) => {
                let found = device.found
                try {
                    found = JSON.parse(found)
                } catch (e) {
                    console.log("SCAN_DEVICES", e)
                }

                let fds = availableDevices

                if (found && found.length) {
                    fds = found
                }
                setAvailableDevices(fds)
                setLoading(false)
            },
            (er) => setLoading(false)
        )
    }

    const renderDevices = (rows) => {
        if (rows.length <= 0) {
            return <ListItem title={<Text>No devices found</Text>} />
        }

        return (
            rows &&
            rows.map((row, index) => {
                let rightTitle = <Text />
                let fontWeight = "normal"

                if (printer && row.address === printer.address) {
                    fontWeight = "bold"

                    rightTitle = (
                        <TouchableOpacity onPress={onSelfTest} disabled={loading}>
                            <Text>Test Print</Text>
                        </TouchableOpacity>
                    )
                }

                return (
                    <ListItem
                        key={`device-${index}`}
                        topDivider
                        title={
                            <Text
                                style={{
                                    fontWeight,
                                }}>
                                {row.name}
                                {loading && " ..."}
                            </Text>
                        }
                        bottomDivider
                        onPress={() => {
                            if (printer && row.address === printer.address) return false

                            setLoading(true)
                            BluetoothManager.connect(row.address).then(
                                (s) => {
                                    setLoading(false)
                                    setPrinterSettings({
                                        name: row.name,
                                        address: row.address,
                                        status: true,
                                    })
                                },
                                (e) => setLoading(false)
                            )
                        }}
                        rightTitle={rightTitle}
                    />
                )
            })
        )
    }

    const onSelfTest = async () => {
        await BluetoothEscposPrinter.printerInit()
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER)
        await BluetoothEscposPrinter.setBlob(0)
        await BluetoothEscposPrinter.printText("Kakai-Vape\n\r", {
            encoding: "GBK",
            codepage: 0,
            widthtimes: 3,
            heigthtimes: 3,
            fonttype: 1,
        })
        await BluetoothEscposPrinter.setBlob(0)
        await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT)
        await BluetoothEscposPrinter.printText("Daan Sarile, Cabanatuan City\n\r", {})
        await BluetoothEscposPrinter.printText("Nueva Ecija\n\r", {})
        await BluetoothEscposPrinter.printText("Date：" + new Date() + "\n\r", {})
        await BluetoothEscposPrinter.printText("Tax：18664896621\n\r", {})
        await BluetoothEscposPrinter.printText("\n\r\n\r", {})

        if (Platform.OS === "android") {
            ToastAndroid.show("Test Print Success", ToastAndroid.LONG)
        }
    }

    const renderBluetoothDevices = (bluetoothStatus) => {
        if (bluetoothStatus) {
            return (
                <View>
                    <View>
                        <Text style={{ fontSize: 14, padding: 15, backgroundColor: "#EEE" }}>Paired Devices</Text>
                        <View style={{ flexDirection: "column", minHeight: 50 }}>{renderDevices(pairedDevices)}</View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 14, padding: 15, backgroundColor: "#EEE" }}>Other Devices</Text>
                        <View style={{ flexDirection: "column", minHeight: 50 }}>
                            {renderDevices(availableDevices)}
                        </View>
                    </View>
                </View>
            )
        }

        return <View />
    }

    return (
        <View>
            <ListItem
                title={<Text>Bluetooth</Text>}
                bottomDivider
                rightTitle={
                    <View>
                        <Switch value={bluetoothStatus} disabled={loading} onValueChange={onSwitchToggle} />
                    </View>
                }
            />
            <View>{renderBluetoothDevices(bluetoothStatus)}</View>
        </View>
    )
}

export default BluetoothSettings

import { Platform } from "react-native"

const device = (devices) => {
    return devices.includes(Platform.OS)
}

export default device

import { Dimensions } from "react-native"
const { width, fontScale, height } = Dimensions.get("window")

const guidelineBaseWidth = 375
const guidelineBaseHeight = 812

const MAX_WIDTH = Math.min(420, width)

const scaleWidth = (size) => (MAX_WIDTH / guidelineBaseWidth) * size
const scaleHeight = (size) => (height / guidelineBaseHeight) * size

export const normalizeWidth = (size) => {
    const dp = scaleWidth(size)
    return dp * fontScale
}

export const normalize = (size) => {
    const dp = scaleWidth(size)
    return dp * fontScale
}

export const normalizeHeight = (size) => {
    const dp = scaleHeight(size)

    return dp * fontScale
}

import { Dimensions } from "react-native"
const { width, fontScale } = Dimensions.get("window")

const guidelineBaseWidth = 360
const guidelineBaseHeight = 649
const MAX_WIDTH = Math.min(450, width)
const MAX_HEIGHT = Math.min(900, width)

const scaleWidth = (size) => (MAX_WIDTH / guidelineBaseWidth) * size
const scaleHeight = (size) => (MAX_WIDTH / guidelineBaseWidth) * size

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

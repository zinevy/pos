import Constants from "expo-constants"

const imageUrl = (url) => {
    return Constants.manifest.extra.API_URL + url
}

export const validImageUrl = (url) => {
    const extension = url.match(/\.(jpeg|jpg|gif|png)$/) != null

    return extension
}

export const getImageUrl = (url) => {
    let imageSource = require("../assets/images/placeholder.png")

    if (validImageUrl(url)) {
        imageSource = { uri: imageUrl(url) }
    }

    return imageSource
}

export default imageUrl

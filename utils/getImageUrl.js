import { API_URL } from "../env.json"

const imageUrl = (url) => {
    return API_URL + url
}

export const validImageUrl = (url) => {
    const extension = url.match(/\.(jpeg|jpg|gif|png)$/) != null

    return extension
}

export const getImageUrl = (url) => {
    let imageSource = require("../assets/images/placeholder.png")

    if (url && validImageUrl(url)) {
        imageSource = { uri: imageUrl(url) }
    }

    return imageSource
}

export default imageUrl

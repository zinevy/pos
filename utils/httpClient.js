import { create } from "apisauce"
import Constants from "expo-constants"
import { AsyncStorage } from "react-native"

export const api = create({
    baseURL: Constants.manifest.extra.API_URL,
    headers: {
        Accept: "application/json",
    },
})

api.addAsyncRequestTransform((request) => async () => {
    const token = await AsyncStorage.getItem("@token")

    if (token) {
        request.headers["Authorization"] = `Bearer ${token}`
    }
})

export const requests = {
    fetchSampleProducts: async (page) => {
        const url = "https://www.tourvotravels.com/wp-json/wc/v2/products"
        const params = {
            consumer_key: "ck_3ba2bab4f45e2814a6438dc2815681e0078ce32c",
            consumer_secret: "cs_1e52063b0ba29f341ccbff413b53d2cc26d30b13",
            per_page: 6,
            page,
        }
        const qs = Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")

        return await fetch(`${url}?${qs}`)
    },
    get: async (url) => {
        return await api.get(url)
    },
    post: async (url, data) => {
        api.setHeaders({
            "Content-Type": "application/json",
        })

        return await api.post(url, data)
    },
    put: async (url, data) => {
        api.setHeaders({
            "Content-Type": "application/json",
        })

        return await api.put(url, data)
    },
    delete: async (url) => {
        return await api.delete(url)
    },
    authorize: async (url, data) => {
        api.setHeaders({
            "Content-Type": "application/json",
        })

        return await api.post(url, data)
    },
    upload: async (url, data) => {
        api.setHeaders({
            "Content-Type": "multipart/form-data",
        })

        return await api.post(url, data)
    },
}

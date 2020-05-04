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

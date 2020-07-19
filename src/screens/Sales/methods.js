import qs from "qs-stringify"

import { requests } from "../../../utils/httpClient"

export const methods = {
    get: (options) => {
        const config = {
            sort: "id",
            sort_type: "desc",
            post: 5,
            ...options,
        }

        return requests.get(`/products?${qs(config)}`)
    },
    getAddOns: () => requests.get(`/addons`),
    getProduct: (product) => requests.get(`/products/${product.id}`),
    getNotifications: () => requests.get(`/notifications`),
    getAttribute: (attr) => requests.get(`/attributes/${attr.attribute_id}`),
    submit: (data) => requests.post(`/transactions`, data),
}

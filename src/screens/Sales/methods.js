import { requests } from "../../../utils/httpClient"

export const methods = {
    getProducts: (url) => {
        return requests.get(url)
    },
    getAddOns: () => requests.get(`/addons`),
    getProduct: (product) => requests.get(`/products/${product.id}`),
    getNotifications: () => requests.get(`/notifications`),
    getAttributes: () => requests.get(`/attributes`),
    getAttribute: (attr) => requests.get(`/attributes/${attr.attribute_id}`),
    submit: (data) => requests.post(`/transactions`, data),
}

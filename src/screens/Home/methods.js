import { requests } from "../../../utils/httpClient"

export const methods = {
    getTransactions: (url) => {
        return requests.get(url)
    },
}

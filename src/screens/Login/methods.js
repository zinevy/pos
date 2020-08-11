import { requests } from "../../../utils/httpClient"

export const methods = {
    getBranches: () => requests.get(`/branches`),
}

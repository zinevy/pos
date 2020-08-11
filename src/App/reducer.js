const appReducer = (prevState, action) => {
    switch (action.type) {
        case "INIT":
            return {
                ...prevState,
                userToken: null,
                key: null,
                isLoading: false,
                isProcessing: false,
                isError: false,
                isSignout: false,
                error: null,
                profile: null,
                client: null,
            }
        case "REQUEST_SIGN_IN":
            return {
                ...prevState,
                userToken: null,
                key: null,
                isLoading: true,
                isProcessing: false,
                isError: false,
                error: null,
                profile: null,
                client: action.client,
            }
        case "REQUEST_PROCESSING":
            return {
                ...prevState,
                userToken: null,
                key: null,
                isLoading: true,
                isProcessing: true,
                isError: false,
                error: null,
                profile: null,
            }
        case "RESTORE_TOKEN":
            return {
                ...prevState,
                userToken: action.token,
                key: action.key,
                isLoading: false,
                isProcessing: false,
                isError: false,
                error: null,
                profile: action.profile,
            }
        case "SIGN_IN_SUCCESS":
            return {
                ...prevState,
                isSignout: false,
                isLoading: false,
                isProcessing: false,
                isError: false,
                userToken: action.token,
                key: action.key,
                error: null,
                profile: action.profile,
            }
        case "SIGN_IN_ERROR":
            return {
                ...prevState,
                isSignout: false,
                isLoading: false,
                isProcessing: false,
                isError: true,
                userToken: null,
                key: null,
                error: action.error,
                profile: null,
                client: null,
            }
        case "SIGN_OUT":
            return {
                ...prevState,
                isSignout: true,
                isLoading: false,
                isProcessing: false,
                userToken: null,
                key: null,
                isError: false,
                error: null,
                profile: null,
                client: null,
            }
        case "REQUEST_REGISTER":
            return {
                ...prevState,
                userToken: null,
                key: null,
                isLoading: true,
                isProcessing: false,
                isError: false,
                error: null,
                profile: null,
                client: null,
            }
        case "REGISTER_SUCCESS":
            return {
                ...prevState,
                isSignout: false,
                isLoading: false,
                isProcessing: false,
                isError: false,
                userToken: action.token,
                key: action.key,
                error: null,
                profile: action.profile,
                client: null,
            }
        case "REGISTER_ERROR":
            return {
                ...prevState,
                isSignout: false,
                isLoading: false,
                isProcessing: false,
                isError: true,
                userToken: null,
                key: null,
                error: action.error,
                profile: null,
                client: null,
            }
        case "SET_PRINTER_SETTINGS":
            return {
                ...prevState,
                device: {
                    name: action.name,
                    address: action.address,
                    status: action.status,
                },
            }
        default:
    }
}

export default appReducer

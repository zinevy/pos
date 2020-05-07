const appReducer = (prevState, action) => {
    switch (action.type) {
        case "INIT":
            return {
                ...prevState,
                userToken: null,
                key: null,
                isLoading: false,
                isError: false,
                isSignout: false,
                error: null,
                profile: null,
            }
        case "REQUEST_SIGN_IN":
            return {
                ...prevState,
                userToken: null,
                key: null,
                isLoading: true,
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
                isError: false,
                error: null,
                profile: action.profile,
            }
        case "SIGN_IN_SUCCESS":
            return {
                ...prevState,
                isSignout: false,
                isLoading: false,
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
                isError: true,
                userToken: null,
                key: null,
                error: action.error,
                profile: null,
            }
        case "SIGN_OUT":
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
                key: null,
                isError: false,
                error: null,
                profile: null,
            }
        case "REQUEST_REGISTER":
            return {
                ...prevState,
                userToken: null,
                key: null,
                isLoading: true,
                isError: false,
                error: null,
                profile: null,
            }
        case "REGISTER_SUCCESS":
            return {
                ...prevState,
                isSignout: false,
                isLoading: false,
                isError: false,
                userToken: action.token,
                key: action.key,
                error: null,
                profile: action.profile,
            }
        case "REGISTER_ERROR":
            return {
                ...prevState,
                isSignout: false,
                isLoading: false,
                isError: true,
                userToken: null,
                key: null,
                error: action.error,
                profile: null,
            }
        default:
    }
}

export default appReducer

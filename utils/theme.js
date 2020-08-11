import { normalize } from "./scale"

const common = {
    fontFamily: {
        regular: "Nunito-Regular",
        bold: "Nunito-Bold",
    },
    buttons: {
        secondary: {
            color: "#000",
            backgroundColor: "#FFF",
            borderColor: "#CCC",
        },
        total: {
            color: "#FFF",
            backgroundColor: "#4AB577",
        },
    },
    login: {
        button: {
            color: "#FFFFFF",
            backgroundColor: "#6ed9a0",
            borderColor: "#6ed9a0",
        },
        field: {
            color: "#FFFFFF",
            textColor: "#FFFFFF",
            borderColor: "#545d65",
            activeBorderColor: "#6ed9a0",
        },
    },
}

const theme = {
    light: {
        ...common,
        color: "hotpink",
        backgroundColor: "purple",
        main: {
            color: "#000000",
            backgroundColor: "#FFFFFF",
        },
        button: {
            height: normalize(60),
            color: "#000000",
        },
    },
    dark: {
        ...common,
        color: "hotpink",
        backgroundColor: "blue",
        main: {
            color: "#FFFFFF",
            backgroundColor: "#000000",
        },
        button: {
            height: normalize(60),
            color: "#FFFFFF",
        },
    },
}

export default theme

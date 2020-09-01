const common = {
    accent: "#4AB577",
    fontFamily: {
        regular: "Nunito-Regular",
        bold: "Nunito-Bold",
    },
    title: {
        subtitleText: "#9a9a9a",
    },
    button: {
        height: 60,
        color: "#000000",
    },
    buttons: {
        secondary: {
            color: "#545d65",
            backgroundColor: "#FFF",
            borderColor: "#CCC",
        },
        total: {
            color: "#FFF",
            backgroundColor: "#4AB577",
        },
    },
    form: {
        button: {
            color: "#000",
            backgroundColor: "#000000",
            borderColor: "#4AB577",
        },
        field: {
            color: "#545d65",
            textColor: "#393939",
            borderColor: "#ececec",
            activeBorderColor: "#ececec",
            backgroundColor: "#FFF",
        },
    },
    login: {
        button: {
            color: "#FFFFFF",
            backgroundColor: "#4AB577",
            borderColor: "#4AB577",
        },
        field: {
            color: "#FFFFFF",
            textColor: "#FFFFFF",
            borderColor: "#545d65",
            activeBorderColor: "#4AB577",
            placeholderTextColor: "#fefefe",
        },
    },
    main: {
        color: "#393939",
        focused: "#585858",
        borderRadius: 8,
        backgroundColor: "#ececec",
    },
}

const theme = {
    light: {
        ...common,
        color: "hotpink",
        backgroundColor: "purple",
    },
    dark: {
        ...common,
        color: "hotpink",
        backgroundColor: "blue",
    },
}

export default theme

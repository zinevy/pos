export const formatCurrency = (value = 0) => {
    value = parseFloat(value).toFixed(2)
    return value.replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

export const getCurrency = () => {
    return "P"
}

export const toCurrency = (value) => {
    const data = formatCurrency(value)

    return getCurrency() + " " + data
}

export const formatCurrency = (value) => {
    if (value) {
        value = parseFloat(value)
        return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
    }

    return
}

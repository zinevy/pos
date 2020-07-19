export const formatCurrency = (value = 0) => {
    value = parseFloat(value)
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

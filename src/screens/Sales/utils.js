import { formatCurrency } from "../../../utils/formatter"

export const getTotalAddOn = (values) => {
    return values.reduce((sum, item) => {
        const curr = +item.quantity * parseFloat(item.price).toFixed(2)
        let total = sum + curr

        return total
    }, 0)
}

export const calculateSubtotal = (values) => {
    let total = 0
    total += parseFloat(values.price)

    total = total * Number(values.quantity)

    if (values.add_ons) {
        total += getTotalAddOn(values.add_ons)
    }

    return total && formatCurrency(total)
}

export const calculateGrandTotal = (items) => {
    const total = items.reduce((total, item) => {
        const subtotal = +item.quantity * parseFloat(item.price).toFixed(2)
        let value = total + subtotal

        if (item.add_ons && item.add_ons.length) {
            const add_ons_total = getTotalAddOn(item.add_ons)
            value += add_ons_total
        }

        return value
    }, 0)

    return formatCurrency(total)
}

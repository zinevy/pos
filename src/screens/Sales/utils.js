import isEqual from "lodash/isEqual"

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
    const product = values[values.type]

    total += parseFloat(product.price)

    total = total * Number(values.quantity)

    if (values.add_ons) {
        total += getTotalAddOn(values.add_ons)
    }

    return total && formatCurrency(total)
}

export const calculateGrandTotal = (items) => {
    const total = items.reduce((total, item) => {
        const product = item[item.type]
        const subtotal = +item.quantity * parseFloat(product.price).toFixed(2)
        let value = total + subtotal

        if (item.add_ons && item.add_ons.length) {
            const add_ons_total = getTotalAddOn(item.add_ons)
            value += add_ons_total
        }

        return value
    }, 0)

    return total
}

export const getSelectedAttribute = (selected_attributes, item) => {
    if (selected_attributes.length) {
        let variation_attributes_id = selected_attributes
            .map((position, index) => {
                if (item.attributes[index]) {
                    let attributes = item.attributes[index]
                    attributes.selected = position

                    return attributes
                }
            })
            .filter((item) => !!item)
            .filter((item) => item.attribute.price_effect)
            .map((item) => {
                if (item.attribute.attribute_options[item.selected]) {
                    const option = item.attribute.attribute_options[item.selected]

                    return option.id
                }
            })

        const selected_variation = item.variations.find((value) => {
            const options = value.variation_options
            const item_variation_ids = options.map((value) => value.attribute_option_id)

            if (isEqual(variation_attributes_id, item_variation_ids)) {
                return value
            }
        })

        return selected_variation
    }
}

export const getSelectedAttributesOption = (selected_attributes, item) => {
    if (selected_attributes.length) {
        // console.log(selected_attributes)
        let variation_attribute = selected_attributes
            .map((position, index) => {
                return item.attributes[index]
            })
            .filter((item) => !!item)
            .map((item) => {
                if (item && item.attribute && item.attribute.attribute_options[item.selected]) {
                    const option = item.attribute.attribute_options[item.selected]

                    return {
                        id: item.attribute.id,
                        code: item.attribute.code,
                        name: item.attribute.name,
                        selected_option: option,
                    }
                }
            })

        return variation_attribute
    }
}

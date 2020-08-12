import React, { memo } from "react"
import { Formik } from "formik"
import { View } from "react-native"
import { object, string } from "yup"
import styled from "@emotion/native"
import InputField from "../../components/Fields/InputField"
import SearchField from "../../components/Fields/SearchField"

const Text = styled.Text(({ theme }) => ({
    color: theme.login.field.color,
}))

const validationSchema = object().shape({
    str: string().label("Search").email().required(),
})

const initialValues = { str: "" }

const SearchForm = memo(({ onSubmit, isLoadingInitialData, disabled, loading, hasError, error }) => {
    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit, setFieldValue, values }) => (
                <View>
                    {error && (
                        <View style={{ alignItems: "center", marginBottom: 20 }}>
                            <Text style={{ color: "#F00" }}>{error}</Text>
                        </View>
                    )}

                    <View style={{ marginBottom: 0 }}>
                        <SearchField
                            name="str"
                            placeholder="Search"
                            showLoading={isLoadingInitialData}
                            onSearchString={(value) => {
                                setFieldValue("str", value)
                                onSubmit(value)
                            }}
                            value={values.str}
                        />
                    </View>
                </View>
            )}
        </Formik>
    )
})

export default SearchForm

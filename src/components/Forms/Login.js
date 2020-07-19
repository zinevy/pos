import React, { memo } from "react"
import { Formik } from "formik"
import { View } from "react-native"
import { object, string } from "yup"
import styled from "@emotion/native"

import InputField from "../Fields/InputField"
import SelectField from "../Fields/SelectField"
import Button from "../Button"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const validationSchema = object().shape({
    email: string().label("Email").email().required(),
    password: string()
        .label("Password")
        .required()
        .min(2, "Seems a bit short...")
        .max(10, "We prefer insecure system, try a shorter password."),
})

const initialValues = { email: "pabs@zinevy.com", password: "dotty123" }

const renderTitle = ({ processing, loading }) => {
    let title = "Login"

    if (loading) title = "Loading"
    if (loading && processing) title = "Processing"

    return title
}

const LoginForm = memo(({ onSubmit, disabled, loading, hasError, error }) => {
    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{}}>
                    {error && (
                        <View style={{ alignItems: "center", marginBottom: 20 }}>
                            <Text>{error}</Text>
                        </View>
                    )}

                    <View style={{ marginBottom: 0 }}>
                        {/* <SelectField
                            name="branch_id"
                            label="Branch"
                            placeholder="Branch"
                            onChangeText={handleChange("branch_id")}
                            value={values.branch}
                        /> */}
                        <InputField
                            name="branch_id"
                            label="Branch"
                            placeholder="Branch"
                            onChangeText={handleChange("branch_id")}
                            onBlur={handleBlur("branch_id")}
                            value={values.branch_id}
                        />
                        <InputField
                            name="email"
                            label="Email"
                            placeholder="Email"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                        />
                        <InputField
                            label="Password"
                            name="password"
                            placeholder="Password"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry
                        />
                    </View>
                    <Button disabled={disabled} loading={loading} onPress={handleSubmit} title="Login" />
                </View>
            )}
        </Formik>
    )
})

export default LoginForm

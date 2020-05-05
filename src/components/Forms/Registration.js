import React, { memo } from "react"
import { Formik } from "formik"
import { View, Button } from "react-native"
import { object, string } from "yup"
import styled from "@emotion/native"

import InputField from "../Fields/InputField"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const validationSchema = object().shape({
    name: string().label("Name").required(),
    email: string().label("Email").email().required(),
    password: string()
        .label("Password")
        .required()
        .min(2, "Seems a bit short...")
        .max(10, "We prefer insecure system, try a shorter password."),
})

const initialValues = { name: "", email: "eve.holt@reqres.in", password: "" }

const RegistrationForm = memo(({ onSubmit, loading, hasError, error }) => {
    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    {hasError && error && (
                        <View>
                            <Text>{error}</Text>
                        </View>
                    )}
                    <InputField
                        name="name"
                        placeholder="Name"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                    />
                    <InputField
                        name="email"
                        placeholder="Email"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                    />
                    <InputField
                        name="password"
                        placeholder="Password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry
                    />
                    <Button disabled={loading} onPress={handleSubmit} title={`${loading ? "loading" : "Register"}`} />
                </View>
            )}
        </Formik>
    )
})

export default RegistrationForm

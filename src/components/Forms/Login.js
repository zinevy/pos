import React, { memo } from "react"
import { Formik } from "formik"
import { View, Button, Text } from "react-native"
import { object, string } from "yup"
import InputField from "../Fields/InputField"

const validationSchema = object().shape({
    email: string().label("Email").email().required(),
    password: string()
        .label("Password")
        .required()
        .min(2, "Seems a bit short...")
        .max(10, "We prefer insecure system, try a shorter password."),
})

const initialValues = { email: "eve.holt@reqres.in", password: "123123" }

const LoginForm = memo(({ onSubmit, loading, hasError, error }) => {
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
                    <Button disabled={loading} onPress={handleSubmit} title={`${loading ? "loading" : "Login"}`} />
                </View>
            )}
        </Formik>
    )
})

export default LoginForm

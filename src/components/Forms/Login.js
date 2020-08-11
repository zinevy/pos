import React, { memo } from "react"
import { Formik } from "formik"
import { View } from "react-native"
import { object, string } from "yup"
import styled from "@emotion/native"

import InputField from "../Fields/InputField"
import SelectField from "../Fields/SelectField"
import { PrimaryButton } from "../Button"

const Text = styled.Text(({ theme }) => ({
    color: theme.login.field.color,
}))

const validationSchema = object().shape({
    email: string().label("Email").email().required(),
    password: string()
        .label("Password")
        .required()
        .min(2, "Seems a bit short...")
        .max(10, "We prefer insecure system, try a shorter password."),
})

// const initialValues = { branch_id: "1", email: "pabs@zinevy.com", password: "dotty123" }
const initialValues = { branch_id: 0, email: "", password: "" }

const LoginForm = memo(({ branches, onSubmit, disabled, loading, hasError, error }) => {
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
                        <SelectField
                            name="branch_id"
                            placeholder="Branch"
                            onSelect={(value) => setFieldValue("branch_id", value)}
                            value={values.branch_id}
                            data={branches}
                        />
                        <InputField
                            name="email"
                            placeholder="Email"
                            onChangeText={(value) => setFieldValue("email", value)}
                            onBlur={(value) => setFieldValue("email", value)}
                            value={values.email}
                        />
                        <InputField
                            name="password"
                            placeholder="Password"
                            onChangeText={(value) => setFieldValue("password", value)}
                            onBlur={(value) => setFieldValue("password", value)}
                            value={values.password}
                            secureTextEntry
                        />
                    </View>
                    <PrimaryButton disabled={disabled} loading={loading} onPress={handleSubmit} title="Login" />
                </View>
            )}
        </Formik>
    )
})

export default LoginForm

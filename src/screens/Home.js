import React, { Suspense, useContext, memo, useMemo, Fragment } from "react"
import { View, Image, TouchableOpacity, FlatList, ScrollView } from "react-native"
import styled from "@emotion/native"
import * as Updates from "expo-updates"
import useSWR from "swr"

import { AppContext } from "../Main"
import { requests } from "../../utils/httpClient"
import withScreen from "../../utils/hoc/createScreen"
import { formatCurrency } from "../../utils/formatter"
import Button from "../components/Button"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Title = styled(Text)({
    fontSize: 30,
})

const ListButton = styled(TouchableOpacity)({
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#1E6738",
    borderRadius: 4,
})

const ListButtonText = styled(Text)({
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
})

const fetchProducts = async () => {
    const res = await requests.get("users?per_page=10")
    if (res.ok) {
        const { data: products } = res

        const items = products.data.map((item) => ({
            id: item.id,
            name: item.first_name,
            image: item.avatar,
            price: 50,
        }))

        return {
            products: items,
        }
    }

    return {}
}

const Products = ({ navigation }) => {
    const { data, error } = useSWR(1, fetchProducts, { suspense: true })
    const { addToCart } = useContext(AppContext)

    if (error) {
        return null
    }

    return (
        <FlatList
            data={data.products}
            keyExtractor={(user) => user.id.toString()}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            style={{
                display: "flex",
                flexDirection: "row",
                overscrollBehaviorY: "auto",
                touchAction: "auto",
                width: "100%",
            }}
            renderItem={({ item }) => {
                return (
                    <View style={{ margin: 5 }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("ProductDetails", { ...item })
                            }}>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 150,
                                    height: 150,
                                    resizeMode: "contain",
                                    borderRadius: 10,
                                    marginBottom: 10,
                                }}
                            />
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.name}</Text>
                                <Text style={{ marginBottom: 10 }}>{formatCurrency(item.price)}</Text>
                            </View>
                        </TouchableOpacity>
                        <Button
                            onPress={() => {
                                item.quantity = 1
                                addToCart(item)
                            }}
                            title="Add to cart"
                        />
                    </View>
                )
            }}
        />
    )
}

const Home = memo(({ navigation }) => {
    const { activeTheme, toggleTheme, actions, appState } = useContext(AppContext)

    return useMemo(() => {
        return (
            <ScrollView>
                <Suspense fallback={<Title>Loading...</Title>}>
                    {appState.profile && (
                        <View
                            style={{
                                marginBottom: 20,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <Image
                                source={{ uri: appState.profile.image_url }}
                                style={{
                                    borderRadius: 50,
                                    width: 50,
                                    height: 50,
                                    resizeMode: "contain",
                                }}
                            />
                            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                                {appState.profile.first_name} {appState.profile.last_name}
                            </Text>
                        </View>
                    )}

                    <Products navigation={navigation} />
                    <View style={{ marginTop: 60, justifyContent: "center", alignItems: "center" }}>
                        {appState.userToken && (
                            <TouchableOpacity
                                onPress={() => {
                                    actions.signOut()
                                }}>
                                <Text>Sign out</Text>
                            </TouchableOpacity>
                        )}
                        <Text>{Updates.manifest.version}</Text>
                    </View>
                </Suspense>
            </ScrollView>
        )
    }, [activeTheme, appState])
})

export default withScreen({ back: false })(Home)

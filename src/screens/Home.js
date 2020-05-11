import React, { Suspense, useContext, memo, useMemo } from "react"
import { View, TouchableOpacity, FlatList, ScrollView } from "react-native"
import styled from "@emotion/native"
import * as Updates from "expo-updates"
import useSWR from "swr"

import { AppContext } from "../Main"
import { requests } from "../../utils/httpClient"
import withScreen from "../../utils/hoc/createScreen"
import { formatCurrency } from "../../utils/formatter"

import { Button, Text, LazyImage } from "../components/"
import { normalize } from "../../utils/scale"

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
    const response = await requests.fetchSampleProducts(12)
    const jsonResponse = await response.json()

    if (response.ok) {
        const products = jsonResponse

        const items = products.map((item) => ({
            id: item.id,
            name: item.name,
            image: item.images[0].src,
            price: item.price,
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
                    <View style={{ margin: normalize(5), width: normalize(200), justifyContent: "space-between" }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("ProductDetails", { ...item })
                            }}>
                            <LazyImage
                                source={{ uri: item.image }}
                                style={{
                                    width: "100%",
                                    height: normalize(150),
                                    borderRadius: normalize(10),
                                    marginBottom: 10,
                                }}
                            />
                            <View>
                                <Text
                                    style={{
                                        fontSize: normalize(18),
                                        fontWeight: "bold",
                                        marginBottom: normalize(10),
                                    }}>
                                    {item.name}
                                </Text>
                                <Text style={{ marginBottom: normalize(10), fontSize: normalize(14) }}>
                                    {formatCurrency(item.price)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Button
                            onPress={() => {
                                item.quantity = 1
                                addToCart(item)
                            }}
                            containerStyle={{ padding: normalize(14) }}
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
                            <LazyImage
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                }}
                                source={{ uri: appState.profile.image_url }}
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

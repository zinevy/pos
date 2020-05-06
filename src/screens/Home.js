import React, { Suspense, useContext, memo, useMemo } from "react"
import { View, Image, TouchableOpacity, FlatList, Button, ScrollView } from "react-native"
import styled from "@emotion/native"
import * as Updates from "expo-updates"
import useSWR from "swr"

import { AppContext } from "../Main"
import { requests } from "../../utils/httpClient"
import withScreen from "../../utils/hoc/createScreen"
import { formatCurrency } from "../../utils/formatter"
import withAppContext from "../../utils/hoc/withAppContext"

const Text = styled.Text(({ theme }) => ({
    color: theme.main.color,
}))

const Title = styled(Text)({
    fontSize: 30,
})

const List = styled(View)({
    flex: 1,
})

const ListTitle = styled(Text)({
    fontSize: 20,
    paddingTop: 20,
})

const ListButton = styled(TouchableOpacity)({
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#1E6738",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
})

const ListButtonText = styled(Text)({
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
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
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ProductDetails", { ...item })
                        }}>
                        <List>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: 200,
                                    height: 200,
                                    resizeMode: "contain",
                                }}
                            />
                            <ListTitle>{item.name}</ListTitle>
                            <Text>{formatCurrency(item.price)}</Text>
                            <ListButton
                                onPress={() => {
                                    item.quantity = 1
                                    addToCart(item)
                                }}>
                                <ListButtonText>Add to cart</ListButtonText>
                            </ListButton>
                        </List>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const Home = memo(({ navigation, activeTheme, toggleTheme, actions, appState }) => {
    return useMemo(() => {
        return (
            <ScrollView>
                <Suspense fallback={<Title>Loading...</Title>}>
                    <Text>{Updates.manifest.version}</Text>
                    {appState.profile && (
                        <Title>
                            Welcome {appState.profile.first_name} {appState.profile.last_name}
                        </Title>
                    )}

                    <Button title={activeTheme === "light" ? "Dark Mode" : "Light Mode"} onPress={toggleTheme} />
                    <Products navigation={navigation} />
                    {appState.userToken && (
                        <TouchableOpacity
                            onPress={() => {
                                actions.signOut()
                            }}>
                            <Text>Sign out</Text>
                        </TouchableOpacity>
                    )}
                </Suspense>
            </ScrollView>
        )
    }, [activeTheme, appState])
})

const mapContext = ({ activeTheme, toggleTheme, actions, appState }) => ({
    activeTheme,
    toggleTheme,
    actions,
    appState,
})

const withContextHome = withAppContext(mapContext)(Home)

export default withScreen()(withContextHome)

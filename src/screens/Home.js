import React, { Suspense, useContext, memo, useMemo } from "react"
import { Text, View, Image, TouchableOpacity, FlatList, Button } from "react-native"
import styled from "@emotion/native"
import * as Updates from "expo-updates"
import useSWR from "swr"

import { AppContext } from "../Main"
import { requests } from "../../utils/httpClient"
import withScreen from "../../utils/hoc/createScreen"

const Title = styled(Text)(({ theme }) => ({
    fontSize: 30,
    color: theme.main.color,
}))

const Wrapper = styled(View)({
    alignItems: "center",
})

const List = styled(View)({
    flex: 1,
})

const ListTitle = styled(Text)(({ theme }) => ({
    fontSize: 20,
    color: theme.main.color,
    paddingTop: 20,
    paddingBottom: 20,
}))

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

const fetchFormDetails = async () => {
    const res = await requests.get("users?per_page=10")
    if (res.ok) {
        const { data } = res

        return {
            ...data,
        }
    }

    return {}
}

const Products = ({ navigation }) => {
    const { data: users, error } = useSWR(1, fetchFormDetails, { suspense: true })
    const { addToCart } = useContext(AppContext)

    if (error) {
        return null
    }

    return (
        <FlatList
            data={users.data}
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
                                source={{ uri: item.avatar }}
                                style={{
                                    width: 200,
                                    height: 200,
                                    resizeMode: "contain",
                                }}
                            />
                            <ListTitle>{item.first_name}</ListTitle>
                            <ListButton onPress={() => addToCart(item)}>
                                <ListButtonText>Add to cart</ListButtonText>
                            </ListButton>
                        </List>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const Home = memo(({ navigation }) => {
    const { activeTheme, toggleTheme, authContext, appState } = useContext(AppContext)

    return useMemo(() => {
        return (
            <Wrapper>
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
                                authContext.signOut()
                            }}>
                            <Text>Sign out</Text>
                        </TouchableOpacity>
                    )}
                </Suspense>
            </Wrapper>
        )
    }, [activeTheme, appState])
})

export default withScreen()(Home)

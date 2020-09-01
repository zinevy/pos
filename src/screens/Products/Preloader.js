import React from "react"
import styled from "@emotion/native"
import { View } from "react-native"
import { normalize } from "../../../utils/scale"

const ItemRow = styled.View({
    flexDirection: "row",
    flexWrap: "wrap",
})

const ItemColumn = styled.View({
    width: "33.33%",
    padding: 10,
    paddingTop: 0,
    boxSizing: "border-box",
})

const ItemSkeleton = styled.View({
    backgroundColor: "#FFF",
    height: normalize(200),
    borderRadius: normalize(10),
    marginBottom: normalize(10),
})

const TextSkeleton = styled.View({
    width: "70%",
    height: normalize(10),
    borderRadius: normalize(10),
    marginBottom: normalize(10),
    backgroundColor: "#FFF",
})

const ListGridPreloader = ({ items }) => {
    const rows = [...Array(items).keys()]
    return (
        <View style={{ padding: normalize(10), paddingTop: 0 }}>
            <ItemRow>
                {rows.map((value, index) => {
                    return (
                        <ItemColumn key={index}>
                            <ItemSkeleton />
                            <TextSkeleton />
                        </ItemColumn>
                    )
                })}
            </ItemRow>
        </View>
    )
}

export default ListGridPreloader

import React, { memo } from "react"
import styled from "@emotion/native"
import { View } from "react-native"
import { normalize } from "../../../utils/scale"

const ImageSkeleton = styled.View({
    backgroundColor: "#FFF",
    width: "100%",
    height: normalize(180),
    borderRadius: 10,
})

const TitleSkeleton = styled.View({
    backgroundColor: "#FFF",
    width: "70%",
    height: normalize(20),
    marginTop: normalize(10),
    borderRadius: 10,
})

const StepperRow = styled.View({
    flexDirection: "row",
    justifyContent: "space-between",
})

const DescriptionSkeleton = styled.View({
    backgroundColor: "#FFF",
    width: "80%",
    height: normalize(20),
    marginTop: normalize(10),
    borderRadius: 10,
})

const Skeleton = styled.View(({ width }) => ({
    backgroundColor: "#FFF",
    width: `${width}%`,
    height: normalize(20),
    marginTop: normalize(10),
    borderRadius: 10,
}))

const DecrementSkeleton = styled.View({
    backgroundColor: "#FFF",
    width: "15%",
    height: normalize(40),
    marginTop: normalize(10),
    borderRadius: 10,
})

const InputSkeleton = styled.View({
    width: "70%",
    height: normalize(40),
    marginTop: normalize(10),
})

const IncrementSkeleton = styled.View({
    backgroundColor: "#FFF",
    width: "15%",
    height: normalize(40),
    marginTop: normalize(10),
    borderRadius: 10,
})
const ButtonGroupSkeletonRow = styled.View({
    flexDirection: "row",
})

const ButtonGroupTitleSkeleton = styled.View({
    backgroundColor: "#FFF",
    width: "50%",
    height: normalize(20),
    marginBottom: normalize(10),
    borderRadius: 10,
})

const ButtonGroupSkeleton = styled.View({
    backgroundColor: "#FFF",
    width: "33%",
    marginRight: 5,
    boxSizing: "border-box",
    height: normalize(40),
    marginBottom: normalize(10),
    borderRadius: 25,
})

const AddOnRow = styled.View({
    flexDirection: "row",
    marginBottom: 20,
})

const AddOnColumn = styled.View({
    width: "50%",
    marginRight: 5,
    boxSizing: "border-box",
    borderRadius: 10,
})

const Preloader = () => {
    return (
        <View style={{ padding: normalize(20), paddingTop: 0, flexDirection: "column", height: "100%", flex: 1 }}>
            <View
                style={{
                    flexDirection: "row",
                    height: "100%",
                    overflow: "hidden",
                }}>
                <View style={{ width: "30%" }}>
                    <ImageSkeleton />
                    <TitleSkeleton />
                    <DescriptionSkeleton />
                    <StepperRow>
                        <DecrementSkeleton />
                        <InputSkeleton />
                        <IncrementSkeleton />
                    </StepperRow>
                </View>
                <View
                    style={{
                        paddingLeft: normalize(10),
                        paddingRight: normalize(10),
                        width: "70%",
                        flex: 1,
                    }}>
                    <View>
                        <ButtonGroupSkeletonRow>
                            <ButtonGroupSkeleton />
                            <ButtonGroupSkeleton />
                            <ButtonGroupSkeleton />
                        </ButtonGroupSkeletonRow>
                        <ButtonGroupSkeletonRow>
                            <ButtonGroupSkeleton />
                            <ButtonGroupSkeleton />
                            <ButtonGroupSkeleton />
                        </ButtonGroupSkeletonRow>
                        <ButtonGroupSkeletonRow>
                            <ButtonGroupSkeleton />
                            <ButtonGroupSkeleton />
                            <ButtonGroupSkeleton />
                        </ButtonGroupSkeletonRow>
                    </View>
                    <View>
                        <AddOnRow>
                            <AddOnColumn>
                                <Skeleton width={60} />
                                <Skeleton width={100} />
                                <Skeleton width={100} />
                                <Skeleton width={100} />
                                <Skeleton width={100} />
                            </AddOnColumn>
                            <AddOnColumn>
                                <Skeleton width={60} />
                                <Skeleton width={100} />
                                <Skeleton width={100} />
                                <Skeleton width={100} />
                                <Skeleton width={100} />
                            </AddOnColumn>
                        </AddOnRow>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default Preloader

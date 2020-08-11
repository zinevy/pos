// import React, { memo, useCallback } from "react"
// import * as Updates from "expo-updates"

// import Modal from "react-native-modal"
// import { Dimensions, View, Text, TouchableOpacity } from "react-native"
// import useUpdates from "../../utils/hooks/useUpdates"

// const UpdateModal = memo(() => {
//     const { isModalVisible, update, manifest, setUpdate } = useUpdates()

//     const onProcessUpdate = useCallback(async () => {
//         if (update) {
//             Updates.reloadAsync()
//         }
//     }, [update])

//     const onConfirmUpdate = useCallback(() => {
//         setUpdate((prevState) => ({
//             ...prevState,
//             update: true,
//             isModalVisible: false,
//         }))
//     }, [])

//     const onCancelUpdate = useCallback(() => {
//         setUpdate((prevState) => ({
//             ...prevState,
//             update: false,
//             isModalVisible: false,
//         }))
//     }, [])

//     return (
//         <Modal
//             backdropOpacity={0.5}
//             testID="modal"
//             hasBackdrop
//             isVisible={isModalVisible}
//             animationInTiming={500}
//             animationOutTiming={1000}
//             onModalHide={onProcessUpdate}
//             onSwipeComplete={onCancelUpdate}
//             swipeDirection="down"
//             style={{
//                 flex: 1,
//                 margin: 0,
//                 borderRadius: 4,
//                 backgroundColor: "transparent",
//                 justifyContent: "flex-end",
//             }}>
//             <View style={{ alignItems: "center" }}>
//                 <View
//                     style={{
//                         width: 60,
//                         height: 6,
//                         alignItems: "center",
//                         borderRadius: 30,
//                         backgroundColor: "#FFF",
//                         marginBottom: 10,
//                     }}
//                 />
//                 <View
//                     style={{
//                         width: "100%",
//                         backgroundColor: "#FFF",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         borderRadius: 24,
//                         padding: 20,
//                         paddingBottom: 40,
//                         height: Dimensions.get("window").height * 0.23,
//                     }}>
//                     {manifest && (
//                         <Text style={{ fontSize: 18, marginTop: 20 }}>
//                             <Text style={{ fontWeight: "bold" }}>{manifest.version}</Text> is now available
//                         </Text>
//                     )}

//                     <Text style={{ marginTop: 10, fontSize: 15 }}>
//                         This update includes bug fixes and improvements.
//                     </Text>

//                     <View style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
//                         <TouchableOpacity onPress={onConfirmUpdate}>
//                             <Text style={{ fontWeight: "bold", marginRight: 40, fontSize: 15 }}>Update now</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity onPress={onCancelUpdate}>
//                             <Text>Dismiss</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     )
// })

// export default UpdateModal

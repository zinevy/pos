module.exports = {
    platforms: ["ios", "android"],
    orientation: "landscape",
    icon: "./assets/images/icon.png",
    scheme: "zinevy-pos",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    updates: {
        checkAutomatically: "ON_ERROR_RECOVERY",
        enabled: true,
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    extra: {
        test: 1,
    },
}

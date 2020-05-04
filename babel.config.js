module.exports = function (api) {
    api.cache(true)
    return {
        presets: ["babel-preset-expo", "@expo/next-adapter/babel"],
    }
}

addLayer("LOADING", {
    name: "L", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "lOAD", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0, // Row the layer is in on the tree (0 is the first row)
    color: "#414141",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    isActive(){ return inReality(-1) },
    layerShown() {
        return temp.LOADING.isActive
    },
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
})
addLayer("LOADING2", {
    name: "L", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ING", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0, // Row the layer is in on the tree (0 is the first row)
    color: "#414141",
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    isActive(){ return inReality(-1) },
    layerShown() {
        return temp.LOADING2.isActive
    },
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
})
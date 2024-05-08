addNode("ghost2", {
    name: "ghost", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "g", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#fffff",
    row: 2, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        if (temp.R0Gate.isActive)
            return "ghost"
    },
    tooltip(){ return "Enter Reality 4" },
    canClick() { return true }
})
addNode("ghost3", {
    name: "ghost", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "g", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#fffff",
    row: 2, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        if (temp.R0Gate.isActive)
            return "ghost"
    },
    tooltip(){ return "Enter Reality 4" },
    canClick() { return true }
})
addNode("R0Gate", {
    name: "R0Gate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R0", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#ff0000",
    branches: ["R1Gate", "R2Gate", "R3Gate", "R4Gate"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        return temp.R0Gate.isActive
    },
    onClick(){
        player.reality = new Decimal(0)
    },
    tooltip(){ return "Enter Reality 0" },
    canClick() { return true }
})
addNode("R1Gate", {
    name: "R1Gate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#00a206",
    row: 1, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        return temp.R0Gate.isActive
    },
    onClick(){
        player.reality = new Decimal(1)
    },
    tooltip(){ return "Enter Reality 1" },
    canClick() { return true }
})
addNode("R2Gate", {
    name: "R2Gate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#fffff",
    row: 2, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        return temp.R0Gate.isActive
    },
    onClick(){
        player.reality = new Decimal(2)
    },
    tooltip(){ return "Enter Reality 2" },
    canClick() { return true }
})
addNode("R3Gate", {
    name: "R3Gate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R3", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#fffff",
    row: 2, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        return temp.R0Gate.isActive
    },
    onClick(){
        player.reality = new Decimal(3)
    },
    tooltip(){ return "Enter Reality 3" },
    canClick() { return true }
})
addNode("R4Gate", {
    name: "R4Gate", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R4", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#fffff",
    row: 3, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(96) },
    layerShown() {
        return temp.R0Gate.isActive
    },
    onClick(){
        player.reality = new Decimal(4)
    },
    tooltip(){ return "Enter Reality 4" },
    canClick() { return true }
})
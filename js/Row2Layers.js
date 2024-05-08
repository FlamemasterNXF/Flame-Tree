addLayer("as", {
    name: "Atomic Shards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#6814ff",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "Atomic Shards", // Name of prestige currency
    baseResource: "Void Shards", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    baseAmount() {
        return player.v.points
    }, // Get the current amount of baseResource
    canReset() {
        return false
    },
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ["aa"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(0) },
    layerShown() {
        return (((hasUpgrade("a", 12) || hasMilestone("r", 0)) && !inChallenge("up", 11)) && !(hasMilestone("r", 0))) && temp.as.isActive
    },
    effect(){
        if (!hasUpgrade("aa", 11))
            return new Decimal(player.as.points.plus(1).div(10))
        if (hasUpgrade("aa", 11)){
            if (hasChallenge("a", 12))
                return new Decimal(1)
            else
                return new Decimal(player.as.points.plus(1).div(10))
        }
    },
    effectDescription(){
        return `dividing the Oddity requirement by ${format(tmp.as.effect)}`
    },
    update(diff) {
        if (!inChallenge("a", 12)){
            if (hasUpgrade("as", 11)){
                if (hasUpgrade("as", 13)){
                    if (player.as.points.plus(player.v.points).div(10).div(2).gte(player.as.points))
                        player.as.points = player.as.points.plus(player.v.points).div(10).div(2)
                }
                else
                    player.as.points = player.as.points.plus(player.v.points).div(100)
            }
        }
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            title: "Atomic Annihilation",
            description: "Gain 100% of Void Shard gain every second and convert 1% of your Void Shards to Atomic Shards every second",
            cost: 0
        },
        12: {
            title: "Atomic Power",
            description: "Atomic Shards boost Void Shard gain",
            effect(){
                return new Decimal(player.as.points.plus(1).log(2).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("as", 12))}x`
            },
            cost: 3000
        },
        13: {
            title: "Atomic Ascension",
            description: "5% of your Void Shards are converted to Atomic Shards instead of 1%",
            cost: 100000
        },
        14: {
            title: "Atomic Enhancement",
            description: "Atomic Shards boost Void Shard gain again",
            effect(){
                return new Decimal(player.as.points.plus(1).log(2).pow(1.1).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("as", 14))}x`
            },
            cost: 1e6
        },
        15: {
            title: "Atomic Synergy",
            description: "Atomic Shards also lower the Atom requirement, and unlock new Atom upgrades",
            effect(){
                if (hasUpgrade("a", 31) && !hasMilestone("r", 0))
                    return new Decimal(1)
                else
                    return new Decimal(player.as.points.plus(1).pow(1.8))
            },
            effectDisplay(){
                return `/${format(upgradeEffect("as", 15))}`
            },
            cost: 1e7
        },
    },
})
addLayer("aa", {
    name: "Awakened Atoms", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#1ba0ff",
    requires() {
        return new Decimal(7)
    },
    // Can be a function that takes requirement increases into account
    resource: "Awakened Atoms", // Name of prestige currency
    baseResource: "Atoms", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    base(){
        if (player.aa.points.equals(1)){
            return new Decimal(2).minus(tmp.up.effect.div(7))
        }
        else
            return new Decimal(2)
    },
    baseAmount() {
        return player.a.points
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ["r"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "w", description: "w: Reset your Atoms for Awakened Atoms ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    isActive(){ return inReality(0) },
    layerShown() {
        return (((hasChallenge("a", 12) || player.aa.total.gte(1)) && !inChallenge("up", 11)) && !(hasMilestone("r", 0)))  && temp.aa.isActive
    },
    effect(){
        if (player.aa.points.gte(1))
            return new Decimal(player.aa.best.times(10))
        else
            return new Decimal(1)
    },
    effectDescription(){
        if (player.aa.best.gte(1))
            return `multiplying Fire production by <h3>${format(tmp.aa.effect)}x</h3>`
        else
            return `multiplying Fire production by <h3>${format(new Decimal(1))}</h3>x`
    },
    milestones: {
        0: {
            requirementDescription: "1 Awakened Atom",
            effectDescription: "Gain 100% of Extra Flame every second, Autobuy Extra Flame Upgrades, gain 100% of Void Shard Gain every second, Autobuy Void Shard Upgrades, and lower the costs of Flamemaster96 and I ran out of names",
            done() { return player.aa.points.gte(1) }
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            unlocked(){
                return !hasMilestone("r", 0)
            },
            title: "Quite Peculiar",
            description: "[Only works if Atomic Awakening is completed] Disable the effect of Atomic Shards, lower the base requirement for Oddities to 3e21, reset Oddities, but open up a portal to the Odd",
            cost: 1,
            pay() {
                player.aa.points = player.aa.points.sub(1)
                player.o.points = player.o.points.sub(player.o.points)
            }
        },
    }
})

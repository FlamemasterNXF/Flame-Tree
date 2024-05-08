addLayer("ghost1", {
    row: 2, // Row the layer is in on the tree (0 is the first row)
    position: 3,
    layerShown() {
        if (hasUpgrade("vg", 21))
            return "ghost"
    },
})
addLayer("g2", {
    name: "gwa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "gwa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    image: "https://cdn.discordapp.com/emojis/844745243592884264.png?v=1",
    color: "#ffffff",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "true gwa", // Name of prestige currency
    baseResource: "", // Name of resource prestige is based on
    baseAmount() {
        return new Decimal(0)
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetDescription: "Reset for ",
    branches: [],
    unlocked() {
        return hasUpgrade("n", 42) || player.g.points.gte(1) || hasUpgrade("g", 11);
    },
    canReset() {
        return false
    },
    row: 96, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(0) },
    layerShown() {
        return ((hasUpgrade("g", 21)) && !inChallenge("up", 11)) && temp.g2.isActive
    },
    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "the true gwa.",
            description: "unleash the true power of gwa.",
            cost: 1
        },
    }
})
addLayer("n", {
    name: "NXF", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "NXF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(1),
        }
    },
    color: "#ff0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Extra Flame", // Name of prestige currency
    baseResource: "Fire", // Name of resource prestige is based on
    baseAmount() {
        return player.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("o", 11)) mult = mult.times(upgradeEffect("o", 11))
        if (hasUpgrade("o", 12)) mult = mult.times(upgradeEffect("o", 12))
        if (hasUpgrade("o", 13)) mult = mult.times(upgradeEffect("o", 13))
        if (hasUpgrade("o", 14)) mult = mult.times(upgradeEffect("o", 14))
        if (hasUpgrade("o", 15)) mult = mult.times(upgradeEffect("o", 15))
        if (hasUpgrade("o", 16)) mult = mult.times(upgradeEffect("o", 16))
        if (hasUpgrade("o", 21)) mult = mult.times(upgradeEffect("o", 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration(){
        if (!inChallenge("a", 11)) {
            if (! hasMilestone("aa", 0)){
                if (!hasUpgrade("g", 21))
                    return hasMilestone("g",0) && (!hasUpgrade("g", 21))
                else
                    return hasMilestone("v", 0)
            }
            else
                return hasMilestone("aa", 0)
        }
    },
    autoUpgrade(){
        if (!inChallenge("a", 11)){
            if (!hasMilestone("aa", 0))
                return hasMilestone("v", 0)
            else
                return hasMilestone("aa", 0)
        }
    },
    branches: ["g", "v", "a", "o"],
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "n", description: "n: Reset your Fire for Extra Flame ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    isActive(){ return inReality(0) },
    layerShown() {
        return !inChallenge("up", 11) && temp.n.isActive
    },
    upgrades: {
        rows: 4,
        cols: 3,
        11: {
            title: "Flame",
            description: "Generate +2 Fire for every NXF upgrade",
            effect(){
                return new Decimal(player.n.upgrades.length).times(2).plus(1)
            },
            effectDisplay() {
                return `+${format(upgradeEffect("n", 11))}`;
            },
            cost: 2
        },
        12: {
            title: "Flamemaster",
            description: "Is this a FlamemasterNXF game without inflation early on? Fire Multiplies Fire gain!",
            effect(){
                if (player.points.gte(1)){
                    if (hasUpgrade("n", 13))
                        return new Decimal(player.points.sqrt().sqrt().log(2).plus(1))
                    else
                        return new Decimal(player.points.sqrt().sqrt().log(10).plus(1))
                }
                else
                    return new Decimal(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect("n", 12))}x`;
            },
            cost: 10
        },
        13: {
            title: "FlamemasterNXF",
            description: "The previous upgrade is horrible! Change the log(10) to a log(2) in it's formula",
            cost: 20
        },
        21: {
            title: "FLAMEMASTER999",
            description: "9 is a cool number. Multiply your Fire gain by 9",
            effect(){
                if (hasUpgrade("n", 33)){
                    return new Decimal(1)
                }
                if (hasUpgrade("n", 23))
                    return new Decimal(99)
                else
                    return new Decimal(9)
            },
            cost: 21
        },
        22: {
            title: "FLAMEMASTER444",
            description: "9 is still a cool number! Multiply your Fire gain by 9 *before all other effects*",
            effect(){
                if (hasUpgrade("n", 33)){
                    return new Decimal(1)
                }
                if (hasUpgrade("n", 23))
                    return new Decimal(99)
                else
                    return new Decimal(9)
            },
            cost: 121
        },
        23: {
            title: "FLAMEMASTER9000",
            description: "Why did I keep changing the numbers in my name? No clue! Both of the previous upgrades now multiply by 99 instead",
            cost: 169
        },
        31: {
            title: "Burning Flame",
            description: "Upgrades without a formula are boring. Multiply Fire gain by a formula that is good!",
            effect(){
                if (hasUpgrade("n", 32))
                    return new Decimal(1)
                if (player.points.gte(1) && hasUpgrade("n", 11))
                    return new Decimal(player.points.log(100).plus(1))
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("n", 31))}x`;
            },
            cost: 960
        },
        32: {
            title: "Flamemaster96",
            description: "96 best number. Raise Fire gain to... a power that is calculated based off a complex formula! But disable Burning Flame, its gonna inflate :(",
            effect(){
                if (player.points.gte(1) && hasUpgrade("n", 11)){
                    if (hasUpgrade("n", 33)){
                        return new Decimal(player.points.sqrt().log(90).plus(1))
                    }
                    else
                        return new Decimal(player.points.sqrt().log(9e6).plus(1))
                }
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `^${format(upgradeEffect("n", 32))}`;
            },
            cost(){
                if (hasMilestone("r", 0))
                    return new Decimal(0)
                if (!hasMilestone("aa", 0))
                    return new Decimal(1.0096e4)
                else
                    return new Decimal(1.0096e3)
            }
        },
        33: {
            title: "I ran out of names",
            description: "Wow that last Upgrade really made progress take off! Disable all row 2 upgrades, but Flamemaster96 has a much better formula [log(9e6) => log(90)]",
            cost() {
                if (hasMilestone("r", 0))
                    return new Decimal(0)
                if (!inChallenge("a", 12)){
                    if (!hasMilestone("aa", 0))
                        return new Decimal(9.6e4)
                    else
                        return new Decimal(9.6e3)
                }
                else
                    return new Decimal(15000)
            }
        },
        42: {
            unlocked(){return hasUpgrade("n", 33)},
            title: "Lol the previous upgrade is a obvious nerf to prevent inflation!! (trolled!)",
            description: "Unlock a new layer because this one is boring now",
            cost: 1
        },
    }
})
addLayer("g", {
    name: "gwa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "gwa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    image: "https://cdn.discordapp.com/emojis/844745243592884264.png?v=1",
    color: "#ffffff",
    requires: new Decimal(1e4), // Can be a function that takes requirement increases into account
    resource: "gwa", // Name of prestige currency
    baseResource: "Extra Flame", // Name of resource prestige is based on
    baseAmount() {
        return player.n.points
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
    resetDescription: "[requires final nxf upgrade] reset for ",
    branches: [],
    canReset() {
        return hasUpgrade("n", 42) && player.n.points.gte(tmp.g.nextAt);
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "g", description: "g: reset your extra flame for gwa", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return ((!hasUpgrade("g", 21)) && !inChallenge("up", 11))  && temp.g.isActive
    },
    isActive(){ return inReality(0) },
    doReset(resettingLayer){
        switch(resettingLayer) {
            case "sp": false; break;
            case "up": false; break;
            default: true; break;
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 gwa",
            effectDescription: "gain 100% of extra flame every second",
            done() { return player.g.points.gte(1) }
        },
    },
    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "g",
            description: "what is this thing??? it seems to boost your fire production based on your extra flame?",
            effect(){
                if (player.n.points.gte(1)){
                    if (hasUpgrade("g", 12))
                        return new Decimal(player.n.points.log(10).plus(1).times(upgradeEffect("g", 12)))
                    else
                        return new Decimal(player.n.points.log(10).plus(1))
                }
                else
                    return new Decimal(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect("g", 11))}x`;
            },
            cost: 1
        },
        12: {
            title: "w",
            description: "it demands more. multiply the previous upgrade's effect by the log(100) of itself",
            effect(){
                if (player.n.points.gte(1))
                    return new Decimal(upgradeEffect("g", 11).log(100).plus(1))
                else
                    return new Decimal(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect("g", 12))}x`;
            },
            cost: 1
        },
        13: {
            title: "a",
            description: "the gwa has awoken. multiply the previous upgrade's effect by the log(100) of itself",
            effect(){
                if (player.n.points.gte(1))
                    return new Decimal(upgradeEffect("g", 12).log(100).plus(1))
                else
                    return new Decimal(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect("g", 13))}x`;
            },
            cost: 2
        },
        21: {
            unlocked() {
                return hasUpgrade("g", 13)
            },
            title: "gwa",
            description: "gwa.",
            cost: 1
        },
    }
})
addLayer("v", {
    name: "Void", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#9800cd",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resetDescription: "[REQUIRES FINAL NXF UPGRADE] Reset for ",
    resource: "Void Shards", // Name of prestige currency
    baseResource: "Extra Flame", // Name of resource prestige is based on
    canReset() {
        return (hasUpgrade("n", 42) || hasUpgrade("n", 33)) && player.n.points.gte(10000);
    },
    baseAmount() {
        return player.n.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade("as", 12)) mult = mult.times(upgradeEffect("as", 12))
        if (hasUpgrade("as", 14)) mult = mult.times(upgradeEffect("as", 14))
        if (hasUpgrade("ha", 22)) mult = mult.times(upgradeEffect("ha", 22))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        if (hasMilestone("r", 0))
            return true
        if (!hasMilestone("aa", 0))
            return hasUpgrade("as", 11);
        else
            return hasMilestone("aa", 0)
    },
    autoUpgrade() {
        return hasMilestone("aa", 0);
    },
    branches: ["a", "as", "ha"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "v", description: "v: Reset your Extra Flame for Void Shards ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    layerShown() {
        return (hasUpgrade("g", 21) && !inChallenge("up", 11)) && temp.v.isActive
    },
    isActive(){ return inReality(0) },
    update(diff) {
        if (player.v.points.equals(0) && hasUpgrade("g", 21)){
            player.v.points = player.v.points.plus(1)
        }
    },
    milestones: {
        0: {
            requirementDescription: "1 Void Shard",
            effectDescription: "Gain 100% of Extra Flame every second and Autobuy Extra Flame Upgrades",
            done() { return player.v.points.gte(1) }
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            unlocked(){
                return (!inChallenge("a", 12))
            },
            title: "...",
            description: "Multiply Fire gain by the log(10) of Fire",
            effect(){
                if (player.points.gte(1))
                    return new Decimal(player.points.log(10).plus(1))
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("v", 11))}x`
            },
            cost: 2
        },
        12: {
            unlocked(){
                return (!inChallenge("a", 12))
            },
            title: "Endless.",
            description: "Multiply Fire gain by the log(2) of Fire",
            effect(){
                if (player.points.gte(1))
                    return new Decimal(player.points.log(2).plus(1))
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("v", 12))}x`
            },
            cost: 20
        },
        13: {
            unlocked(){
                return (!inChallenge("a", 12) && !hasMilestone("r", 0))
            },
            title: "Void",
            description: "Multiply Fire gain by the slog of Fire raised to the 2nd Power",
            effect(){
                if (hasUpgrade("a", 11) || hasMilestone("r", 0))
                    return new Decimal(1)
                else{
                    if (player.points.gte(1))
                        return new Decimal(player.points.slog().pow(2).plus(1))
                    else
                        return new Decimal(1)
                }
            },
            effectDisplay(){
                return `${format(upgradeEffect("v", 13))}x`
            },
            cost: 300
        },
        14: {
            unlocked(){
                return (!inChallenge("a", 12) && !hasMilestone("r", 0))
            },
            title: "Void II",
            description: "Multiply Fire gain by the slog of Fire raised to the 5th Power",
            effect(){
                if (hasUpgrade("a", 11) || hasMilestone("r", 0))
                    return new Decimal(1)
                else{
                    if (player.points.gte(1))
                        return new Decimal(player.points.slog().pow(5).plus(1))
                    else
                        return new Decimal(1)
                }
            },
            effectDisplay(){
                return `${format(upgradeEffect("v", 14))}x`
            },
            cost: 1000
        },
    }
})
addLayer("a", {
    name: "Atoms", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#0074cd",
    requires() {
        if (!player.a.points.gte(7)){
            if (hasUpgrade("as", 15))
                return new Decimal(1e37).div(upgradeEffect("as", 15))
            else
                return new Decimal(1e37)
        }
        else
            return new Decimal(1e969696969696)
    },
    // Can be a function that takes requirement increases into account
    resource: "Atoms", // Name of prestige currency
    baseResource: "Fire", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    baseAmount() {
        return player.points
    }, // Get the current amount of baseResource
    type: "static", // normal: costeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee to gain currency depends on amount gained. static: cost depends on how much you already have
    base(){
        if (hasUpgrade("as", 15)){
            return 1e6
        }
        else{
            return 1e9696
        }
    },
    branches: ["aa"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "a", description: "a: Reset your Extra Flame for Atoms ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    isActive(){ return inReality(0) },
    layerShown() {
        return ((hasUpgrade("g", 21) && !inChallenge("up", 11)) && !(hasMilestone("r", 0))) && temp.a.isActive
    },
    update(diff){
        if(player.a.points.gt(7)){
            player.a.points = new Decimal(7)
        }
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            unlocked(){
                return !(hasMilestone("r", 0))
            },
            title: "Atomic Destruction",
            description: "Annihilate Atoms, which deactivates Void and Void II, but unlock something new?",
            cost: 1
        },
        12: {
            unlocked(){
                return (hasChallenge("a", 11) && !(hasMilestone("r", 0)))
            },
            title: "Atomic Shards",
            description: "Annihilate Annihilated Atoms, which unlocks 2 new Layers.",
            cost: 0
        },
        21: {
            unlocked(){
                return hasUpgrade("as", 15)
            },
            effect(){
                return new Decimal(9)
            },
            fullDisplay: "<h3>Atomic 9</h3><br>Multiply your Fire gain by 9<br><br>Requires: 1 Atom",
            canAfford(){
                if (!hasMilestone("r", 0))
                return (player.a.points.gte(1))
                else
                    return (true)
            },
        },
        22: {
            unlocked(){
                return hasUpgrade("as", 15)
            },
            effect(){
                if (player.a.points.lessThan(11))
                    return new Decimal(player.a.points).plus(1)
                else
                    return new Decimal(10)
            },
            fullDisplay: "<h3>Atomic Repetition</h3><br>Multiply your Fire Gain by your Atoms (capped at 10x)<br><br>Requires: 2 Atoms and 1 Oddity",
            canAfford(){
                if (!hasMilestone("r", 0))
                return (player.a.points.gte(2) && player.o.points.gte(1))
                else
                    return true
            },
        },
        23: {
            unlocked(){
                return hasUpgrade("as", 15)
            },
            effect(){
                if (inChallenge("a", 12)){
                    return new Decimal(player.as.points.plus(1).sqrt())
                }
                else
                    return new Decimal(player.as.points.plus(1).log(10).sqrt())
            },
            fullDisplay() {
                return `<h3>Atomic Shattering</h3><br>Atomic Shards multiply your Fire gain<br><br>Requires: 5 Atoms and 100 Oddities<br>Currently: ${format(upgradeEffect("a", 23))}x`
            },
            canAfford(){
                if (!hasMilestone("r", 0))
                return (player.a.points.gte(5) && player.o.points.gte(100))
                else
                    return (true)
            },
        },
        31: {
            unlocked(){
                return hasUpgrade("a", 23) && !hasMilestone("r", 0)
            },
            fullDisplay() {
                return `<h3>Atomic Awakening.</h3><br>Disable the last Atomic Shard Upgrade but unlock <h3>Atomic Awakening</h3>.<br><br>Requires: 7 Atoms and 9600 Oddities`
            },
            canAfford(){
                if (!hasMilestone("r", 0))
                return (player.a.points.gte(7) && player.o.points.gte(9600))
                else
                    return (true)
            },
        },
    },
    challenges: {
        11: {
            unlocked(){return hasUpgrade("a", 11) || hasUpgrade("r", 11)},
            name: "Atomic Annihilation",
            challengeDescription: "Invert all Upgrade Effects, disable Upgrades that raise something to a power, the Void Milestone is disabled, each upgrade multiplies production by 2 (before all other effects), and reset EVERYTHING BEFORE ATOMS.",
            goalDescription: "At least 4 NXF Upgrades",
            rewardDescription: "...",
            canComplete: function() {return new Decimal(player.n.upgrades.length).gte(4) || hasUpgrade("r", 11)},
            onEnter() {
                player.points = player.points.sub(player.points)
                player.n.points = player.n.points.sub(player.n.points.sub(5))
                player.v.points = player.v.points.sub(player.v.points)
                layerDataReset("n")
                layerDataReset("v")
            },
            onExit() {
                player.v.points = player.v.points.plus(1)
            }
        },
        12: {
            unlocked(){return hasUpgrade("a", 31) || hasUpgrade("r", 11)},
            name: "Atomic Awakening",
            challengeDescription: "All effects of Atomic Annihilation, Atomic Shattering uses a better formula, disable all new Atom Upgrades (except Atomic Shattering), Void Shards stop converting to Atomic Shards, and reset EVERYTHING BEFORE ATOMS.",
            goalDescription: "Buy the final NXF Upgrade",
            rewardDescription: "Awaken The Atoms",
            canComplete: function() {return hasUpgrade("n", 42) || hasUpgrade("r", 11)},
            onEnter() {
                player.points = player.points.sub(player.points)
                player.n.points = player.n.points.sub(player.n.points.sub(5))
                player.v.points = player.v.points.sub(player.v.points)
                layerDataReset("n")
                layerDataReset("v")
            },
            onExit() {
                player.v.points = player.v.points.plus(1)
                player.o.points = player.o.points.sub(player.o.points)
            },
            countsAs: [11]
        },
    }
})
addLayer("o", {
    name: "Oddities", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#8a8a8a",
    requires() {
        if (hasUpgrade("aa", 11) && hasChallenge("a", 12))
            return new Decimal(3e21)
        if (tmp.as.effect.gt(1))
            return new Decimal(1e17).div(tmp.as.effect)
        else
            return new Decimal(1e96)
    }, // Can be a function that takes requirement increases into account
    resource: "Oddities", // Name of prestige currency
    baseResource: "Extra Flame", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    baseAmount() {
        return player.n.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
        if (hasUpgrade("aa", 11)&& hasChallenge("a", 12)){
            return new Decimal(0.1)
        }
        else
            return new Decimal(0.5)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    deactivated(){
        if (hasUpgrade("r", 11))
            return true
    },
    branches: ["vg"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "o", description: "o: Reset your Extra Flame for Oddities ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    isActive(){ return inReality(0) },
    layerShown() {
        return (((hasUpgrade("a", 12) || player.sp.points.gte(1) || player.up.points.gte(1) || hasUpgrade("sp", 11)) && !inChallenge("up", 11)) && !(hasMilestone("r", 0))) && temp.o.isActive
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            unlocked() {
                return (hasUpgrade("aa", 11) && hasChallenge("a", 12))
            },
            title: "Odd",
            description: "Multiply Extra Flame gain by the amount of m's in this Hmmmmmmmmm",
            effect(){
                return new Decimal(9)
            },
            cost: 1
        },
        12: {
            unlocked() {
                return (hasUpgrade("o", 11)&& hasChallenge("a", 12))
            },
            title: "Strange",
            description: "Multiply Extra Flame gain by Extra Flame",
            effect(){
                if (hasUpgrade("o", 22))
                    return new Decimal(player.n.points.plus(1).log(1000).times(upgradeEffect("o", 22)).plus(1))
                else
                    return new Decimal(player.n.points.plus(1).log(1000).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("o", 12))}x`
            },
            cost: 1
        },
        13: {
            unlocked() {
                return (hasUpgrade("o", 12)&& hasChallenge("a", 12))
            },
            title: "Weird",
            description: "Multiply Extra Flame gain by Extra Flame again",
            effect(){
                if (hasUpgrade("o", 23)){
                    return new Decimal(player.n.points.plus(1).log(500).times(upgradeEffect("o", 23)).plus(1))
                }
                return new Decimal(player.n.points.plus(1).log(500).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("o", 13))}x`
            },
            cost: 2
        },
        14: {
            unlocked() {
                return (hasUpgrade("o", 13)&& hasChallenge("a", 12))
            },
            title: "Bizarre",
            description: "Multiply Extra Flame gain by 2 for each Oddity Upgrade",
            effect(){
                if (new Decimal(player.o.upgrades.length).gte(1)){
                    if (hasUpgrade("o", 24)){
                        return new Decimal(player.o.upgrades.length).times(3)
                    }
                    else
                        return new Decimal(player.o.upgrades.length).times(2)
                }
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("o", 14))}x`
            },
            cost: 3
        },
        15: {
            unlocked() {
                return (hasUpgrade("o", 14)&& hasChallenge("a", 12))
            },
            title: "Unusual",
            description: "Multiply Extra Flame gain by Void Shards",
            effect(){
                if (hasUpgrade("o", 25)){
                    return new Decimal(player.v.points.log(200).plus(1).times(upgradeEffect("o", 25)))
                }
                else
                    return new Decimal(player.v.points.log(200))
            },
            effectDisplay(){
                return `${format(upgradeEffect("o", 15))}x`
            },
            cost: 5
        },
        16: {
            unlocked() {
                return (hasUpgrade("o", 15)&& hasChallenge("a", 12))
            },
            title: "Abnormal",
            description: "Multiply Extra Flame gain by Fire",
            effect(){
                if (hasUpgrade("o", 26)){
                    return new Decimal(player.points.log(200).plus(1).times(upgradeEffect("o", 26))).plus(1)
                }
                else
                    return new Decimal(player.points.log(200))
            },
            effectDisplay(){
                return `${format(upgradeEffect("o", 16))}x`
            },
            cost: 7
        },
        21: {
            unlocked() {
                return (hasUpgrade("o", 16)&& hasChallenge("a", 12))
            },
            title: "Unconventional",
            description: "Multiply Extra Flame gain by Atoms",
            effect(){
                return new Decimal(player.a.points).pow(1.5)
            },
            effectDisplay(){
                return `${format(upgradeEffect("o", 21))}x`
            },
            cost: 10
        },
        22: {
            unlocked() {
                return (hasUpgrade("o", 21)&& hasChallenge("a", 12))
            },
            title: "Outlandish",
            description: "Multiply Strange's effect by the log(20) of itself",
            effect(){
                return new Decimal(upgradeEffect("o", 12)).plus(1).log(20).plus(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("o", 22))}x`
            },
            cost: 10
        },
        23: {
            unlocked() {
                return (hasUpgrade("o", 22)&& hasChallenge("a", 12))
            },
            title: "Freaky",
            description: "Multiply Weird's effect by the log(20) of itself",
            effect(){
                return new Decimal(upgradeEffect("o", 13)).plus(1).log(20).plus(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("o", 23))}x`
            },
            cost: 10
        },
        24: {
            unlocked() {
                return (hasUpgrade("o", 23)&& hasChallenge("a", 12))
            },
            title: "Uncommon",
            description: "Bizarre is 3x instead",
            cost: 15
        },
        25: {
            unlocked() {
                return (hasUpgrade("o", 24)&& hasChallenge("a", 12))
            },
            title: "Irregular",
            description: "Multiply Bizarre's effect by the log(20) of itself",
            effect(){
                return new Decimal(upgradeEffect("o", 15)).plus(1).log(20).plus(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("o", 25))}x`
            },
            cost: 20
        },
        26: {
            unlocked() {
                return (hasUpgrade("o", 25)&& hasChallenge("a", 12))
            },
            title: "Questionable",
            description: "Multiply Abnormal's effect by the log(20) of itself",
            effect(){
                if (upgradeEffect("o", 16).gte(1))
                    return new Decimal(upgradeEffect("o", 16)).plus(1).log(20).plus(1)
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("o", 26))}x`
            },
            cost: 20
        },
        31: {
            unlocked() {
                return (hasUpgrade("o", 26)&& hasChallenge("a", 12))
            },
            title: "Void.",
            description: "Unleash the power of the Oddities and awaken the Void",
            cost: 10
        },
    },
})
addLayer("vg", {
    name: "void gwa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "vgwa", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    image: "https://cdn.discordapp.com/emojis/854483367600193566.png",
    color: "#393939",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "void gwa", // Name of prestige currency
    baseResource: "oddities", // Name of resource prestige is based on
    baseAmount() {
        return new Decimal(player.o.points)
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base() {
        return 1e9696;
    },
    resetDescription: "Reset for ",
    deactivated() {
        if (hasUpgrade("r", 11))
            return true
    },
    branches: ["p"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(0) },
    layerShown() {
        return ((((hasUpgrade("o", 31) || player.vg.points.gte(1)) || player.sp.points.gte(1) || player.up.points.gte(1) || hasUpgrade("sp", 11)) && !inChallenge("up", 11)) && !hasMilestone("r", 0)) && temp.vg.isActive
    },
    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "the opposite",
            description: "why are you doing this?",
            cost: 0
        },
        12: {
            unlocked(){
                return hasUpgrade("vg", 11)
            },
            title: "no",
            description: "stop.",
            cost: 0
        },
        13: {
            unlocked(){
                return hasUpgrade("vg", 12)
            },
            title: "i said stop.",
            description: "stop now or face the consequences.",
            cost: 0
        },
        21: {
            unlocked(){
                return hasUpgrade("vg", 13)
            },
            title: "consequences",
            description(){
                return "enter hell."
            },
            cost: 1
        },
    }
})
addLayer("ha", {
    name: "Hyper Real Atoms", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "HA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#4700ff",
    requires() {
        return new Decimal(5e18)
    },
    // Can be a function that takes requirement increases into account
    resource: "Hyper Real Atoms", // Name of prestige currency
    baseResource: "Fire", // Name of resource prestige is based on
    resetDescription: "Shatter your Atoms for ",
    baseAmount() {
        return player.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: costeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee to gain currency depends on amount gained. static: cost depends on how much you already have
    branches: ["r"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    passiveGeneration() {
        return hasMilestone("r", 0);
    },
    exponent() {
        return 0.001;
    },
    gainMult(){
        let mult = new Decimal(1)
        if (hasUpgrade("ha", 11)) mult = mult.plus(upgradeEffect("ha", 11))
        return mult
    },
    isActive(){ return inReality(0) },
    layerShown() {
        return hasMilestone("r", 0) && temp.ha.isActive
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            effect(){
                return new Decimal(9)
            },
            title: "Hyper Atomic 9",
            description: "Multiply your Hyper Real Atom gain by 9",
            cost: 10
        },
        22: {
            title: "Hyper Atomic Enhancement",
            description: "Hyper Real Atoms boost Void Shard gain",
            effect(){
                return new Decimal(player.ha.points.plus(1).div(5).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("ha", 22))}x`
            },
            cost: 20
        },
    },
})
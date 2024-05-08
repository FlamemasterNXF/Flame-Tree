addLayer("p", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#ffffff",
    requires() {
        return new Decimal(1e9696)
    }, // Can be a function that takes requirement increases into account
    resource: "Prestige Points", // Name of prestige currency
    exponent(){
        return new Decimal(0.3)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect(){
        if (!hasUpgrade("r", 11))
        return new Decimal(player.p.points.plus(1).log(10).plus(1))
        else
            return new Decimal(1)
    },
    effectDescription(){
        return `multiplying Fire gain by ${format(tmp.p.effect)}`
    },
    autoUpgrade() {
        return hasMilestone("sp", 0);
    },
    doReset(resettingLayer){
        switch(resettingLayer) {
            case "sp": layerDataReset("p"); break;
            case "up": layerDataReset("p"); break;
            default: layerDataReset("p", ['points']); break;
        }
    },
    branches: ["sp"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(0) },
    layerShown() {
        return (((hasUpgrade("vg", 21) || new Decimal(player.sp.points).gte(1) || player.up.points.gte(1) || hasUpgrade("sp", 11)) && !inChallenge("up", 11)) && !(hasMilestone("r", 0))) && temp.p.isActive
    },
    update(diff){
        let gain = new Decimal(0)
        if (hasUpgrade("p", 11)){
            if (hasUpgrade("p", 11)) gain = gain.plus(0.1)
            if (hasUpgrade("p", 12)) gain = gain.times(upgradeEffect("p", 12))
            if (hasUpgrade("p", 13)) gain = gain.times(upgradeEffect("p", 13))
            if (hasUpgrade("p", 14)) gain = gain.times(upgradeEffect("p", 14))
            if (hasUpgrade("p", 15)) gain = gain.times(upgradeEffect("p", 15))
            if (getBuyableAmount("p", 11).gte(1)) gain = gain.times((getBuyableAmount("p", 11)).times(2))
            if (player.sp.points.gte(1)) gain = gain.times(tmp.sp.effect)
            if (hasUpgrade("sp", 11)) gain = gain.times(upgradeEffect("sp", 11))
            if (hasUpgrade("sp", 12) || hasUpgrade("up", 12)) gain = gain.times(upgradeEffect("sp", 12))
            if (hasUpgrade("sp", 15)) gain = gain.times(upgradeEffect("sp", 15))
            if (hasUpgrade("sp", 16)) gain = gain.times(upgradeEffect("sp", 16))
            if (hasUpgrade("sp", 21)) gain = gain.times(upgradeEffect("sp", 21))
            if (hasUpgrade("sp", 22)) gain = gain.times(upgradeEffect("sp", 22))
        }
        player.p.points = player.p.points.plus(gain)
    },
    buyables: {
        11: {
            unlocked(){
                return hasUpgrade("p", 15) && !(hasUpgrade("sp", 12) || hasUpgrade("up", 12))
            },
            cost() {return new Decimal(300000)},
            display() {return `<h3>PRESTIGE</h3><br>Reset your Prestige Points for a boost (capped at 50x)<br><h2>Currently: ${getBuyableAmount("p", 11).times(2)}x</h2><br>Requires 300,000 Prestige Points`},
            canAfford() {
                if (!getBuyableAmount("p", 11).gte(25))
                    return player.p.points.gte(this.cost())
                else
                    return false
            },
            buy() {
                player.p.points = player.p.points.sub(player.p.points)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            title: "Welcome",
            description: "Welcome to hell. Generate 1 Prestige Point every second",
            cost: 0
        },
        12: {
            title: "Timewall Gaming",
            description: "Multiply Prestige Point gain based on Prestige points",
            effect(){
                return new Decimal(player.p.points.plus(1).log(5).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("p", 12))}x`
            },
            cost: 30
        },
        13: {
            title: "Timewall Gaming^2",
            description: "Multiply Prestige Point gain based on Prestige points again",
            effect(){
                return new Decimal(player.p.points.plus(1).log(5).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("p", 13))}x`
            },
            cost: 300
        },
        14: {
            title: "Odd.",
            description: "Multiply Prestige Point gain based on Oddities",
            effect(){
                return new Decimal(player.o.points.plus(1).log(10).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("p", 14))}x`
            },
            cost: 1000
        },
        15: {
            title: "Points when",
            description: "Multiply Prestige Point gain based on Fire and unlock a Buyable",
            effect(){
                return new Decimal(player.points).plus(1).log(100).plus(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("p", 15))}x`
            },
            cost: 2500
        },
        clickables: {
            11: {
                unlocked(){
                    return (!hasUpgrade("p", 11))
                },
                title() {return "Skip"},
                display() {return "<h3>READ CAREFULLY, this Option will disappear after you buy the first Prestige Upgrade.</h3><br>THIS IS A OPTION. THIS IS NOT PART OF THE STORY. ONLY BUY THIS IF YOU WANT TO, IT IS NOT REQUIRED!!! Gain Eternal Shame, but skip the Hell Layers"},
                canClick(){return true},
                onClick(){
                    player.up.challenges[11] = 1
                    player.up.points = new Decimal(7)
                },
            },
        }
    },
})
addLayer("sp", {
    name: "Super Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#8a8a8a",
    requires() {
        if (hasUpgrade("sp", 14) || hasUpgrade("up", 14))
        return new Decimal(1e6)
        else
            return new Decimal(5e7)
    }, // Can be a function that takes requirement increases into account
    resource: "Super Prestige Points", // Name of prestige currency
    baseResource: "Prestige Points", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    baseAmount() {
        return player.p.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
        return new Decimal(0.3)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasMilestone("up", 0)) mult = mult.plus(9)
        if (hasUpgrade("up", 11)) mult = mult.plus(upgradeEffect("up", 11))
        if (hasUpgrade("up", 13)) mult = mult.plus(upgradeEffect("up", 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        if (hasMilestone("up", 0))
        return new Decimal(0.01)
    },
    autoUpgrade() {
        return hasUpgrade("up", 14);
    },
    effect(){
        return new Decimal(player.sp.points).plus(1).sqrt().plus(1)
    },
    effectDescription(){
        return `multiplying Prestige Point gain by ${format(tmp.sp.effect)}`
    },
    resetsNothing() {
        return true;
    },
    onPrestige() {
        layerDataReset("p");
    },
    deactivated(){
        if (hasUpgrade("r", 11))
            return true
    },
    branches: ["up"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "s", description: "s: Reset your Prestige Points for Super Prestige Points ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    isActive(){ return inReality(0) },
    layerShown() {
        return (((hasUpgrade("vg", 21) || player.sp.points.gte(1) || player.up.points.gte(1) || hasUpgrade("sp", 11)) && !inChallenge("up", 11)) && !(hasMilestone("r", 0))) && temp.sp.isActive
    },
    milestones: {
        0: {
            unlocked(){
                return hasUpgrade("sp", 13) || hasMilestone("up", 0)
            },
            requirementDescription: "2 Super Prestige Points",
            effectDescription: "Autobuy Prestige Upgrades",
            done() { return player.sp.points.gte(2) && hasUpgrade("sp", 13)|| hasMilestone("up", 0) }
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            title: "Hell 2: Pain Boogaloo",
            description: "Multiply Prestige Points gain by Prestige Points",
            effect(){
                return new Decimal(player.p.points.plus(1).log(10).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("sp", 11))}x`
            },
            cost: 1
        },
        12: {
            unlocked() {
                return hasUpgrade("sp", 11);
            },
            title: "Un-Prestiged",
            description: "Multiply Prestige Points gain by 50 but disable the Prestige Points Buyable",
            effect(){
                return new Decimal(50)
            },
            cost: 1
        },
        13: {
            unlocked() {
                return hasUpgrade("sp", 12);
            },
            title: "SUPER PRESTIG",
            description: "Unlock a SP Milestone",
            cost: 4
        },
        14: {
            unlocked() {
                return hasUpgrade("sp", 13);
            },
            title: "Un-Timewalled",
            description: "The base requirement for a Super Prestige Point is now 1e6",
            cost: 4
        },
        15: {
            unlocked() {
                return hasUpgrade("sp", 14);
            },
            title: "Un-Fun",
            description: "Quit the game, multiplying Prestige Point gain by 100",
            effect(){
                return new Decimal(100)
            },
            cost: 15
        },
        16: {
            unlocked() {
                return hasUpgrade("sp", 15);
            },
            title: "Wow you're still here?",
            description: "Rage, multiplying Prestige Point gain by 100",
            effect(){
                return new Decimal(100)
            },
            cost: 100
        },
        21: {
            unlocked() {
                return hasUpgrade("sp", 16);
            },
            title: "why.",
            description: "Question your existence, multiplying Prestige Point gain by 1000",
            effect(){
                return new Decimal(1000)
            },
            cost: 1500
        },
        22: {
            unlocked() {
                return hasUpgrade("sp", 21);
            },
            title: "<h3>LINEAR HELL</h3>",
            description: "CRY OUT TO THE gwa TO SAVE YOU, MULTIPLYING PRESTIGE POINT GAIN BY 1e6",
            effect(){
                return new Decimal(1e6)
            },
            cost: 50000
        },
    },
})
addLayer("up", {
    name: "Ultra Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#4e4e4e",
    requires() {
        return new Decimal(5e6)
    }, // Can be a function that takes requirement increases into account
    resource: "Ultra Prestige Points", // Name of prestige currency
    baseResource: "Super Prestige Points", // Name of resource prestige is based on
    resetDescription: "Reset for ",
    baseAmount() {
        return player.sp.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
        return new Decimal(0.1)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect(){
        if (hasChallenge("up", 11))
        return new Decimal(player.up.points)
        else
            return new Decimal(0)
    },
    effectDescription(){
        if (hasChallenge("up", 11))
        return `lowering the second Awakened Atom cost base by ${format(tmp.up.effect.div(7))}`
        else
            return `lowering the....?`
    },
    canReset(){
        if (inChallenge("up", 11))
            return false
        else
            return (player.sp.points.gte(5e6))
    },
    resetsNothing() {
        return true;
    },
    onPrestige() {
        layerDataReset("sp");
        layerDataReset("p");
        layerDataReset("m");
    },
    deactivated(){
        if (hasUpgrade("r", 11))
            return true
    },
    branches: ["r"],
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key: "u", description: "u: Reset your Super Prestige Points for Ultra Prestige Points ", onPress() {
                if (canReset(this.layer)) doReset(this.layer)
            }
        },
    ],
    isActive(){ return inReality(0) },
    layerShown() {
        return ((hasUpgrade("vg", 21) || player.sp.points.gte(1) || player.up.points.gte(1) || hasUpgrade("sp", 11))  && !(hasMilestone("r", 0))) && temp.up.isActive
    },
    milestones: {
        0: {
            requirementDescription: "1 Ultra Prestige Point",
            effectDescription: "Automatically gain 1% of your Super Prestige Point gain every second, multiply Super Prestige Point gain by 9, and the Super Prestige Milestone is always applied!",
            done() { return player.up.points.gte(1) && !hasUpgrade("r", 11) }
        },
    },
    challenges: {
        11: {
            unlocked(){return hasUpgrade("up", 15)},
            name: "The Final Test",
            challengeDescription: "You are trapped in the lowest depth of Hell",
            goalDescription(){
              if (!hasUpgrade("m", 61)){
                  return "You'll know when it happens"
              }
              else
                  return "5e37 Meta."
            },
            rewardDescription: "Reveal the Ultra Prestige Effect",
            canComplete: function() {return player.m.points.gte(5e37)},
            onEnter() {
                doReset("m")
                doReset("up")
            },
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            title: "Hell 3: Escape?",
            description: "Multiply your Super Prestige Point gain by Prestige Points",
            effect(){
                return new Decimal(player.p.points.plus(1).log(10).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("up", 11))}x`
            },
            cost: 1
        },
        12: {
            unlocked(){
                return hasUpgrade("up", 11)
            },
            title: "Time to Make this Reset Mindless",
            description: "The effect of 'Un-Prestiged' is always applied",
            cost: 1
        },
        13: {
            unlocked(){
                return hasUpgrade("up", 12)
            },
            title: "TWO!!",
            description: "gwa the gwa the gwa the gwa the<br>(multiply your Super Prestige Point gain by Super Prestige Points)",
            effect(){
                return new Decimal(player.sp.points.plus(1).log(2).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("up", 13))}x`
            },
            cost: 2
        },
        14: {
            unlocked(){
                return hasUpgrade("up", 13)
            },
            title: "Reset++++",
            description: "Automatically buy Super Prestige Upgrades, Un-Timewalled is always applied",
            cost: 2
        },
        15: {
            unlocked(){
                return hasUpgrade("up", 14)
            },
            title: "It's time to escape.",
            description: "Unlock a Ultra Prestige Challenge",
            cost: 2
        },
    },
})
addLayer("m", {
    name: "Meta", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#660505",
    requires() {
        return new Decimal(1e9696)
    }, // Can be a function that takes requirement increases into account
    resource: "Meta", // Name of prestige currency
    exponent(){
        return new Decimal(0.5)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: [""],
    row: 0, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(0) },
    layerShown() {
        return (inChallenge("up", 11) && !hasUpgrade("m", 11))  && temp.m.isActive
    },
    update(diff){
        let gain = new Decimal(0)
        if (hasUpgrade("m", 41)) gain = gain.plus(0.01)
        if (hasUpgrade("m", 42)) gain = gain.times(upgradeEffect("m", 42))
        if (hasUpgrade("m", 51)) gain = gain.times(upgradeEffect("m", 51))
        if (hasUpgrade("m", 52)) gain = gain.times(upgradeEffect("m", 52))
        if (hasUpgrade("m", 53)) gain = gain.times(upgradeEffect("m", 53))
        if (hasUpgrade("m", 61)) gain = gain.times(upgradeEffect("m", 61))
        player.m.points = player.m.points.plus(gain)
    },
    upgrades: {
        rows: 10,
        cols: 10,
        21: {
            title: "This Is Where It All Ends.",
            description: "Gain 1 Meta.",
            onPurchase() {
                player.m.points = player.m.points.plus(1)
            },
            cost: 0
        },
        33: {
            unlocked(){
                return hasUpgrade("m", 21)
            },
            title: "True.",
            description(){
                if (!hasUpgrade("m", 33))
                    return "Pray to True gwa."
                else
                    return "Good choice, mortal."
            },
            onPurchase() {
                player.m.points = player.m.points.plus(1)
            },
            cost: 1
        },
        41: {
            unlocked(){
                return hasUpgrade("m", 33)
            },
            title: "Meta Shattering",
            description: "Gain 0.01 Meta every second",
            onPurchase() {
                player.m.points = player.m.points.plus(1)
            },
            effect(){
                return new Decimal(0.01)
            },
            cost: 1
        },
        42: {
            unlocked(){
                return hasUpgrade("m", 41)
            },
            title: "Meta Ascension",
            description: "Multiply Meta Gain by Meta",
            effect(){
                return new Decimal(player.m.points.plus(1).log(2).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("m", 42))}x`
            },
            cost: 1
        },
        51: {
            unlocked(){
                return hasUpgrade("m", 42)
            },
            title: "Void Shards",
            description: "Multiply Meta Gain by the slog of Meta raised to the 3rd Power",
            effect(){
                return new Decimal(player.m.points.plus(1).slog().pow(3).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("m", 51))}x`
            },
            cost: 30
        },
        52: {
            unlocked(){
                return hasUpgrade("m", 42)
            },
            title: "Atoms",
            description: "Annihilate Meta Atoms, multiplying Meta Gain by 9",
            effect(){
                return new Decimal(9)
            },
            cost: 200
        },
        53: {
            unlocked(){
                return hasUpgrade("m", 42)
            },
            title: "Oddities",
            description: "Odd, Strange, Weird, Bizarre, Unusual, Abnormal, Unconventional, Outlandish, Freaky, Uncommon, Irregular, Questionable<br> Multiply Meta Gain by the amount of words before 'Multiply' in this description.",
            effect(){
                return new Decimal(12)
            },
            cost: 7000
        },
        61: {
            unlocked(){
                return hasUpgrade("m", 53)
            },
            title: "NXF",
            description: "Now with Xtra Flame.<br>Multiply Meta Gain by Fire",
            effect(){
                return new Decimal(player.points.sqrt())
            },
            effectDisplay(){
                return `${format(upgradeEffect("m", 61))}x`
            },
            cost: 125000
        },
    },
})
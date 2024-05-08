addLayer("i", {
    name: "Inversions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#00a206",
    requires(){
        if (hasMilestone("t", 0))
            return new Decimal(1e23)
        else
            return new Decimal(1e24)
    }, // Can be a function that takes requirement increases into account
    resource: "Inversions", // Name of prestige currency
    baseResource: "Fire", // Name of resource prestige is based on
    baseAmount() {
        return player.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
        if (hasUpgrade("i", 31))
            return new Decimal(0.2)
        else
            return new Decimal(0.1)
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if(hasUpgrade("i", 21)) mult = mult.times(upgradeEffect("i", 21))
        if(hasUpgrade("i", 22)) mult = mult.times(upgradeEffect("i", 22))
        if(hasUpgrade("i", 44)) mult = mult.times(upgradeEffect("i", 44))
        if(hasUpgrade("i", 14)) mult = mult.times(upgradeEffect("i", 14))
        mult = mult.times(player.t.r2.plus(1).sqrt().sqrt().plus(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ["t", "dt"],
    row: 0, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(1) },
    layerShown() {
        return temp.i.isActive
    },
    passiveGeneration(){
        if (hasUpgrade("t", 11) && !hasUpgrade("i", 23) ){return new Decimal(-1)}
        if (hasMilestone("i", 0)){return new Decimal(1)}
    },
    milestones: {
        0: {
            requirementDescription: "The Flip Side",
            effectDescription: `Automatically gain Inversions`,
            done() { return player.i.points.gte(1) || hasMilestone("t", 0)}
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            unlocked(){ return !hasMilestone("t", 0) },
            title: "Inverted Theory 1",
            description: "The Theory of the Single Inversion<br>Inversions multiply Fire gain",
            effect(){
                return player.i.points.plus(1).log(2).plus(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 11))}x`
            },
            cost: 10
        },
        12: {
            unlocked(){ return !hasMilestone("t", 0) },
            title: "Inverted Theory 2",
            description: "The Theory of the Double Inversion<br>Inversions multiply Fire gain more",
            effect(){
                return player.i.points.plus(1).log(2).plus(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 12))}x`
            },
            cost: 30
        },
        13: {
            unlocked(){ return !hasMilestone("t", 0) },
            title: "Inverted Theory 3",
            description: "The Theory of the Triple Inversion<br>Inversions multiply Fire gain even more",
            effect(){
                return player.i.points.plus(1).log(2).plus(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 13))}x`
            },
            cost: 100
        },
        14: {
            unlocked(){ return hasUpgrade("dt", 11) },
            title: "Deep Inverted Theory 0",
            description: "Unlock a new Deep Theory Upgrade and multiply Inversion gain based on Fire",
            effect(){
                if (hasUpgrade("i", 67)) return new Decimal(10)
                if (player.i.points.gte(0)) return player.points.plus(1).log(5000).sqrt().plus(1)
                else return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 14))}x`
            },
            cost: 2e10
        },
        21: {
            unlocked(){ return !hasUpgrade("t", 11)},
            title: "Inverted Theory 4",
            description: "The Theory of the Inversion Inversion<br>Inversions multiply Inversion gain",
            effect(){
                if (!hasUpgrade("t", 11))
                return player.i.points.plus(1).log(20).plus(1)
                else
                    return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 21))}x`
            },
            canAfford() {
                if (hasUpgrade("t", 11))
                    return player.i.points.lte(tmp.i.upgrades[21].cost)
                return player.i.points.gte(tmp.i.upgrades[21].cost)
            },
            cost(){
                if (hasUpgrade("t",11))
                    return new Decimal(-1)
                else
                    return new Decimal(200)
            }
        },
        22: {
            title: "Inverted Theory 5",
            description: "The Theory of the Flaming Inversion<br>Fire multiplies Inversion gain",
            effect(){
                if (hasUpgrade("i", 67)) return new Decimal(30)
                return player.points.plus(1).log(1000)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 22))}x`
            },
            canAfford() {
                if (hasUpgrade("t", 11))
                    return player.i.points.lte(tmp.i.upgrades[22].cost)
                return player.i.points.gte(tmp.i.upgrades[22].cost)
            },
            cost(){
                if (hasUpgrade("t",11))
                    return new Decimal(-100)
                if (hasMilestone("t", 0))
                    return new Decimal(2000)
                else
                    return new Decimal(10000)
            }
        },
        23: {
            unlocked(){ return hasUpgrade("dt", 11) },
            title: "Deep Inverted Theory 1",
            description: "Un-Invert your Inversions, and multiply Fire gain based on your Inversions",
            effect(){
                if (hasUpgrade("i", 67)) return new Decimal(10)
                if (player.i.points.gte(0)) return player.i.points.plus(1).log(1000).plus(1)
                else return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 23))}x`
            },
            canAfford() {
                if (hasUpgrade("t", 11))
                    return player.i.points.lte(tmp.i.upgrades[23].cost)
                return player.i.points.gte(tmp.i.upgrades[23].cost)
            },
            cost: -1e4
        },
        31: {
            title: "Inverted Theory 6",
            description: "The Theory of the 6th Inversion<br>The Inversion gain exponent is increased",
            canAfford() {
                if (hasUpgrade("t", 11))
                    return player.i.points.lte(tmp.i.upgrades[31].cost)
                return player.i.points.gte(tmp.i.upgrades[31].cost)
            },
            cost(){
                if (hasUpgrade("t",11))
                    return new Decimal(-1000)
                if (hasMilestone("t", 0))
                    return new Decimal(4e4)
                else
                    return new Decimal(2e5)
            }
        },
        32: {
            unlocked(){ return hasUpgrade("dt", 11) },
            title: "Deep Inverted Theory 2",
            description: "Multiply Fire gain based on your Inversions",
            effect(){
                if (hasUpgrade("i", 67)) return new Decimal(10)
                if (player.i.points.gte(0)) return player.i.points.plus(1).log(500).plus(1)
                else return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 32))}x`
            },
            cost: 2e4
        },
        33: {
            unlocked(){ return hasUpgrade("i", 32) },
            title: "Deep Inverted Theory 3",
            description: "Multiply Fire gain based on your Inversions",
            effect(){
                if (hasUpgrade("i", 67)) return new Decimal(10)
                if (player.i.points.gte(0)) return player.i.points.plus(1).log(200).plus(1)
                else return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 33))}x`
            },
            cost: 2e4
        },
        41: {
            unlocked(){ return hasUpgrade("i", 31) && hasUpgrade("t", 11) },
            title: "Inverted Theory -1",
            description: "The Theory of the Negative Inversion<br>Unlock Deep Theories",
            canAfford() {
                if (hasUpgrade("t", 11))
                    return player.i.points.lte(tmp.i.upgrades[41].cost)
                return player.i.points.gte(tmp.i.upgrades[41].cost)
            },
            cost: -1e4
        },
        42: {
            unlocked(){ return hasUpgrade("i", 33) },
            title: "Deep Inverted Theory 4",
            description: "Multiply Fire gain based on your Inversions",
            effect(){
                if (hasUpgrade("i", 67)) return new Decimal(10)
                if (player.i.points.gte(0)) return player.i.points.plus(1).log(100).plus(1)
                else return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 42))}x`
            },
            cost: 2e4
        },
        43: {
            unlocked(){ return hasUpgrade("i", 42) },
            title: "Deep Inverted Theory 5",
            description: "Multiply Fire gain based on your Inversions",
            effect(){
                if (hasUpgrade("i", 67)) return new Decimal(10)
                if (player.i.points.gte(0)) return player.i.points.plus(1).log(50).plus(1)
                else return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 43))}x`
            },
            cost: 2e4
        },
        44: {
            unlocked(){ return hasUpgrade("i", 43) },
            title: "Deep Inverted Theory 6",
            description: "Multiply Inversion gain based on your Fire",
            effect(){
                if (hasUpgrade("i", 67)) return new Decimal(20)
                if (player.i.points.gte(0)) return player.points.plus(1).log(2000).plus(1)
                else return new Decimal(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 44))}x`
            },
            cost: 2e4
        },
        51: {
            unlocked(){ return hasUpgrade("dt", 12) && !hasUpgrade("i", 66)},
            title: "Deep Inverted Theory 7",
            description: "Multiply Fire gain based on your Fire",
            effect(){
                return player.points.plus(1).log(100).plus(1)},
            effectDisplay(){
                return `${format(upgradeEffect("i", 51))}x`
            },
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 1e9
        },
        52: {
            unlocked(){ return hasUpgrade("i", 51) && !hasUpgrade("i", 66)},
            title: "Deep Inverted Theory 8",
            description: "Multiply Fire gain based on your Fire for one last time",
            effect(){
                return player.points.plus(1).log(80).plus(1)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 52))}x`
            },
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 8e9
        },
        53: {
            unlocked(){ return hasUpgrade("i", 52) },
            title: "Deep Inverted Theory 9",
            description: "Deep Knowledge x 10 multiplies Fire gain",
            effect(){
                return player.dt.points.times(10)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 53))}x`
            },
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 4e10
        },
        54: {
            unlocked(){ return hasUpgrade("i", 53) && !hasUpgrade("i", 66) },
            title: "Deep Inverted Theory 10",
            description: "Multiply Fire gain based on Deep Knowledge and Fire",
            effect(){
                return player.dt.points.times(50).plus(player.points.plus(1).log(100).plus(1))
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 54))}x`
            },
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 3e11
        },
        55: {
            unlocked(){ return hasUpgrade("i", 54) && !hasUpgrade("i", 66) },
            title: "Deep Inverted Theory 11",
            description: "Multiply Fire gain by the amount of Theories you have^5 and unlock a new Deep Theory Upgrade",
            effect(){
                return new Decimal(player.i.upgrades.length).pow(5)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 55))}x`
            },
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 2e13
        },
        61: {
            unlocked(){ return hasUpgrade("dt", 13) && !hasUpgrade("i", 66)},
            title: "Deep Inverted Theory 12",
            description: "It's back! Multiply Fire gain based on Fire >:D",
            effect(){
                return player.points.log(10)
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 61))}x`
            },
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 15000
        },
        62: {
            unlocked(){ return hasUpgrade("i", 61) && !hasUpgrade("i", 66)},
            title: "Deep Inverted Theory 13",
            description: "WE NEED A GOOD BOOST!! Multiply Fire gain by 1e6",
            effect(){
                return new Decimal(1e6)
            },
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 3e4
        },
        63: {
            unlocked(){ return hasUpgrade("i", 62) && !hasUpgrade("i", 66)},
            title: "Deep Inverted Theory 14",
            description: "WE NEED A BETTER BOOST!! Multiply Fire gain by 1e7",
            effect(){
                return new Decimal(1e6)
            },
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 2e5
        },
        64: {
            unlocked(){ return hasUpgrade("i", 63) && !hasUpgrade("i", 66)},
            title: "Deep Inverted Theory 15",
            description: "Multiply Fire gain based on your Inversions :)",
            effect(){
                return player.i.points.sqrt()
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 64))}x`
            },
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 1.5e6
        },
        65: {
            unlocked(){ return hasUpgrade("i", 64) && !hasUpgrade("i", 66)},
            title: "Deep Inverted Theory ∞",
            description: "Multiply Fire gain based on your Inversions, one last time.",
            effect(){
                return player.i.points.sqrt()
            },
            effectDisplay(){
                return `${format(upgradeEffect("i", 65))}x`
            },
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 2e7
        },
        66: {
            unlocked(){ return hasUpgrade("i", 65)},
            title: "The Deep Paradox",
            description: "Remove the effects of the Deep Realities, disable the row 6 Deep Theories and most row 5 Deep Theories, Hardcap all Theories Effects, but unlock The Theory of Everything.",
            currencyDisplayName: "Fire",
            currencyInternalName: "points",
            cost: 1.96e8
        },
        67: {
            unlocked(){ return hasUpgrade("i", 66)},
            title: "The Theory of Everything",
            description: "Multiply Fire gain based on:<br>9<br>Fire<br>Inversions",
            effect(){
                if (upgradeEffect("i", 67).gte(150)) { return new Decimal(200)}
                else return new Decimal(9).plus(player.points.log(100)).plus(player.i.points.log(10))
            },
            effectDisplay(){
                if (player.points.gte(1e170)) { return `TToE multiplies Fire gain by total of ${format(upgradeEffect("i", 67))}x <h3>(HARDCAPPED)`}
                else return `TToE multiplies Fire gain by total of ${format(upgradeEffect("i", 67))}x`
            },
            cost: 1e16
        },
    },
})
addLayer("t", {
    name: "Theory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            basic: new Decimal(0),
            r1: new Decimal(0),
            r2: new Decimal(0),
            r3: new Decimal(0),
        }
    },
    color: "#00a25c",
    requires(){
        if (hasMilestone("t", 0)) return new Decimal(3)
        else return new Decimal(6)
    }, // Can be a function that takes requirement increases into account
    resource: "Complex Theories", // Name of prestige currency
    baseResource: "Inverted Theories", // Name of resource prestige is based on
    effectDescription(){
        return `<h4>and ${format(player.t.basic)} Basic Theories`
    },
    baseAmount() {
        return new Decimal(player.i.upgrades.length)
    }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base(){
      return new Decimal(1)
    },
    branches: ["dt"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(1) && !hasUpgrade("dt", 11)},
    layerShown() {
        return temp.t.isActive
    },
    update(diff){
        player.t.basic = player.t.basic.plus(player.t.points.div(10))
        player.t.basic = player.t.basic.plus(player.t.r3.sqrt())
    },
    milestones: {
        0: {
            requirementDescription: "Complexity",
            effectDescription: `Inversions require 1e23 Fire instead of 1e24, keep the Inversions Milestone, Complex Theories require 3 Inverted Theories instead of 6, Inverted Theory 5 now only costs 2000 Inversions, Inverted Theory 6 now only costs 40000 Inversions, but disable the first 3 Inverted Theories`,
            done() { return player.t.points.gte(1)}
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            fullDisplay(){
                return `<h3>Complex Theory of Inversions</h3><br>Invert your Inversions<br><br>Requires 5000 total Invested Basic Theories<br><br>You have Invested ${format(player.t.r1.plus(player.t.r2))} total Baaic Theories`
            },
            canAfford(){
                return player.t.r1.plus(player.t.r2).gte(5e3)
            },
            onPurchase(){
                layerDataReset("i", [])
                doReset("t", true)
            }
        }
    },
    clickables: {
        11: {
            title() {return "Inversion Research 1"},
            display() {
                return `Invest Basic Theories into the first Inversion Research, which multiplies Fire gain based on how much you Invest into it
                <br>Currently: You have Invested ${format(player.t.r1)} Basic Theories for a ${format(player.t.r1.plus(1).sqrt().log(2).plus(1))}x multiplier`
            },
            canClick() {return player.t.basic.gte(1)},
            onClick() {
                player.t.r1 = player.t.r1.plus(player.t.basic)
                player.t.basic = player.t.basic.sub(player.t.basic)
            },
        },
        12: {
            title() {return "Inversion Research 2"},
            display() {
                return `Invest Basic Theories into the second Inversion Research, which multiplies Inversion gain based on how much you Invest into it
                <br>Currently: You have Invested ${format(player.t.r2)} Basic Theories for a ${format(player.t.r2.plus(1).sqrt().sqrt().plus(1))}x multiplier`
            },
            canClick() {return player.t.basic.gte(1)},
            onClick() {
                player.t.r2 = player.t.r2.plus(player.t.basic)
                player.t.basic = player.t.basic.sub(player.t.basic)
            },
        },
        13: {
            title() {return "Inversion Research 3"},
            display() {
                return `Invest Complex Theories into the third Inversion Research, which boosts Basic Theory gain based on how much you Invest into it
                <br>Currently: You have Invested ${format(player.t.r3)} Complex Theories for a +${format(player.t.r3.sqrt())}/s boost`
            },
            canClick() {return player.t.points.gte(1)},
            onClick() {
                player.t.r3 = player.t.r3.plus(player.t.points)
                player.t.points = player.t.points.sub(player.t.points)
            },
        },
    }
})
addLayer("dt", {
    name: "Deep Theory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#0f18a9",
    requires(){
        return new Decimal(1e9696)
    }, // Can be a function that takes requirement increases into account
    resource: "Deep Knowledge", // Name of prestige currency
    baseResource: "Inversions", // Name of resource prestige is based on
    baseAmount() {
        return player.i.points
    }, // Get the current amount of baseResource
    branches: [],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(1) },
    layerShown() {
        return temp.i.isActive && (hasUpgrade("i", 41) || hasMilestone("dt", 0))
    },
    milestones: {
        0: {
            requirementDescription: "Inverted Theory -1",
            effectDescription: `This Layer is always unlocked`,
            done() { return hasUpgrade("i", 41)}
        },
        1: {
            requirementDescription: "1 Deep Knowledge",
            effectDescription: `Unlock new Inverted Theories`,
            done() { return player.dt.points.gte(1)}
        },
        2: {
            requirementDescription: "2 Deep Knowledge",
            effectDescription: `Unlock new Inverted Theories`,
            done() { return player.dt.points.gte(2)}
        },
        3: {
            requirementDescription: "3 Deep Knowledge",
            effectDescription: `Unlock new Inverted Theories`,
            done() { return player.dt.points.gte(3)}
        },
    },
    upgrades: {
        11: {
            title: "Clarification",
            description: "Gain 1 Deep Knowledge, but disable Complex Theories<br><br>The next one won't be so easy...",
            cost: 0,
            onPurchase() {
                player.dt.points = player.dt.points.plus(1)
            }
        },
        12: {
            unlocked(){return hasUpgrade("i", 14)},
            title: "Deeper",
            description: "Gain 1 Deep Knowledge, but enter Deep Reality 1.",
            cost: 0,
            onPurchase() {
                player.dt.points = player.dt.points.plus(1)
                player.points = player.points.sub(player.points)
                player.i.points = new Decimal(5e13)
            }
        },
        13: {
            unlocked(){return hasUpgrade("i", 55)},
            title: "The Deepest Depth",
            description: "Gain 1 Deep Knowledge, but enter Deep Reality 2.",
            cost: 0,
            onPurchase() {
                player.dt.points = player.dt.points.plus(1)
                player.points = player.points.sub(player.points)
                player.i.points = new Decimal(5e13)
            }
        },
    }
})

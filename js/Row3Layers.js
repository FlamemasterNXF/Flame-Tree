addLayer("r", {
    name: "Realities", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#ffc600",
    requires(){
        if (!hasMilestone("r", 0))
            return new Decimal(2)
        else
            return new Decimal(1)
    }, // Can be a function that takes requirement increases into account
    resource: "Hyperrealities", // Name of prestige currency
    baseResource: "Awakened Atoms", // Name of resource prestige is based on
    baseAmount() {
        return player.aa.points
    }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetDescription: "Collapse your Reality for ",
    branches: [],
    row: 3, // Row the layer is in on the tree (0 is the first row)
    isActive(){ return inReality(0) },
    layerShown() {
        return (player.aa.points.gte(2)|| player.r.best.gte(1) || hasUpgrade("r", 11)) && tmp.r.isActive
    },
    update(diff){
      if (hasUpgrade("r", 11) && !hasChallenge("a", 11) | !hasChallenge("a", 12)){
          player.a.challenges[11] = 1
          player.a.challenges[12] = 1
      }
    },
    milestones: {
        0: {
            requirementDescription: "A New Era",
            effectDescription: "Merge the 3 Atom layers into 1 new layer, disable the last 2 Void Shard Upgrades, disable the Oddity side of the tree, the last 2 NXF Upgrades are free, and gain 100% of your Void Shard Gain every second.",
            done() { return player.r.points.gte(1) }
        },
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            unlocked(){
                return hasMilestone("r",0 )
            },
            title: "It Begins.",
            description: "Unlock the Portal",
            cost: 1
        },
        21: {
            unlocked(){
                return hasMilestone("r",0 )
            },
            fullDisplay(){return `<h3>The End?</h3><br>You do not have enough power to view this yet.<br><br>Cost: ??? Fire`},
            cost: 1
        },
    },
})
addLayer("po", {
    name: "Portal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            voidShardsSac: new Decimal(0),
            hyperRealsSac: new Decimal(0),
        }
    },
    color: "#ffc600",
    requires(){
        if (!hasMilestone("r", 0))
            return new Decimal(2)
        else
            return new Decimal(1)
    }, // Can be a function that takes requirement increases into account
    resource: "Portals", // Name of prestige currency
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown() {
        return hasUpgrade("r", 11)
    },
    effectDisplay(){
        return "<br><br>1e15 Void Shards required. <br>200 Hyper Real Atoms required."
    },
    clickables: {
        11: {
            unlocked() { return !hasUpgrade("po", 11)},
            title() {return "Sacrifice 1"},
            display() {return `Sacrifice Void Shards to the Portal<br>Total Sacrificed: ${format(player.po.voidShardsSac)}<br>50 Million Required.`},
            canClick(){return true},
            onClick(){
                player.po.voidShardsSac = player.po.voidShardsSac.plus(player.v.points)
                player.v.points = player.v.points.sub(player.v.points)
            },
        },
        12: {
            unlocked() { return !hasUpgrade("po", 11)},
            title() {return "Sacrifice 2"},
            display() {return `Sacrifice Hyper Real Atoms to the Portal<br>Total Sacrificed: ${format(player.po.hyperRealsSac)} <br>700 Required.`},
            canClick(){return true},
            onClick(){
                player.po.hyperRealsSac = player.po.hyperRealsSac.plus(player.ha.points)
                player.ha.points = player.ha.points.sub(player.ha.points)
            },
        },
        21: {
            unlocked() {
                return hasUpgrade("po", 11);
            },
            title() {return "Go to the Gateway"},
            display() {return `Reality 96`},
            canClick(){return true},
            onClick(){
                player.reality = new Decimal(96)
            },
        },
    },
    update(diff) {
        if (player.po.voidShardsSac.gte(5e7) && player.po.hyperRealsSac.gte(700))
            player.po.points = new Decimal(1)
    },
    upgrades: {
        rows: 10,
        cols: 10,
        11: {
            unlocked() { return !hasUpgrade("po", 11)},
            title: "Open the Portal.",
            cost: 1,
        },
    }
})
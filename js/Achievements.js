addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)
        }
    },
    color: "#ffffff",
    requires(){
        return new Decimal(1)
    }, // Can be a function that takes requirement increases into account
    resource: "Completed Achievements", // Name of prestige currency
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
        return true
    },
    achievements: {
        11: {
            name: "gwaed",
            image: "https://cdn.discordapp.com/attachments/826136498113740850/864583480574345226/gwa.png",
            done(){
                return player.g.points.gte(1)
            },
            tooltip(){
                return "Get 1 gwa"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        12: {
            image: "https://cdn.discordapp.com/attachments/864565842804867102/864572671270060032/ach2.png",
            name: "Burning through Layers",
            done(){
                return hasUpgrade("v", 14)
            },
            tooltip(){
                return "Complete the Void Shard layer"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        13: {
            image: "https://cdn.discordapp.com/attachments/855984695707828274/864581632614989834/annihilation.png",
            name: "Annihilation",
            done(){
                return hasChallenge("a", 11)
            },
            tooltip(){
                return "Complete Atomic Annihilation"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        14: {
            image: "https://cdn.discordapp.com/attachments/855984695707828274/864581633839202344/another.png",
            name: "Another Layer bites the dust",
            done(){
                return hasUpgrade("as", 15)
            },
            tooltip(){
                return "Complete the Atomic Shards Layer"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        15: {
            image: "https://cdn.discordapp.com/attachments/864565842804867102/864582805619212339/unknown.png",
            name: "Here we go again",
            done(){
                return hasChallenge("a", 12)
            },
            tooltip(){
                return "Complete Atomic Awakening"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        21: {
            image: "https://cdn.discordapp.com/attachments/855984695707828274/864575263391088700/ach1.png",
            name: "WHAT IS A AWAKENED ATOM",
            done(){
                return player.aa.points.gte(1)
            },
            tooltip(){
                return "Obtain a Awakened Atom"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        22: {
            image: "https://cdn.discordapp.com/attachments/864565842804867102/864572648309391370/OdditiesSmol.png",
            name: "The Wizard of Od",
            done(){
                return hasUpgrade("o", 31)
            },
            tooltip(){
                return "Complete the Oddities Layer"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        23: {
            image: "https://cdn.discordapp.com/attachments/855984695707828274/864582605873479680/h1.png",
            name: "Hell I",
            done(){
                return getBuyableAmount("p", 11).gte(25)
            },
            tooltip(){
                return "Complete the first Layer of Hell"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        24: {
            image: "https://cdn.discordapp.com/attachments/855984695707828274/864582599678754866/h2.png",
            name: "Hell II",
            done(){
                return hasUpgrade("sp", 22)
            },
            tooltip(){
                return "Complete the second Layer of Hell"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        25: {
            image: "https://cdn.discordapp.com/attachments/855984695707828274/864582601620324412/h3.png",
            name: "Hell III",
            done(){
                return hasChallenge("up", 11)
            },
            tooltip(){
                return "Complete the third Layer of Hell"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        31: {
            image: "https://cdn.discordapp.com/attachments/864565842804867102/864576144945446972/ach1.png",
            name: "what. is. a. awakened. atom.",
            done(){
                return player.aa.points.gte(2)
            },
            tooltip(){
                return "Obtain a second Awakened Atom"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        32: {
            image: "https://cdn.discordapp.com/attachments/864565842804867102/864579003648835624/ach3.png",
            name: "Where did my tree go",
            done(){
                return player.r.points.gte(1)
            },
            tooltip(){
                return "Obtain a Hyperreality"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        33: {
            image: "https://cdn.discordapp.com/attachments/855984695707828274/864581635089235978/tree.png",
            name: "More Trees!",
            done(){
                return hasUpgrade("po", 11)
            },
            tooltip(){
                return "Open the Portal"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        91: {
            image: "https://cdn.discordapp.com/attachments/826136498113740850/864584169460203520/smolsmol.png",
            name: "Slow Burn",
            done(){
                return inChallenge("a", 11) && player.n.points.gte(53) && new Decimal(player.n.upgrades.length).equals(0)
            },
            tooltip(){
                return "Secret Achievement"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
        92: {
            image: "https://cdn.discordapp.com/attachments/826136498113740850/864584169460203520/smolsmol.png",
            name: "You know those don't do anything, right?",
            done(){
                return hasUpgrade("o", 31) && player.o.points.gte(50)
            },
            tooltip(){
                return "Secret Achievement"
            },
            onComplete(){
                player.ach.points = player.ach.points.plus(1)
            }
        },
    },
})
let modInfo = {
	name: "The Flame Tree",
	id: "flametreetest",
	author: "FlamemasterNXF",
	pointsName: "Fire",
	modFiles: [
		"tree.js", "Row0Layers.js", "Row1Layers.js", "Row2Layers.js", "HellLayers.js", "Row3Layers.js",
		"R1.js", "LoadingLayer.js", "R96.js",
		"Achievements.js"
	],

	discordName: "My Discord server!",
	discordLink: "https://discord.gg/Js93DSjBAY",
	initialStartPoints: new Decimal (1), // Used for hard resets and new playerse
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.3",
	name: "The Gateway of Infinite Possibilities",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.3</h3><br>
		- I'm not using this lol.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (!inChallenge("a", 11)){
		if (hasUpgrade("n", 33)) gain = gain.pow(upgradeEffect("n", 32))
		if (hasUpgrade("n", 22)) gain = gain.times(upgradeEffect("n", 22))
		if (hasUpgrade("n", 11)) gain = gain.plus(upgradeEffect("n", 11))
		if (hasUpgrade("n", 12)){
			if (hasUpgrade("n", 13))
				gain = gain.times(player.points.plus(1).sqrt().sqrt().log(2).plus(1))
			else
				gain = gain.times(player.points.plus(1).sqrt().sqrt().log(10).plus(1))
		}
		if (hasUpgrade("n", 21)) gain = gain.times(upgradeEffect("n", 21))
		if (hasUpgrade("n", 31)) gain = gain.times(upgradeEffect("n", 31))
		if (hasUpgrade("n", 32)) {
			if (hasUpgrade("n", 11)){
				if (hasUpgrade("n", 33)){
					gain = gain.pow(player.points.plus(1).sqrt().log(90).plus(1))
				}
				else
					gain = gain.pow(player.points.plus(1).sqrt().log(9e6).plus(1))
			}
		}
		if (!hasUpgrade("g", 21)){
			if (hasUpgrade("g", 11)) gain = gain.times(upgradeEffect("g", 11))
		}
		if (hasUpgrade("v", 11)) gain = gain.times(player.points.plus(1).log(10).plus(1))
		if (hasUpgrade("v", 12)) gain = gain.times(player.points.plus(1).log(2).plus(1))
		if (hasUpgrade("v", 13)) gain = gain.times(upgradeEffect("v", 13))
		if (hasUpgrade("v", 14)) gain = gain.times(upgradeEffect("v", 14))
		if (hasUpgrade("a", 21)) gain = gain.times(upgradeEffect("a", 21))
		if (hasUpgrade("a", 22)) gain = gain.times(upgradeEffect("a", 22))
		if (hasUpgrade("a", 23)) gain = gain.times(upgradeEffect("a", 23))
		if (player.aa.total.gte(1)) gain = gain.times(tmp.aa.effect)
		if ((hasUpgrade("p", 11)) && !(hasUpgrade("r", 11))) gain = gain.times(tmp.p.effect).plus(1)
		if (hasUpgrade("i", 11)) gain = gain.times(upgradeEffect("i", 11))
		if (hasUpgrade("i", 12)) gain = gain.times(upgradeEffect("i", 12))
		if (hasUpgrade("i", 13)) gain = gain.times(upgradeEffect("i", 13))
		if (hasUpgrade("i", 23)) gain = gain.times(upgradeEffect("i", 23))
		if (hasUpgrade("i", 32)) gain = gain.times(upgradeEffect("i", 32))
		if (hasUpgrade("i", 33)) gain = gain.times(upgradeEffect("i", 33))
		if (hasUpgrade("i", 42)) gain = gain.times(upgradeEffect("i", 42))
		if (hasUpgrade("i", 43)) gain = gain.times(upgradeEffect("i", 43))
		if (hasUpgrade("i", 51) && !hasUpgrade("i", 66)) gain = gain.times(upgradeEffect("i", 51))
		if (hasUpgrade("i", 52) && !hasUpgrade("i", 66)) gain = gain.times(upgradeEffect("i", 52))
		if (hasUpgrade("i", 53)) gain = gain.times(upgradeEffect("i", 53))
		if (hasUpgrade("i", 54) && !hasUpgrade("i", 66)) gain = gain.times(upgradeEffect("i", 54))
		if (hasUpgrade("i", 55) && !hasUpgrade("i", 66)) gain = gain.times(upgradeEffect("i", 55))
		if (hasUpgrade("i", 61) && !hasUpgrade("i", 66)) gain = gain.times(upgradeEffect("i", 61))
		if (hasUpgrade("i", 62) && !hasUpgrade("i", 66)) gain = gain.times(upgradeEffect("i", 62))
		if (hasUpgrade("i", 63) && !hasUpgrade("i", 66)) gain = gain.times(upgradeEffect("i", 63))
		if (hasUpgrade("i", 64) && !hasUpgrade("i", 66)) gain = gain.times(upgradeEffect("i", 64))
		if (hasUpgrade("i", 65) && !hasUpgrade("i", 66)) gain = gain.times(upgradeEffect("i", 65))
		if (hasUpgrade("i", 67)) gain = gain.times(upgradeEffect("i", 67))
		gain = gain.times(player.t.r1.plus(1).sqrt().log(2).plus(1))
		if (hasUpgrade("dt", 12) && !hasUpgrade("i", 66)) gain = gain.sqrt()
		if (hasUpgrade("dt", 13) && !hasUpgrade("i", 66)) gain = gain.sqrt()
		if (hasUpgrade("dt", 13) && !hasUpgrade("i", 66)) gain = gain.sqrt()

	}
	else {
		if (new Decimal(player.n.upgrades.length).gte(1)) gain = gain.times(player.n.upgrades.length).times(2)
		if (hasUpgrade("n", 22)) gain = gain.div(upgradeEffect("n", 22))
		if (hasUpgrade("n", 11)) gain = gain.sub(upgradeEffect("n", 11))
		if (hasUpgrade("n", 12)) gain = gain.div(upgradeEffect("n", 12))
		if (hasUpgrade("n", 21)) gain = gain.div(upgradeEffect("n", 21))
		if (hasUpgrade("n", 31)) gain = gain.div(upgradeEffect("n", 31))
		if (!hasUpgrade("g", 21)){
			if (hasUpgrade("g", 11)) gain = gain.div(upgradeEffect("g", 11))
		}
		if (hasUpgrade("v", 11)) gain = gain.div(upgradeEffect("v", 11))
		if (hasUpgrade("v", 12)) gain = gain.div(upgradeEffect("v", 12))
		if (hasUpgrade("v", 13)) gain = gain.div(upgradeEffect("v", 13))
		if (hasUpgrade("v", 14)) gain = gain.div(upgradeEffect("v", 14))
		if (hasUpgrade("a", 23)) gain = gain.times(upgradeEffect("a", 23))
		if (player.aa.points.gte(1)) gain = gain.times(tmp.aa.effect)
		if (hasUpgrade("r", 21)) gain = gain.times(upgradeEffect("r", 21))
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	reality: decimalZero
}}

// Display extra things at the top of the page
var displayThings = [
	function(){if (inReality(96)){return `Note that leaving a Reality stops the production of all things in that Reality`}},
	`Current Endgame: The Theory of Everything`,
	function(){return `You are currently in Reality ${player.reality}`},
	function(){if (inReality(1) && hasUpgrade("dt", 12) && !hasUpgrade("i", 66)){return `<br>Deep Reality 1: Fire Gain is square rooted`}},
	function(){if (inReality(1) && hasUpgrade("dt", 13) && !hasUpgrade("i", 66)){return `Deep Reality 2: Fire Gain is square rooted twice more`}},

]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
	if (player.reality === undefined) player.reality = decimalZero
}
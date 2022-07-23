// access some html variable required throughout the script
let main = document.querySelector('#main')
let combat = document.querySelector('#combat')

combat.style.display = 'none';

// create class to host data about the hexes
class Hex {
    constructor(type, id) {
        this.type = type
        this.id = id
        this.uid = this.type + '-' +parseInt(this.id)
        this.space = 0
        this.adjacents = []
        this.div = null
    }
    moveHex = () => {
        if (adjacentHexes.includes(this.space)) {
            const hero = document.querySelector('#hero')
            const targetHex = document.querySelector('#'+this.uid)
            targetHex.appendChild(hero)
            findCurrentHex()
            adjacentHexes = onLocation.adjacents
            randomEncounterRoll(this.id, this.type)
        }}
}

const adjacents = {
    1: [2, 4, 5],
    2: [1, 3, 5, 6],
    3: [2, 6, 7],
    4: [1, 5, 8, 9],
    5: [1, 2, 4, 6, 9, 10],
    6: [2, 3, 5, 7, 10, 11],
    7: [3, 6, 11, 12],
    // accidently switched 13,14, with 15, 16. This accounts for the odd groupings
    8: [4, 9, 15],
    9: [4, 5, 8, 10, 15, 16],
    10: [5, 6, 9, 11, 16, 13],
    11: [6, 7, 10, 12, 13, 14],
    12: [7, 11, 14],
    13: [10, 11, 16, 14, 18, 19],
    14: [11, 12, 13, 19],
    15: [8, 9, 16, 17],
    16: [9, 10, 13, 15, 17, 18],
    17: [15, 16, 18],
    18: [13, 16, 17, 19],
    19: [13, 14, 18],
}

//Set two normalized hexes on the map
const city = new Hex('City', 1, 3)
const darkTower = new Hex('Dark-Tower', 1, 10)

// Define the 3 other types of hex types and initiate the island array
const lcs = ['Forest', 'Plain', 'Mountain']
let island = [city, darkTower]

//populate the new island with the other hex types to fil out the island
lcs.forEach(element => {
    for (let i=1;i<7;i++){
        island.push(new Hex(element, i))
    }
});
island.pop()

//randomly order the array each time. This will initiate a new island distribution for every game
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(island)

// create a attribute for the position each hex will take on an island. I want to convert this whole
//process into a mathmatical postiioning system, but time does not allow yet. 
space = 1
island.forEach(hx => {
    hx.space = space
    space += 1
});

//populate adjacent hex data
island.forEach(hx => {
    hx.adjacents = adjacents[hx.space]
});


// access temporary hex from html
let hex = document.querySelector("#temp")

// copy  the temp hex and write all new hex information for each hex in the island array. 
// append it to the ul list
const numChange = {
    1:'one', 2:'two', 3:'three', 4:'four', 5:'five', 6:'six', 7:'seven', 8:'eight', 9:'nine',
    10:'ten', 11:'eleven', 12:'twelve', 13:'thirteen', 14:'fourteen', 15:'fifteen', 16:'sixteen',
    17:'seventeen', 18:'eighteen', 19:'nineteen'
}

island.forEach(hx => {
    let tempNode = hex.cloneNode(true);
    tempNode.classList.add(hx.type, hx.id, numChange[hx.space]);
    tempNode.setAttribute('id', hx.uid)
    tempNode.innerHTML = hx.uid
    document.querySelector("#hex-container").appendChild(tempNode)
    hx.div = tempNode
});

//create placement for the hero to start in the city
let start = document.querySelector(".City")
let hero = document.createElement('div');
hero.setAttribute('id', 'hero')
start.appendChild(hero)


//remove the temporary hex
document.querySelector('#temp').parentNode.removeChild(document.querySelector('#temp'))


//select the current hex object associated with the hex div that the hero is on
// added an "on" class that updates with each adjacent list. 
let onLocation = null
function findCurrentHex () {
    island.forEach(hx => {
        let offHex = document.querySelector('.'+numChange[hx.space])
        offHex.classList.remove("on");
    })
    let cHx = document.querySelector('#hero').parentNode
    island.forEach(hx => {
        if (hx.uid === cHx.classList[1]+'-'+cHx.classList[2]){
            onLocation = hx
            for (i in hx.adjacents) {
                let onHex = document.querySelector('.'+numChange[hx.adjacents[i]])
                onHex.classList.add("on")
            }
        } 
    });
} 
findCurrentHex()

let adjacentHexes = onLocation.adjacents


// add event listeners to all hexes that will move the hero and update the selectable tile list
island.forEach(hx => {
    hx.div.addEventListener('click', event => {
        hx.moveHex()
});})


// Start of combat script

let turnOrder = 0

const weapons = {
    "dagger" : 4,
    "fine dagger" : 5,
    "great dagger" : 6,
    "mastercraft dagger" : 7,
    "sword" : 6,
    "fine sword" : 7,
    "great sword" : 8,
    "mastercraft sword" : 9,
    "hammer" : 8,
    "fine hammer" : 9,
    "great hammer" : 10,
    "mastercraft hammer" : 11,
}

const shields = {
    'shield' : 1,
    'fine shield' : 2,
    'great shield' : 3, 
    'mastercraft shield' : 4,
}

const armor = {
    "ragged hat" : 0,
    'ragged shirt':0,
    'ragged pants':0,
    'ragged shoes':0,
    "leather helmet" : 1,
    'leather chest':1,
    'leather leggings':1,
    'leather boots':1,
    "chainmail helmet" : 2,
    'chainmail chest':2,
    'chainmail leggings':2,
    'chainmail boots':2,
    "full-plate helmet" : 3,
    'full-plate chest':3,
    'full-plate leggings':3,
    'full-plate boots':3,
}
class Hero {
    constructor (name) {
        this.weapon = 'dagger'
        this.left = 'shield'
        this.head = "ragged hat"
        this.chest = 'ragged shirt'
        this.legs = 'ragged pants'
        this.feet = 'ragged shoes'
        this.name = name
        this.attack= weapons[this.weapon]
        this.defense = 1 + shields[this.left]
        this.maxHp = 10 + armor[this.head] + armor[this.chest] + armor[this.legs] + armor[this.feet] 
        this.hp = this.maxHp
        this.speed = 30
        this.gold = 0
        this.pack = []
    }
    weaponAttack = () => 1 + Math.floor(Math.random() * (weapons[this.weapon]))
    makeAttack = (target) => {
        let dmg = this.weaponAttack() - target.defense
        if (dmg > 0) {
            enemy.style.width = parseInt((target.hp - dmg)*900/target.maxHp)+'px'
            target.hp = target.hp - dmg
            if (target.hp <= 0) {
                enemy.style.width = 0
                let loot = document.createElement("div")
                loot.setAttribute('id', 'loot')
                document.querySelector("#combat").append(loot)
                loot.addEventListener("click", () => getLoot(target.cr)) 
            }
            target.makeAttack(this)
        }
        target.makeAttack(this)
    }
    runAway = () => {
        this.hp = Math.ceil(this.hp/2)
        main.style.display = 'block';
        combat.style.display = 'none';
    }
    equipItem = (piece) => {
        console.log(this.piece)
        if (this.pack.length < 1 ) {
            alert(`There is nothign in your pack. You are currently wearing ${this.weapon}, ${this.left}, ${this.head}, ${this.chest}, ${this.legs}, ${this.feet}`)
        }
        else {
            this.piece = prompt(`You have the following in your pack ${this.pack}. Please select the approprate piece of gear to put in your ${piece} slot`, "")
        }
    }
    takeRest = () => {
        if ( 5 >= Math.floor(Math.random() * 10)) {
            let item = Math.floor(Math.random() * this.pack.length)
            if (this.pack[item] !== undefined) {
                alert(`${this.pack[item]} was stolen in the night`)
            }
            this.pack.splice(item, 1);
            if (this.hp > (this.maxHp/2 - 1)) {
                this.hp = this.maxHp
            }
            else {
                this.hp = Math.ceil(this.maxHp/2)
            }
        }
    }
}

let player = new Hero('Sprinkles')

const lootObj = {
    1:[1],
    2:[2],
    3:[3],
    4:[1,3],
    5:[3,3] 
}

const lootTable1 = ["leather helmet", 'leather chest','leather leggings','leather boots', 
'fine shield', "fine dagger", "sword", "fine sword", "hammer", "fine hammer"]
const lootTable2 = ["chainmail helmet",'chainmail chest','chainmail leggings','chainmail boots', 
'great shield', "great dagger" ,"great sword", "great hammer"]
const lootTable3 = ["full-plate helmet",'full-plate chest','full-plate leggings','full-plate boots', 
'mastercraft shield', "mastercraft dagger",  "mastercraft sword", "mastercraft hammer"]


function getLoot (cr) {
    pack = []
    for (t in lootObj[cr]) {
        if (lootObj[cr][t] === 1) {
            pack.push(lootTable1[Math.floor(Math.random() * lootTable1.length)])
        }
        else if (lootObj[cr][t] === 2) {
            pack.push(lootTable2[Math.floor(Math.random() * lootTable2.length)])
        }
        else {
            pack.push(lootTable2[Math.floor(Math.random() * lootTable2.length)])
        }
    }
    printPack = ''
    pack.forEach(i => {
        player.pack.push(i)
        printPack = printPack +i+', '
    });
    alert(`Your Hero found ${printPack}`)
    let loot = document.querySelector("#loot")
    loot.parentNode.removeChild(loot)
    main.style.display = 'block';
    combat.style.display = 'none';
}

class Enemy {
    constructor (creature, attack, defense, hp, cr) {
        this.creature = creature
        this.attack = attack
        this.defense = defense
        this.maxHp = hp
        this.hp = this.maxHp
        this.cr = cr
    }
    makeAttack = (target) => {
        let dmg = this.attack - target.defense
        if (dmg > 0) {
            user.style.width = parseInt((target.hp - dmg)*900/target.maxHp)+'px'
            target.hp = target.hp - dmg
            if (target.hp <= 0) {
                enemy.style.width = 0
                let loot = document.createElement("div")
                loot.setAttribute('id', 'end')
                let text = document.createElement("h1")
                text.setAttribute('id', 'game-over')
                text.innerHTML = "You Died, Game Over"
                loot.append(text)
                document.querySelector("#combat").append(loot)
            }
        }
    }
}

const monsters = ["Goblin","Wolf","Orc","Ogre","Bandit","Awakend Bush","Awakend Tree","Troll","Giant","Dragon","Boar","Centaur",
"Giant Ape","Golem","Goblin Master","Winter Wolf","Dark Assasin","Bugbear","Scarecrow","Slime"]
const mAttacks =[2,3,3,3,2,1,2,2,4,5,1,3,4,3,3,3,4,3,1,1]
const mDefense=[2,2,2,3,2,1,3,2,4,5,3,3,4,5,3,3,2,3,1,4]
const mHP=[5,5,10,15,10,1,6,20,20,30,3,10,20,15,5,10,6,10,3,3]
const mCR=[1,1,1,2,1,1,1,3,4,5,1,2,4,3,2,2,3,2,1,2]
let Forest= "Forest"
let Mountain="Mountain"
let Plain="Plain"
const mHexes = [[Forest, Mountain, Plain],[Forest, Mountain, Plain],[Forest, Mountain, Plain],[Forest, Mountain],[Forest, Plain],[Forest],
[Forest],[Forest, Mountain],[Mountain, Plain],[Forest, Mountain],[Forest, Plain],[Plain],[Forest],[Mountain],
[Forest, Mountain, Plain],[Mountain],[Forest, Mountain, Plain],[Forest, Mountain],[Plain],[Mountain, Forest]]

let encounter = {
    'Forest':[],
    'Mountain':[],
    'Plain':[]
}

for (let i = 0; i < monsters.length; i++) {
    mHexes[i].forEach(lc => {
        if (lc === 'Forest' ) {
            encounter['Forest'].push(new Enemy(monsters[i], mAttacks[i], mDefense[i], mHP[i], mCR[i]))
        }
        else if (lc === 'Mountain') {
            encounter['Mountain'].push(new Enemy(monsters[i], mAttacks[i], mDefense[i], mHP[i], mCR[i]))
        }
        else {
            encounter['Plain'].push(new Enemy(monsters[i], mAttacks[i], mDefense[i], mHP[i], mCR[i]))
        }
    });
}

let enc = null

function displayStats () {
    let statHp = document.querySelector('#hp')
    let statAp = document.querySelector('#attack_power')
    let statDp = document.querySelector('#defese')
    statHp.innerHTML = `Current HP: ${parseInt(player.hp)}`
    statAp.innerHTML = `Current Attack Power: ${parseInt(player.attack)}`
    statDp.innerHTML = `Current Defense: ${parseInt(player.defense)}` 
}

let runner = window.setInterval(displayStats, 100);

function randomEncounterRoll (id, lc) {
    if (id >= Math.floor(Math.random() * 10)) {
        if (id <= 4) {
            enc = encounter[lc][Math.floor(Math.random() * encounter[lc].length)]
            fight()
        }
        else {
            let r1 = encounter[lc][Math.floor(Math.random() * encounter[lc].length)]
            let r2 = enc = encounter[lc][Math.floor(Math.random() * encounter[lc].length)]
            if (r1.cr >= r2.cr) {
                enc = r1
            }
            else {
                enc = r2
            }
            fight()
            main.style.display = 'none';
            combat.style.display = 'block';
        }
    }
}

let user = null
let enemy = null 
function fight() {
    user = document.querySelector('#user-hp')
    enemy = document.querySelector("#enemy-hp")
}

const attack = document.querySelector('#attack')
attack.addEventListener("click", () => player.makeAttack(enc))

const runAway = document.querySelector('#run-away')
runAway.addEventListener("click", () => player.runAway())

const rest = document.querySelector('#rest')
rest.addEventListener("click", () => player.takeRest())

let equipWeapon = document.querySelector('#weapon')
equipWeapon.addEventListener("click", () => player.equipItem())

let equipShield = document.querySelector('#shield')
equipShield.addEventListener("click", () => player.equipItem())

let equipHead = document.querySelector('#head')
equipHead.addEventListener("click", () => player.equipItem())

let equipChest = document.querySelector('#chest')
equipChest.addEventListener("click", () => player.equipItem())

let equipLegs = document.querySelector('#legs')
equipLegs.addEventListener("click", () => player.equipItem())

let equipFeet = document.querySelector('#feet')
equipFeet.addEventListener("click", () => player.equipItem())

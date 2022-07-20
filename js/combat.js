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
        this.weapon = this.weapon
        this.defense = 1 + shields[this.left]
        this.hp = 10 + armor[this.head] + armor[this.chest] + armor[this.legs] + armor[this.feet] 
        this.speed = 30
        this.gold = 0
        this.pack = []
    }
    getName = () => this.name
    getWeapon = () => this.weapon
    getDefense = () => this.defense
    getHp = () => this.hp
    getSpeed = () => this.speed
    getWeapon = () => this.weapon
    getLeft = () => this.left
    getHead = () => this.head
    getChest = () => this.chest
    getLegs = () => this.legs
    getFeet = () => this.feet
    getGold = () => this.gold
    getPack = () => this.pack
    weaponAttack = () => 1 + Math.floor(Math.random() * (weapons[test.weapon]))
    makeAttack = (target) => {
        let dmg = this.weaponAttack() - target.defense
        if (dmg > 0) {
            target.hp = target.hp - dmg
        }
    }
}

class Enemy {
    constructor (creature, attack, defense, hp, cr) {
        this.creature = creature
        this.attack = attack
        this.defense = defense
        this.hp = hp
        this.cr = cr
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

let test = new Hero('Sprinkles')

function randomEncounterRoll (id, lc) {
    if (id >= Math.floor(Math.random() * 10)) {
        if (id <= 4) {
            enc = encounter[lc][Math.floor(Math.random() * encounter[lc].length)]
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
        }
        popup('../combat.html', "combat");
        let test = document.createElement('div')
        test.innerHTML = "Woot Woot"
        document.body.appendChild(test)
    }
}

const island = document.querySelectorAll('.hex')
island.forEach(hx => {
    hx.addEventListener('click', event => {
        randomEncounterRoll(hx.classList[2], hx.classList[1])
});})

function popup(mylink, windowname) {
    if (! window.focus)return true; 
        var href; 
    if (typeof(mylink) == 'string') href=mylink; 
    else href=mylink.href; 
        window.open(href, windowname, 'width=600,height=400,scrollbars=yes');
        return false; 
}



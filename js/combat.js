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

class Enemy (
    constructor (creature, attack, defense, hp, loot) {
        this.creature = creature
        this.attack = attack
        this.defense = defense
        this.hp = hp
        this.loot = loot
    }
)

monster ={
    hp : 10,
    defense : 2
}

let test = new Hero('Sprinkles')
console.log(test)
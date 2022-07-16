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

class Hero {
    constructor (name) {
        this.name = name
        this.attack = 1
        this.defense = 1
        this.hp = 10
        this.speed = 30
        this.right = 'dagger'
        this.left = 'shield'
        this.head = "ragged hat"
        this.chest = 'ragged shirt'
        this.legs = 'ragged pants'
        this.feet = 'ragged shoes'
    }
    getName = () => this.name
    getAttack = () => this.attack
    getDefense = () => this.defense
    getHp = () => this.hp
    getSpeed = () => this.speed
    getRight = () => this.right
    getLeft = () => this.left
    getHead = () => this.head
    getChest = () => this.chest
    getLegs = () => this.legs
    getFeet = () => this.feet
    makeAttack = () => 1+Math.floor(Math.random() * (weapons[this.right] - 1))
}

let test = new Hero('Sprinkles')
console.log(test.makeAttack())
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
            console.log(adjacentHexes)
        }}
    // this.div.addEventListener('click', event => {
    //     moveHex()
    // })
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
console.log(island)

//randomly order the array each time. This will initiate a new island distribution for every game
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(island)
console.log(island)

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
console.log(hex)

// copy  the temp hex and write all new hex information for each hex in the island array. 
// append it to the ul list
island.forEach(hx => {
    let tempNode = hex.cloneNode(true);
    tempNode.classList.add(hx.type, hx.id, hx.space);
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
let onLocation = null
function findCurrentHex () {
    let cHx = document.querySelector('#hero').parentNode
    island.forEach(hx => {
        if (hx.uid === cHx.classList[1]+'-'+cHx.classList[2]){
            onLocation = hx
        }
    });
} 
findCurrentHex()
console.log(onLocation.adjacents)

let adjacentHexes = onLocation.adjacents


// let test = document.querySelector("#City-1")
// test.addEventListener("click", () => console.log('Yay'))
// console.log(test)
// const hexes = document.querySelectorAll('.hex')
// hexes.forEach(el => el.addEventListener('click', event => {
//     moveHex ();
//   }));

island.forEach(hx => {
    hx.div.addEventListener('click', event => {
        hx.moveHex()
});})


// function popup(mylink, windowname) {
//     if (! window.focus)return true; 
//         var href; 
//     if (typeof(mylink) == 'string') href=mylink; 
//     else href=mylink.href; 
//         window.open(href, windowname, 'width=400,height=200,scrollbars=yes'); 
//         return false; 
// }

// popup('../combat.html', "test")

console.log(onLocation.adjacents)
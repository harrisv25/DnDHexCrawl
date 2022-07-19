// create class to host data about the hexes
class Hex {
    constructor(type, id, space) {
        this.type = type
        this.id = id
        this.uid = this.type + '-' +parseInt(this.id)
        this.space = 0
    }
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
console.log(island)

// create a attribute for the position each hex will take on an island. I want to convert this whole
//process into a mathmatical postiioning system, but time does not allow yet. 
space = 1
island.forEach(hx => {
    if ((space === 3) || (space === 10)) {
        space += 1
    }
    hx.space = space
    space += 1
});

// island.forEach(hx => {
//     if(hx.space < 5) {
//         hx.row = 'one'
//     }
//     else if(hx.space < 9) {
//         hx.row = 'two'
//     }
//     else if(hx.space < 15) {
//         hx.row = 'three'
//     }
//     else if(hx.space < 19) {
//         hx.row = 'four'
//     }
//     else {
//         hx.row = 'five'
//     }
// });

// access temporary hex from html
let hex = document.querySelector("#temp")
console.log(hex)

// copy  the temp hex and write all new hex information for each hex in the island array. 
// append it to the ul list
island.forEach(hx => {
    let tempNode = hex.cloneNode(true);
    tempNode.classList.add(hx.type, hx.id, hx.space);
    tempNode.setAttribute('id', hx.space)
    tempNode.innerHTML = hx.uid
    document.querySelector("#hex-container").appendChild(tempNode)
});

//remove the temporary hex
document.querySelector('#temp').parentNode.removeChild(document.querySelector('#temp'))

function popup(mylink, windowname) {
    if (! window.focus)return true; 
        var href; 
    if (typeof(mylink) == 'string') href=mylink; 
    else href=mylink.href; 
        window.open(href, windowname, 'width=400,height=200,scrollbars=yes'); 
        return false; 
}

popup('../combat.html', "test")


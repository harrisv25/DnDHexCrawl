class Hex {
    constructor(type, id, space) {
        this.type = type
        this.id = id
        this.uid = this.type + '-' +parseInt(this.id)
        this.space = space
    }
}

const city = new Hex('City', 1, 3)
const darkTower = new Hex('Dark-Tower', 1, 10)

const lcs = ['Forest', 'Plain', 'Mountain']
let island = [city, darkTower]

space = 1
lcs.forEach(element => {
    for (let i=1;i<7;i++){
        if ((space === 3) || (space === 10)) {
            space += 1
        }
        island.push(new Hex(element, i, space))
        space += 1
    }
});

island.pop()

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(island)
console.log(island)

let hex = document.querySelector(".hex")
console.log(hex)


island.forEach(hx => {
    let tempNode = hex.cloneNode(true);
    tempNode.classList.add(hx.type, hx.id);
    tempNode.innerHTML = hx.uid
    document.querySelector("#island").appendChild(tempNode)
});

document.querySelector('#temp').parentNode.removeChild(document.querySelector('#temp'))
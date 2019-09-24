const createMonster = document.querySelector("#create-monster")
const monsterContainer = document.querySelector("#monster-container")
const forwardButton = document.querySelector("#forward")
const backButton = document.querySelector("#back")
let currentPage = 1

// Create monster form 
createMonster.innerHTML =       
    `
    <form id="monster-form">
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <input type="submit" value="Create">
    </form>
    `

// Create new monster
document.addEventListener("submit", e => {
    e.preventDefault()
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: 
            {
            "Content-Type": "application/json",
            Accept: "application/json"
            },
        body: JSON.stringify(
            {
            name: document.querySelector("#name").value,
            age: document.querySelector("#age").value,
            description: document.querySelector("#description").value
            }
        )
    })
    document.querySelector("#monster-form").reset()
})

// Load monsters onto first page
function loadMonsters(pageNumber) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(resp => resp.json())
    .then(monsters => {
        monsterContainer.innerHTML = ""
        monsters.forEach(monster => {
            monsterContainer.insertAdjacentHTML("beforeend", 
            `<div>
                <h2>${monster.name}</h2>
                <h4>Age: ${monster.age}</h4>
                <p>Bio: ${monster.description}</p>
            </div>`)
        })
        window.scrollTo(0, 0)
    })
}
loadMonsters(currentPage)

// Load new monsters based on page number
document.addEventListener("click", e => {
    if(e.target === forwardButton){
        currentPage = currentPage + 1
        loadMonsters(currentPage)
    } else if(e.target === backButton){
        if(currentPage < 2){
            alert("Ain't no monsters here")
        } else {
            currentPage = currentPage - 1
            loadMonsters(currentPage)
        } 
    }
})



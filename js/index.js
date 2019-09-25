document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector("#monster-container")
    const form = document.querySelector("#new-monster")
    const foward = document.querySelector("#forward")
    const back = document.querySelector("#back")
    let page = 1
    let monster_count = 0;

    fetch(`http://localhost:3000/monsters`)
    .then(response => response.json())
    .then(function(data) {
        monster_count = data.length
    })


    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(renderMonsters)

    function renderMonsters(monsters) {
        monsters.forEach(renderOneMonster)
    }

    function renderOneMonster(monster) {
        let str = 
            `<div data-id="${monster.id}">
                <h2>${monster.name}</h2>
                <h4>${monster.age}</h4>
                <p>${monster.description}</p>
            </div>`
        container.insertAdjacentHTML("beforeend", str)
    }
    
    form.addEventListener("submit", function(event) {
        event.preventDefault()

        let name = event.target.name.value
        let age = event.target.age.value
        let description = event.target.description.value

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accepts: "application/json"
            },
            body: JSON.stringify({
                name: name, 
                age: age,
                description: description
            })
        })
        .then(response => response.json())
        .then(renderOneMonster)

        document.querySelectorAll(".input-text").forEach(function(input) {
            input.value = ''
        })
    })

    foward.addEventListener("click", function(event) {
        if(page === Math.ceil(monster_count/50)) { return alert("There are no more monster")}
        page++
        container.innerHTML = ''
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(renderMonsters)
    })

    back.addEventListener("click", function(event) {
        if(page === 1) { return alert("This is the first page") }

        page--
        container.innerHTML = ''
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(renderMonsters)
    })
    
})



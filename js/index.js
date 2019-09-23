document.addEventListener("DOMContentLoaded", function() {
    const monsters = document.querySelector("#monster-container")
    const newMonsterContainer = document.querySelector("#create-monster")
    let page = 1

    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        data.forEach(function(monster) {
            monsters.insertAdjacentHTML("beforeend",
            `<div>
            <h2>${monster.id}</h2>
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}<p>
            </div>`)
        })
    })

    newMonsterContainer.insertAdjacentHTML("beforeend",
    `<form id="create-monster-form">
        <input type="text" name="name" placeholder="Name..."></input>
        <input type="text" name="age" placeholder="Age..."></input>
        <input type="text" name="description" placeholder="Description..."></input>
        <input type="submit" name="submit" value="Create Monster"></input>
    </form>
    `)

    const createNewMonster = document.querySelector("#create-monster-form")
    createNewMonster.addEventListener("submit", function(e) {
        e.preventDefault()
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: e.target.name.value,
                age: e.target.age.value,
                description: e.target.description.value
            })
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(monster) {
            monsters.insertAdjacentHTML("afterbegin",
            `<div>
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}<p>
            </div>`)
        })
    })

    document.addEventListener("click", function(e) {
        if (e.target.id === "forward") {
            page++
            fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                monsters.innerHTML = ""
                data.forEach(function(monster) {
                    monsters.insertAdjacentHTML("beforeend",
                    `<div>
                    <h2>${monster.id}</h2>
                    <h2>${monster.name}</h2>
                    <h4>Age: ${monster.age}</h4>
                    <p>Bio: ${monster.description}<p>
                    </div>`)
                })
            })
        }
        else if (e.target.id === "back") {
            page--
            fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                monsters.innerHTML = ""
                data.forEach(function(monster) {
                    monsters.insertAdjacentHTML("beforeend",
                    `<div>
                    <h2>${monster.id}</h2>
                    <h2>${monster.name}</h2>
                    <h4>Age: ${monster.age}</h4>
                    <p>Bio: ${monster.description}<p>
                    </div>`)
                })
            })
        }
    })

})
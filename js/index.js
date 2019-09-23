const monsterContainer = document.querySelector("#monster-container")
const createMonsterForm = document.querySelector("#create-monster-form")
const createMonsterSubmitButton = document.querySelector("#create-monster-submit-button")
let monsterNameInput = document.querySelector("#monster-name")
let monsterAgeInput = document.querySelector("#monster-age")
let monsterDescriptionInput = document.querySelector("#monster-description")

document.addEventListener("DOMContentLoaded", function (){
    
    fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
        .then(response => response.json())
        .then(renderMonsters)
    function renderMonsters(data) {
        data.forEach(function (monster) {
            monsterContainer.insertAdjacentHTML('beforeend', `<h2>${monster.name}</h2>
                                                              <h3>${monster.age}</h3>
                                                              <h4>${monster.description}</h4>`)})
    }
    createMonsterForm.addEventListener("submit", function (event) {
        event.preventDefault()
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: `${monsterNameInput.value}`,
                age: `${monsterAgeInput.value}`,
                description: `${monsterDescriptionInput.value}`
            })
        }).then(response => response.json())
            .then(function (data) {
                monsterContainer.insertAdjacentHTML("afterbegin", `<h2>${data.name}</h2>
                                                            <h3>${data.age}</h3>
                                                            <h4>${data.description}</h4>`)
            })
        })
})
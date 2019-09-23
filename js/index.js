const url = "http://localhost:3000/monsters"
const monsterContainer = document.querySelector("#monster-container")
const pageButtons = document.querySelector("#page-buttons")
const monsterForm = document.querySelector("#create-monster")
let currentPage = 1
createMonsterForm()

document.addEventListener("DOMContentLoaded", () => {
    renderPage(currentPage)
    changePage()
    createMonster()
})

// creates the monster than submits a post req
function createMonster(){
    monsterForm.addEventListener('submit', function(event){
        const monster = {
            name: document.querySelector('#mon-name').value,
            age: document.querySelector('#mon-age').value,
            description: document.querySelector('#mon-desc').value
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(monster)
        })
        .then(function(resp){
            return resp.json()
        })
    })
}

// creates the monster form
function createMonsterForm(){
    const form = document.createElement('form')
    form.innerHTML = `Name: <input type='text' id='mon-name'>
    Age: <input type='number' id='mon-age'>
    Description: <input type='text-area' id='mon-desc'>
    <input type='submit' id='submit-monster'>
    `
    monsterForm.append(form)
}

// changed HTML for the forward and back buttons and surrounded them in a parent div
// added an event listener for the click
function changePage(){
    pageButtons.addEventListener("click", function(event){
        let pageDirection = event.target.id
        if (pageDirection === "forward"){
            currentPage++
            monsterContainer.innerHTML = ""
            renderPage(currentPage)
        } else{
            currentPage--
            if(currentPage < 1){
                currentPage = 1
                monsterContainer.innerHTML = ""
                renderPage(currentPage)
            }
            monsterContainer.innerHTML = ""
            renderPage(currentPage)
        }
    })
}

function renderPage(currentPage=1){
    fetch(`${url}/?_limit=50&_page=${currentPage}`)
    .then(function(response){
        return response.json()
    })
    .then(function (monsters) {
        monsters.forEach(function (monster) {
            createMonsterDiv(monster)
        })
    })
}

function createMonsterDiv(monster){
    let monsterDiv = document.createElement('div');
    monsterDiv.innerHTML = `<h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4> <p>Bio: ${monster.description}</p>`
    monsterContainer.insertAdjacentElement("beforeend", monsterDiv)
}

// const form = document.createElement('form')

// let inputName = document.createElement('input')
// inputName.type = 'text'
// inputName.dataset['name'] = 'name'
// form.append(inputName)

// let inputAge = document.createElement('input')
// inputAge.type = 'number'
// inputAge.dataset['age'] = 'age'
// form.append(inputAge)

// let inputDes = document.createElement('input')
// inputDes.type = 'text'
// inputDes.dataset['desc'] = 'desc'
// form.append(inputDes)

// let submitMon = document.createElement('input')
// submitMon.type = 'submit'
// submitMon.id = 'submit-monster'
// form.append(submitMon)

// monsterForm.append(form)
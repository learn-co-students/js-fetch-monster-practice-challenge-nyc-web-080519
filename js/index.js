const monstersURL = "http://localhost:3000/monsters"
const monsterContainer = document.querySelector("#monster-container")
const createMonster = document.querySelector("#create-monster")
let loadBtn 
const backBtn = document.querySelector("#back")
const forwardBtn = document.querySelector("#forward")
let num = 50


getFiftyMonsters(num).then(showFiftyMonsters)

function showFiftyMonsters(monsters){
  monsters.forEach(renderOneMonster)

  backBtn.addEventListener('click', deleteMonsters)
  forwardBtn.addEventListener('click', getNextFiftyMonsters)
}

function deleteMonsters(e){
  if(monsterContainer.childElementCount > 1){
    for(i=0; i<50; i++){
      monsterContainer.lastElementChild.remove()
    }
  } else {
    alert("No more monsters to delete!")
  }
}

function getNextFiftyMonsters(e){
  num += 50 
  getFiftyMonsters(num).then(showFiftyMonsters)
}

function renderOneMonster(monster){
  const monsterInfo = `
    <div>
      <h2>${monster.name}</h2>
      <h3>${monster.age}</h3>
      <p>${monster.description}</p>
    </div>
  `
  monsterContainer.insertAdjacentHTML('beforeend', monsterInfo)
}

function addCreateMonsterForm(){
  const newForm = `
    <form id="monster-form">
      <input id="name" placeholder="name...">
      <input id="age" placeholder="age...">
      <input id="description" placeholder="description...">
      <button data-action="create new monster">Create New Monster</button>
    </form>
  `
  createMonster.insertAdjacentHTML('beforeend', newForm)

  const monsterForm = document.querySelector("#monster-form")
  monsterForm.addEventListener('submit', createMonsterClick)
}

addCreateMonsterForm()

function createMonsterClick(e){
  e.preventDefault()

  const nameInput = e.target.name.value
  const ageInput = parseInt(e.target.age.value)
  const descriptionInput = e.target.description.value
  
  postNewMonster(nameInput, ageInput, descriptionInput).then(renderOneMonster)
}



//FETCHES

function getFiftyMonsters(num){
  return fetch(monstersURL + `?_limit=${num}`)
    .then(resp => resp.json())
}


function postNewMonster(nameInput, ageInput, descriptionInput){

  const data = { 
    name: nameInput, 
    age: ageInput, 
    description: descriptionInput
  }

  const options = {
    method: 'POST', 
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }

  return fetch(monstersURL, options)
    .then(resp => resp.json())
}
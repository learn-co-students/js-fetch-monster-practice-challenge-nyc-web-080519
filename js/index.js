document.addEventListener("DOMContentLoaded", () => { getMonsters(1)

const monsterContainer = document.getElementById("monster-container")
const buttonsContainer = document.getElementById("buttons")
const form = document.getElementById("monster-form")
let page = 1;

function getMonsters(page) {
  return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(resp => resp.json())
  .then(monsters => {
    monsters.forEach(renderMonster)
  })
}

function postMonster(monsterObj){
  return fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(monsterObj)
  }).then(resp => resp.json())
}

const renderMonster = monster => {
  monsterContainer.insertAdjacentHTML("beforeend", `
    <h2>${monster.name}</h2>
    <p>Age: ${monster.age}</p>
    <p>Description: ${monster.description}</p>
  `)
}

buttonsContainer.addEventListener("click", e => {
  if (e.target.dataset.action === "forward") {
    page++
    console.log(page)
    monsterContainer.innerHTML = ""
    getMonsters(page)
    // check for edge case of the request not returning any monsters
  } else {
    if (page === 1) { 
      alert("Here there be no monsters")
    } else {
    page--
    console.log(page)
    monsterContainer.innerHTML = ""
    getMonsters(page)
    }
  }
})

form.addEventListener("submit", e => {
  e.preventDefault();
  let name = e.target.name.value;
  let age = e.target.age.value;
  let description = e.target.description.value;
  let monsterObj = {
    name: name,
    age: age,
    description: description
  }
  console.log(name, age, description)
  // debugger
  
  try {
    if (!name) throw "Name can't be blank";
    if(!age) throw "Age can't be blank";
    if(!description) throw "Description can't be blank";
    postMonster(monsterObj)
    .then(monster => {
      console.log(monster)
      //render the monster at the top of the div
      monsterContainer.insertAdjacentHTML("afterbegin", `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      `)
    }) 
  }
  catch(err) {
    alert(err)
  }

  // return monsterObj
})








})

window.addEventListener('DOMContentLoaded', (event) => {
    
    getMonsters(1)

    const back = document.querySelector("#back")
    const forward = document.querySelector("#forward")
    const monsterStash = document.querySelector("#monster-container")
    let data = []
    let pageNum = 1;

    function getMonsters(pageNum) {
        return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
        .then(resp => resp.json())
        .then(monsters => { monsters.forEach(renderMonster)
  })
    }

    function renderMonster(monster) {
        monsterStash.insertAdjacentHTML("afterbegin", `
        <h2>Name: ${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
        `)
    }

    function postMonster(monsterOBJ) {
        fetch("http://localhost:3000/monsters", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            data: JSON.stringify(monsterOBJ)
        })
        .then(resp.json())
    }

    document.addEventListener("click", e => {
        if (e.target.id === "back") {
            // console.log(pageNum)
            pageNum--
            if (pageNum < 1){ pageNum = 1 }
            // console.log(pageNum)
            monsterStash.innerHTML = ""
            getMonsters(pageNum)
        } else if (e.target.id === "forward") {
            // console.log(pageNum)
            pageNum++
            if (pageNum > 3) { pageNum = 3 }
            // console.log(pageNum)
            monsterStash.innerHTML = ""
            getMonsters(pageNum)
        }
    })

    document.addEventListener("submit", e => {
        e.preventDefault();
        let name = e.target.name.value
        let age = e.target.age.value
        let description = e.target.description.value
        let id = e.target.id
        
        monsterOBJ = {
            name: name,
            age: age,
            description: description
        }

        postMonster(monsterOBJ)
        .then(monster => {
            // monsterContainer.insertAdjacentHTML("afterbegin", `
            //     <h2>${monster.name}</h2>
            //     <p>Age: ${monster.age}</p>
            //     <p>Description: ${monster.description}</p>
            // `)
            renderMonster(monster)
        })
    })

})